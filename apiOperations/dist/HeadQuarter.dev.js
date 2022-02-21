"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-19 14:59:10
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-21 18:27:55
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getHq() {
  var pool, result;
  return regeneratorRuntime.async(function getHq$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM HQ JOIN COUNTRY_MASTER ON COUNTRY_PKID=HQ_COUNTRY_FKID JOIN STATE_MASTER on STATE_PKID=HQ_STATE_FKID JOIN CITY_MASTER on CITY_PKID=HQ_CITY_FKID"));

        case 6:
          result = _context.sent;
          pool.close(); // console.log(result.recordsets);

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

function addHq(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addHq$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("HqName", sql.VarChar, obj.HqName).input("CityId", sql.VarChar, obj.CityId).input("StateId", sql.VarChar, obj.StateId).input("CountryId", sql.VarChar, obj.CountryId).query("SELECT * FROM HQ JOIN COUNTRY_MASTER ON COUNTRY_PKID=HQ_COUNTRY_FKID JOIN STATE_MASTER on STATE_PKID=HQ_STATE_FKID JOIN CITY_MASTER on CITY_PKID=HQ_CITY_FKID WHERE HQ_COUNTRY_FKID=@CountryId AND HQ_STATE_FKID=@StateId AND HQ_CITY_FKID=@CityId AND HQ_NAME=@HqName"));

        case 6:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("HqName", sql.VarChar, obj.HqName).input("CityId", sql.VarChar, obj.CityId).input("StateId", sql.VarChar, obj.StateId).input("CountryId", sql.VarChar, obj.CountryId).query("insert into HQ ([HQ_COUNTRY_FKID] ,[HQ_STATE_FKID] ,[HQ_CITY_FKID] ,[HQ_NAME] ,[HQ_ACTIVE] )  values(@CountryId,@StateId,@CityId,@HqName,1)"));

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

function updateHq(HqId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateHq$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("obj: ", obj);
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", parseInt(HqId)).input("HqName", obj.HqName).input("CityId", obj.CityId).input("StateId", obj.StateId).input("CountryId", obj.CountryId).query("UPDATE HQ SET HQ_COUNTRY_FKID = @CountryId, HQ_STATE_FKID= @StateId,HQ_CITY_FKID=@CityId, HQ_NAME= @HqName WHERE HQ_PKID =@input_parameter"));

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

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteHq(HqId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteHq$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", HqId).query("DELETE FROM HQ WHERE HQ_PKID=@input_parameter"));

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
          console.log(_context4.t0); // pool.close();

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

module.exports = {
  getHq: getHq,
  addHq: addHq,
  updateHq: updateHq,
  deleteHq: deleteHq
};