"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-12 18:47:46
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-12 11:21:10
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
          return regeneratorRuntime.awrap(pool.request().query("SELECT [CUSTOMER_CATEGORY_PKID] ,[CUSTOMER_CATEGORY_NAME] ,[CUSTOMER_CATEGORY_ISACTIVE] FROM [CUSTOMER_CATEGORY] WHERE [CUSTOMER_CATEGORY_ISACTIVE]=1"));

        case 6:
          result = _context.sent;
          pool.close();
          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("getCustomersCat-->", _context.t0); // pool.close();

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
          return regeneratorRuntime.awrap(pool.request().input("CustCatName", obj.CustCatName).query("SELECT * from CUSTOMER_CATEGORY WHERE CUSTOMER_CATEGORY_NAME=@CustCatName"));

        case 6:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("CustCatName", obj.CustCatName).query("insert into CUSTOMER_CATEGORY ([CUSTOMER_CATEGORY_NAME] ,[CUSTOMER_CATEGORY_ISACTIVE])  values(@CustCatName,1)"));

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
          console.log("addCustomersCat-->", _context2.t0);

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
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).query("DELETE FROM CUSTOMER_CATEGORY WHERE CUSTOMER_CATEGORY_PKID=@custId"));

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
          console.log("deleteCustomersCat-->", _context3.t0); // pool.close();

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function updateCustomersCat(custId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCustomersCat$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).input("CustCatName", obj.CustCatName).query("UPDATE CUSTOMER_CATEGORY SET CUSTOMER_CATEGORY_NAME = @CustCatName WHERE CUSTOMER_CATEGORY_PKID =@input_parameter"));

        case 6:
          result = _context4.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context4.abrupt("return", message);

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.log("updateCustomersCat-->", _context4.t0);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function getCustomersType() {
  var pool, result;
  return regeneratorRuntime.async(function getCustomersType$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [CUSTOMER_TYPE] WHERE [CUSTOMER_TYPE_ACTIVE]=1"));

        case 6:
          result = _context5.sent;
          pool.close();
          return _context5.abrupt("return", result.recordsets[0]);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log("getCustomersType-->", _context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addCustomersType(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addCustomersType$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CustTypeName", obj.CustTypeName).query("SELECT * from CUSTOMER_TYPE WHERE CUSTOMER_TYPE_NAME=@CustTypeName"));

        case 6:
          result = _context6.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context6.next = 20;
            break;
          }

          _context6.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("CustTypeName", obj.CustTypeName).query("insert into CUSTOMER_TYPE ([CUSTOMER_TYPE_NAME] ,[CUSTOMER_TYPE_ACTIVE])  values(@CustTypeName,1)"));

        case 10:
          insertInto = _context6.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context6.next = 16;
            break;
          }

          pool.close();
          return _context6.abrupt("return", true);

        case 16:
          pool.close();
          return _context6.abrupt("return", false);

        case 18:
          _context6.next = 22;
          break;

        case 20:
          pool.close();
          return _context6.abrupt("return", "0");

        case 22:
          _context6.next = 27;
          break;

        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](0);
          console.log("addCustomersType-->", _context6.t0);

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateCustomersType(custId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCustomersType$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).input("CustTypeName", obj.CustTypeName).query("UPDATE CUSTOMER_TYPE SET CUSTOMER_TYPE_NAME = @CustTypeName WHERE CUSTOMER_TYPE_PKID =@custId"));

        case 6:
          result = _context7.sent;
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context7.abrupt("return", message);

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          console.log("updateCustomersType-->", _context7.t0);

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

function deleteCustomersType(custId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteCustomersType$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).query("DELETE FROM CUSTOMER_TYPE WHERE CUSTOMER_TYPE_PKID=@custId"));

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
          console.log("deleteCustomersType-->", _context8.t0);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function getCustomersSubType() {
  var pool, result;
  return regeneratorRuntime.async(function getCustomersSubType$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [CUSTOMER_SUBTYPE] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_SUBTYPE_TYPE_FKID  WHERE [CUSTOMER_SUBTYPE_ISACTIVE]=1"));

        case 6:
          result = _context9.sent;
          pool.close();
          return _context9.abrupt("return", result.recordsets[0]);

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.log("getCustomersSubType-->", _context9.t0);

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addCustomersSubType(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addCustomersSubType$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CustType", obj.CustType).input("CustSubTypeName", obj.CustSubType).query("SELECT * from CUSTOMER_SUBTYPE WHERE CUSTOMER_SUBTYPE_NAME=@CustSubTypeName AND CUSTOMER_SUBTYPE_TYPE_FKID=@CustType"));

        case 6:
          result = _context10.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context10.next = 20;
            break;
          }

          _context10.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("CustType", obj.CustType).input("CustSubTypeName", obj.CustSubType).query("insert into CUSTOMER_SUBTYPE (CUSTOMER_SUBTYPE_TYPE_FKID ,CUSTOMER_SUBTYPE_NAME,CUSTOMER_SUBTYPE_ISACTIVE)  values(@CustType,@CustSubTypeName,1)"));

        case 10:
          insertInto = _context10.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context10.next = 16;
            break;
          }

          pool.close();
          return _context10.abrupt("return", true);

        case 16:
          pool.close();
          return _context10.abrupt("return", false);

        case 18:
          _context10.next = 22;
          break;

        case 20:
          pool.close();
          return _context10.abrupt("return", "0");

        case 22:
          _context10.next = 27;
          break;

        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10["catch"](0);
          console.log("addCustomersSubType-->", _context10.t0);

        case 27:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateCustomersSubType(custId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCustomersSubType$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context11.sent;
          _context11.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).input("CustType", obj.CustType).input("CustSubTypeName", obj.CustSubType).query("UPDATE CUSTOMER_SUBTYPE SET CUSTOMER_SUBTYPE_NAME = @CustSubTypeName,CUSTOMER_SUBTYPE_TYPE_FKID=@CustType WHERE CUSTOMER_SUBTYPE_PKID =@custId"));

        case 6:
          result = _context11.sent;
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context11.abrupt("return", message);

        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](0);
          console.log("updateCustomersSubType-->", _context11.t0);

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

