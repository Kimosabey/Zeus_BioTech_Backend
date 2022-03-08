/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-04 14:28:13
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-08 11:34:11
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
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND ORDER_STATUS=0"
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
        "select items.*,[PRODUCT_NAME], [PRODUCT_UNIT],[PRODUCT_MRP] from [dbo].[ORDER_ITEM] as items join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] join [dbo].[PRODUCT_MASTER] ON [PRODUCT_PKID]=[ORDER_ITEM_PRODUCT_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getItemByOrderId-->", error);
    // pool.close();
  }
}

async function AcceptOrderRequest(reqId) {
  console.log("reqId: ", reqId);
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", reqId)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1 , ORDER_STATUS=1 WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();
    console.log("message: ", message);
    return message;
  } catch (error) {
    console.log("AcceptOrderRequest-->", error);
  }
}

async function RejectOrderRequest(reqId) {
  console.log("reqId: ", reqId);
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", reqId)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =0 , ORDER_STATUS=2 WHERE ORDER_PKID=@ORDER_PKID`
      );

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
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .query(
        "select ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"
      );
    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetPendingOrdersBySupplyType-->", error);
  }
}

async function GetPendingOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetPendingOrdersByMonth-->", error);
  }
}

async function GetPendingOrdersByDate(fdate, tdate) {
  console.log("fdate, tdate: ", fdate, tdate);
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetPendingOrdersByDate-->", error);
  }
}

async function getAllApprovedOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getAllApprovedOrders-->", error);
  }
}

async function getApprovedOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetApprovedOrdersByDate-->", error);
  }
}

async function getApprovedOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .query(
        "select ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"
      );
    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getApprovedOrdersBySupplyType-->", error);
  }
}

async function getApprovedOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getApprovedOrdersByMonth-->", error);
  }
}

async function ApprovedOrderConfirm(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", obj.OrderPkid)
      .input("ORDER_REMARK_BY_PROCESSTEAM", obj.OrderRemarkRes)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=3, ORDER_REMARK_BY_PROCESSTEAM=@ORDER_REMARK_BY_PROCESSTEAM WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("ApprovedOrderConfirm -->", error);
  }
}

async function GetAllScheduledOrder() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllScheduledOrder -->", error);
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
  GetPendingOrdersByMonth: GetPendingOrdersByMonth,
  GetPendingOrdersByDate: GetPendingOrdersByDate,

  getAllApprovedOrders: getAllApprovedOrders,
  getApprovedOrdersByDate: getApprovedOrdersByDate,
  getApprovedOrdersBySupplyType: getApprovedOrdersBySupplyType,
  getApprovedOrdersByMonth: getApprovedOrdersByMonth,

  ApprovedOrderConfirm: ApprovedOrderConfirm,
  GetAllScheduledOrder: GetAllScheduledOrder,
};
