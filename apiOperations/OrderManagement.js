/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-04 14:28:13
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-21 18:34:21
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
        "select DISTINCT [ORDER_REMARK] from [dbo].[ORDER_ITEM] join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getRemarksOrdersById-->", error);
    //pool.close();
  }
}

async function getBillingAddressOrdersById(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_BILLING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID  and [CUSTOMER_ADDRESS_TYPE]='Billing'"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getBillingAddressOrdersById-->", error);
    //pool.close();
  }
}

async function getShippingAddressOrdersById(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select [CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[ORDER] join [dbo].[CUSTOMER_ADDRESS] on [CUSTOMER_ADDRESS_CUST_FKID] = [ORDER_CUSTOMER_FKID] and [CUSTOMER_ADDRESS_PKID]=[ORDER_SHIPPING_ADDRESS] where [ORDER_PKID]=@ORDER_ITEM_ORDER_FKID and [CUSTOMER_ADDRESS_TYPE]='Shipping' "
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getShippingAddressOrdersById-->", error);
    //pool.close();
  }
}

async function getOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select distinct (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND ORDER_STATUS=0"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getOrders-->", error);
    //pool.close();
  }
}

async function getItemsByOrderId(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select items.*,pkg.*,uom.UNIT_OF_MEASUREMENT_SHORT_KEY,[PRODUCT_NAME] from [dbo].[ORDER_ITEM] as items join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] join [dbo].[PRODUCT_MASTER] ON [PRODUCT_PKID]=[ORDER_ITEM_PRODUCT_FKID] JOIN PRODUCT_PACKAGES pkg on  PRD_PACKAG_PKID=items.ORDER_ITEM_UNIT JOIN UNIT_OF_MEASUREMENT uom ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getItemByOrderId-->", error);
    //pool.close();
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
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1 , ORDER_STATUS=2 WHERE ORDER_PKID=@ORDER_PKID`
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

    console.log("pool._connected  recon getSupplyType: 1", pool._connected);

    if (pool._connected == false) {
      pool = await sql.connect(config);
    }

    console.log("pool._connected  recon getSupplyType: 2", pool._connected);

    pool.close();

    console.log("pool._connected  recon getSupplyType: 3", pool._connected);

    return result.recordsets[0];
  } catch (error) {
    console.log("getSupplyType-->", error);
    //pool.close();
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
        `UPDATE SUPPLY_TYPE SET [SUPPLY_NAME]=@SUPPLY_NAME  WHERE SUPPLY_TYPE_PKID =@TypeId`
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
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0`
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
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=0`
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
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON SUPPLY_TYPE_PKID=ORD.ORDER_SUPPLY_TYPE  WHERE ORDER_ISACTIVE=0 and cast(ORDER_DATE as date) between @fdate and @tdate`
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
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"
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
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and cast(ORDER_DATE as date) between @fdate and @tdate`
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
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"
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
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=1"
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
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllScheduledOrder -->", error);
  }
}

async function getScheduledOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getScheduledOrdersByDate-->", error);
  }
}

async function getScheduledOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"
      );
    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getScheduledOrdersBySupplyType-->", error);
  }
}

async function getScheduledOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=3"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getScheduledOrdersByMonth-->", error);
  }
}

async function getOrderProcessRemark(ordId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ORDER_ITEM_ORDER_FKID", ordId)
      .query(
        "select DISTINCT ORDER_REMARK_BY_PROCESSTEAM from [dbo].[ORDER_ITEM] join [dbo].[ORDER] on [ORDER_PKID]=[ORDER_ITEM_ORDER_FKID] where [ORDER_ITEM_ORDER_FKID]=@ORDER_ITEM_ORDER_FKID"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getOrderProcessRemark-->", error);
    //pool.close();
  }
}

async function ConfirmForInvoice(ordId, TentativeDate) {
  console.log("ordId, TentativeDate: ", ordId, TentativeDate);
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", ordId)
      .input("ORDER_TENTATIVE_DATE", TentativeDate)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=4, ORDER_TENTATIVE_DATE=@ORDER_TENTATIVE_DATE WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("ConfirmForInvoice -->", error);
  }
}

async function GetAllConfirmInvoiceOrder() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllConfirmInvoiceOrder -->", error);
  }
}

async function getConfirmInvoiceOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4"
      );
    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getConfirmInvoiceOrdersBySupplyType-->", error);
  }
}

async function getConfirmInvoiceOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getConfirmInvoiceOrdersByMonth-->", error);
  }
}

async function getConfirmInvoiceOrdesByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=4 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getConfirmInvoiceOrdesByDate-->", error);
  }
}

async function ConfirmInvoiceGenerate(ordId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", ordId)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=5, ORDER_INVOICE_GENERATED_DATE=GETDATE() WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("ConfirmInvoiceGenerate -->", error);
  }
}

async function GetAllConfirmInvoiceGeneratetOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllConfirmInvoiceGeneratetOrders -->", error);
  }
}

async function getInvoiceGeneratetOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5"
      );
    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getInvoiceGeneratetOrdersBySupplyType-->", error);
  }
}

async function getInvoiceGeneratetOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("getInvoiceGeneratetOrdersByMonth-->", error);
  }
}

async function getInvoiceGeneratetOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=5 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getInvoiceGeneratetOrdersByDate-->", error);
  }
}

async function DispatchOrder(ordId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", ordId)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=6, ORDER_DISPATCHED_DATE=GETDATE() WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("DispatchOrder -->", error);
  }
}

async function GetAllDispatchedOrders() {
  try {
    let pool = await sql.connect(config);


    let result = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllDispatchedOrders -->", error);
  }
}


async function GetAllDispatchedOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6"
      );

    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAllDispatchedOrdersBySupplyType-->", error);
  }
}

async function GetAllDispatchedOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllDispatchedOrdersByDate-->", error);
  }
}

async function GetAllDispatchedOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=6"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAllDispatchedOrdersByMonth-->", error);
  }
}

async function FinalDelivery(ordId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", ordId)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=8, ORDER_DELIVERY_CONFIRMED_DATE=GETDATE() WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("FinalDelivery -->", error);
  }
}

async function GetAllDeliveryConfirmedOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllDeliveryConfirmedOrders -->", error);
  }
}

async function GetAllDeliveryConfirmedOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllDeliveryConfirmedOrdersByDate-->", error);
  }
}

async function GetAllDeliveryConfirmedOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8"
      );

    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAllDeliveryConfirmedOrdersBySupplyType-->", error);
  }
}

async function GetAllDeliveryConfirmedOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=8"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAllDeliveryConfirmedOrdersByMonth-->", error);
  }
}

async function GetAllShippingAddressesOfCustomer(custid) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("CUSTOMER_ADDRESS_CUST_FKID", custid)
      .query(
        "select CUSTOMER_ADDRESS_PKID,[CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from  [dbo].[CUSTOMER_ADDRESS]  where [CUSTOMER_ADDRESS_TYPE]='Shipping' and CUSTOMER_ADDRESS_CUST_FKID=@CUSTOMER_ADDRESS_CUST_FKID"
      );

    console.log(
      "pool._connected recon GetAllShippingAddressesOfCustomer: 1",
      pool._connected
    );

    if (pool._connected == false) {
      pool = await sql.connect(config);
    }

    console.log(
      "pool._connected recon GetAllShippingAddressesOfCustomer: 2",
      pool._connected
    );

    pool.close();

    console.log(
      "pool._connected recon GetAllShippingAddressesOfCustomer: 3",
      pool._connected
    );

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllShippingAddressesOfCustomer-->", error);
  }
}

async function GetAllBillingAddressesOfCustomer(custid) {
  try {
    var pool = await sql.connect(config);

    if (pool._connected == false) {
      pool = await sql.connect(config);
      console.log(
        "pool._connected recon GetAllBillingAddressesOfCustomer: 0 ",
        pool._connected
      );
    }

    let result = await pool
      .request()
      .input("CUSTOMER_ADDRESS_CUST_FKID", custid)
      .query(
        "select CUSTOMER_ADDRESS_PKID,[CUSTOMER_ADDRESS_ADDRESS1],[CUSTOMER_ADDRESS_ADDRESS2],[CUSTOMER_ADDRESS_ADDRESS3],[CUSTOMER_ADDRESS_ZIP_CODE] from [dbo].[CUSTOMER_ADDRESS] where [CUSTOMER_ADDRESS_TYPE]='Billing' and CUSTOMER_ADDRESS_CUST_FKID=@CUSTOMER_ADDRESS_CUST_FKID and CUSTOMER_ADDRESS_ISACTIVE =1"
      );

    console.log(
      "pool._connected recon GetAllBillingAddressesOfCustomer: 1",
      pool._connected
    );

    if (pool._connected == false) {
      pool = await sql.connect(config);
    }
    console.log(
      "pool._connected recon GetAllBillingAddressesOfCustomer: 2",
      pool._connected
    );

    pool.close();

    console.log(
      "pool._connected recon GetAllBillingAddressesOfCustomer: 3",
      pool._connected
    );

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllBillingAddressesOfCustomer-->", error);
  } finally {
    pool.close();
  }
}

async function placeOrder(obj) {
  console.log("placeOrder  --------- >", obj);
  try {
    var kimo = obj;

    let pool = await sql.connect(config);
    let companyType = await pool
      .request()
      .query(
        `select  COMPANY_SHORT_KEY from [dbo].[COMPANY] WHERE COMPANY_PKID=${kimo.CompanyID}`
      );

    console.log(
      "companyType.recordsets[0]------->",
      companyType.recordsets[0][0].COMPANY_SHORT_KEY
    );

    var KEY_attach = String(companyType.recordsets[0][0].COMPANY_SHORT_KEY);

    console.log("KEY_attach: ", KEY_attach);

    console.log(
      `select ORDER_NUMBER from [ORDER] WHERE ORDER_NUMBER LIKE '${KEY_attach}-%' AND ORDER_PKID=(SELECT MAX(ORDER_PKID) FROM [ORDER])`
    );

    let result = await pool
      .request()
      .query(
        `select ORDER_NUMBER from [ORDER] WHERE ORDER_PKID=(SELECT MAX(ORDER_PKID) FROM [ORDER] WHERE ORDER_NUMBER LIKE '${KEY_attach}-%')`
      );

    console.log("result.recordsets[0][0]: ", result.recordsets[0][0]);

    var attach = "";

    const d = new Date();
    var year = d.getFullYear();
    const search = "20";
    const replaceWith = "";
    var passout = `${year}-${year + 1}`.replaceAll(search, replaceWith);
    console.log("passout: ", passout);
    attach = `${KEY_attach}-0001/${passout}`;

    var carryOrderNumber = result.recordsets[0][0];
    console.log("carryOrderNumber: ", carryOrderNumber);

    if (
      carryOrderNumber == undefined ||
      carryOrderNumber == null ||
      carryOrderNumber == ""
    ) {
      console.log("undefined");
      attach = `${KEY_attach}-0001/${passout}`;
      console.log("if KEY_attach: ", attach);
    } else {
      console.log("Not undefined");
      console.log("else KEY_attach: ", KEY_attach);
      var str = KEY_attach.toString();
      console.log("str: ", str);
      var split_By_forwardSlash =
        carryOrderNumber.ORDER_NUMBER.toString().split("/");
      console.log("split_By_forwardSlash: ", split_By_forwardSlash);

      var leftPart = split_By_forwardSlash[0].toString();
      console.log("leftPart: ", leftPart);

      var split_By_hyphen = leftPart.toString().split("-");
      console.log("split_By_hyphen: ", split_By_hyphen);

      var split_By_hyphen_0 = split_By_hyphen[0].toString();
      console.log("split_By_hyphen_0: ", split_By_hyphen_0);

      var split_By_hyphen_1 = split_By_hyphen[1].toString();
      console.log("split_By_hyphen_1: ", split_By_hyphen_1);
      console.log("split_By_hyphen_1.length: ", split_By_hyphen_1.length);

      var rightPart = split_By_forwardSlash[1].toString();
      console.log("rightPart: ", rightPart);

      var num = parseInt(split_By_hyphen_1) + 1;

      console.log("num: ", num);
      console.log("num.toString().length: ", num.toString().length);

      if (num.toString().length == 1) {
        console.log("num.toString().length == 1: ");
        attach = `000${num}`;
      } else if (num.toString().length == 2) {
        console.log("num.toString().length == 2: ");
        attach = `00${num}`;
      } else if (num.toString().length == 3) {
        console.log("num.toString().length == 3: ");
        attach = `0${num}`;
      } else if (num.toString().length == 4) {
        console.log("num.toString().length == 4: ");
        attach = num;
      } else if (num.toString().length > 4 || num.toString().length < 0) {
        console.log("No idea!");
      }
      console.log("attach 0000: ", attach);
      attach = `${KEY_attach}-${attach}/${passout}`;
      console.log("after condition check attach: ", attach);
    }

    console.log("Outside If else attach ---------->", attach);

    let insertInto = await pool
      .request()
      .query(
        `insert into [ORDER] ([ORDER_NUMBER] ,[ORDER_BY] ,[ORDER_BY_FKID] ,[ORDER_CUSTOMER_FKID] ,[ORDER_COMPANY_FKID] ,[ORDER_LOGISTIC] ,[ORDER_LOGISTIC_DESTINATION] ,[ORDER_LOGISTIC_PAY_MODE] ,[ORDER_BILLING_ADDRESS] ,[ORDER_SHIPPING_ADDRESS] ,[ORDER_CASH_DISCOUNT] ,[ORDER_ORDER_AMOUNT] ,[ORDER_REMARK] ,[ORDER_STATUS] ,[ORDER_ISACTIVE] ,[ORDER_DELIVERY_TYPE],[ORDER_SUPPLY_TYPE] ,[ORDER_DATE])  values('${attach}','${kimo.OrderBy}','${kimo.OrderByID}','${kimo.CustomerID}','${kimo.CompanyID}','${kimo.OrderDetails.Logistic}','${kimo.OrderDetails.LogisticDestination}','${kimo.OrderDetails.LogisticPaymode}','${kimo.BillingAddress}','${kimo.DeliveryAddress}','${kimo.OrderDetails.CashDiscount}','${kimo.OrderAmount}','${kimo.OrderDetails.Remark}','0','0','${kimo.OrderDetails.DeliveryType}','1',GETDATE())`
      );

    console.log("pool._connected recon placeOrder: 1", pool._connected);

    if (insertInto.rowsAffected == 1) {
      let flag = 2;
      console.log("pool._connected recon placeOrder: 2", pool._connected);
      if (pool._connected == false) {
        pool = await sql.connect(config);
      }

      console.log("inside insert");
      let getOrderpkid = await pool
        .request()
        .query(
          "SELECT ORDER_PKID FROM [ORDER] WHERE ORDER_PKID=(SELECT MAX(ORDER_PKID) FROM [ORDER])"
        );

      console.log(
        "getOrderpkid.recordsets[0][0].ORDER_PKID: ",
        getOrderpkid.recordsets[0][0].ORDER_PKID
      );

      if (getOrderpkid.recordsets[0][0].ORDER_PKID) {
        console.log("Main if: ");
        console.log("pool._connected recon placeOrder: 3", pool._connected);
        kimo.Products.map(async (i) => {
          if (pool._connected == false) {
            pool = await sql.connect(config);
          }
          console.log("********************");

          var OrderItemsIntonew = await pool
            .request()
            .query(
              `insert into ORDER_ITEM ([ORDER_ITEM_ORDER_FKID] ,[ORDER_ITEM_PRODUCT_FKID] ,[ORDER_ITEM_UNIT] ,[ORDER_ITEM_QTY] ,[ORDER_ITEM_CUSTOMER_PRICE] ,[ORDER_ITEM_TOTAL_AMOUNT] ,[ORDER_ITEM_DISCOUNT] ,[ORDER_ITEM_FREE_UNIT_SCHEME] ,[ORDER_ITEM_ACTUAL_AMOUNT])  values(${getOrderpkid.recordsets[0][0].ORDER_PKID},${i.ProductID},${i.PackageID},${i.Quantity},${i.PackageAmt},${i.ProductAmount},${i.Discount},${i.FreeUnitScheme},${i.FinalAmount})`
            );
          console.log(OrderItemsIntonew.rowsAffected[0]);
          if (OrderItemsIntonew.rowsAffected[0] == 1) {
            console.log("pool._connected recon placeOrder: 4", pool._connected);
            console.log("if");
            pool.close();
            console.log(
              "pool._connected recon placeOrder after close: 5",
              pool._connected
            );
            flag = 1;
            return true;
          } else {
            console.log("else: ");
            console.log("pool._connected recon placeOrder: 6", pool._connected);
            pool.close();
            console.log(
              "pool._connected recon placeOrder after close: 7",
              pool._connected
            );
            flag = 0;
            return false;
          }
        });
      } else {
        console.log("Main else: ");
        flag = 0;
        pool.close();
        return false;
      }
      console.log("flag: ", flag);

      if (flag == 0) {
        console.log("false--");
        return false;
      } else {
        console.log("true");
        return true;
      }
      //  return true;
    } else {
      console.log("last false");
      pool.close();
      return false;
    }
  } catch (err) {
    console.log("placeOrder-->", err);
  }
}

async function getAdminOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        `select DISTINCT (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] where ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] where ORD.ORDER_BY = 'admin'`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getAdminOrders-->", error);
    //pool.close();
  }
}

async function GetAdminOrdersBySupplyType(supplyId) {
  console.log("supplyId: ", supplyId);
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        `select distinct (select count(*) from [dbo].[ORDER_ITEM] where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER , (SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME], (SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin' and [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID`
      );

    let result2 = await pool
      .request()

      .query(
        ` select  distinct ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER]  WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER]  WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin'`
      );

    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAdminOrdersBySupplyType-->", error);
  }
}

