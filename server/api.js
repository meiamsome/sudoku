const crypto = require('crypto');
const express = require('express');
const sequelize = require('sequelize');

const Sequelize = sequelize.Sequelize;

const models = require('./models');

module.exports = (database, settings) => {
  // Set up our sequelize models
  const Account = models.createAccountModel(database);

  database.sync();

  var router = express.Router();

  router.get('/', (req, res) => {
    res.json({});
  });

  return router;
}