function deleteCustomersSubType(custId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteCustomersSubType$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context12.sent;
          _context12.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).query("DELETE FROM CUSTOMER_SUBTYPE WHERE CUSTOMER_SUBTYPE_PKID=@custId"));

        case 6:
          result = _context12.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context12.next = 12;
            break;
          }

          pool.close();
          return _context12.abrupt("return", false);

        case 12:
          pool.close();
          return _context12.abrupt("return", true);

        case 14:
          _context12.next = 19;
          break;

        case 16:
          _context12.prev = 16;
          _context12.t0 = _context12["catch"](0);
          console.log("deleteCustomersSubType-->", _context12.t0);

        case 19:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function getCustomers() {
  var pool, result;
  return regeneratorRuntime.async(function getCustomers$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context13.sent;
          _context13.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT  [CUSTOMER_PKID] ,[CUSTOMER_CATEGORY_FKID] ,[CUSTOMER_TYPE_FKID] ,[CUSTOMER_SUBTYPE_FKID] ,[CUSTOMER_NAME] ,[CUSTOMER_EMAIL] ,[CUSTOMER_EMAIL2] ,[CUSTOMER_MOBILE] ,[CUSTOMER_ALT_MOBILE] ,[CUSTOMER_FIRM_NAME] ,[CUSTOMER_CAPACITY] ,[CUSTOMER_REPRESENTATIVE_FKID] ,[CUSTOMER_PRFILE] ,[CUSTOMER_DOC1] ,[CUSTOMER_DOC2] ,[CUSTOMER_DOC3] ,[CUSTOMER_DOC4] ,[CUSTOMER_DOC5] ,[CUSTOMER_DOC6] ,[CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2] ,[CUSTOMER_ISACTIVE] ,EMPLOYEE_NAME,CUSTOMER_TYPE_NAME,CUSTOMER_SUBTYPE_NAME,CUSTOMER_PASSWORD, CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2 , CUSTOMER_CONTACT_SEC_PERSON_PHO , CUSTOMER_CONTACT_SEC_PERSON_PHO2, CUSTOMER_CONTACT_SEC_PERSON_EMAIL,CUSTOMER_CATEGORY_NAME FROM [CUSTOMER_MASTER] JOIN [CUSTOMER_SUBTYPE] ON CUSTOMER_SUBTYPE_PKID=CUSTOMER_SUBTYPE_FKID  JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_TYPE_FKID JOIN CUSTOMER_CATEGORY ON CUSTOMER_CATEGORY_PKID=CUSTOMER_CATEGORY_FKID JOIN EMPLOYEE_MASTER ON EMPLOYEE_PKID=CUSTOMER_REPRESENTATIVE_FKID  WHERE [CUSTOMER_ISACTIVE]=1"));

        case 6:
          result = _context13.sent;
          pool.close();
          return _context13.abrupt("return", result.recordsets[0]);

        case 11:
          _context13.prev = 11;
          _context13.t0 = _context13["catch"](0);
          console.log("getCustomers-->", _context13.t0);

        case 14:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getCustById(custId) {
  var pool, result;
  return regeneratorRuntime.async(function getCustById$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context14.sent;
          _context14.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_PKID", custId).query("SELECT  [CUSTOMER_PKID] ,[CUSTOMER_CATEGORY_FKID] ,[CUSTOMER_TYPE_FKID] ,[CUSTOMER_SUBTYPE_FKID] ,[CUSTOMER_NAME] ,[CUSTOMER_EMAIL] ,[CUSTOMER_EMAIL2] ,[CUSTOMER_MOBILE] ,[CUSTOMER_ALT_MOBILE] ,[CUSTOMER_FIRM_NAME] ,[CUSTOMER_CAPACITY] ,[CUSTOMER_REPRESENTATIVE_FKID] ,[CUSTOMER_PRFILE] ,[CUSTOMER_DOC1] ,[CUSTOMER_DOC2] ,[CUSTOMER_DOC3] ,[CUSTOMER_DOC4] ,[CUSTOMER_DOC5] ,[CUSTOMER_DOC6] ,[CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2] ,[CUSTOMER_ISACTIVE] ,EMPLOYEE_NAME,CUSTOMER_TYPE_NAME,CUSTOMER_SUBTYPE_NAME,CUSTOMER_PASSWORD, CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2 , CUSTOMER_CONTACT_SEC_PERSON_PHO , CUSTOMER_CONTACT_SEC_PERSON_PHO2, CUSTOMER_CONTACT_SEC_PERSON_EMAIL,CUSTOMER_CATEGORY_NAME FROM [CUSTOMER_MASTER] JOIN [CUSTOMER_SUBTYPE] ON CUSTOMER_SUBTYPE_PKID=CUSTOMER_SUBTYPE_FKID  JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_TYPE_FKID JOIN CUSTOMER_CATEGORY ON CUSTOMER_CATEGORY_PKID=CUSTOMER_CATEGORY_FKID JOIN EMPLOYEE_MASTER ON EMPLOYEE_PKID=CUSTOMER_REPRESENTATIVE_FKID  WHERE [CUSTOMER_ISACTIVE]=1 and CUSTOMER_PKID=@CUSTOMER_PKID"));

        case 6:
          result = _context14.sent;
          pool.close();
          return _context14.abrupt("return", result.recordsets[0]);

        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          console.log("getCustById-->", _context14.t0); // pool.close();

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getOrderPlaceCustDetails(obj) {
  var pool, x, rerArr, i, result, KimoObj;
  return regeneratorRuntime.async(function getOrderPlaceCustDetails$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context15.sent;
          x = obj.arr;
          rerArr = [];
          i = 0;

        case 7:
          if (!(i < x.length)) {
            _context15.next = 33;
            break;
          }

          if (!(pool._connected == false)) {
            _context15.next = 13;
            break;
          }

          console.log("--- getOrderPlaceCustDetails Pool Reconnected ---");
          _context15.next = 12;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 12:
          pool = _context15.sent;

        case 13:
          _context15.next = 15;
          return regeneratorRuntime.awrap(pool.request().input("PRODUCT_PKID", x[i].ProductID).input("PRD_PACKAG_PKID", x[i].PackageID).query("SELECT PRD_PACKAGE_UNIT,[PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_UNIT],[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_WHOLESALE_PRICE] ,[PRODUCT_DEALER_PRICE] ,[PRODUCT_MRP] ,[PRODUCT_IMAGE],[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,[COMPANY_NAME],PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID JOIN  PRODUCT_PACKAGES ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID AND PRD_PACKAG_PKID=@PRD_PACKAG_PKID WHERE [PRODUCT_ISACTIVE]=1 AND PRODUCT_PKID=@PRODUCT_PKID"));

        case 15:
          result = _context15.sent;

          if (!(pool._connected == false)) {
            _context15.next = 21;
            break;
          }

          console.log("--- getOrderPlaceCustDetails Pool Reconnected ---");
          _context15.next = 20;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 20:
          pool = _context15.sent;

        case 21:
          KimoObj = {
            COMPANY_NAME: result.recordsets[0][0].COMPANY_NAME,
            PRODUCT_SPECIES_NAME: result.recordsets[0][0].PRODUCT_SPECIES_NAME,
            PRODUCT_NAME: result.recordsets[0][0].PRODUCT_NAME,
            PRODUCT_PKID: result.recordsets[0][0].PRODUCT_PKID,
            UNIT_OF_MEASUREMENT_SHORT_KEY: result.recordsets[0][0].UNIT_OF_MEASUREMENT_SHORT_KEY,
            PackageID: result.recordsets[0][0].PRD_PACKAGE_UNIT,
            Quantity: x[i].Quantity,
            PackageAmt: x[i].PackageAmt,
            Discount: x[i].Discount,
            FreeUnitScheme: x[i].FreeUnitScheme,
            FinalAmount: x[i].FinalAmount,
            ProductAmount: x[i].ProductAmount
          };
          console.log("pool._connected: 1", pool._connected);
          rerArr.push(KimoObj);

          if (!(pool._connected == false)) {
            _context15.next = 29;
            break;
          }

          console.log("--- getOrderPlaceCustDetails Pool Reconnected ---");
          _context15.next = 28;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 28:
          pool = _context15.sent;

        case 29:
          console.log("pool._connected: 2", pool._connected);

        case 30:
          i++;
          _context15.next = 7;
          break;

        case 33:
          pool.close();
          return _context15.abrupt("return", rerArr);

        case 37:
          _context15.prev = 37;
          _context15.t0 = _context15["catch"](0);
          console.log("getOrderPlaceCustDetails-->", _context15.t0); // pool.close();

        case 40:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 37]]);
}

function addCustomers(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addCustomers$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context16.sent;
          _context16.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_EMAIL", obj.CUSTOMER_EMAIL).input("CUSTOMER_MOBILE", obj.CUSTOMER_MOBILE).query("SELECT * FROM [CUSTOMER_MASTER] WHERE CUSTOMER_EMAIL=@CUSTOMER_EMAIL AND CUSTOMER_MOBILE=@CUSTOMER_MOBILE"));

        case 6:
          result = _context16.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context16.next = 20;
            break;
          }

          _context16.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_CATEGORY_FKID", obj.CUSTOMER_CATEGORY_FKID).input("CUSTOMER_TYPE_FKID", obj.CUSTOMER_TYPE_FKID).input("CUSTOMER_SUBTYPE_FKID", obj.CUSTOMER_SUBTYPE_FKID).input("CUSTOMER_NAME", obj.CUSTOMER_NAME).input("CUSTOMER_EMAIL", obj.CUSTOMER_EMAIL).input("CUSTOMER_EMAIL2", obj.CUSTOMER_EMAIL2).input("CUSTOMER_MOBILE", obj.CUSTOMER_MOBILE).input("CUSTOMER_ALT_MOBILE", obj.CUSTOMER_ALT_MOBILE).input("CUSTOMER_FIRM_NAME", obj.CUSTOMER_FIRM_NAME).input("CUSTOMER_CAPACITY", obj.CUSTOMER_CAPACITY).input("CUSTOMER_REPRESENTATIVE_FKID", obj.CUSTOMER_REPRESENTATIVE_FKID).input("CUSTOMER_PRFILE", obj.CUSTOMER_PRFILE).input("CUSTOMER_DOC1", obj.CUSTOMER_DOC1).input("CUSTOMER_DOC2", obj.CUSTOMER_DOC2).input("CUSTOMER_DOC3", obj.CUSTOMER_DOC3).input("CUSTOMER_DOC4", obj.CUSTOMER_DOC4).input("CUSTOMER_DOC5", obj.CUSTOMER_DOC5).input("CUSTOMER_DOC6", obj.CUSTOMER_DOC6).input("CUSTOMER_CONTACT_PERSON_NAME", obj.CUSTOMER_CONTACT_PERSON_NAME).input("CUSTOMER_CONTACT_PERSON_EMAIL", obj.CUSTOMER_CONTACT_PERSON_EMAIL).input("CUSTOMER_CONTACT_PERSON_EMAIL2", obj.CUSTOMER_CONTACT_PERSON_EMAIL2).input("CUSTOMER_CONTACT_PERSON_PHO", obj.CUSTOMER_CONTACT_PERSON_PHO).input("CUSTOMER_CONTACT_PERSON_PHO2", obj.CUSTOMER_CONTACT_PERSON_PHO2).input("CUSTOMER_ISACTIVE", "1").input("CUSTOMER_PASSWORD", obj.CUSTOMER_PASSWORD).input("CUSTOMER_CONTACT_SEC_PERSON_NAME", obj.CUSTOMER_CONTACT_SEC_PERSON_NAME).input("CUSTOMER_CONTACT_SEC_PERSON_EMAIL", obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL).input("CUSTOMER_CONTACT_SEC_PERSON_EMAIL2", obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2).input("CUSTOMER_CONTACT_SEC_PERSON_PHO", obj.CUSTOMER_CONTACT_SEC_PERSON_PHO).input("CUSTOMER_CONTACT_SEC_PERSON_PHO2", obj.CUSTOMER_CONTACT_SEC_PERSON_PHO2).query("insert into CUSTOMER_MASTER ([CUSTOMER_CATEGORY_FKID] , [CUSTOMER_TYPE_FKID] , [CUSTOMER_SUBTYPE_FKID] , [CUSTOMER_NAME] , [CUSTOMER_EMAIL] , [CUSTOMER_EMAIL2] ,[CUSTOMER_MOBILE] ,[CUSTOMER_ALT_MOBILE] , [CUSTOMER_FIRM_NAME] ,[CUSTOMER_CAPACITY] , [CUSTOMER_REPRESENTATIVE_FKID] , [CUSTOMER_PRFILE] ,[CUSTOMER_DOC1] , [CUSTOMER_DOC2] ,[CUSTOMER_DOC3] ,[CUSTOMER_DOC4] , [CUSTOMER_DOC5] ,[CUSTOMER_DOC6] , [CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2] ,[CUSTOMER_ISACTIVE],[CUSTOMER_PASSWORD],[CUSTOMER_CONTACT_SEC_PERSON_NAME], [CUSTOMER_CONTACT_SEC_PERSON_EMAIL], [CUSTOMER_CONTACT_SEC_PERSON_EMAIL2], [CUSTOMER_CONTACT_SEC_PERSON_PHO], [CUSTOMER_CONTACT_SEC_PERSON_PHO2])  values( @CUSTOMER_CATEGORY_FKID , @CUSTOMER_TYPE_FKID , @CUSTOMER_SUBTYPE_FKID , @CUSTOMER_NAME , @CUSTOMER_EMAIL , @CUSTOMER_EMAIL2 ,@CUSTOMER_MOBILE ,@CUSTOMER_ALT_MOBILE , @CUSTOMER_FIRM_NAME ,@CUSTOMER_CAPACITY , @CUSTOMER_REPRESENTATIVE_FKID , @CUSTOMER_PRFILE ,@CUSTOMER_DOC1 , @CUSTOMER_DOC2 ,@CUSTOMER_DOC3 ,@CUSTOMER_DOC4 , @CUSTOMER_DOC5 ,@CUSTOMER_DOC6 , @CUSTOMER_CONTACT_PERSON_NAME ,@CUSTOMER_CONTACT_PERSON_EMAIL ,@CUSTOMER_CONTACT_PERSON_EMAIL2 ,@CUSTOMER_CONTACT_PERSON_PHO ,@CUSTOMER_CONTACT_PERSON_PHO2 ,@CUSTOMER_ISACTIVE,@CUSTOMER_PASSWORD,@CUSTOMER_CONTACT_SEC_PERSON_NAME, @CUSTOMER_CONTACT_SEC_PERSON_EMAIL, @CUSTOMER_CONTACT_SEC_PERSON_EMAIL2, @CUSTOMER_CONTACT_SEC_PERSON_PHO, @CUSTOMER_CONTACT_SEC_PERSON_PHO2)"));

        case 10:
          insertInto = _context16.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context16.next = 16;
            break;
          }

          pool.close();
          return _context16.abrupt("return", true);

        case 16:
          pool.close();
          return _context16.abrupt("return", false);

        case 18:
          _context16.next = 22;
          break;

        case 20:
          pool.close();
          return _context16.abrupt("return", "0");

        case 22:
          _context16.next = 27;
          break;

        case 24:
          _context16.prev = 24;
          _context16.t0 = _context16["catch"](0);
          console.log("addCustomers-->", _context16.t0);

        case 27:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateCustomers(custId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateCustomers$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context17.sent;
          _context17.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_PKID", custId).input("CUSTOMER_CATEGORY_FKID", obj.CUSTOMER_CATEGORY_FKID).input("CUSTOMER_TYPE_FKID", obj.CUSTOMER_TYPE_FKID).input("CUSTOMER_SUBTYPE_FKID", obj.CUSTOMER_SUBTYPE_FKID).input("CUSTOMER_NAME", obj.CUSTOMER_NAME).input("CUSTOMER_EMAIL", obj.CUSTOMER_EMAIL).input("CUSTOMER_EMAIL2", obj.CUSTOMER_EMAIL2).input("CUSTOMER_MOBILE", obj.CUSTOMER_MOBILE).input("CUSTOMER_ALT_MOBILE", obj.CUSTOMER_ALT_MOBILE).input("CUSTOMER_FIRM_NAME", obj.CUSTOMER_FIRM_NAME).input("CUSTOMER_CAPACITY", obj.CUSTOMER_CAPACITY).input("CUSTOMER_REPRESENTATIVE_FKID", obj.CUSTOMER_REPRESENTATIVE_FKID).input("CUSTOMER_PRFILE", obj.CUSTOMER_PRFILE).input("CUSTOMER_DOC1", obj.CUSTOMER_DOC1).input("CUSTOMER_DOC2", obj.CUSTOMER_DOC2).input("CUSTOMER_DOC3", obj.CUSTOMER_DOC3).input("CUSTOMER_DOC4", obj.CUSTOMER_DOC4).input("CUSTOMER_DOC5", obj.CUSTOMER_DOC5).input("CUSTOMER_DOC6", obj.CUSTOMER_DOC6).input("CUSTOMER_CONTACT_PERSON_NAME", obj.CUSTOMER_CONTACT_PERSON_NAME).input("CUSTOMER_CONTACT_PERSON_EMAIL", obj.CUSTOMER_CONTACT_PERSON_EMAIL).input("CUSTOMER_CONTACT_PERSON_EMAIL2", obj.CUSTOMER_CONTACT_PERSON_EMAIL2).input("CUSTOMER_CONTACT_PERSON_PHO", obj.CUSTOMER_CONTACT_PERSON_PHO).input("CUSTOMER_CONTACT_PERSON_PHO2", obj.CUSTOMER_CONTACT_PERSON_PHO2).input("CUSTOMER_ISACTIVE", "1").input("CUSTOMER_PASSWORD", obj.CUSTOMER_PASSWORD).input("CUSTOMER_CONTACT_SEC_PERSON_NAME", obj.CUSTOMER_CONTACT_SEC_PERSON_NAME).input("CUSTOMER_CONTACT_SEC_PERSON_EMAIL", obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL).input("CUSTOMER_CONTACT_SEC_PERSON_EMAIL2", obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2).input("CUSTOMER_CONTACT_SEC_PERSON_PHO", obj.CUSTOMER_CONTACT_SEC_PERSON_PHO).input("CUSTOMER_CONTACT_SEC_PERSON_PHO2", obj.CUSTOMER_CONTACT_SEC_PERSON_PHO2).query("UPDATE CUSTOMER_MASTER SET CUSTOMER_CATEGORY_FKID=@CUSTOMER_CATEGORY_FKID , CUSTOMER_TYPE_FKID=@CUSTOMER_TYPE_FKID , CUSTOMER_SUBTYPE_FKID=@CUSTOMER_SUBTYPE_FKID , CUSTOMER_NAME=@CUSTOMER_NAME , CUSTOMER_EMAIL=@CUSTOMER_EMAIL , CUSTOMER_EMAIL2=@CUSTOMER_EMAIL2 ,CUSTOMER_MOBILE=@CUSTOMER_MOBILE ,CUSTOMER_ALT_MOBILE=@CUSTOMER_ALT_MOBILE , CUSTOMER_FIRM_NAME=@CUSTOMER_FIRM_NAME ,CUSTOMER_CAPACITY=@CUSTOMER_CAPACITY , CUSTOMER_REPRESENTATIVE_FKID=@CUSTOMER_REPRESENTATIVE_FKID , CUSTOMER_PRFILE=@CUSTOMER_PRFILE ,CUSTOMER_DOC1=@CUSTOMER_DOC1 , CUSTOMER_DOC2=@CUSTOMER_DOC2 ,CUSTOMER_DOC3=@CUSTOMER_DOC3 ,CUSTOMER_DOC4=@CUSTOMER_DOC4 , CUSTOMER_DOC5=@CUSTOMER_DOC5 ,CUSTOMER_DOC6=@CUSTOMER_DOC6 , CUSTOMER_CONTACT_PERSON_NAME=@CUSTOMER_CONTACT_PERSON_NAME ,CUSTOMER_CONTACT_PERSON_EMAIL=@CUSTOMER_CONTACT_PERSON_EMAIL ,CUSTOMER_CONTACT_PERSON_EMAIL2=@CUSTOMER_CONTACT_PERSON_EMAIL2 ,CUSTOMER_CONTACT_PERSON_PHO=@CUSTOMER_CONTACT_PERSON_PHO ,CUSTOMER_CONTACT_PERSON_PHO2=@CUSTOMER_CONTACT_PERSON_PHO2 ,CUSTOMER_ISACTIVE=@CUSTOMER_ISACTIVE, CUSTOMER_PASSWORD=@CUSTOMER_PASSWORD,CUSTOMER_CONTACT_SEC_PERSON_NAME=@CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL=@CUSTOMER_CONTACT_SEC_PERSON_EMAIL, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2=@CUSTOMER_CONTACT_SEC_PERSON_EMAIL2, CUSTOMER_CONTACT_SEC_PERSON_PHO=@CUSTOMER_CONTACT_SEC_PERSON_PHO, CUSTOMER_CONTACT_SEC_PERSON_PHO2=@CUSTOMER_CONTACT_SEC_PERSON_PHO2 WHERE CUSTOMER_PKID =@CUSTOMER_PKID"));

        case 6:
          result = _context17.sent;
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context17.abrupt("return", message);

        case 13:
          _context17.prev = 13;
          _context17.t0 = _context17["catch"](0);
          console.log("updateCustomers-->", _context17.t0);

        case 16:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

function deleteCustomers(custId) {
  var pool, result, message;
  return regeneratorRuntime.async(function deleteCustomers$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context18.sent;
          _context18.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_PKID", custId).query("UPDATE CUSTOMER_MASTER SET CUSTOMER_ISACTIVE = 0 WHERE CUSTOMER_PKID=@CUSTOMER_PKID"));

        case 6:
          result = _context18.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context18.abrupt("return", message);

        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](0);
          console.log("deleteCustomers-->", _context18.t0);

        case 17:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function getCustSubTypeByType(custId) {
  var pool, result;
  return regeneratorRuntime.async(function getCustSubTypeByType$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context19.sent;
          _context19.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).query("SELECT * FROM [CUSTOMER_SUBTYPE] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_SUBTYPE_TYPE_FKID  WHERE [CUSTOMER_SUBTYPE_ISACTIVE]=1 AND CUSTOMER_SUBTYPE_TYPE_FKID=@custId"));

        case 6:
          result = _context19.sent;
          pool.close();
          return _context19.abrupt("return", result.recordsets[0]);

        case 11:
          _context19.prev = 11;
          _context19.t0 = _context19["catch"](0);
          console.log("getCustSubTypeByType-->", _context19.t0); // pool.close();

        case 14:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getCustDocsById(custId) {
  var pool, result;
  return regeneratorRuntime.async(function getCustDocsById$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context20.sent;
          _context20.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_PKID", custId).query("SELECT CUSTOMER_DOC1,CUSTOMER_DOC2,CUSTOMER_DOC3,CUSTOMER_DOC4,CUSTOMER_DOC5,CUSTOMER_DOC6 FROM CUSTOMER_MASTER WHERE CUSTOMER_PKID=@CUSTOMER_PKID"));

        case 6:
          result = _context20.sent;
          pool.close();
          return _context20.abrupt("return", result.recordsets[0]);

        case 11:
          _context20.prev = 11;
          _context20.t0 = _context20["catch"](0);
          console.log("getCustDocsById-->", _context20.t0); // pool.close();

        case 14:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getCustContactPersons(custId) {
  var pool, result;
  return regeneratorRuntime.async(function getCustContactPersons$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context21.sent;
          _context21.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_PKID", custId).query("SELECT [CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2]  ,CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2 , CUSTOMER_CONTACT_SEC_PERSON_PHO , CUSTOMER_CONTACT_SEC_PERSON_PHO2, CUSTOMER_CONTACT_SEC_PERSON_EMAIL FROM CUSTOMER_MASTER WHERE CUSTOMER_PKID=@CUSTOMER_PKID"));

        case 6:
          result = _context21.sent;
          pool.close();
          return _context21.abrupt("return", result.recordsets[0]);

        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](0);
          console.log("getCustContactPersons-->", _context21.t0); // pool.close();

        case 14:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getAddressType(custId) {
  var pool, result;
  return regeneratorRuntime.async(function getAddressType$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context22.sent;
          _context22.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("custId", custId).query("SELECT [CUSTOMER_ADDRESS_PKID] ,[CUSTOMER_ADDRESS_CUST_FKID] ,[CUSTOMER_ADDRESS_ADDRESS1] ,[CUSTOMER_ADDRESS_ADDRESS2] ,[CUSTOMER_ADDRESS_ADDRESS3] ,[CUSTOMER_ADDRESS_ZIP_CODE] ,[CUSTOMER_ADDRESS_TYPE] ,[CUSTOMER_ADDRESS_ISACTIVE] FROM [CUSTOMER_ADDRESS] JOIN CUSTOMER_MASTER ON CUSTOMER_PKID=CUSTOMER_ADDRESS_CUST_FKID WHERE CUSTOMER_ADDRESS_ISACTIVE=1 AND CUSTOMER_ADDRESS_CUST_FKID=@custId"));

        case 6:
          result = _context22.sent;
          pool.close();
          return _context22.abrupt("return", result.recordsets[0]);

        case 11:
          _context22.prev = 11;
          _context22.t0 = _context22["catch"](0);
          console.log("getCustomersType-->", _context22.t0);

        case 14:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addAddressType(obj) {
  var pool, insertInto;
  return regeneratorRuntime.async(function addAddressType$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context23.sent;
          _context23.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_ADDRESS_CUST_FKID", obj.CUSTOMER_ADDRESS_CUST_FKID).input("CUSTOMER_ADDRESS_ADDRESS1", obj.CUSTOMER_ADDRESS_ADDRESS1).input("CUSTOMER_ADDRESS_ADDRESS2", obj.CUSTOMER_ADDRESS_ADDRESS2).input("CUSTOMER_ADDRESS_ADDRESS3", obj.CUSTOMER_ADDRESS_ADDRESS3).input("CUSTOMER_ADDRESS_ZIP_CODE", obj.CUSTOMER_ADDRESS_ZIP_CODE).input("CUSTOMER_ADDRESS_TYPE", obj.CUSTOMER_ADDRESS_TYPE).input("CUSTOMER_ADDRESS_ISACTIVE", "1").query("insert into CUSTOMER_ADDRESS ([CUSTOMER_ADDRESS_CUST_FKID] ,[CUSTOMER_ADDRESS_ADDRESS1] ,[CUSTOMER_ADDRESS_ADDRESS2] ,[CUSTOMER_ADDRESS_ADDRESS3] ,[CUSTOMER_ADDRESS_ZIP_CODE] ,[CUSTOMER_ADDRESS_TYPE],CUSTOMER_ADDRESS_ISACTIVE)  values(@CUSTOMER_ADDRESS_CUST_FKID,@CUSTOMER_ADDRESS_ADDRESS1,@CUSTOMER_ADDRESS_ADDRESS2,@CUSTOMER_ADDRESS_ADDRESS3,@CUSTOMER_ADDRESS_ZIP_CODE,@CUSTOMER_ADDRESS_TYPE,@CUSTOMER_ADDRESS_ISACTIVE)"));

        case 6:
          insertInto = _context23.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context23.next = 12;
            break;
          }

          pool.close();
          return _context23.abrupt("return", true);

        case 12:
          pool.close();
          return _context23.abrupt("return", false);

        case 14:
          _context23.next = 19;
          break;

        case 16:
          _context23.prev = 16;
          _context23.t0 = _context23["catch"](0);
          console.log("addAddressType-->", _context23.t0);

        case 19:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function updateAddressType(TypeId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateAddressType$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context24.sent;
          _context24.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_ADDRESS_PKID", TypeId).input("CUSTOMER_ADDRESS_CUST_FKID", obj.CUSTOMER_ADDRESS_CUST_FKID).input("CUSTOMER_ADDRESS_ADDRESS1", obj.CUSTOMER_ADDRESS_ADDRESS1).input("CUSTOMER_ADDRESS_ADDRESS2", obj.CUSTOMER_ADDRESS_ADDRESS2).input("CUSTOMER_ADDRESS_ADDRESS3", obj.CUSTOMER_ADDRESS_ADDRESS3).input("CUSTOMER_ADDRESS_ZIP_CODE", obj.CUSTOMER_ADDRESS_ZIP_CODE).query("UPDATE CUSTOMER_ADDRESS SET CUSTOMER_ADDRESS_CUST_FKID = @CUSTOMER_ADDRESS_CUST_FKID,CUSTOMER_ADDRESS_ADDRESS1=@CUSTOMER_ADDRESS_ADDRESS1,CUSTOMER_ADDRESS_ADDRESS2=@CUSTOMER_ADDRESS_ADDRESS2,CUSTOMER_ADDRESS_ADDRESS3=@CUSTOMER_ADDRESS_ADDRESS3,CUSTOMER_ADDRESS_ZIP_CODE=@CUSTOMER_ADDRESS_ZIP_CODE WHERE CUSTOMER_ADDRESS_PKID =@CUSTOMER_ADDRESS_PKID"));

        case 6:
          result = _context24.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context24.abrupt("return", message);

        case 14:
          _context24.prev = 14;
          _context24.t0 = _context24["catch"](0);
          console.log("updateAddressType-->", _context24.t0);

        case 17:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function deleteAddressType(TypeId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteAddressType$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context25.sent;
          _context25.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("TypeId", TypeId).query("UPDATE CUSTOMER_ADDRESS SET CUSTOMER_ADDRESS_ISACTIVE=0 WHERE CUSTOMER_ADDRESS_PKID=@TypeId"));

        case 6:
          result = _context25.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context25.next = 12;
            break;
          }

          pool.close();
          return _context25.abrupt("return", false);

        case 12:
          pool.close();
          return _context25.abrupt("return", true);

        case 14:
          _context25.next = 19;
          break;

        case 16:
          _context25.prev = 16;
          _context25.t0 = _context25["catch"](0);
          console.log("deleteCustomersSubType-->", _context25.t0);

        case 19:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function getCustDeleteNewRequest() {
  var pool, result;
  return regeneratorRuntime.async(function getCustDeleteNewRequest$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context26.sent;
          _context26.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT [CUSTOMER_DELETE_REQ_PKID],[CUSTOMER_DELETE_REQ_CUST_FKID] , [CUSTOMER_DELETE_REQ_EMP_FKID] ,[CUSTOMER_DELETE_REQ_DATE] , [CUSTOMER_DELETE_REQ_ACTIVE] ,[CUSTOMER_DELETE_REQ_REASON] ,CUSTOMER_NAME,EMPLOYEE_NAME,EMPLOYEE_TYPE_NAME,[EMPLOYEE_SUB_TYPE_NAME],CUSTOMER_CATEGORY_NAME,CUSTOMER_TYPE_NAME,CUSTOMER_SUBTYPE_NAME,CUSTOMER_EMAIL,CUSTOMER_MOBILE FROM CUSTOMER_DELETE_REQ JOIN CUSTOMER_MASTER ON CUSTOMER_PKID=CUSTOMER_DELETE_REQ_CUST_FKID JOIN EMPLOYEE_MASTER ON [EMPLOYEE_PKID]=[CUSTOMER_DELETE_REQ_EMP_FKID] JOIN EMPLOYEE_TYPE ON EMPLOYEE_TYPE_PKID=[EMPLOYEE_TYPE_FKID] JOIN EMPLOYEE_SUB_TYPE ON [EMPLOYEE_SUB_TYPE_TYPE_FKID]=EMPLOYEE_TYPE_PKID JOIN CUSTOMER_CATEGORY ON [CUSTOMER_CATEGORY_PKID]=[CUSTOMER_CATEGORY_FKID] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=[CUSTOMER_TYPE_FKID] JOIN [dbo].[CUSTOMER_SUBTYPE] ON [CUSTOMER_SUBTYPE_PKID]=[CUSTOMER_SUBTYPE_FKID]"));

        case 6:
          result = _context26.sent;
          pool.close();
          return _context26.abrupt("return", result.recordsets[0]);

        case 11:
          _context26.prev = 11;
          _context26.t0 = _context26["catch"](0);
          console.log("getCustDeleteNewRequest-->", _context26.t0);

        case 14:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function AcceptDeleteRequest(reqId, custId) {
  var pool, result, result2, message;
  return regeneratorRuntime.async(function AcceptDeleteRequest$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context27.sent;
          _context27.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_DELETE_REQ_PKID", reqId).query("UPDATE CUSTOMER_DELETE_REQ SET CUSTOMER_DELETE_REQ_ACTIVE =1 WHERE CUSTOMER_DELETE_REQ_PKID=@CUSTOMER_DELETE_REQ_PKID"));

        case 6:
          result = _context27.sent;
          _context27.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_DELETE_REQ_CUST_FKID", custId).query("UPDATE CUSTOMER_MASTER SET CUSTOMER_ISACTIVE = 0 WHERE CUSTOMER_PKID=@CUSTOMER_DELETE_REQ_CUST_FKID"));

        case 9:
          result2 = _context27.sent;
          pool.close();
          message = false;

          if (result.rowsAffected && result2.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context27.abrupt("return", message);

        case 17:
          _context27.prev = 17;
          _context27.t0 = _context27["catch"](0);
          console.log("AcceptDeleteRequest-->", _context27.t0);

        case 20:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function RejectDeleteRequest(reqId) {
  var pool, result, message;
  return regeneratorRuntime.async(function RejectDeleteRequest$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context28.sent;
          _context28.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_DELETE_REQ_PKID", reqId).query("UPDATE CUSTOMER_DELETE_REQ SET CUSTOMER_DELETE_REQ_ACTIVE =2 WHERE CUSTOMER_DELETE_REQ_PKID=@CUSTOMER_DELETE_REQ_PKID"));

        case 6:
          result = _context28.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context28.abrupt("return", message);

        case 14:
          _context28.prev = 14;
          _context28.t0 = _context28["catch"](0);
          console.log("RejectDeleteRequest-->", _context28.t0);

        case 17:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function getCustReasonForDelete(delreqId) {
  var pool, result;
  return regeneratorRuntime.async(function getCustReasonForDelete$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context29.sent;
          _context29.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_DELETE_REQ_PKID", delreqId).query("SELECT [CUSTOMER_DELETE_REQ_PKID],[CUSTOMER_DELETE_REQ_REASON]  FROM CUSTOMER_DELETE_REQ JOIN CUSTOMER_MASTER ON CUSTOMER_PKID=CUSTOMER_DELETE_REQ_CUST_FKID JOIN EMPLOYEE_MASTER ON [EMPLOYEE_PKID]=[CUSTOMER_DELETE_REQ_EMP_FKID] JOIN EMPLOYEE_TYPE ON EMPLOYEE_TYPE_PKID=[EMPLOYEE_TYPE_FKID] JOIN EMPLOYEE_SUB_TYPE ON [EMPLOYEE_SUB_TYPE_TYPE_FKID]=EMPLOYEE_TYPE_PKID JOIN CUSTOMER_CATEGORY ON [CUSTOMER_CATEGORY_PKID]=[CUSTOMER_CATEGORY_FKID] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=[CUSTOMER_TYPE_FKID] JOIN [dbo].[CUSTOMER_SUBTYPE] ON [CUSTOMER_SUBTYPE_PKID]=[CUSTOMER_SUBTYPE_FKID] WHERE CUSTOMER_DELETE_REQ_PKID=@CUSTOMER_DELETE_REQ_PKID"));

        case 6:
          result = _context29.sent;
          pool.close();
          return _context29.abrupt("return", result.recordsets[0]);

        case 11:
          _context29.prev = 11;
          _context29.t0 = _context29["catch"](0);
          console.log("getCustReasonForDelete-->", _context29.t0);

        case 14:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

module.exports = {
  getCustomersCat: getCustomersCat,
  deleteCustomersCat: deleteCustomersCat,
  addCustomersCat: addCustomersCat,
  updateCustomersCat: updateCustomersCat,
  getCustomersType: getCustomersType,
  addCustomersType: addCustomersType,
  updateCustomersType: updateCustomersType,
  deleteCustomersType: deleteCustomersType,
  getCustomersSubType: getCustomersSubType,
  addCustomersSubType: addCustomersSubType,
  deleteCustomersSubType: deleteCustomersSubType,
  updateCustomersSubType: updateCustomersSubType,
  getCustomers: getCustomers,
  addCustomers: addCustomers,
  updateCustomers: updateCustomers,
  deleteCustomers: deleteCustomers,
  getCustSubTypeByType: getCustSubTypeByType,
  getCustDocsById: getCustDocsById,
  getCustContactPersons: getCustContactPersons,
  getAddressType: getAddressType,
  addAddressType: addAddressType,
  deleteAddressType: deleteAddressType,
  updateAddressType: updateAddressType,
  getCustDeleteNewRequest: getCustDeleteNewRequest,
  AcceptDeleteRequest: AcceptDeleteRequest,
  RejectDeleteRequest: RejectDeleteRequest,
  getCustReasonForDelete: getCustReasonForDelete,
  getCustById: getCustById,
  getOrderPlaceCustDetails: getOrderPlaceCustDetails
};