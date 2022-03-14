"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-14 14:39:09
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-10 18:36:32
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
          console.log("specId: ", specId);
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_SPECIES_PKID", specId).query("UPDATE PRODUCT_SPECIES SET PRODUCT_SPECIES_ISACTIVE=0 WHERE PRODUCT_SPECIES_PKID=@PRODUCT_SPECIES_PKID"));

        case 7:
          result = _context3.sent;

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
          _context3.t0 = _context3["catch"](1);
          console.log("deleteProductSpecies-->", _context3.t0);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 17]]);
}

function updateProductSpecies(specId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateProductSpecies$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_SPECIES_PKID", specId).input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME).query("UPDATE PRODUCT_SPECIES SET PRODUCT_SPECIES_NAME = @PRODUCT_SPECIES_NAME WHERE PRODUCT_SPECIES_PKID =@PRODUCT_SPECIES_PKID"));

        case 6:
          result = _context4.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          console.log("message: ", message);
          return _context4.abrupt("return", message);

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log("updateProductSpecies-->", _context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

function getProducts() {
  var pool, result;
  return regeneratorRuntime.async(function getProducts$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT [PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_UNIT],[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_WHOLESALE_PRICE] ,[PRODUCT_DEALER_PRICE] ,[PRODUCT_MRP] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,COMPANY_NAME,PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID  WHERE [PRODUCT_ISACTIVE]=1"));

        case 6:
          result = _context5.sent;
          pool.close();
          return _context5.abrupt("return", result.recordsets[0]);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log("getProducts-->", _context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getProductsByCompany(CompanyID) {
  var kimoArray, Obj, pool, result, kimo, i, res2;
  return regeneratorRuntime.async(function getProductsByCompany$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          kimoArray = [];
          Obj = {};
          _context6.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context6.sent;
          _context6.prev = 5;
          _context6.next = 8;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_COMPANY_FKID", CompanyID).query("SELECT [PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_UNIT],[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_WHOLESALE_PRICE] ,[PRODUCT_DEALER_PRICE] ,[PRODUCT_MRP] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,COMPANY_NAME,PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID  WHERE [PRODUCT_ISACTIVE]=1 AND PRODUCT_COMPANY_FKID=@PRODUCT_COMPANY_FKID"));

        case 8:
          result = _context6.sent;
          kimo = result.recordsets[0];
          i = 0;

        case 11:
          if (!(i < kimo.length)) {
            _context6.next = 20;
            break;
          }

          _context6.next = 14;
          return regeneratorRuntime.awrap(pool.request().input("PRD_PACKAGE_PRODUCT_FKID", kimo[i].PRODUCT_PKID).query("SELECT PCKS.*,UNIT_OF_MEASUREMENT_SHORT_KEY from [PRODUCT_PACKAGES] PCKS JOIN PRODUCT_MASTER  ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID WHERE [PRD_PACKAGE_PRODUCT_FKID]=@PRD_PACKAGE_PRODUCT_FKID"));

        case 14:
          res2 = _context6.sent;
          Obj = {
            COMPANY_NAME: kimo[i].COMPANY_NAME,
            PRODUCT_SPECIES_NAME: kimo[i].PRODUCT_SPECIES_NAME,
            PRODUCT_NAME: kimo[i].PRODUCT_NAME,
            PRODUCT_PKID: kimo[i].PRODUCT_PKID,
            UNIT_OF_MEASUREMENT_SHORT_KEY: kimo[i].UNIT_OF_MEASUREMENT_SHORT_KEY,
            packagesArr: res2.recordsets[0]
          };
          kimoArray.push(Obj);

        case 17:
          i++;
          _context6.next = 11;
          break;

        case 20:
          // kimo.map(async (i) => {
          //   var res2 = await pool
          //     .request()
          //     .input("PRD_PACKAGE_PRODUCT_FKID", i.PRODUCT_PKID)
          //     .query(
          //       "SELECT PCKS.*,UNIT_OF_MEASUREMENT_SHORT_KEY from [PRODUCT_PACKAGES] PCKS JOIN PRODUCT_MASTER  ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID WHERE [PRD_PACKAGE_PRODUCT_FKID]=@PRD_PACKAGE_PRODUCT_FKID"
          //     );
          //   Obj = {
          //     COMPANY_NAME: i.COMPANY_NAME,
          //     PRODUCT_SPECIES_NAME: i.PRODUCT_SPECIES_NAME,
          //     PRODUCT_NAME: i.PRODUCT_NAME,
          //     PRODUCT_PKID: i.PRODUCT_PKID,
          //     packagesArr: res2,
          //   };
          //   kimoArray.push(Obj);
          //   // console.log("INSIDE SCOPE", kimoArray);
          // });
          console.log("OUTSIDE SCOPE", kimoArray);
          pool.close();
          return _context6.abrupt("return", kimoArray);

        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](5);
          console.log("getProductsByCompany-->", _context6.t0);

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 25]]);
}

function addProducts(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addProducts$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_CODE", obj.PRODUCT_CODE).query("SELECT * FROM PRODUCT_MASTER WHERE PRODUCT_CODE=@PRODUCT_CODE"));

        case 6:
          result = _context7.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context7.next = 20;
            break;
          }

          _context7.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_COMPANY_FKID", obj.PRODUCT_COMPANY_FKID).input("PRODUCT_SPECIES_FKID", obj.PRODUCT_SPECIES_FKID).input("PRODUCT_NAME", obj.PRODUCT_NAME).input("PRODUCT_UOM_FKID", obj.PRODUCT_UOM_FKID).input("PRODUCT_UNIT", obj.PRODUCT_UNIT).input("PRODUCT_CODE", obj.PRODUCT_CODE).input("PRODUCT_BAR_CODE", obj.PRODUCT_BAR_CODE).input("PRODUCT_WHOLESALE_PRICE", obj.PRODUCT_WHOLESALE_PRICE).input("PRODUCT_DEALER_PRICE", obj.PRODUCT_DEALER_PRICE).input("PRODUCT_MRP", obj.PRODUCT_MRP).input("PRODUCT_IMAGE", obj.PRODUCT_IMAGE).input("PRODUCT_CATALOGUE", obj.PRODUCT_CATALOGUE).input("PRODUCT_ISACTIVE", "1").query("insert into PRODUCT_MASTER ([PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_UNIT],[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_WHOLESALE_PRICE] ,[PRODUCT_DEALER_PRICE] ,[PRODUCT_MRP] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] )  values(@PRODUCT_COMPANY_FKID,@PRODUCT_SPECIES_FKID,@PRODUCT_NAME ,@PRODUCT_UOM_FKID ,@PRODUCT_UNIT,@PRODUCT_CODE ,@PRODUCT_BAR_CODE ,@PRODUCT_WHOLESALE_PRICE ,@PRODUCT_DEALER_PRICE ,@PRODUCT_MRP ,@PRODUCT_IMAGE ,@PRODUCT_CATALOGUE ,@PRODUCT_ISACTIVE)"));

        case 10:
          insertInto = _context7.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context7.next = 16;
            break;
          }

          pool.close();
          return _context7.abrupt("return", true);

        case 16:
          pool.close();
          return _context7.abrupt("return", false);

        case 18:
          _context7.next = 22;
          break;

        case 20:
          pool.close();
          return _context7.abrupt("return", "0");

        case 22:
          _context7.next = 27;
          break;

        case 24:
          _context7.prev = 24;
          _context7.t0 = _context7["catch"](0);
          console.log("addProducts-->", _context7.t0);

        case 27:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function deleteProducts(prodId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteProducts$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_PKID", prodId).query("UPDATE PRODUCT_MASTER SET PRODUCT_ISACTIVE=0 WHERE PRODUCT_PKID=@PRODUCT_PKID"));

        case 6:
          result = _context8.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context8.next = 12;
            break;
          }

          pool.close();
          return _context8.abrupt("return", false);

        case 12:
          pool.close();
          return _context8.abrupt("return", true);

        case 14:
          _context8.next = 19;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          console.log("deleteProducts-->", _context8.t0);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function updateProducts(prodId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateProducts$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          console.log("prodId, obj: ", prodId, obj);
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context9.sent;
          _context9.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_PKID", prodId).input("PRODUCT_COMPANY_FKID", obj.PRODUCT_COMPANY_FKID).input("PRODUCT_SPECIES_FKID", obj.PRODUCT_SPECIES_FKID).input("PRODUCT_NAME", obj.PRODUCT_NAME).input("PRODUCT_UOM_FKID", obj.PRODUCT_UOM_FKID).input("PRODUCT_UNIT", obj.PRODUCT_UNIT).input("PRODUCT_CODE", obj.PRODUCT_CODE).input("PRODUCT_BAR_CODE", obj.PRODUCT_BAR_CODE).input("PRODUCT_WHOLESALE_PRICE", obj.PRODUCT_WHOLESALE_PRICE).input("PRODUCT_DEALER_PRICE", obj.PRODUCT_DEALER_PRICE).input("PRODUCT_MRP", obj.PRODUCT_MRP).input("PRODUCT_IMAGE", obj.PRODUCT_IMAGE).input("PRODUCT_CATALOGUE", obj.PRODUCT_CATALOGUE).query("UPDATE PRODUCT_MASTER SET PRODUCT_COMPANY_FKID=@PRODUCT_COMPANY_FKID, PRODUCT_SPECIES_FKID=@PRODUCT_SPECIES_FKID, PRODUCT_NAME=@PRODUCT_NAME,PRODUCT_UOM_FKID=@PRODUCT_UOM_FKID, PRODUCT_UNIT=@PRODUCT_UNIT, PRODUCT_CODE=@PRODUCT_CODE, PRODUCT_BAR_CODE=@PRODUCT_BAR_CODE, PRODUCT_WHOLESALE_PRICE=@PRODUCT_WHOLESALE_PRICE, PRODUCT_DEALER_PRICE=@PRODUCT_DEALER_PRICE, PRODUCT_MRP=@PRODUCT_MRP, PRODUCT_IMAGE=@PRODUCT_IMAGE, PRODUCT_CATALOGUE=@PRODUCT_CATALOGUE WHERE PRODUCT_PKID=@PRODUCT_PKID"));

        case 7:
          result = _context9.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context9.abrupt("return", message);

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](1);
          console.log("updateProducts-->", _context9.t0);

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function getProductPackages(prodId) {
  var pool, result;
  return regeneratorRuntime.async(function getProductPackages$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRD_PACKAGE_PRODUCT_FKID", prodId).query("SELECT PCKS.*,UNIT_OF_MEASUREMENT_SHORT_KEY from [PRODUCT_PACKAGES] PCKS JOIN PRODUCT_MASTER  ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID WHERE [PRD_PACKAGE_PRODUCT_FKID]=@PRD_PACKAGE_PRODUCT_FKID"));

        case 6:
          result = _context10.sent;
          pool.close();
          return _context10.abrupt("return", result.recordsets[0]);

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.log("getProductPackages-->", _context10.t0);

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addProductPackages(obj) {
  var pool, insertInto;
  return regeneratorRuntime.async(function addProductPackages$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          console.log("obj: ", obj);
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context11.sent;
          _context11.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("PRD_PACKAGE_PRODUCT_FKID", obj.PRD_PACKAGE_PRODUCT_FKID).input("PRD_PACKAGE_WHOLESALE_PRICE", obj.PRD_PACKAGE_WHOLESALE_PRICE).input("PRD_PACKAGE_DEALER_PRICE", obj.PRD_PACKAGE_DEALER_PRICE).input("PRD_PACKAGE_MRP", obj.PRD_PACKAGE_MRP).input("PRD_PACKAGE_UNIT", obj.PRD_PACKAGE_UNIT).query("insert into PRODUCT_PACKAGES ([PRD_PACKAGE_PRODUCT_FKID] ,[PRD_PACKAGE_WHOLESALE_PRICE] ,[PRD_PACKAGE_DEALER_PRICE] ,[PRD_PACKAGE_MRP] ,[PRD_PACKAGE_UNIT])  values(@PRD_PACKAGE_PRODUCT_FKID ,@PRD_PACKAGE_WHOLESALE_PRICE ,@PRD_PACKAGE_DEALER_PRICE ,@PRD_PACKAGE_MRP ,@PRD_PACKAGE_UNIT)"));

        case 7:
          insertInto = _context11.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context11.next = 13;
            break;
          }

          pool.close();
          return _context11.abrupt("return", true);

        case 13:
          pool.close();
          return _context11.abrupt("return", false);

        case 15:
          _context11.next = 20;
          break;

        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](1);
          console.log("addProductPackages-->", _context11.t0);

        case 20:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 17]]);
}

