/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-04 14:28:13
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-04 18:59:28
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getRemarksOrdersById(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select [ORDER_REMARK] from [dbo].[ORDER_ITEM] join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getRemarksOrdersById-->", error);
    // pool.close();
  }
}

async function getBillingAddressOrdersById(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        " select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_BILLING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID  and [CUSTOMER_ADDRESS_TYPE]='Billing'"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getBillingAddressOrdersById-->", error);
    // pool.close();
  }
}

async function getShippingAddressOrdersById(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_SHIPPING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID and [CUSTOMER_ADDRESS_TYPE]='Shipping'"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getShippingAddressOrdersById-->", error);
    // pool.close();
  }
}

async function getOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_EMAIL from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getOrders-->", error);
    // pool.close();
  }
}

async function getItemsByOrderId(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select items.* from [dbo].[ORDER_ITEM] as items join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getItemByOrderId-->", error);
    // pool.close();
  }
}

async function AcceptOrderRequest(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", reqId)
      .query(`UPDATE ORDER SET ORDER_ISACTIVE =1 WHERE ORDER_PKID=@ORDER_PKID`);

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("AcceptOrderRequest-->", error);
  }
}

async function RejectOrderRequest(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", reqId)
      .query(`UPDATE ORDER SET ORDER_ISACTIVE =2 WHERE ORDER_PKID=@ORDER_PKID`);

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("RejectOrderRequest-->", error);
  }
}

async function getSupplyType() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT [SUPPLY_TYPE_PKID] ,[SUPPLY_NAME] ,[SUPPLY_TYPE_ISACTIVE] FROM [SUPPLY_TYPE] WHERE SUPPLY_TYPE_ISACTIVE=1"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getSupplyType-->", error);
  }
}

async function addSupplyType(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("SUPPLY_NAME", sql.VarChar, obj.SUPPLY_NAME)
      .query("SELECT * from SUPPLY_TYPE WHERE SUPPLY_NAME=@SUPPLY_NAME");
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("SUPPLY_NAME", obj.SUPPLY_NAME)
        .query(
          "insert into SUPPLY_TYPE ([SUPPLY_NAME] ,[SUPPLY_TYPE_ISACTIVE])  values(@SUPPLY_NAME,1)"
        );
      if (insertInto.rowsAffected == 1) {
        pool.close();
        return true;
      } else {
        pool.close();
        return false;
      }
    } else {
      pool.close();
      return "0";
    }
  } catch (err) {
    console.log("addSupplyType-->", err);
  }
}

async function deleteSupplyType(TypeId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("TypeId", TypeId)
      .query(
        "UPDATE SUPPLY_TYPE SET SUPPLY_TYPE_ISACTIVE=0 WHERE SUPPLY_TYPE_PKID=@TypeId"
      );

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteSupply-->", error);
  }
}

async function updateSupplyType(TypeId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("TypeId", TypeId)
      .input("SUPPLY_NAME", obj.SUPPLY_NAME)
      .query(
        `UPDATE CUSTOMER_ADDRESS SET [SUPPLY_NAME]=@SUPPLY_NAME  WHERE SUPPLY_TYPE_PKID =@TypeId`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("updateSupplyType-->", error);
  }
}

async function GetPendingOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        " select [ORDER_NUMBER],[SUPPLY_NAME] FROM [dbo].[ORDER] join [dbo].[SUPPLY_TYPE] on [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE [ORDER_ISACTIVE] = 0 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetPendingOrdersBySupplyType-->", error);
  }
}


async function GetPendingOrdersByMonth(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select [ORDER_NUMBER], [SUPPLY_NAME] FROM [dbo].[ORDER] join [dbo].[SUPPLY_TYPE] on [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE [ORDER_ISACTIVE] = 0 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetPendingOrdersByMonth-->", error);
  }
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
};
