const crypto = require('crypto');
const sequelize = require('sequelize');

const Sequelize = sequelize.Sequelize;


function createAccountModel(database, settings) {
  const Account = database.define('account', {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_data: {
      type: Sequelize.STRING,
      set(value) {
        var temp = value;
        var salt = crypto.randomBytes(8).toString('hex');
        var hash_info = settings.password_storage.hash + ":" + settings.password_storage.rounds + ":" + salt;
        for(var i = 0; i < settings.password_storage.rounds; i++) {
          var hash = crypto.createHash(settings.password_storage.hash);
          hash.update(temp);
          hash.update(salt);
          temp = hash.digest('hex');
        }
        this.setDataValue('password_data', hash_info + ":" + temp);
      },
    },
  });

  Account.Instance.prototype.check_password = function(password) {
    if(this.password_data === null) return false;
    var hash_info = this.password_data.split(":");
    var hash_type = hash_info[0];
    var rounds = parseInt(hash_info[1]);
    var salt = hash_info[2];
    var temp = password;
    for(var i = 0; i < rounds; i++) {
      var hash = crypto.createHash(hash_type);
      hash.update(temp);
      hash.update(salt);
      temp = hash.digest('hex');
    }
    if(temp !== hash_info[3]) {
      return false;
    }
    if(hash_type !== settings.password_storage.hash ||
      rounds !== settings.password_storage.rounds) {
      this.update({
        password_data: password,
      });
    }
    return true;
  }

  return Account;
}

module.exports = {
  createAccountModel: createAccountModel,
}
