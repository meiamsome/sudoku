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
  };
  exports.start_date = new Date("2017-01-01T00:00:00Z");
})(module.exports);
