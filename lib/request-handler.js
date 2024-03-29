var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  // console.log('inside fetchLinks');
  db.URL.find(function (err, data) {
    // console.dir(data);
    // console.log(typeof data);
    res.send(200, data);
  });
  // Links.reset().fetch().then(function(links) {
  //   res.send(200, links.models);
  // });
};

exports.saveLink = function(req, res) {
  console.log('beginning of saveLink');
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  console.log('before searching for URL');
  db.URL.findOne({url: uri}, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('after error');
    console.log('data: ', data);
    if (data) {
      console.log("data: ", data);
      res.send(200, data);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new db.URL({
          url: uri,
          title: title,
          base_url: req.headers.origin,
          code: Link.createCode(uri),
          visits: 0
        });

        link.save(function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("New URL created");
          res.send(200, link);
        });
      });
    }
  });
  // new Link({ url: uri }).fetch().then(function(found) {
  //   if (found) {
  //     res.send(200, found.attributes);
  //   } else {
  //     util.getUrlTitle(uri, function(err, title) {
  //       if (err) {
  //         console.log('Error reading URL heading: ', err);
  //         return res.send(404);
  //       }

  //       var link = new Link({
  //         url: uri,
  //         title: title,
  //         base_url: req.headers.origin
  //       });

  //       link.save().then(function(newLink) {
  //         Links.add(newLink);
  //         res.send(200, newLink);
  //       });
  //     });
  //   }
  // });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.User.findOne({username: username}, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    // user found
    if (data) {
      // compare password
      User.comparePassword(req, res, password, data.password);
    } else {
      // no user found, redirect to login
      console.log('no user found, redirect to login');
      res.redirect('/login');
    }
  })
  // new User({ username: username })
  //   .fetch()
  //   .then(function(user) {
  //     if (!user) {
  //       res.redirect('/login');
  //     } else {
  //       user.comparePassword(password, function(match) {
  //         if (match) {
  //           util.createSession(req, res, user);
  //         } else {
  //           res.redirect('/login');
  //         }
  //       })
  //     }
  // });
};

exports.signupUser = function(req, res) {
  console.log('in signup process');
  var username = req.body.username;
  var password = req.body.password;

  // check if user exists
  db.User.findOne({username: username}, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    // no user exists
    if (!data) {
      User.createNewUser(req, res, username, password);
    //user exists
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

  // new User({ username: username })
  //   .fetch()
  //   .then(function(user) {
  //     if (!user) {
  //       var newUser = new User({
  //         username: username,
  //         password: password
  //       });
  //       newUser.save()
  //         .then(function(newUser) {
  //           util.createSession(req, res, newUser);
  //           Users.add(newUser);
  //         });
  //     } else {
  //       console.log('Account already exists');
  //       res.redirect('/signup');
  //     }
  //   })

exports.navToLink = function(req, res) {
  db.URL.findOne({code: req.params[0]}, function (err, data) {
    if (!data) {
      res.redirect('/');
    } else {
      data.visits = data.visits + 1;
      data.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        return res.redirect(data.url);
      });

    }
  });
};

  // new Link({ code: req.params[0] }).fetch().then(function(link) {
  //   if (!link) {
  //     res.redirect('/');
  //   } else {
  //     link.set({ visits: link.get('visits') + 1 })
  //       .save()
  //       .then(function() {
  //         return res.redirect(link.get('url'));
  //       });
  //   }
  // });
