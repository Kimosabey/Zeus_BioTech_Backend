"use strict";

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 19:13:14
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-19 18:11:12
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getCities() {
  var _pool, result;

  return regeneratorRuntime.async(function getCities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_pool.request().query("SELECT *FROM [CITY_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID"));

        case 6:
          result = _context.sent;

          _pool.close();

          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          pool.close();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addCity(obj) {
  var _pool2, result, insertInto;

  return regeneratorRuntime.async(function addCity$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("addCity obj ----->: ", obj);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          _pool2 = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_pool2.request().input("CityCode", sql.VarChar, obj.CityCode).input("CityName", sql.VarChar, obj.CityName).query("SELECT * from CITY_MASTER WHERE CITY_NAME=@CityName"));

        case 7:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 21;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(_pool2.request().input("CityCode", sql.NVarChar, obj.CityCode).input("CityName", sql.NVarChar, obj.CityName).input("StateId", sql.Int, obj.StateId).input("CountryId", sql.Int, obj.CountryId).query("insert into CITY_MASTER ([CITY_COUNTRY_FKID] ,[CITY_STATE_FKID], [CITY_CODE],[CITY_NAME],[CITY_ACTIVE])  values(@CountryId,@StateId,@CityCode,@CityName,1)"));

        case 11:
          insertInto = _context2.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context2.next = 17;
            break;
          }

          _pool2.close();

          return _context2.abrupt("return", true);

        case 17:
          _pool2.close();

          return _context2.abrupt("return", false);

        case 19:
          _context2.next = 23;
          break;

        case 21:
          _pool2.close();

          return _context2.abrupt("return", "Already Existed!");

        case 23:
          _context2.next = 28;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 25]]);
}

function updateCity(cityId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCity$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("cityId", sql.Int, cityId).input("StateId", sql.Int, obj.StateId).input("CountryId", sql.Int, obj.CountryId).input("CityName", sql.NVarChar, obj.CityName).input("CityCode", sql.NVarChar, obj.CityCode).query("UPDATE CITY_MASTER SET CITY_COUNTRY_FKID = @CountryId, CITY_STATE_FKID= @StateId,CITY_CODE=@CityCode,CITY_NAME=@CityName WHERE CITY_PKID =@cityId"));

        case 5:
          result = _context3.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context3.abrupt("return", message);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteCity(cityId) {
  var _pool3, result;

  return regeneratorRuntime.async(function deleteCity$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool3 = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(_pool3.request().input("input_parameter", cityId).query("DELETE FROM CITY_MASTER WHERE CITY_PKID=@input_parameter"));

        case 6:
          result = _context4.sent;

          _pool3.close();

          console.log("delete__>>", result);

          if (!(result.rowsAffected[0] == 0)) {
            _context4.next = 14;
            break;
          }

          _pool3.close();

          return _context4.abrupt("return", false);

        case 14:
          _pool3.close();

          return _context4.abrupt("return", true);

        case 16:
          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          pool.close();

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getCitiesByStateId(stateId) {
  var _pool4, result;

  return regeneratorRuntime.async(function getCitiesByStateId$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool4 = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(_pool4.request().input("input_parameter", stateId).query("SELECT * FROM [CITY_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID WHERE CITY_STATE_FKID=@input_parameter"));

        case 6:
          result = _context5.sent;

          _pool4.close();

          return _context5.abrupt("return", result.recordsets[0]);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          pool.close();

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

module.exports = {
  getCities: getCities,
  addCity: addCity,
  updateCity: updateCity,
  deleteCity: deleteCity,
  getCitiesByStateId: getCitiesByStateId
};