/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-14 10:29:23
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-12 13:52:00
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getUom() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query("SELECT * FROM [UNIT_OF_MEASUREMENT]");
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getUom-->", error);
    // pool.close();
  }
}

async function addUom(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UomName", sql.VarChar, obj.UomName)
      .query(
        "SELECT * from UNIT_OF_MEASUREMENT WHERE UNIT_OF_MEASUREMENT_NAME=@UomName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("UomName", obj.UomName)
        .input("UomKey", obj.UomKey)
        .query(
          "insert into UNIT_OF_MEASUREMENT ([UNIT_OF_MEASUREMENT_SHORT_KEY] ,[UNIT_OF_MEASUREMENT_NAME] ,[UNIT_OF_MEASUREMENT_ACTIVE])  values(@UomKey,@UomName,1)"
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
    console.log(err);
  }
}

async function deleteUom(UomId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", UomId)
      .query(
        "DELETE FROM UNIT_OF_MEASUREMENT WHERE UNIT_OF_MEASUREMENT_PKID=@input_parameter"
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
    console.log("deleteUom-->", error);
    // pool.close();
  }
}

async function updateUom(UomId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", UomId)
      .input("UomName", obj.UomName)
      .input("UomKey", obj.UomKey)
      .query(
        `UPDATE UNIT_OF_MEASUREMENT SET UNIT_OF_MEASUREMENT_NAME  = @UomName,UNIT_OF_MEASUREMENT_SHORT_KEY=@UomKey WHERE UNIT_OF_MEASUREMENT_PKID =@input_parameter`
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
  } catch (error) {
    console.log("updateUom-->", error);
  }
}

module.exports = {
  getUom: getUom,
  addUom: addUom,
  deleteUom: deleteUom,
  updateUom: updateUom,
};
