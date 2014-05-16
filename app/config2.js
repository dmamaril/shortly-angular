var mongoose = require('mongoose');

// connects to local database (exampe = database)
mongoose.connect('mongodb://localhost/example');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, unique: true}, //checks for uniqueness
  password: String,
});

var urlSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

// name of the collection/table is the specified 'string' + 's'
var User = mongoose.model('User', userSchema);
var URL = mongoose.model('URL', urlSchema);

// create user instance
var user = new User({
  username: 'john tester',
  password: '123'
})

// save user instance
user.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('user saved');
});

// create url instance
var url = new URL({
  url: 'http://www.yahoo.com',
  base_url: 'http://www.yahoo.com',
  code: 'bit.ly/short',
  title: 'Yahoo!',
  visits: 0
})

// save url instance
url.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('URL saved');
});

// retrieve all users
User.find(function (err, data) {
  console.log(data);
});

// retrieve all URLs
URL.find(function (err, data) {
  console.log(data);
});

// retrieve one URL
URL.findOne({url: 'http://www.yahoo.com'}, function (err, data) {
  console.log(data);
});

// mongoose.connection.close();