async function GetAdminOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER , (SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin' and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*, (SELECT CONVERT(TIME, ORDER_DATE)) as clock,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin'`
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAdminOrdersByMonth-->", error);
  }
}

async function GetAdminOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,ORD.*, (SELECT CONVERT(TIME, ORDER_DATE)) as clock,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs , (SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_BY='admin' and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAdminOrdersByDate-->", error);
  }
}

async function ConfirmForDeliveryCheck(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("ORDER_PKID", obj.OrderPkid)
      .input("ORDER_INVOICE_DOC", obj.InvoiceDoc)
      .query(
        `UPDATE [dbo].[ORDER] SET ORDER_ISACTIVE =1, ORDER_STATUS=7 ,ORDER_INVOICE_DOC=@ORDER_INVOICE_DOC WHERE ORDER_PKID=@ORDER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("FinalDelivery -->", error);
  }
}

async function GetAllInvoiceUploadedOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllInvoiceUploadedOrders -->", error);
  }
}

async function GetAllInvoiceUploadedOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAllInvoiceUploadedOrdersByMonth-->", error);
  }
}

async function GetAllInvoiceUploadedOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7"
      );

    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetAllInvoiceUploadedOrdersBySupplyType-->", error);
  }
}

async function GetAllInvoiceUploadedOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=7 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetAllDeliveryConfirmedOrdersByDate-->", error);
  }
}

