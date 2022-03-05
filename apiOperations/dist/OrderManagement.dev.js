"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-04 14:28:13
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-05 14:57:13
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
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select [ORDER_REMARK] from [dbo].[ORDER_ITEM] join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"));

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
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query(" select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_BILLING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID  and [CUSTOMER_ADDRESS_TYPE]='Billing'"));

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
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_SHIPPING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID and [CUSTOMER_ADDRESS_TYPE]='Shipping'"));

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
          return regeneratorRuntime.awrap(pool.request().query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND ORDER_STATUS=0"));

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
          return regeneratorRuntime.awrap(pool.request().input("ORDER_ITEM_ORDER_FKID", ordId).query("select items.*,[PRODUCT_NAME], [PRODUCT_UNIT],[PRODUCT_MRP] from [dbo].[ORDER_ITEM] as items join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] join [dbo].[PRODUCT_MASTER] ON [PRODUCT_PKID]=[ORDER_ITEM_PRODUCT_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"));

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
          return _context8.abrupt("return", result.recordsets[0]);

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.log("getSupplyType-->", _context8.t0);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
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
          return regeneratorRuntime.awrap(pool.request().input("TypeId", TypeId).input("SUPPLY_NAME", obj.SUPPLY_NAME).query("UPDATE CUSTOMER_ADDRESS SET [SUPPLY_NAME]=@SUPPLY_NAME  WHERE SUPPLY_TYPE_PKID =@TypeId"));

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
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context12.sent;
          _context12.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"));

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
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context13.sent;
          _context13.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"));

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
          console.log("fdate, tdate: ", fdate, tdate);
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context14.sent;
          _context14.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 and cast(ORDER_DATE as date) between @fdate and @tdate"));

        case 7:
          result = _context14.sent;
          pool.close();
          return _context14.abrupt("return", result.recordsets[0]);

        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](1);
          console.log("GetPendingOrdersByDate-->", _context14.t0);

        case 15:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 12]]);
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
          return regeneratorRuntime.awrap(pool.request().query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"));

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
          return regeneratorRuntime.awrap(pool.request().input("fdate", fdate).input("tdate", tdate).query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and cast(ORDER_DATE as date) between @fdate and @tdate"));

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
          return regeneratorRuntime.awrap(pool.request().input("SUPPLY_TYPE_PKID", supplyId).query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"));

        case 6:
          result = _context17.sent;
          _context17.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"));

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
          return regeneratorRuntime.awrap(pool.request().input("MONTH_NUMBER", MONTH_NUMBER).query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"));

        case 6:
          result = _context18.sent;
          _context18.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"));

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

module.exports = {
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
  getApprovedOrdersByMonth: getApprovedOrdersByMonth
};