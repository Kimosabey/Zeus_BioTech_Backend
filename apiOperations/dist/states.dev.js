"use strict";

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 16:20:37
 * @Last Modified by: Hey Kimo here!
 * @Last Modified time: 2022-02-07 17:17:54
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getStates() {
  var _pool, result;

  return regeneratorRuntime.async(function getStates$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_pool.request().query("SELECT * FROM [STATE_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID"));

        case 6:
          result = _context.sent;

          _pool.close();

          return _context.abrupt("return", result.recordsets);

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

function getStatesById(stateId) {
  var _pool2, result;

  return regeneratorRuntime.async(function getStatesById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool2 = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_pool2.request().input("stateId", stateId).query("SELECT * from STATE_MASTER JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID WHERE STATE_PKID=@stateId"));

        case 6:
          result = _context2.sent;

          _pool2.close();

          return _context2.abrupt("return", result.recordsets);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          pool.close();

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getStateByCountryId(countryId) {
  var _pool3, result;

  return regeneratorRuntime.async(function getStateByCountryId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool3 = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(_pool3.request().input("countryId", countryId).query("SELECT * from STATE_MASTER JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID WHERE COUNTRY_PKID=@countryId"));

        case 6:
          result = _context3.sent;

          _pool3.close();

          return _context3.abrupt("return", result.recordsets);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          pool.close();

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addState(obj) {
  var _pool4, result, insertInto;

  return regeneratorRuntime.async(function addState$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool4 = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(_pool4.request().input("StateName", sql.VarChar, obj.StateName).query("SELECT * from STATE_MASTER WHERE STATE_NAME=@StateName"));

        case 6:
          result = _context4.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context4.next = 20;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(_pool4.request().input("StateName", sql.NVarChar, obj.StateName).input("CountryId", sql.Int, obj.CountryId).query("insert into STATE_MASTER ([STATE_COUNTRY_FKID] ,[STATE_NAME], [STATE_ACTIVE])  values(@CountryId,@StateName,1)"));

        case 10:
          insertInto = _context4.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context4.next = 16;
            break;
          }

          _pool4.close();

          return _context4.abrupt("return", true);

        case 16:
          _pool4.close();

          return _context4.abrupt("return", false);

        case 18:
          _context4.next = 22;
          break;

        case 20:
          _pool4.close();

          return _context4.abrupt("return", "Already Existed!");

        case 22:
          _context4.next = 27;
          break;

        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateState(stateId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateState$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("stateId", stateId).input("StateName", sql.NVarChar, obj.StateName).input("CountryId", sql.Int, obj.CountryId).query("UPDATE STATE_MASTER SET STATE_COUNTRY_FKID = @CountryId, STATE_NAME= @StateName WHERE STATE_PKID =@stateId"));

        case 5:
          result = _context5.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context5.abrupt("return", message);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function deleteState(stateId) {
  var _pool5, result;

  return regeneratorRuntime.async(function deleteState$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          _pool5 = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(_pool5.request().input("input_parameter", stateId).query("DELETE FROM STATE_MASTER WHERE STATE_PKID=@input_parameter"));

        case 6:
          result = _context6.sent;

          _pool5.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context6.next = 13;
            break;
          }

          _pool5.close();

          return _context6.abrupt("return", false);

        case 13:
          _pool5.close();

          return _context6.abrupt("return", true);

        case 15:
          _context6.next = 21;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          pool.close();

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

module.exports = {
  getStates: getStates,
  getStatesById: getStatesById,
  addState: addState,
  updateState: updateState,
  getStateByCountryId: getStateByCountryId,
  deleteState: deleteState
};