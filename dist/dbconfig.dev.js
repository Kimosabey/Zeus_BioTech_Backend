"use strict";

/*
 * @Author: Hey Kimo here! 
 * @Date: 2022-02-04 16:20:41 
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-19 15:57:24
 */
var sql = require("mssql");

var config = {
  user: "sa",
  // sql user
  password: "vss",
  //sql user password
  // server: "localhost", // if it does not work try- localhost
  server: "192.168.1.3",
  // database: "CANADAINC",
  database: "ZEUS_BIOTECH",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: false,
    instancename: "SQLEXPRESS" // SQL Server instance name

  },
  port: 1433
};
new sql.ConnectionPool(config).connect().then(function (pool) {
  console.log("HEY KIMO , SQL SERVER IS LIVE ✌ ☮");
  return pool;
})["catch"](function (err) {
  return console.log("Database error, in  Config: ", err);
});
module.exports = config;