async function GetRejectedOrders() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,cast([ORDER_DATE] as date) as bdate,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetRejectedOrders -->", error);
  }
}

async function GetRejectedOrdersByMonth(MONTH_NUMBER) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("MONTH_NUMBER", MONTH_NUMBER)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2 and (SELECT MONTH(ORDER_DATE))=@MONTH_NUMBER"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2"
      );

    pool.close();

    if (MONTH_NUMBER == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetRejectedOrdersByMonth-->", error);
  }
}

async function GetRejectedOrdersBySupplyType(supplyId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("SUPPLY_TYPE_PKID", supplyId)
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2 AND [ORDER_SUPPLY_TYPE]=@SUPPLY_TYPE_PKID"
      );

    let result2 = await pool
      .request()
      .query(
        "select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE] WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2"
      );

    pool.close();
    if (supplyId == 0) {
      return result2.recordsets[0];
    } else {
      return result.recordsets[0];
    }
  } catch (error) {
    console.log("GetRejectedOrdersBySupplyType-->", error);
  }
}

async function GetRejectedOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetRejectedOrdersByDate-->", error);
  }
}

async function GetRejectedOrdersByDate(fdate, tdate) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("fdate", fdate)
      .input("tdate", tdate)
      .query(
        `select DISTINCT (select count(*) FROM ORDER_ITEM  where [ORDER_ITEM_ORDER_FKID] = ORD.ORDER_PKID) as ItemCount,(SELECT MONTH(ORDER_DATE)) AS MONTH_NUMBER ,(SELECT CONVERT(TIME, ORDER_DATE)) as clock,ORD.*,CUSTOMER_NAME,COMPANY_NAME,[SUPPLY_NAME],(SELECT DATEDIFF(HOUR, (SELECT [ORDER_DATE] FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID), (SELECT SYSDATETIME())) ) AS hrs ,(SELECT CASE WHEN ORDER_BY = 'admin' THEN (select SUPER_ADMIN_NAME from [dbo].[SUPER_ADMIN] WHERE [SUPER_ADMIN_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'manager' OR ORDER_BY = 'officer' THEN (select [EMPLOYEE_NAME] from [dbo].[EMPLOYEE_MASTER] WHERE [EMPLOYEE_PKID]=ORDER_BY_FKID) WHEN ORDER_BY = 'customer' THEN (select [CUSTOMER_NAME] from [dbo].[CUSTOMER_MASTER] WHERE [CUSTOMER_PKID]=ORDER_BY_FKID) END FROM [dbo].[ORDER] WHERE ORDER_PKID=ORD.ORDER_PKID) as TypeName from [dbo].[ORDER] AS ORD JOIN [dbo].[ORDER_ITEM] AS ITM ON [ORDER_ITEM_ORDER_FKID]=[ORDER_PKID] JOIN [dbo].[CUSTOMER_MASTER] ON [CUSTOMER_PKID]=[ORDER_CUSTOMER_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[ORDER_COMPANY_FKID] JOIN [dbo].[SUPPLY_TYPE] ON [SUPPLY_TYPE_PKID]=[ORDER_SUPPLY_TYPE]WHERE ORDER_ISACTIVE=1 AND ORDER_STATUS=2 and cast(ORDER_DATE as date) between @fdate and @tdate`
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetRejectedOrdersByDate-->", error);
  }
}


