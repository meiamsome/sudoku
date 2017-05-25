const express = require('express');
const express_jwt = require('express-jwt');
const express_validator = require('express-validator');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const Sequelize = sequelize.Sequelize;

const models = require('./models');

module.exports = (database, settings) => {
  // Set up our sequelize models
  const Account = models.createAccountModel(database, settings);

  database.sync();

  var router = express.Router();

  const jwt_restrictor = express_jwt(settings.jwt_options).unless({
    path: ['/api/account/login/']
  });

  router.use(jwt_restrictor);
  router.use(express_validator());

  router.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
        status: "error",
        reason: "Unauthorized",
      });
    } else {
      next();
    }
  });

  router.get('/', (req, res) => {
    res.json({});
  });

  router.post('/account/login/', (req, res) => {
    req.checkBody("username", "username is required").isLength({min: 1});
    req.checkBody("password", "password is required").isLength({min: 1});

    var errors = req.validationErrors();
    if(errors) {
      res.json({
        status: "error",
        reason: errors,
      });
      return;
    }

    Account.findOne({
      where: {
        username: req.body.username,
      }
    }).then(user => {
      if(user !== null && user.check_password(req.body.password)) {
        res.json({
          status: "ok",
          token: jwt.sign({
            username: req.body.username,
          }, settings.jwt_options.secret),
        });
      } else {
        res.json({
          status: "error",
          reason: "invalid credentials",
        });
      }
    });
  })

  return router;
}
