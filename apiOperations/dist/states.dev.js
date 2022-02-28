"use strict";

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 16:20:37
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-28 16:25:33
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getStates() {
  var pool, result;
  return regeneratorRuntime.async(function getStates$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [STATE_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID"));

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

function getStatesById(stateId) {
  var pool, result;
  return regeneratorRuntime.async(function getStatesById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("stateId", stateId).query("SELECT * from STATE_MASTER JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID WHERE STATE_PKID=@stateId"));

        case 6:
          result = _context2.sent;
          pool.close();
          return _context2.abrupt("return", result.recordsets[0]);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0); // pool.close();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getStateByCountryId(countryId) {
  var pool, result;
  return regeneratorRuntime.async(function getStateByCountryId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("countryId", countryId).query("SELECT * from STATE_MASTER JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID WHERE COUNTRY_PKID=@countryId"));

        case 6:
          result = _context3.sent;
          pool.close();
          return _context3.abrupt("return", result.recordsets[0]);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0); // pool.close();

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getForCheckBoxStateByCountryId(ObjOfArr) {
  var x, pool, result;
  return regeneratorRuntime.async(function getForCheckBoxStateByCountryId$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          x = ObjOfArr.CountryId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("select * from [dbo].[STATE_MASTER] where [STATE_COUNTRY_FKID] in (".concat(x, ")")));

        case 7:
          result = _context4.sent;
          pool.close();
          return _context4.abrupt("return", result.recordsets[0]);

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0); // pool.close();

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 12]]);
}

function addState(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addState$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("StateName", sql.VarChar, obj.StateName).query("SELECT * from STATE_MASTER WHERE STATE_NAME=@StateName"));

        case 6:
          result = _context5.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context5.next = 20;
            break;
          }

          _context5.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("StateName", sql.NVarChar, obj.StateName).input("CountryId", sql.Int, obj.CountryId).query("insert into STATE_MASTER ([STATE_COUNTRY_FKID] ,[STATE_NAME], [STATE_ACTIVE])  values(@CountryId,@StateName,1)"));

        case 10:
          insertInto = _context5.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context5.next = 16;
            break;
          }

          pool.close();
          return _context5.abrupt("return", true);

        case 16:
          pool.close();
          return _context5.abrupt("return", false);

        case 18:
          _context5.next = 22;
          break;

        case 20:
          pool.close();
          return _context5.abrupt("return", "Already Existed!");

        case 22:
          _context5.next = 27;
          break;

        case 24:
          _context5.prev = 24;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 27:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateState(stateId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateState$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("stateId", stateId).input("StateName", sql.NVarChar, obj.StateName).input("CountryId", sql.Int, obj.CountryId).query("UPDATE STATE_MASTER SET STATE_COUNTRY_FKID = @CountryId, STATE_NAME= @StateName WHERE STATE_PKID =@stateId"));

        case 5:
          result = _context6.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context6.abrupt("return", message);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function deleteState(stateId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteState$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", stateId).query("DELETE FROM STATE_MASTER WHERE STATE_PKID=@input_parameter"));

        case 6:
          result = _context7.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context7.next = 13;
            break;
          }

          pool.close();
          return _context7.abrupt("return", false);

        case 13:
          pool.close();
          return _context7.abrupt("return", true);

        case 15:
          _context7.next = 20;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0); // pool.close();

        case 20:
        case "end":
          return _context7.stop();
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
  deleteState: deleteState,
  getForCheckBoxStateByCountryId: getForCheckBoxStateByCountryId
};