module.exports = {
  getRemarksOrdersById: getRemarksOrdersById,
  getBillingAddressOrdersById: getBillingAddressOrdersById,
  getShippingAddressOrdersById: getShippingAddressOrdersById,
  getOrders: getOrders,
  getItemsByOrderId: getItemsByOrderId,
  AcceptOrderRequest: AcceptOrderRequest,

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
  getApprovedOrdersByDate: getApprovedOrdersByDate,
  getApprovedOrdersBySupplyType: getApprovedOrdersBySupplyType,
  getApprovedOrdersByMonth: getApprovedOrdersByMonth,

  ApprovedOrderConfirm: ApprovedOrderConfirm,
  GetAllScheduledOrder: GetAllScheduledOrder,
  getScheduledOrdersByDate: getScheduledOrdersByDate,
  getScheduledOrdersBySupplyType: getScheduledOrdersBySupplyType,
  getScheduledOrdersByMonth: getScheduledOrdersByMonth,
  getOrderProcessRemark: getOrderProcessRemark,

  ConfirmForInvoice: ConfirmForInvoice,
  GetAllConfirmInvoiceOrder: GetAllConfirmInvoiceOrder,
  getConfirmInvoiceOrdersBySupplyType: getConfirmInvoiceOrdersBySupplyType,
  getConfirmInvoiceOrdersByMonth: getConfirmInvoiceOrdersByMonth,
  getConfirmInvoiceOrdesByDate: getConfirmInvoiceOrdesByDate,

  ConfirmInvoiceGenerate: ConfirmInvoiceGenerate,
  GetAllConfirmInvoiceGeneratetOrders: GetAllConfirmInvoiceGeneratetOrders,
  getInvoiceGeneratetOrdersBySupplyType: getInvoiceGeneratetOrdersBySupplyType,
  getInvoiceGeneratetOrdersByMonth: getInvoiceGeneratetOrdersByMonth,
  getInvoiceGeneratetOrdersByDate: getInvoiceGeneratetOrdersByDate,

  DispatchOrder: DispatchOrder,
  GetAllDispatchedOrders: GetAllDispatchedOrders,
  GetAllDispatchedOrdersBySupplyType: GetAllDispatchedOrdersBySupplyType,
  GetAllDispatchedOrdersByDate: GetAllDispatchedOrdersByDate,
  GetAllDispatchedOrdersByMonth: GetAllDispatchedOrdersByMonth,

  FinalDelivery: FinalDelivery,
  GetAllDeliveryConfirmedOrdersByDate: GetAllDeliveryConfirmedOrdersByDate,
  GetAllDeliveryConfirmedOrdersBySupplyType:
    GetAllDeliveryConfirmedOrdersBySupplyType,
  GetAllDeliveryConfirmedOrdersByMonth: GetAllDeliveryConfirmedOrdersByMonth,
  GetAllDeliveryConfirmedOrders: GetAllDeliveryConfirmedOrders,
  GetAllShippingAddressesOfCustomer: GetAllShippingAddressesOfCustomer,

  placeOrder: placeOrder,
  GetAllBillingAddressesOfCustomer: GetAllBillingAddressesOfCustomer,
  getAdminOrders: getAdminOrders,
  GetAdminOrdersBySupplyType: GetAdminOrdersBySupplyType,
  GetAdminOrdersByMonth: GetAdminOrdersByMonth,
  GetAdminOrdersByDate: GetAdminOrdersByDate,

  ConfirmForDeliveryCheck: ConfirmForDeliveryCheck,
  GetAllInvoiceUploadedOrders: GetAllInvoiceUploadedOrders,
  GetAllInvoiceUploadedOrdersByMonth: GetAllInvoiceUploadedOrdersByMonth,
  GetAllInvoiceUploadedOrdersByDate: GetAllInvoiceUploadedOrdersByDate,
  GetAllInvoiceUploadedOrdersBySupplyType:
    GetAllInvoiceUploadedOrdersBySupplyType,

  RejectOrderRequest: RejectOrderRequest,
  GetRejectedOrders: GetRejectedOrders,
  GetRejectedOrdersByDate: GetRejectedOrdersByDate,
  GetRejectedOrdersByMonth: GetRejectedOrdersByMonth,
  GetRejectedOrdersBySupplyType: GetRejectedOrdersBySupplyType,
};
