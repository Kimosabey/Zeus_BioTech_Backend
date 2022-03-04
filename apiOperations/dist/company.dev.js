"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-19 16:45:50
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-03 19:42:35
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getCompanies() {
  var pool, result;
  return regeneratorRuntime.async(function getCompanies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [COMPANY] JOIN HQ ON HQ_PKID = COMPANY_HQ_FKID"));

        case 6:
          result = _context.sent;
          pool.close(); // console.log(result.recordsets);

          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("getCompanies-->", _context.t0); // pool.close();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addCompany(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addCompany$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("COMPANY_HQ_FKID", obj.COMPANY_HQ_FKID).input("COMPANY_NAME", obj.COMPANY_NAME).query("SELECT * FROM [COMPANY] JOIN HQ ON HQ_PKID = COMPANY_HQ_FKID WHERE COMPANY_HQ_FKID=@COMPANY_HQ_FKID AND COMPANY_NAME=@COMPANY_NAME"));

        case 6:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("COMPANY_HQ_FKID", obj.COMPANY_HQ_FKID).input("COMPANY_NAME", obj.COMPANY_NAME).input("COMPANY_EMAIL", obj.COMPANY_EMAIL).input("COMPANY_PHONE", obj.COMPANY_PHONE).input("COMPANY_ADDRESS", obj.COMPANY_ADDRESS).query("insert into COMPANY ([COMPANY_NAME] ,[COMPANY_HQ_FKID] ,[COMPANY_EMAIL] ,[COMPANY_PHONE] ,[COMPANY_ADDRESS] ,[COMPANY_ISACTIVE])  values(@COMPANY_NAME,@COMPANY_HQ_FKID,@COMPANY_EMAIL,@COMPANY_PHONE,@COMPANY_ADDRESS,1)"));

        case 10:
          insertInto = _context2.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context2.next = 16;
            break;
          }

          pool.close();
          return _context2.abrupt("return", true);

        case 16:
          pool.close();
          return _context2.abrupt("return", false);

        case 18:
          _context2.next = 22;
          break;

        case 20:
          pool.close();
          return _context2.abrupt("return", "0");

        case 22:
          _context2.next = 27;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          console.log("addCompany-->", _context2.t0);

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateCompany(Compid, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCompany$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("COMPANY_PKID", Compid).input("COMPANY_HQ_FKID", obj.COMPANY_HQ_FKID).input("COMPANY_NAME", obj.COMPANY_NAME).input("COMPANY_EMAIL", obj.COMPANY_EMAIL).input("COMPANY_PHONE", obj.COMPANY_PHONE).input("COMPANY_ADDRESS", obj.COMPANY_ADDRESS).query("UPDATE COMPANY SET [COMPANY_NAME]=@COMPANY_NAME ,[COMPANY_HQ_FKID]=@COMPANY_HQ_FKID ,[COMPANY_EMAIL]=@COMPANY_EMAIL ,[COMPANY_PHONE]=@COMPANY_PHONE ,[COMPANY_ADDRESS]=@COMPANY_ADDRESS WHERE COMPANY_PKID =@COMPANY_PKID"));

        case 6:
          result = _context3.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context3.abrupt("return", message);

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.log("updateCompany-->", _context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function deleteCompany(Compid) {
  var pool, result;
  return regeneratorRuntime.async(function deleteCompany$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("COMPANY_PKID", Compid).query("DELETE FROM COMPANY WHERE COMPANY_PKID=@COMPANY_PKID"));

        case 6:
          result = _context4.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context4.next = 13;
            break;
          }

          pool.close();
          return _context4.abrupt("return", false);

        case 13:
          pool.close();
          return _context4.abrupt("return", true);

        case 15:
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.log("deleteCompany-->", _context4.t0); // pool.close();

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

module.exports = {
  getCompanies: getCompanies,
  addCompany: addCompany,
  updateCompany: updateCompany,
  deleteCompany: deleteCompany
};