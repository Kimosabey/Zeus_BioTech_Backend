"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-04 14:28:13
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-14 11:10:29
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getRemarksOrdersById(ordId) {
  var pool, result;
  return regeneratorRuntime.async(function getRemarksOrdersById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select DISTINCT [ORDER_REMARK] from [dbo].[ORDER_ITEM] join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"));

        case 6:
          result = _context.sent;
          pool.close();
          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("getRemarksOrdersById-->", _context.t0); // pool.close();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getBillingAddressOrdersById(ordId) {
  var pool, result;
  return regeneratorRuntime.async(function getBillingAddressOrdersById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_BILLING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID  and [CUSTOMER_ADDRESS_TYPE]='Billing'"));

        case 6:
          result = _context2.sent;
          pool.close();
          return _context2.abrupt("return", result.recordsets[0]);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log("getBillingAddressOrdersById-->", _context2.t0); // pool.close();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getShippingAddressOrdersById(ordId) {
  var pool, result;
  return regeneratorRuntime.async(function getShippingAddressOrdersById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_SHIPPING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID and [CUSTOMER_ADDRESS_TYPE]='Shipping' "));

        case 6:
          result = _context3.sent;
          pool.close();
          return _context3.abrupt("return", result.recordsets[0]);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log("getShippingAddressOrdersById-->", _context3.t0); // pool.close();

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getOrders() {
  var pool, result;
  return regeneratorRuntime.async(function getOrders$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select distinct (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND ORDER_STATUS=0"));

        case 6:
          result = _context4.sent;
          pool.close();
          return _context4.abrupt("return", result.recordsets[0]);

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log("getOrders-->", _context4.t0); // pool.close();

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getItemsByOrderId(ordId) {
  var pool, result;
  return regeneratorRuntime.async(function getItemsByOrderId$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select items.*,pkg.*,uom.UNIT_OF_MEASUREMENT_SHORT_KEY,[PRODUCT_NAME], [PRODUCT_UNIT],[PRODUCT_MRP] from [dbo].[ORDER_ITEM] as items join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] join [dbo].[PRODUCT_MASTER] ON [PRODUCT_PKID]=[ORDER_ITEM_PRODUCT_FKID] JOIN PRODUCT_PACKAGES pkg on  PRD_PACKAG_PKID=items.ORDER_ITEM_UNIT JOIN UNIT_OF_MEASUREMENT uom ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"));

        case 6:
          result = _context5.sent;
          pool.close();
          return _context5.abrupt("return", result.recordsets[0]);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log("getItemByOrderId-->", _context5.t0); // pool.close();

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function AcceptOrderRequest(reqId) {
  var pool, result, message;
  return regeneratorRuntime.async(function AcceptOrderRequest$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log("reqId: ", reqId);
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", reqId).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1 , ORDER_STATUS=1 WHERE ORDER_PKID=@ORDER_PKID"));

        case 7:
          result = _context6.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          console.log("message: ", message);
          return _context6.abrupt("return", message);

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](1);
          console.log("AcceptOrderRequest-->", _context6.t0);

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 16]]);
}

function RejectOrderRequest(reqId) {
  var pool, result, message;
  return regeneratorRuntime.async(function RejectOrderRequest$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log("reqId: ", reqId);
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", reqId).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =0 , ORDER_STATUS=2 WHERE ORDER_PKID=@ORDER_PKID"));

        case 7:
          result = _context7.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context7.abrupt("return", message);

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](1);
          console.log("RejectOrderRequest-->", _context7.t0);

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function getSupplyType() {
  var pool, result;
  return regeneratorRuntime.async(function getSupplyType$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT [SUPPLY_TYPE_PKID] ,[SUPPLY_NAME] ,[SUPPLY_TYPE_ISACTIVE] FROM [SUPPLY_TYPE] WHERE SUPPLY_TYPE_ISACTIVE=1"));

        case 6:
          result = _context8.sent;
          pool.close();
          console.log("pool._connected getSupplyType: ", pool._connected);

          if (!(pool._connected == false)) {
            _context8.next = 13;
            break;
          }

          _context8.next = 12;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 12:
          pool = _context8.sent;

        case 13:
          pool.close();
          return _context8.abrupt("return", result.recordsets[0]);

        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](0);
          console.log("getSupplyType-->", _context8.t0);

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function addSupplyType(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addSupplyType$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_NAME", sql.VarChar, obj.SUPPLY_NAME).query("SELECT * from SUPPLY_TYPE WHERE SUPPLY_NAME=@SUPPLY_NAME"));

        case 6:
          result = _context9.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context9.next = 20;
            break;
          }

          _context9.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_NAME", obj.SUPPLY_NAME).query("insert into SUPPLY_TYPE ([SUPPLY_NAME] ,[SUPPLY_TYPE_ISACTIVE])  values(@SUPPLY_NAME,1)"));

        case 10:
          insertInto = _context9.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context9.next = 16;
            break;
          }

          pool.close();
          return _context9.abrupt("return", true);

        case 16:
          pool.close();
          return _context9.abrupt("return", false);

        case 18:
          _context9.next = 22;
          break;

        case 20:
          pool.close();
          return _context9.abrupt("return", "0");

        case 22:
          _context9.next = 27;
          break;

        case 24:
          _context9.prev = 24;
          _context9.t0 = _context9["catch"](0);
          console.log("addSupplyType-->", _context9.t0);

        case 27:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function deleteSupplyType(TypeId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteSupplyType$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("TypeId", TypeId).query("UPDATE SUPPLY_TYPE SET SUPPLY_TYPE_ISACTIVE=0 WHERE SUPPLY_TYPE_PKID=@TypeId"));

        case 6:
          result = _context10.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context10.next = 12;
            break;
          }

          pool.close();
          return _context10.abrupt("return", false);

        case 12:
          pool.close();
          return _context10.abrupt("return", true);

        case 14:
          _context10.next = 19;
          break;

        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](0);
          console.log("deleteSupply-->", _context10.t0);

        case 19:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function updateSupplyType(TypeId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateSupplyType$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context11.sent;
          _context11.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("TypeId", TypeId).input("SUPPLY_NAME", obj.SUPPLY_NAME).query("UPDATE SUPPLY_TYPE SET [SUPPLY_NAME]=@SUPPLY_NAME  WHERE SUPPLY_TYPE_PKID =@TypeId"));

        case 6:
          result = _context11.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context11.abrupt("return", message);

        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          console.log("updateSupplyType-->", _context11.t0);

        case 17:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function GetPendingOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetPendingOrdersBySupplyType$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context12.sent;
          _context12.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context12.sent;
          _context12.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"));

        case 9:
          result2 = _context12.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context12.next = 15;
            break;
          }

          return _context12.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context12.abrupt("return", result.recordsets[0]);

        case 16:
          _context12.next = 21;
          break;

        case 18:
          _context12.prev = 18;
          _context12.t0 = _context12["catch"](0);
          console.log("GetPendingOrdersBySupplyType-->", _context12.t0);

        case 21:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetPendingOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetPendingOrdersByMonth$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context13.sent;
          _context13.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context13.sent;
          _context13.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"));

        case 9:
          result2 = _context13.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context13.next = 15;
            break;
          }

          return _context13.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context13.abrupt("return", result.recordsets[0]);

        case 16:
          _context13.next = 21;
          break;

        case 18:
          _context13.prev = 18;
          _context13.t0 = _context13["catch"](0);
          console.log("GetPendingOrdersByMonth-->", _context13.t0);

        case 21:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetPendingOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function GetPendingOrdersByDate$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context14.sent;
          _context14.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON SUPPLY_TYPE_PKID=ORD.ORDER_SUPPLY_TYPE  WHERE ORDER_ISACTIVE=0 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context14.sent;
          pool.close();
          return _context14.abrupt("return", result.recordsets[0]);

        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          console.log("GetPendingOrdersByDate-->", _context14.t0);

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getAllApprovedOrders() {
  var pool, result;
  return regeneratorRuntime.async(function getAllApprovedOrders$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context15.sent;
          _context15.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"));

        case 6:
          result = _context15.sent;
          pool.close();
          return _context15.abrupt("return", result.recordsets[0]);

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          console.log("getAllApprovedOrders-->", _context15.t0);

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getApprovedOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function getApprovedOrdersByDate$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context16.sent;
          _context16.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context16.sent;
          pool.close();
          return _context16.abrupt("return", result.recordsets[0]);

        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16["catch"](0);
          console.log("GetApprovedOrdersByDate-->", _context16.t0);

        case 14:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getApprovedOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getApprovedOrdersBySupplyType$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context17.sent;
          _context17.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context17.sent;
          _context17.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"));

        case 9:
          result2 = _context17.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context17.next = 15;
            break;
          }

          return _context17.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context17.abrupt("return", result.recordsets[0]);

        case 16:
          _context17.next = 21;
          break;

        case 18:
          _context17.prev = 18;
          _context17.t0 = _context17["catch"](0);
          console.log("getApprovedOrdersBySupplyType-->", _context17.t0);

        case 21:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getApprovedOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getApprovedOrdersByMonth$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context18.sent;
          _context18.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context18.sent;
          _context18.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"));

        case 9:
          result2 = _context18.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context18.next = 15;
            break;
          }

          return _context18.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context18.abrupt("return", result.recordsets[0]);

        case 16:
          _context18.next = 21;
          break;

        case 18:
          _context18.prev = 18;
          _context18.t0 = _context18["catch"](0);
          console.log("getApprovedOrdersByMonth-->", _context18.t0);

        case 21:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function ApprovedOrderConfirm(obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function ApprovedOrderConfirm$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context19.sent;
          _context19.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", obj.OrderPkid).input("ORDER_REMARK_BY_PROCESSTEAM", obj.OrderRemarkRes).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=3, ORDER_REMARK_BY_PROCESSTEAM=@ORDER_REMARK_BY_PROCESSTEAM WHERE ORDER_PKID=@ORDER_PKID"));

        case 6:
          result = _context19.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context19.abrupt("return", message);

        case 14:
          _context19.prev = 14;
          _context19.t0 = _context19["catch"](0);
          console.log("ApprovedOrderConfirm -->", _context19.t0);

        case 17:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function GetAllScheduledOrder() {
  var pool, result;
  return regeneratorRuntime.async(function GetAllScheduledOrder$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context20.sent;
          _context20.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"));

        case 6:
          result = _context20.sent;
          pool.close();
          return _context20.abrupt("return", result.recordsets[0]);

        case 11:
          _context20.prev = 11;
          _context20.t0 = _context20["catch"](0);
          console.log("GetAllScheduledOrder -->", _context20.t0);

        case 14:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getScheduledOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function getScheduledOrdersByDate$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context21.sent;
          _context21.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context21.sent;
          pool.close();
          return _context21.abrupt("return", result.recordsets[0]);

        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](0);
          console.log("getScheduledOrdersByDate-->", _context21.t0);

        case 14:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getScheduledOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getScheduledOrdersBySupplyType$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context22.sent;
          _context22.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context22.sent;
          _context22.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"));

        case 9:
          result2 = _context22.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context22.next = 15;
            break;
          }

          return _context22.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context22.abrupt("return", result.recordsets[0]);

        case 16:
          _context22.next = 21;
          break;

        case 18:
          _context22.prev = 18;
          _context22.t0 = _context22["catch"](0);
          console.log("getScheduledOrdersBySupplyType-->", _context22.t0);

        case 21:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getScheduledOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getScheduledOrdersByMonth$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context23.sent;
          _context23.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context23.sent;
          _context23.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"));

        case 9:
          result2 = _context23.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context23.next = 15;
            break;
          }

          return _context23.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context23.abrupt("return", result.recordsets[0]);

        case 16:
          _context23.next = 21;
          break;

        case 18:
          _context23.prev = 18;
          _context23.t0 = _context23["catch"](0);
          console.log("getScheduledOrdersByMonth-->", _context23.t0);

        case 21:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getOrderProcessRemark(ordId) {
  var pool, result;
  return regeneratorRuntime.async(function getOrderProcessRemark$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context24.sent;
          _context24.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select DISTINCT ORDER_REMARK_BY_PROCESSTEAM from [dbo].[ORDER_ITEM] join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"));

        case 6:
          result = _context24.sent;
          pool.close();
          return _context24.abrupt("return", result.recordsets[0]);

        case 11:
          _context24.prev = 11;
          _context24.t0 = _context24["catch"](0);
          console.log("getOrderProcessRemark-->", _context24.t0); // pool.close();

        case 14:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function ConfirmForInvoice(ordId, TentativeDate) {
  var pool, result, message;
  return regeneratorRuntime.async(function ConfirmForInvoice$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          console.log("ordId, TentativeDate: ", ordId, TentativeDate);
          _context25.prev = 1;
          _context25.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context25.sent;
          _context25.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", ordId).input("ORDER_TENTATIVE_DATE", TentativeDate).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=4, ORDER_TENTATIVE_DATE=@ORDER_TENTATIVE_DATE WHERE ORDER_PKID=@ORDER_PKID"));

        case 7:
          result = _context25.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context25.abrupt("return", message);

        case 15:
          _context25.prev = 15;
          _context25.t0 = _context25["catch"](1);
          console.log("ConfirmForInvoice -->", _context25.t0);

        case 18:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function GetAllConfirmInvoiceOrder() {
  var pool, result;
  return regeneratorRuntime.async(function GetAllConfirmInvoiceOrder$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context26.sent;
          _context26.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4"));

        case 6:
          result = _context26.sent;
          pool.close();
          return _context26.abrupt("return", result.recordsets[0]);

        case 11:
          _context26.prev = 11;
          _context26.t0 = _context26["catch"](0);
          console.log("GetAllConfirmInvoiceOrder -->", _context26.t0);

        case 14:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getConfirmInvoiceOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getConfirmInvoiceOrdersBySupplyType$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context27.sent;
          _context27.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context27.sent;
          _context27.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4"));

        case 9:
          result2 = _context27.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context27.next = 15;
            break;
          }

          return _context27.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context27.abrupt("return", result.recordsets[0]);

        case 16:
          _context27.next = 21;
          break;

        case 18:
          _context27.prev = 18;
          _context27.t0 = _context27["catch"](0);
          console.log("getConfirmInvoiceOrdersBySupplyType-->", _context27.t0);

        case 21:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getConfirmInvoiceOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getConfirmInvoiceOrdersByMonth$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context28.sent;
          _context28.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context28.sent;
          _context28.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4"));

        case 9:
          result2 = _context28.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context28.next = 15;
            break;
          }

          return _context28.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context28.abrupt("return", result.recordsets[0]);

        case 16:
          _context28.next = 21;
          break;

        case 18:
          _context28.prev = 18;
          _context28.t0 = _context28["catch"](0);
          console.log("getConfirmInvoiceOrdersByMonth-->", _context28.t0);

        case 21:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getConfirmInvoiceOrdesByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function getConfirmInvoiceOrdesByDate$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context29.sent;
          _context29.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context29.sent;
          pool.close();
          return _context29.abrupt("return", result.recordsets[0]);

        case 11:
          _context29.prev = 11;
          _context29.t0 = _context29["catch"](0);
          console.log("getConfirmInvoiceOrdesByDate-->", _context29.t0);

        case 14:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function ConfirmInvoiceGenerate(ordId) {
  var pool, result, message;
  return regeneratorRuntime.async(function ConfirmInvoiceGenerate$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context30.sent;
          _context30.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", ordId).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=5, ORDER_INVOICE_GENERATED_DATE=GETDATE() WHERE ORDER_PKID=@ORDER_PKID"));

        case 6:
          result = _context30.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context30.abrupt("return", message);

        case 14:
          _context30.prev = 14;
          _context30.t0 = _context30["catch"](0);
          console.log("ConfirmInvoiceGenerate -->", _context30.t0);

        case 17:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function GetAllConfirmInvoiceGeneratetOrders() {
  var pool, result;
  return regeneratorRuntime.async(function GetAllConfirmInvoiceGeneratetOrders$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context31.sent;
          _context31.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5"));

        case 6:
          result = _context31.sent;
          pool.close();
          return _context31.abrupt("return", result.recordsets[0]);

        case 11:
          _context31.prev = 11;
          _context31.t0 = _context31["catch"](0);
          console.log("GetAllConfirmInvoiceGeneratetOrders -->", _context31.t0);

        case 14:
        case "end":
          return _context31.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getInvoiceGeneratetOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getInvoiceGeneratetOrdersBySupplyType$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          _context32.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context32.sent;
          _context32.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context32.sent;
          _context32.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5"));

        case 9:
          result2 = _context32.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context32.next = 15;
            break;
          }

          return _context32.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context32.abrupt("return", result.recordsets[0]);

        case 16:
          _context32.next = 21;
          break;

        case 18:
          _context32.prev = 18;
          _context32.t0 = _context32["catch"](0);
          console.log("getInvoiceGeneratetOrdersBySupplyType-->", _context32.t0);

        case 21:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getInvoiceGeneratetOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function getInvoiceGeneratetOrdersByMonth$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          _context33.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context33.sent;
          _context33.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context33.sent;
          _context33.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5"));

        case 9:
          result2 = _context33.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context33.next = 15;
            break;
          }

          return _context33.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context33.abrupt("return", result.recordsets[0]);

        case 16:
          _context33.next = 21;
          break;

        case 18:
          _context33.prev = 18;
          _context33.t0 = _context33["catch"](0);
          console.log("getInvoiceGeneratetOrdersByMonth-->", _context33.t0);

        case 21:
        case "end":
          return _context33.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getInvoiceGeneratetOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function getInvoiceGeneratetOrdersByDate$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context34.sent;
          _context34.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context34.sent;
          pool.close();
          return _context34.abrupt("return", result.recordsets[0]);

        case 11:
          _context34.prev = 11;
          _context34.t0 = _context34["catch"](0);
          console.log("getInvoiceGeneratetOrdersByDate-->", _context34.t0);

        case 14:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function DispatchOrder(ordId) {
  var pool, result, message;
  return regeneratorRuntime.async(function DispatchOrder$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          _context35.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context35.sent;
          _context35.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", ordId).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=6, ORDER_DISPATCHED_DATE=GETDATE() WHERE ORDER_PKID=@ORDER_PKID"));

        case 6:
          result = _context35.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context35.abrupt("return", message);

        case 14:
          _context35.prev = 14;
          _context35.t0 = _context35["catch"](0);
          console.log("DispatchOrder -->", _context35.t0);

        case 17:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function GetAllDispatchedOrders() {
  var pool, result;
  return regeneratorRuntime.async(function GetAllDispatchedOrders$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context36.sent;
          _context36.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6"));

        case 6:
          result = _context36.sent;
          pool.close();
          return _context36.abrupt("return", result.recordsets[0]);

        case 11:
          _context36.prev = 11;
          _context36.t0 = _context36["catch"](0);
          console.log("GetAllDispatchedOrders -->", _context36.t0);

        case 14:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAllDispatchedOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAllDispatchedOrdersBySupplyType$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context37.sent;
          _context37.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context37.sent;
          _context37.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6"));

        case 9:
          result2 = _context37.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context37.next = 15;
            break;
          }

          return _context37.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context37.abrupt("return", result.recordsets[0]);

        case 16:
          _context37.next = 21;
          break;

        case 18:
          _context37.prev = 18;
          _context37.t0 = _context37["catch"](0);
          console.log("GetAllDispatchedOrdersBySupplyType-->", _context37.t0);

        case 21:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetAllDispatchedOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function GetAllDispatchedOrdersByDate$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          _context38.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context38.sent;
          _context38.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context38.sent;
          pool.close();
          return _context38.abrupt("return", result.recordsets[0]);

        case 11:
          _context38.prev = 11;
          _context38.t0 = _context38["catch"](0);
          console.log("GetAllDispatchedOrdersByDate-->", _context38.t0);

        case 14:
        case "end":
          return _context38.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAllDispatchedOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAllDispatchedOrdersByMonth$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.prev = 0;
          _context39.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context39.sent;
          _context39.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context39.sent;
          _context39.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6"));

        case 9:
          result2 = _context39.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context39.next = 15;
            break;
          }

          return _context39.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context39.abrupt("return", result.recordsets[0]);

        case 16:
          _context39.next = 21;
          break;

        case 18:
          _context39.prev = 18;
          _context39.t0 = _context39["catch"](0);
          console.log("GetAllDispatchedOrdersByMonth-->", _context39.t0);

        case 21:
        case "end":
          return _context39.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function FinalDelivery(ordId) {
  var pool, result, message;
  return regeneratorRuntime.async(function FinalDelivery$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.prev = 0;
          _context40.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context40.sent;
          _context40.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", ordId).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=8, ORDER_DELIVERY_CONFIRMED_DATE=GETDATE() WHERE ORDER_PKID=@ORDER_PKID"));

        case 6:
          result = _context40.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context40.abrupt("return", message);

        case 14:
          _context40.prev = 14;
          _context40.t0 = _context40["catch"](0);
          console.log("FinalDelivery -->", _context40.t0);

        case 17:
        case "end":
          return _context40.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function GetAllDeliveryConfirmedOrders() {
  var pool, result;
  return regeneratorRuntime.async(function GetAllDeliveryConfirmedOrders$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.prev = 0;
          _context41.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context41.sent;
          _context41.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8"));

        case 6:
          result = _context41.sent;
          pool.close();
          return _context41.abrupt("return", result.recordsets[0]);

        case 11:
          _context41.prev = 11;
          _context41.t0 = _context41["catch"](0);
          console.log("GetAllDeliveryConfirmedOrders -->", _context41.t0);

        case 14:
        case "end":
          return _context41.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAllDeliveryConfirmedOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function GetAllDeliveryConfirmedOrdersByDate$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          _context42.prev = 0;
          _context42.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context42.sent;
          _context42.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context42.sent;
          pool.close();
          return _context42.abrupt("return", result.recordsets[0]);

        case 11:
          _context42.prev = 11;
          _context42.t0 = _context42["catch"](0);
          console.log("GetAllDeliveryConfirmedOrdersByDate-->", _context42.t0);

        case 14:
        case "end":
          return _context42.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAllDeliveryConfirmedOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAllDeliveryConfirmedOrdersBySupplyType$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.prev = 0;
          _context43.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context43.sent;
          _context43.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context43.sent;
          _context43.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8"));

        case 9:
          result2 = _context43.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context43.next = 15;
            break;
          }

          return _context43.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context43.abrupt("return", result.recordsets[0]);

        case 16:
          _context43.next = 21;
          break;

        case 18:
          _context43.prev = 18;
          _context43.t0 = _context43["catch"](0);
          console.log("GetAllDeliveryConfirmedOrdersBySupplyType-->", _context43.t0);

        case 21:
        case "end":
          return _context43.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetAllDeliveryConfirmedOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAllDeliveryConfirmedOrdersByMonth$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          _context44.prev = 0;
          _context44.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context44.sent;
          _context44.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context44.sent;
          _context44.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8"));

        case 9:
          result2 = _context44.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context44.next = 15;
            break;
          }

          return _context44.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context44.abrupt("return", result.recordsets[0]);

        case 16:
          _context44.next = 21;
          break;

        case 18:
          _context44.prev = 18;
          _context44.t0 = _context44["catch"](0);
          console.log("GetAllDeliveryConfirmedOrdersByMonth-->", _context44.t0);

        case 21:
        case "end":
          return _context44.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetAllShippingAddressesOfCustomer(custid) {
  var pool, result;
  return regeneratorRuntime.async(function GetAllShippingAddressesOfCustomer$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          _context45.prev = 0;
          _context45.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context45.sent;
          _context45.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_ADDRESS_CUST_FKID", custid).query("select CUSTOMER_ADDRESS_PKID,[CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from  [dbo].[CUSTOMER_ADDRESS]  where [CUSTOMER_ADDRESS_TYPE]='Shipping' and CUSTOMER_ADDRESS_CUST_FKID=@CUSTOMER_ADDRESS_CUST_FKID"));

        case 6:
          result = _context45.sent;
          pool.close();
          return _context45.abrupt("return", result.recordsets[0]);

        case 11:
          _context45.prev = 11;
          _context45.t0 = _context45["catch"](0);
          console.log("GetAllShippingAddressesOfCustomer-->", _context45.t0);

        case 14:
        case "end":
          return _context45.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAllBillingAddressesOfCustomer(custid) {
  var pool, result;
  return regeneratorRuntime.async(function GetAllBillingAddressesOfCustomer$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          _context46.prev = 0;
          _context46.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context46.sent;
          _context46.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("CUSTOMER_ADDRESS_CUST_FKID", custid).query("select CUSTOMER_ADDRESS_PKID,[CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[CUSTOMER_ADDRESS] where [CUSTOMER_ADDRESS_TYPE]='Billing' and CUSTOMER_ADDRESS_CUST_FKID=@CUSTOMER_ADDRESS_CUST_FKID and CUSTOMER_ADDRESS_ISACTIVE =1"));

        case 6:
          result = _context46.sent;
          pool.close();
          return _context46.abrupt("return", result.recordsets[0]);

        case 11:
          _context46.prev = 11;
          _context46.t0 = _context46["catch"](0);
          console.log("GetAllBillingAddressesOfCustomer-->", _context46.t0);

        case 14:
        case "end":
          return _context46.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function placeOrder(obj) {
  var kimo, pool, companyType, KEY_attach, result, attach, d, year, search, replaceWith, passout, carryOrderNumber, str, splitted, num, insertInto, flag, getOrderpkid;
  return regeneratorRuntime.async(function placeOrder$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          console.log("obj:--------- >", obj);
          _context48.prev = 1;
          kimo = obj;
          _context48.next = 5;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 5:
          pool = _context48.sent;
          _context48.next = 8;
          return regeneratorRuntime.awrap(pool.request().query("select  COMPANY_SHORT_KEY from [dbo].[COMPANY] WHERE COMPANY_PKID=".concat(kimo.CompanyID)));

        case 8:
          companyType = _context48.sent;
          console.log("companyType.recordsets[0]------->", companyType.recordsets[0][0].COMPANY_SHORT_KEY);
          KEY_attach = companyType.recordsets[0][0].COMPANY_SHORT_KEY;
          console.log("KEY_attach: ", KEY_attach);
          console.log("placeOrder pool._connected --->", pool._connected);
          _context48.next = 15;
          return regeneratorRuntime.awrap(pool.request().query("select ORDER_NUMBER from [ORDER] WHERE ORDER_PKID=(SELECT MAX(ORDER_PKID) FROM [dbo].[ORDER])"));

        case 15:
          result = _context48.sent;
          attach = "";
          d = new Date();
          year = d.getFullYear();
          search = "20";
          replaceWith = "";
          passout = "".concat(year, "-").concat(year + 1).replaceAll(search, replaceWith);
          console.log("passout: ", passout);
          attach = "".concat(KEY_attach, "-0001/").concat(passout);
          console.log("ORDER_NUMBER-->", result.recordsets[0][0]);
          carryOrderNumber = result.recordsets[0][0];

          if (carryOrderNumber == undefined) {
            console.log("undefined");
            console.log("if attach: ", attach);
          } else {
            console.log("Not undefined");
            str = result.recordsets[0][0].ORDER_NUMBER;
            splitted = str.split(KEY_attach);
            console.log("splitted: ", splitted[1].split("/")[0]);
            split2 = splitted[1].split("/")[0];
            console.log("split2: ", split2.split("-")[1]);
            split3 = parseInt(split2.split("-")[1]);
            console.log("split3: ", split3);
            console.log(parseInt(splitted[1]));
            num = split3 + 1;
            console.log("num: ", num);

            if (num.toString.length == 1) {
              attach = "000" + num;
            } else if (num.toString.length == 2) {
              attach = "00" + num;
            } else if (num.toString.length == 3) {
              attach = "0" + parseInt(splitted[1]);
            } else if (num.toString.length == 4) {
              attach = num;
            } else {}

            attach = "".concat(KEY_attach, "-").concat(attach, "/").concat(passout);
            console.log("else attach: ", attach);
          }

          console.log("outside attach: ", attach);
          console.log("".concat(attach, ",").concat(kimo.OrderBy, ",").concat(kimo.OrderByID, ",").concat(kimo.CustomerID, ",").concat(kimo.CompanyID, ",").concat(kimo.OrderDetails.Logistic, ",").concat(kimo.OrderDetails.LogisticDestination, ",").concat(kimo.OrderDetails.LogisticDestination, ",").concat(kimo.BillingAddress, ",").concat(kimo.DeliveryAddress, ",").concat(kimo.OrderDetails.CashDiscount, ",").concat(kimo.OrderAmount, ",").concat(kimo.OrderDetails.Remark, ",0,0,").concat(kimo.OrderDetails.DeliveryType, ",").concat(kimo.OrderDetails.SupplyType));
          _context48.next = 31;
          return regeneratorRuntime.awrap(pool.request().query("insert into [ORDER] ([ORDER_NUMBER] ,[ORDER_BY] ,[ORDER_BY_FKID] ,[ORDER_CUSTOMER_FKID] ,[ORDER_COMPANY_FKID] ,[ORDER_LOGISTIC] ,[ORDER_LOGISTIC_DESTINATION] ,[ORDER_LOGISTIC_PAY_MODE] ,[ORDER_BILLING_ADDRESS] ,[ORDER_SHIPPING_ADDRESS] ,[ORDER_CASH_DISCOUNT] ,[ORDER_ORDER_AMOUNT] ,[ORDER_REMARK] ,[ORDER_STATUS] ,[ORDER_ISACTIVE] ,[ORDER_DELIVERY_TYPE],[ORDER_SUPPLY_TYPE] ,[ORDER_DATE])  values('".concat(attach, "','").concat(kimo.OrderBy, "','").concat(kimo.OrderByID, "','").concat(kimo.CustomerID, "','").concat(kimo.CompanyID, "','").concat(kimo.OrderDetails.Logistic, "','").concat(kimo.OrderDetails.LogisticDestination, "','").concat(kimo.OrderDetails.LogisticPaymode, "','").concat(kimo.BillingAddress, "','").concat(kimo.DeliveryAddress, "','").concat(kimo.OrderDetails.CashDiscount, "','").concat(kimo.OrderAmount, "','").concat(kimo.OrderDetails.Remark, "','0','0','").concat(kimo.OrderDetails.DeliveryType, "','1',GETDATE())")));

        case 31:
          insertInto = _context48.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context48.next = 62;
            break;
          }

          flag = 2;

          if (!(pool._connected == false)) {
            _context48.next = 38;
            break;
          }

          _context48.next = 37;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 37:
          pool = _context48.sent;

        case 38:
          console.log("inside insert");
          _context48.next = 41;
          return regeneratorRuntime.awrap(pool.request().query("SELECT ORDER_PKID FROM [ORDER] WHERE ORDER_PKID=(SELECT MAX(ORDER_PKID) FROM [ORDER])"));

        case 41:
          getOrderpkid = _context48.sent;
          console.log("getOrderpkid.recordsets[0][0].ORDER_PKID: ", getOrderpkid.recordsets[0][0].ORDER_PKID);

          if (!getOrderpkid.recordsets[0][0].ORDER_PKID) {
            _context48.next = 48;
            break;
          }

          console.log("Main if: ");
          kimo.Products.map(function _callee(i) {
            var OrderItemsIntonew;
            return regeneratorRuntime.async(function _callee$(_context47) {
              while (1) {
                switch (_context47.prev = _context47.next) {
                  case 0:
                    if (!(pool._connected == false)) {
                      _context47.next = 4;
                      break;
                    }

                    _context47.next = 3;
                    return regeneratorRuntime.awrap(sql.connect(config));

                  case 3:
                    pool = _context47.sent;

                  case 4:
                    console.log("------------------------------");
                    _context47.next = 7;
                    return regeneratorRuntime.awrap(pool.request().query("insert into ORDER_ITEM ([ORDER_ITEM_ORDER_FKID] ,[ORDER_ITEM_PRODUCT_FKID] ,[ORDER_ITEM_UNIT] ,[ORDER_ITEM_QTY] ,[ORDER_ITEM_CUSTOMER_PRICE] ,[ORDER_ITEM_TOTAL_AMOUNT] ,[ORDER_ITEM_DISCOUNT] ,[ORDER_ITEM_FREE_UNIT_SCHEME] ,[ORDER_ITEM_ACTUAL_AMOUNT])  values(".concat(getOrderpkid.recordsets[0][0].ORDER_PKID, ",").concat(i.ProductID, ",").concat(i.PackageID, ",").concat(i.Quantity, ",").concat(i.PackageAmt, ",").concat(i.ProductAmount, ",").concat(i.Discount, ",").concat(i.FreeUnitScheme, ",").concat(i.FinalAmount, ")")));

                  case 7:
                    OrderItemsIntonew = _context47.sent;
                    console.log(OrderItemsIntonew.rowsAffected[0]);

                    if (!(OrderItemsIntonew.rowsAffected[0] == 1)) {
                      _context47.next = 16;
                      break;
                    }

                    console.log("if");
                    pool.close();
                    flag = 1;
                    return _context47.abrupt("return", true);

                  case 16:
                    console.log("else: ");
                    pool.close();
                    flag = 0;
                    return _context47.abrupt("return", false);

                  case 20:
                  case "end":
                    return _context47.stop();
                }
              }
            });
          });
          _context48.next = 52;
          break;

        case 48:
          console.log("Main else: ");
          flag = 0;
          pool.close();
          return _context48.abrupt("return", false);

        case 52:
          console.log("flag: ", flag);

          if (!(flag == 0)) {
            _context48.next = 58;
            break;
          }

          console.log("false--");
          return _context48.abrupt("return", false);

        case 58:
          console.log("true");
          return _context48.abrupt("return", true);

        case 60:
          _context48.next = 65;
          break;

        case 62:
          console.log("last false");
          pool.close();
          return _context48.abrupt("return", false);

        case 65:
          _context48.next = 70;
          break;

        case 67:
          _context48.prev = 67;
          _context48.t0 = _context48["catch"](1);
          console.log("placeOrder-->", _context48.t0);

        case 70:
        case "end":
          return _context48.stop();
      }
    }
  }, null, null, [[1, 67]]);
}

function getAdminOrders() {
  var pool, result;
  return regeneratorRuntime.async(function getAdminOrders$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.prev = 0;
          _context49.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context49.sent;
          _context49.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] where ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] where ORD.ORDER_BY = 'admin'"));

        case 6:
          result = _context49.sent;
          pool.close();
          return _context49.abrupt("return", result.recordsets[0]);

        case 11:
          _context49.prev = 11;
          _context49.t0 = _context49["catch"](0);
          console.log("getAdminOrders-->", _context49.t0); // pool.close();

        case 14:
        case "end":
          return _context49.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAdminOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAdminOrdersBySupplyType$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          console.log("supplyId: ", supplyId);
          _context50.prev = 1;
          _context50.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context50.sent;
          _context50.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select distinct (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER , (SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME], (SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin' and [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 7:
          result = _context50.sent;
          _context50.next = 10;
          return regeneratorRuntime.awrap(pool.request().query(" select  distinct ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]  WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]  WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin'"));

        case 10:
          result2 = _context50.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context50.next = 16;
            break;
          }

          return _context50.abrupt("return", result2.recordsets[0]);

        case 16:
          return _context50.abrupt("return", result.recordsets[0]);

        case 17:
          _context50.next = 22;
          break;

        case 19:
          _context50.prev = 19;
          _context50.t0 = _context50["catch"](1);
          console.log("GetAdminOrdersBySupplyType-->", _context50.t0);

        case 22:
        case "end":
          return _context50.stop();
      }
    }
  }, null, null, [[1, 19]]);
}

function GetAdminOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAdminOrdersByMonth$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          _context51.prev = 0;
          _context51.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context51.sent;
          _context51.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER , (SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin' and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context51.sent;
          _context51.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*, (SELECT CONVERT(TIME, ORDER_DATE)) as clock,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin'"));

        case 9:
          result2 = _context51.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context51.next = 15;
            break;
          }

          return _context51.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context51.abrupt("return", result.recordsets[0]);

        case 16:
          _context51.next = 21;
          break;

        case 18:
          _context51.prev = 18;
          _context51.t0 = _context51["catch"](0);
          console.log("GetAdminOrdersByMonth-->", _context51.t0);

        case 21:
        case "end":
          return _context51.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetAdminOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function GetAdminOrdersByDate$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          _context52.prev = 0;
          _context52.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context52.sent;
          _context52.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*, (SELECT CONVERT(TIME, ORDER_DATE)) as clock,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin' and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context52.sent;
          pool.close();
          return _context52.abrupt("return", result.recordsets[0]);

        case 11:
          _context52.prev = 11;
          _context52.t0 = _context52["catch"](0);
          console.log("GetAdminOrdersByDate-->", _context52.t0);

        case 14:
        case "end":
          return _context52.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function ConfirmForDeliveryCheck(obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function ConfirmForDeliveryCheck$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          _context53.prev = 0;
          _context53.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context53.sent;
          _context53.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("ORDER_PKID", obj.OrderPkid).input("ORDER_INVOICE_DOC", obj.InvoiceDoc).query("UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=7 ,ORDER_INVOICE_DOC=@ORDER_INVOICE_DOC WHERE ORDER_PKID=@ORDER_PKID"));

        case 6:
          result = _context53.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context53.abrupt("return", message);

        case 14:
          _context53.prev = 14;
          _context53.t0 = _context53["catch"](0);
          console.log("FinalDelivery -->", _context53.t0);

        case 17:
        case "end":
          return _context53.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function GetAllInvoiceUploadedOrders() {
  var pool, result;
  return regeneratorRuntime.async(function GetAllInvoiceUploadedOrders$(_context54) {
    while (1) {
      switch (_context54.prev = _context54.next) {
        case 0:
          _context54.prev = 0;
          _context54.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context54.sent;
          _context54.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7"));

        case 6:
          result = _context54.sent;
          pool.close();
          return _context54.abrupt("return", result.recordsets[0]);

        case 11:
          _context54.prev = 11;
          _context54.t0 = _context54["catch"](0);
          console.log("GetAllInvoiceUploadedOrders -->", _context54.t0);

        case 14:
        case "end":
          return _context54.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetAllInvoiceUploadedOrdersByMonth(MONTH_NUMBER) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAllInvoiceUploadedOrdersByMonth$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          _context55.prev = 0;
          _context55.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context55.sent;
          _context55.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context55.sent;
          _context55.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7"));

        case 9:
          result2 = _context55.sent;
          pool.close();

          if (!(MONTH_NUMBER == 0)) {
            _context55.next = 15;
            break;
          }

          return _context55.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context55.abrupt("return", result.recordsets[0]);

        case 16:
          _context55.next = 21;
          break;

        case 18:
          _context55.prev = 18;
          _context55.t0 = _context55["catch"](0);
          console.log("GetAllInvoiceUploadedOrdersByMonth-->", _context55.t0);

        case 21:
        case "end":
          return _context55.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetAllInvoiceUploadedOrdersBySupplyType(supplyId) {
  var pool, result, result2;
  return regeneratorRuntime.async(function GetAllInvoiceUploadedOrdersBySupplyType$(_context56) {
    while (1) {
      switch (_context56.prev = _context56.next) {
        case 0:
          _context56.prev = 0;
          _context56.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context56.sent;
          _context56.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context56.sent;
          _context56.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7"));

        case 9:
          result2 = _context56.sent;
          pool.close();

          if (!(supplyId == 0)) {
            _context56.next = 15;
            break;
          }

          return _context56.abrupt("return", result2.recordsets[0]);

        case 15:
          return _context56.abrupt("return", result.recordsets[0]);

        case 16:
          _context56.next = 21;
          break;

        case 18:
          _context56.prev = 18;
          _context56.t0 = _context56["catch"](0);
          console.log("GetAllInvoiceUploadedOrdersBySupplyType-->", _context56.t0);

        case 21:
        case "end":
          return _context56.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function GetAllInvoiceUploadedOrdersByDate(fdate, tdate) {
  var pool, result;
  return regeneratorRuntime.async(function GetAllInvoiceUploadedOrdersByDate$(_context57) {
    while (1) {
      switch (_context57.prev = _context57.next) {
        case 0:
          _context57.prev = 0;
          _context57.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context57.sent;
          _context57.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select DISTINCT (select count(*) FROM [ORDER] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 6:
          result = _context57.sent;
          pool.close();
          return _context57.abrupt("return", result.recordsets[0]);

        case 11:
          _context57.prev = 11;
          _context57.t0 = _context57["catch"](0);
          console.log("GetAllDeliveryConfirmedOrdersByDate-->", _context57.t0);

        case 14:
        case "end":
          return _context57.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

module.exports = (_module$exports = {
  getRemarksOrdersById: getRemarksOrdersById,
  getBillingAddressOrdersById: getBillingAddressOrdersById,
  getShippingAddressOrdersById: getShippingAddressOrdersById,
  getOrders: getOrders,
  getItemsByOrderId: getItemsByOrderId,
  AcceptOrderRequest: AcceptOrderRequest,
  RejectOrderRequest: RejectOrderRequest,
  addSupplyType: addSupplyType,
  getSupplyType: getSupplyType,
  deleteSupplyType: deleteSupplyType,
  updateSupplyType: updateSupplyType,
  GetPendingOrdersBySupplyType: GetPendingOrdersBySupplyType,
  GetPendingOrdersByMonth: GetPendingOrdersByMonth,
  GetPendingOrdersByDate: GetPendingOrdersByDate,
  getAllApprovedOrders: getAllApprovedOrders,
  getApprovedOrdersByDate: getApprovedOrdersByDate,
  getApprovedOrdersBySupplyType: getApprovedOrdersBySupplyType,
  getApprovedOrdersByMonth: getApprovedOrdersByMonth,
  ApprovedOrderConfirm: ApprovedOrderConfirm
}, _defineProperty(_module$exports, "getApprovedOrdersByDate", getApprovedOrdersByDate), _defineProperty(_module$exports, "getApprovedOrdersBySupplyType", getApprovedOrdersBySupplyType), _defineProperty(_module$exports, "getApprovedOrdersByMonth", getApprovedOrdersByMonth), _defineProperty(_module$exports, "ApprovedOrderConfirm", ApprovedOrderConfirm), _defineProperty(_module$exports, "GetAllScheduledOrder", GetAllScheduledOrder), _defineProperty(_module$exports, "getScheduledOrdersByDate", getScheduledOrdersByDate), _defineProperty(_module$exports, "getScheduledOrdersBySupplyType", getScheduledOrdersBySupplyType), _defineProperty(_module$exports, "getScheduledOrdersByMonth", getScheduledOrdersByMonth), _defineProperty(_module$exports, "getOrderProcessRemark", getOrderProcessRemark), _defineProperty(_module$exports, "ConfirmForInvoice", ConfirmForInvoice), _defineProperty(_module$exports, "GetAllConfirmInvoiceOrder", GetAllConfirmInvoiceOrder), _defineProperty(_module$exports, "getConfirmInvoiceOrdersBySupplyType", getConfirmInvoiceOrdersBySupplyType), _defineProperty(_module$exports, "getConfirmInvoiceOrdersByMonth", getConfirmInvoiceOrdersByMonth), _defineProperty(_module$exports, "getConfirmInvoiceOrdesByDate", getConfirmInvoiceOrdesByDate), _defineProperty(_module$exports, "ConfirmInvoiceGenerate", ConfirmInvoiceGenerate), _defineProperty(_module$exports, "GetAllConfirmInvoiceGeneratetOrders", GetAllConfirmInvoiceGeneratetOrders), _defineProperty(_module$exports, "getInvoiceGeneratetOrdersBySupplyType", getInvoiceGeneratetOrdersBySupplyType), _defineProperty(_module$exports, "getInvoiceGeneratetOrdersByMonth", getInvoiceGeneratetOrdersByMonth), _defineProperty(_module$exports, "getInvoiceGeneratetOrdersByDate", getInvoiceGeneratetOrdersByDate), _defineProperty(_module$exports, "DispatchOrder", DispatchOrder), _defineProperty(_module$exports, "GetAllDispatchedOrders", GetAllDispatchedOrders), _defineProperty(_module$exports, "GetAllDispatchedOrdersBySupplyType", GetAllDispatchedOrdersBySupplyType), _defineProperty(_module$exports, "GetAllDispatchedOrdersByDate", GetAllDispatchedOrdersByDate), _defineProperty(_module$exports, "GetAllDispatchedOrdersByMonth", GetAllDispatchedOrdersByMonth), _defineProperty(_module$exports, "FinalDelivery", FinalDelivery), _defineProperty(_module$exports, "GetAllDeliveryConfirmedOrdersByDate", GetAllDeliveryConfirmedOrdersByDate), _defineProperty(_module$exports, "GetAllDeliveryConfirmedOrdersBySupplyType", GetAllDeliveryConfirmedOrdersBySupplyType), _defineProperty(_module$exports, "GetAllDeliveryConfirmedOrdersByMonth", GetAllDeliveryConfirmedOrdersByMonth), _defineProperty(_module$exports, "GetAllDeliveryConfirmedOrders", GetAllDeliveryConfirmedOrders), _defineProperty(_module$exports, "GetAllShippingAddressesOfCustomer", GetAllShippingAddressesOfCustomer), _defineProperty(_module$exports, "placeOrder", placeOrder), _defineProperty(_module$exports, "GetAllBillingAddressesOfCustomer", GetAllBillingAddressesOfCustomer), _defineProperty(_module$exports, "getAdminOrders", getAdminOrders), _defineProperty(_module$exports, "GetAdminOrdersBySupplyType", GetAdminOrdersBySupplyType), _defineProperty(_module$exports, "GetAdminOrdersByMonth", GetAdminOrdersByMonth), _defineProperty(_module$exports, "GetAdminOrdersByDate", GetAdminOrdersByDate), _defineProperty(_module$exports, "ConfirmForDeliveryCheck", ConfirmForDeliveryCheck), _defineProperty(_module$exports, "GetAllInvoiceUploadedOrders", GetAllInvoiceUploadedOrders), _defineProperty(_module$exports, "GetAllInvoiceUploadedOrdersByMonth", GetAllInvoiceUploadedOrdersByMonth), _defineProperty(_module$exports, "GetAllInvoiceUploadedOrdersByDate", GetAllInvoiceUploadedOrdersByDate), _defineProperty(_module$exports, "GetAllInvoiceUploadedOrdersBySupplyType", GetAllInvoiceUploadedOrdersBySupplyType), _module$exports);