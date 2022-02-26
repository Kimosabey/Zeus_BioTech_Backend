"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-14 14:39:09
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-26 18:03:58
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getProductSpecies() {
  var pool, result;
  return regeneratorRuntime.async(function getProductSpecies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [PRODUCT_SPECIES] WHERE [PRODUCT_SPECIES_ISACTIVE]=1"));

        case 6:
          result = _context.sent;
          pool.close();
          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("getProductSpecies-->", _context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addProductSpecies(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addProductSpecies$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME).query("SELECT * from PRODUCT_SPECIES WHERE PRODUCT_SPECIES_NAME=@PRODUCT_SPECIES_NAME"));

        case 6:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME).input("PRODUCT_SPECIES_ISACTIVE", "1").query("insert into PRODUCT_SPECIES ([PRODUCT_SPECIES_NAME] ,[PRODUCT_SPECIES_ISACTIVE])  values(@PRODUCT_SPECIES_NAME,@PRODUCT_SPECIES_ISACTIVE)"));

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
          console.log("addProductSpecies-->", _context2.t0);

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function deleteProductSpecies(specId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteProductSpecies$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_SPECIES_PKID", specId).query("UPDATE PRODUCT_SPECIES SET PRODUCT_SPECIES_ISACTIVE=0 WHERE PRODUCT_SPECIES_PKID=@PRODUCT_SPECIES_PKID"));

        case 6:
          result = _context3.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context3.next = 12;
            break;
          }

          pool.close();
          return _context3.abrupt("return", false);

        case 12:
          pool.close();
          return _context3.abrupt("return", true);

        case 14:
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log("deleteProductSpecies-->", _context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function updateProductSpecies(specId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateProductSpecies$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log('specId, obj: ', specId, obj);
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_SPECIES_PKID", specId).input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME).query("UPDATE PRODUCT_SPECIES SET PRODUCT_SPECIES_NAME = @PRODUCT_SPECIES_NAME WHERE PRODUCT_SPECIES_PKID =@PRODUCT_SPECIES_PKID"));

        case 7:
          result = _context4.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context4.abrupt("return", message);

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](1);
          console.log("updateProductSpecies-->", _context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

module.exports = {
  addProductSpecies: addProductSpecies,
  getProductSpecies: getProductSpecies,
  updateProductSpecies: updateProductSpecies,
  deleteProductSpecies: deleteProductSpecies
};