"use strict";

const express = require('express');
const express_jwt = require('express-jwt');
const express_validator = require('express-validator');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const sudoku_module = require('sudoku');

const Sequelize = sequelize.Sequelize;

const models = require('./models');

module.exports = (database, settings) => {
  // Set up our sequelize models
  const Account = models.createAccountModel(database, settings);
  const Sudoku = models.createSudokuModel(database, settings);
  const SudokuProgress = models.createSudokuModel(database, settings);

  database.sync();

  var router = express.Router();

  const jwt_restrictor = express_jwt(settings.jwt_options).unless({
    path: [
      '/api/account/login/',
      '/api/account/register/',
      /^\/api\/sudoku\/[^\/]*\/$/,
    ]
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
  });

  router.post('/account/register/', (req, res) => {
    req.checkBody("username", "username is required").isLength({min: 1});
    req.checkBody("email", "email is required").isLength({min: 1});
    req.checkBody("email", "email malformatted").isEmail();
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
      if(user !== null) {
        res.json({
          status: "error",
          reason: "username already exists",
        })
      } else {
        Account.create({
          username: req.body.username,
          email: req.body.email,
          password_data: req.body.password,
        }).then(user => {
          res.json({
            status: "ok",
            token: jwt.sign({
              username: req.body.username,
            }, settings.jwt_options.secret),
          });
        });
      }
    });
  });

  router.get('/sudoku/daily/', (req, res) => {
    var now = new Date();
    var day_string = now.toISOString().split('T')[0];
    res.json({
      status: "ok",
      sudoku: day_string,
    });
  });

  function get_sudoku(date) {
    return Sudoku.findOne({
      date: date,
    }).then(sudoku => {
      if(sudoku === null) {
        let sudoku_arr = sudoku_module.makepuzzle();
        let as_string = sudoku_arr.map((v) => v === null ? 0 : (v + 1)).join("");
        Sudoku.create({
          date: date,
          board: as_string,
          difficulty: sudoku_module.ratepuzzle(sudoku),
        }).then(() => get_sudoku(date));
      } else {
        return sudoku;
      }
    });
  }

  router.get(/\/sudoku\/([0-9]{4}-[0-9]{2}-[0-9]{2})\//, (req, res) => {
    var date = new Date(req.params[0]);
    if(date < settings.start_date || date > new Date()) {
      res.status(404).json({
        status: "error",
        reason: "No such Sudoku.",
      });
    } else {
      get_sudoku(date).then(sudoku => {
        res.json({
          status: "ok",
          initial_board: sudoku.board,
          progress: sudoku.board,
          date: sudoku.date,
        })
      }).catch(err => {
        res.json({
          status: "error",
          reason: "" + err,
        })
      })
    }
  });

  router.post(/\/sudoku\/([0-9]{4}-[0-9]{2}-[0-9]{2})\/progress\//, (req, res) => {

  });

  return router;
}
