var mysql = require("mysql");
const util = require("util");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "AppDB",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = connection;
