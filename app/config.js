var mongoose = require('mongoose');

// connects to local database (exampe = database)
mongoose.connect(
  process.env.MONGOD_URI ||
  'mongodb://localhost/shortly');

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

var db = {};
// name of the collection/table is the specified 'string' + 's'
db.User = mongoose.model('User', userSchema);
db.URL = mongoose.model('URL', urlSchema);

module.exports = db;

// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: process.env.HOST || '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
