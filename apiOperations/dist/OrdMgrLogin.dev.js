"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-07 11:04:06
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-07 11:26:57
 */
var config = require("../dbconfig");

var sql = require("mssql");

function AdminTypeLogin(em, pass, id) {
  var pool, result;
  return regeneratorRuntime.async(function AdminTypeLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EMPLOYEE_EMAIL", em).input("EMPLOYEE_PASSWORD", pass).input("EMPLOYEE_SUB_TYPE_FKID", id).query("SELECT * FROM EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_PASSWORD=@EMPLOYEE_PASSWORD AND EMPOYEE_SUB_TYPE_FKID=@EMPLOYEE_SUB_TYPE_FKID"));

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
          console.log("AdminTypeLogin-->", _context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

module.exports = {
  AdminTypeLogin: AdminTypeLogin
};