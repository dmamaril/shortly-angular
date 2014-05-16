var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var util = require('../../lib/utility');

var User = {};

User.createNewUser = function (req, res, username, rawPassword) {
  bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash(rawPassword, salt, null, function (err, hash) {
      console.log('created hash: ', hash);
      var user = new db.User({
        username: username,
        password: hash
      });
      user.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('New account created');
        util.createSession(req, res, username);
      });
    });
  });
}

User.comparePassword = function (req, res, rawPassword, password) {
  bcrypt.compare(rawPassword, password, function (err, same) {
    if (same) {
      console.log('user exists & correct password');
      util.createSession(req, res, req.body.username);
    } else {
      console.log('user exists, but wrong password');
      res.redirect('/login');
    }
  });
};

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;