function deleteProductPackages(packId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteProductPackages$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context12.sent;
          _context12.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRD_PACKAG_PKID", packId).query("DELETE FROM PRODUCT_PACKAGES WHERE PRD_PACKAG_PKID=@PRD_PACKAG_PKID"));

        case 6:
          result = _context12.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context12.next = 13;
            break;
          }

          pool.close();
          return _context12.abrupt("return", false);

        case 13:
          pool.close();
          return _context12.abrupt("return", true);

        case 15:
          _context12.next = 20;
          break;

        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](0);
          console.log("deleteProductPackages-->", _context12.t0);

        case 20:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function updateProductPackages(packId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateProductPackages$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context13.sent;
          _context13.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("PRD_PACKAG_PKID", packId).input("PRD_PACKAGE_PRODUCT_FKID", obj.PRD_PACKAGE_PRODUCT_FKID).input("PRD_PACKAGE_WHOLESALE_PRICE", obj.PRD_PACKAGE_WHOLESALE_PRICE).input("PRD_PACKAGE_DEALER_PRICE", obj.PRD_PACKAGE_DEALER_PRICE).input("PRD_PACKAGE_MRP", obj.PRD_PACKAGE_MRP).input("PRD_PACKAGE_UNIT", obj.PRD_PACKAGE_UNIT).query("UPDATE PRODUCT_PACKAGES SET PRD_PACKAGE_PRODUCT_FKID=@PRD_PACKAGE_PRODUCT_FKID ,PRD_PACKAGE_WHOLESALE_PRICE=@PRD_PACKAGE_WHOLESALE_PRICE ,PRD_PACKAGE_DEALER_PRICE=@PRD_PACKAGE_DEALER_PRICE ,PRD_PACKAGE_MRP=@PRD_PACKAGE_MRP ,PRD_PACKAGE_UNIT=@PRD_PACKAGE_UNIT WHERE PRD_PACKAG_PKID =@PRD_PACKAG_PKID"));

        case 6:
          result = _context13.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };

          return _context13.abrupt("return", message);

        case 14:
          _context13.prev = 14;
          _context13.t0 = _context13["catch"](0);
          console.log("updateProductPackages-->", _context13.t0);

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = {
  addProductSpecies: addProductSpecies,
  getProductSpecies: getProductSpecies,
  updateProductSpecies: updateProductSpecies,
  deleteProductSpecies: deleteProductSpecies,
  addProducts: addProducts,
  deleteProducts: deleteProducts,
  updateProducts: updateProducts,
  getProducts: getProducts,
  getProductsByCompany: getProductsByCompany,
  getProductPackages: getProductPackages,
  addProductPackages: addProductPackages,
  updateProductPackages: updateProductPackages,
  deleteProductPackages: deleteProductPackages
};