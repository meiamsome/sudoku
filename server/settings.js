"use strict";
(function(exports) {
  exports.listen_on = 3000;
  exports.database = "sqlite:db.sqlite";
  exports.password_storage = {
    hash: 'sha256',
    rounds: 10,
  };
  exports.jwt_options = {
    secret: 'X%8VVT9C[s<]sPEF',
  }
})(module.exports);
