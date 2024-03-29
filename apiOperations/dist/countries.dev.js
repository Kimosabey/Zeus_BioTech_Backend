"use strict";

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 16:20:31
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-14 11:46:00
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getCountries() {
  var pool, result;
  return regeneratorRuntime.async(function getCountries$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [COUNTRY_MASTER]"));

        case 6:
          result = _context.sent;

          if (!(pool._connected == false)) {
            _context.next = 12;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 10:
          pool = _context.sent;
          console.log("pool._connected recon getCountries: ", pool._connected);

        case 12:
          pool.close();
          return _context.abrupt("return", result.recordsets[0]);

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log("getCountries-->", _context.t0); // pool.close();

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function getCountryById(countryId) {
  var pool, result;
  return regeneratorRuntime.async(function getCountryById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("countryId", countryId).query("SELECT * from COUNTRY_MASTER WHERE COUNTRY_PKID=@countryId"));

        case 6:
          result = _context2.sent;
          pool.close();
          return _context2.abrupt("return", result.recordsets[0]);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log("getCountryById-->", _context2.t0); // pool.close();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addCountry(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addCountry$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("Countryname", sql.VarChar, obj.CountryName).query("SELECT * from COUNTRY_MASTER WHERE COUNTRY_NAME=@Countryname"));

        case 6:
          result = _context3.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context3.next = 20;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("CountryName", sql.NVarChar, obj.CountryName).input("CountryCode", sql.NVarChar, obj.CountryCode).query("insert into COUNTRY_MASTER ([COUNTRY_CODE] ,[COUNTRY_NAME] ,[COUNTRY_ACTIVE])  values(@CountryCode,@CountryName,1)"));

        case 10:
          insertInto = _context3.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context3.next = 16;
            break;
          }

          pool.close();
          return _context3.abrupt("return", true);

        case 16:
          pool.close();
          return _context3.abrupt("return", false);

        case 18:
          _context3.next = 22;
          break;

        case 20:
          pool.close();
          return _context3.abrupt("return", "Already Existed!");

        case 22:
          _context3.next = 27;
          break;

        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          console.log("addCountry-->", _context3.t0);

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function deleteCountry(countryId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteCountry$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", countryId).query("DELETE FROM COUNTRY_MASTER WHERE COUNTRY_PKID=@input_parameter"));

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
          console.log("deleteCountry-->", _context4.t0); // pool.close();

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function updateCountry(countryId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCountry$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", countryId).input("CountryName", obj.CountryName).input("CountryCode", obj.CountryCode).query("UPDATE COUNTRY_MASTER SET COUNTRY_CODE = @CountryCode, COUNTRY_NAME= @CountryName WHERE COUNTRY_PKID =@input_parameter"));

        case 6:
          result = _context5.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context5.abrupt("return", message);

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.log("updateCountry-->", _context5.t0);

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = {
  getCountries: getCountries,
  getCountryById: getCountryById,
  addCountry: addCountry,
  deleteCountry: deleteCountry,
  updateCountry: updateCountry
};