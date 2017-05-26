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
  const SudokuProgress = models.createSudokuProgressModel(database, settings);

  database.sync();

  var router = express.Router();

  router.use(express_jwt({
    secret: settings.jwt_options.secret,
    credentialsRequired: false,
  }));;

  router.use(express_jwt(settings.jwt_options).unless({
    path: [
      '/api/account/login/',
      '/api/account/register/',
      /^\/api\/sudoku\/[^\/]*\/$/,
    ]
  }));

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

  router.use(express_validator());

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
            accountId: user.id,
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
              accountId: user.id,
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
      where: {
        date: date,
      }
    }).then(sudoku => {
      if(sudoku === null) {
        let sudoku_arr = sudoku_module.makepuzzle();
        let as_string = sudoku_arr.map((v) => v === null ? 0 : (v + 1)).join("");
        Sudoku.create({
          date: date,
          board: as_string,
          difficulty: sudoku_module.ratepuzzle(sudoku_arr),
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
        if(req.user) {
          SudokuProgress.findOne({
            where: {
              sudokuDate: sudoku.date,
              accountId: req.user.accountId,
            }
          }).then(progress => {
            res.json({
              status: "ok",
              first_solver: sudoku.firstSolverId,
              initial_board: sudoku.board,
              progress: progress === null ? sudoku.board : progress.board,
              date: sudoku.date,
            });
          })
        } else {
          res.json({
            status: "ok",
            first_solver: sudoku.firstSolverId,
            initial_board: sudoku.board,
            progress: sudoku.board,
            date: sudoku.date,
          });
        }
      }).catch(err => {
        res.json({
          status: "error",
          reason: "" + err,
        })
      })
    }
  });

  router.post(/\/sudoku\/([0-9]{4}-[0-9]{2}-[0-9]{2})\/progress\//, (req, res) => {
    req.checkBody("grid", "Grid should be 81 characters.").isLength({
      min: 81,
      max: 81,
    }).matches(/[0-9]{81}/);

    var errors = req.validationErrors();
    if(errors) {
      res.json({
        status: "error",
        reason: errors,
      });
      return;
    }

    get_sudoku(new Date(req.params[0])).then(sudoku => {
      var solved = false;
      if(/[1-9]{81}/.test(req.body.grid)) {
        var format = req.body.grid.split("").map(v => v - 1);
        if(sudoku_module.solvepuzzle(format) !== null) solved = true;
        if(sudoku.firstSolverId === null) {
          sudoku.firstSolverId = req.user.accountId;
          sudoku.save();
        }
      }
      SudokuProgress.find({
        where: {
          accountId: req.user.accountId,
          sudokuDate: sudoku.date,
        }
      }).then(progress => {
        if(progress === null) {
          SudokuProgress.create({
            accountId: req.user.accountId,
            sudokuDate: sudoku.date,
            board: req.body.grid,
            solved: solved,
          }).then(() => res.json({status: "ok"}));
        } else {
          if(progress.solved) {
            res.json({
              status: "error",
              reason: "Cannot change a completed sudoku",
            });
            return;
          }
          progress.board = req.body.grid;
          progress.solved = solved;
          progress.save().then(() => res.json({status: "ok"}));
        }
      });
    });
  });

  return router;
}
