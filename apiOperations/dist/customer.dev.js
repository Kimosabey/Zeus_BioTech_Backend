"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-12 18:47:46
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-14 14:39:25
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getCustomersCat() {
  var pool, result;
  return regeneratorRuntime.async(function getCustomersCat$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [CUSTOMER_TYPE]"));

        case 6:
          result = _context.sent;
          pool.close();
          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); // pool.close();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addCustomersCat(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addCustomersCat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CustCatName", sql.VarChar, obj.CustCatName).query("SELECT * from CUSTOMER_TYPE WHERE CUSTOMER_TYPE_NAME=@CustCatName"));

        case 6:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("CustCatName", sql.VarChar, obj.CustCatName).query("insert into CUSTOMER_TYPE ([CUSTOMER_TYPE_NAME] ,[CUSTOMER_TYPE_ACTIVE])  values(@CustCatName,1)"));

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
          return _context2.abrupt("return", "Already Existed!");

        case 22:
          _context2.next = 27;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function deleteCustomersCat(custId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteCustomersCat$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", custId).query("DELETE FROM CUSTOMER_TYPE WHERE CUSTOMER_TYPE_PKID=@input_parameter"));

        case 6:
          result = _context3.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context3.next = 13;
            break;
          }

          pool.close();
          return _context3.abrupt("return", false);

        case 13:
          pool.close();
          return _context3.abrupt("return", true);

        case 15:
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0); // pool.close();

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function updateCustomersCat(custId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCustomersCat$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", custId).input("CustCatName", obj.CustCatName).query("UPDATE CUSTOMER_TYPE SET CUSTOMER_TYPE_NAME = @CustCatName WHERE CUSTOMER_TYPE_PKID =@input_parameter"));

        case 5:
          result = _context4.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context4.abrupt("return", message);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getCustomersCat: getCustomersCat,
  deleteCustomersCat: deleteCustomersCat,
  addCustomersCat: addCustomersCat,
  updateCustomersCat: updateCustomersCat
};