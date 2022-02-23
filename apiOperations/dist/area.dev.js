"use strict";

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 17:55:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-23 12:58:16
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getAreas() {
  var pool, result;
  return regeneratorRuntime.async(function getAreas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [AREA_MASTER] JOIN CITY_MASTER ON CITY_PKID=AREA_CITY_FKID JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID"));

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

function getAreasByCityId(cityId) {
  var pool, result;
  return regeneratorRuntime.async(function getAreasByCityId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", cityId).query("SELECT * FROM [AREA_MASTER] WHERE AREA_CITY_FKID=@input_parameter"));

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

function getAreasByHq(hqId) {
  var pool, result;
  return regeneratorRuntime.async(function getAreasByHq$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", hqId).query("SELECT * FROM AREA_MASTER JOIN HQ ON HQ_CITY_FKID=AREA_CITY_FKID WHERE HQ_PKID=@input_parameter"));

        case 6:
          result = _context3.sent;
          pool.close(); // console.log(result.recordsets);

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

function addArea(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addArea$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("obj: ", obj);
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("AreaCode", sql.VarChar, obj.AreaCode).input("AreaName", sql.VarChar, obj.AreaName).input("AREA_ZIP_CODE", sql.VarChar, obj.AREA_ZIP_CODE).query("SELECT * from AREA_MASTER WHERE AREA_NAME=@AreaName AND AREA_ZIP_CODE=@AREA_ZIP_CODE"));

        case 7:
          result = _context4.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context4.next = 21;
            break;
          }

          _context4.next = 11;
          return regeneratorRuntime.awrap(pool.request().input("AreaName", sql.NVarChar, obj.AreaName).input("AREA_ZIP_CODE", sql.NVarChar, obj.AREA_ZIP_CODE).input("CityId", sql.Int, obj.CityId).input("StateId", sql.Int, obj.StateId).input("CountryId", sql.Int, obj.CountryId).query("insert into AREA_MASTER ([AREA_COUNTRY_FKID] ,[AREA_STATE_FKID], [AREA_CITY_FKID],[AREA_NAME],[AREA_ZIP_CODE],[AREA_ACTIVE])  values(@CountryId,@StateId,@CityId,@AreaName,@AREA_ZIP_CODE,1)"));

        case 11:
          insertInto = _context4.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context4.next = 17;
            break;
          }

          pool.close();
          return _context4.abrupt("return", true);

        case 17:
          pool.close();
          return _context4.abrupt("return", false);

        case 19:
          _context4.next = 23;
          break;

        case 21:
          pool.close();
          return _context4.abrupt("return", "Already Existed!");

        case 23:
          _context4.next = 28;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);

        case 28:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 25]]);
}

function getForCheckBoxAreaByCityId(ObjOfArr) {
  var x, y, z, pool, result;
  return regeneratorRuntime.async(function getForCheckBoxAreaByCityId$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          x = ObjOfArr.CountryId;
          y = ObjOfArr.StateId;
          z = ObjOfArr.CityId;
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 6:
          pool = _context5.sent;
          _context5.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select * from [dbo].[AREA_MASTER] where [AREA_STATE_FKID] in (".concat(y, ") AND AREA_COUNTRY_FKID in (").concat(x, ") AND AREA_CITY_FKID IN (").concat(z, ") ")));

        case 9:
          result = _context5.sent;
          pool.close();
          return _context5.abrupt("return", result.recordsets[0]);

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.log(_context5.t0); // pool.close();

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 14]]);
}

function updateArea(AreaId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateArea$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("AreaId", sql.Int, AreaId).input("AREA_ZIP_CODE", obj.AREA_ZIP_CODE).input("StateId", sql.Int, obj.StateId).input("CountryId", sql.Int, obj.CountryId).input("CityId", sql.Int, obj.CityId).input("AreaName", sql.NVarChar, obj.AreaName).query("UPDATE AREA_MASTER SET AREA_COUNTRY_FKID = @CountryId, AREA_STATE_FKID= @StateId,AREA_CITY_FKID=@CityId,AREA_NAME=@AreaName ,AREA_ZIP_CODE=@AREA_ZIP_CODE WHERE AREA_PKID =@AreaId"));

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

function deleteArea(AreaId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteArea$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", AreaId).query("DELETE FROM AREA_MASTER WHERE AREA_PKID=@input_parameter"));

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
  getAreas: getAreas,
  getAreasByCityId: getAreasByCityId,
  addArea: addArea,
  updateArea: updateArea,
  deleteArea: deleteArea,
  getAreasByHq: getAreasByHq,
  getForCheckBoxAreaByCityId: getForCheckBoxAreaByCityId
};