/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-12 18:47:46
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-14 14:39:25
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getCustomersCat() {
  try {
    let pool = await sql.connect(config);

    let result = await pool.request().query("SELECT * FROM [CUSTOMER_TYPE]");
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

async function addCustomersCat(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CustCatName", sql.VarChar, obj.CustCatName)
      .query(
        "SELECT * from CUSTOMER_TYPE WHERE CUSTOMER_TYPE_NAME=@CustCatName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CustCatName", sql.VarChar, obj.CustCatName)

        .query(
          "insert into CUSTOMER_TYPE ([CUSTOMER_TYPE_NAME] ,[CUSTOMER_TYPE_ACTIVE])  values(@CustCatName,1)"
        );
      // .execute('InsertOrders');
      if (insertInto.rowsAffected == 1) {
        pool.close();
        return true;
      } else {
        pool.close();
        return false;
      }
    } else {
      pool.close();
      return "Already Existed!";
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteCustomersCat(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", custId)
      .query(
        "DELETE FROM CUSTOMER_TYPE WHERE CUSTOMER_TYPE_PKID=@input_parameter"
      );
    pool.close();

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

async function updateCustomersCat(custId, obj) {
  try {
    
  } catch (error) {
    
  }
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("input_parameter", custId)
    .input("CustCatName", obj.CustCatName)
    .query(
      `UPDATE CUSTOMER_TYPE SET CUSTOMER_TYPE_NAME = @CustCatName WHERE CUSTOMER_TYPE_PKID =@input_parameter`
    );

  pool.close();
  let message = false;

  if (result.rowsAffected) {
    message = true;
  }
  pool.close();
  // return { message };
  // console.log(pool._connected);
  return message;
}

async function getCustomersType() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT [CUSTOMER_TYPE_PKID] ,[CUSTOMER_TYPE_NAME] ,[CUSTOMER_TYPE_ISACTIVE] FROM [CUSTOMER_TYPE] WHERE [CUSTOMER_TYPE_ACTIVE]=1"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustomersType-->", error);
  }
}


async function addCustomersType(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CustTypeName", obj.CustTypeName)
      .query(
        "SELECT * from CUSTOMER_TYPE WHERE CUSTOMER_TYPE_NAME=@CustTypeName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CustTypeName", obj.CustTypeName)

        .query(
          "insert into CUSTOMER_CATEGORY ([CUSTOMER_CATEGORY_NAME] ,[CUSTOMER_CATEGORY_ISACTIVE])  values(@CustCatName,1)"
        );
      // .execute('InsertOrders');
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
    console.log("addCustomersType-->", err);
  }
}

async function updateCustomersType(custId, obj) {

  try {
    
  } catch (error) {
    
  }
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("custId", custId)
    .input("CustTypeName", obj.CustTypeName)
    .query(
      `UPDATE CUSTOMER_TYPE SET CUSTOMER_TYPE_NAME = @CustTypeName WHERE CUSTOMER_TYPE_PKID =@custId`
    );

  let message = false;

  if (result.rowsAffected) {
    message = true;
  }
  pool.close();
  // return { message };
  // console.log(pool._connected);
  return message;
}

async function deleteCustomersType(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .query("DELETE FROM CUSTOMER_TYPE WHERE CUSTOMER_TYPE_PKID=@custId");

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCustomersType-->", error);
    // pool.close();
  }
}

module.exports = {
  getCustomersCat: getCustomersCat,
  deleteCustomersCat: deleteCustomersCat,
  addCustomersCat: addCustomersCat,
  updateCustomersCat: updateCustomersCat,
};
