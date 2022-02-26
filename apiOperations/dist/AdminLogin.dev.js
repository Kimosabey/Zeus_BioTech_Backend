"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-19 12:05:08
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-25 12:19:45
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getAdminLogin(AdminEmail, AdminPass) {
  var pool, result;
  return regeneratorRuntime.async(function getAdminLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("AdminEmail", AdminEmail).input("AdminPass", AdminPass).query("SELECT * FROM [SUPER_ADMIN] WHERE SUPER_ADMIN_EMAIL=@AdminEmail AND SUPER_ADMIN_PASSWORD=@AdminPass"));

        case 6:
          result = _context.sent;
          pool.close();

          if (!(result.recordsets[0].length > 0)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", true);

        case 12:
          return _context.abrupt("return", false);

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); // pool.close();

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

module.exports = {
  getAdminLogin: getAdminLogin
};