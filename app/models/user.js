var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = db.Model.extend({

  tableName: 'users',

  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options){
      var salt = bcrypt.genSaltSync();
      model.set('password_salt', salt);
      var passHash = bcrypt.hashSync(model.get('password'), salt);
      model.set('password_hash', passHash);
      model.unset('password');
    });
  }

});

User.authenticateUser = function(username, password, cb){
  new User({username: username}).fetch({require: true})
    .then(function(user){
      console.log(user);
      var salt = user.get('password_salt');
      console.log(salt, 'pass salt');
      var expectedHash = user.get('password_hash');
      console.log(expectedHash, 'expected hashh');
      var passHash = bcrypt.hashSync(password, salt);
      console.log(passHash, 'the real hash');
      if (expectedHash === passHash){
        cb(true);
      } else {
        cb(false);
      }
    }).catch(function(){
      cb(false);
    });
};


module.exports = User;

