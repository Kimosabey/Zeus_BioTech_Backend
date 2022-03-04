/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-19 14:59:10
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-03 19:45:29
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getHq() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT * FROM HQ JOIN COUNTRY_MASTER ON COUNTRY_PKID=HQ_COUNTRY_FKID JOIN STATE_MASTER on STATE_PKID=HQ_STATE_FKID JOIN CITY_MASTER on CITY_PKID=HQ_CITY_FKID"
      );
    pool.close();
    // console.log(result.recordsets);
    return result.recordsets[0];
  } catch (error) {
    console.log("getHq-->", error);
    // pool.close();
  }
}

async function addHq(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("HqName", sql.VarChar, obj.HqName)
      .input("CityId", sql.VarChar, obj.CityId)
      .input("StateId", sql.VarChar, obj.StateId)
      .input("CountryId", sql.VarChar, obj.CountryId)

      .query(
        "SELECT * FROM HQ JOIN COUNTRY_MASTER ON COUNTRY_PKID=HQ_COUNTRY_FKID JOIN STATE_MASTER on STATE_PKID=HQ_STATE_FKID JOIN CITY_MASTER on CITY_PKID=HQ_CITY_FKID WHERE HQ_COUNTRY_FKID=@CountryId AND HQ_STATE_FKID=@StateId AND HQ_CITY_FKID=@CityId AND HQ_NAME=@HqName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("HqName", sql.VarChar, obj.HqName)
        .input("CityId", sql.VarChar, obj.CityId)
        .input("StateId", sql.VarChar, obj.StateId)
        .input("CountryId", sql.VarChar, obj.CountryId)
        .query(
          "insert into HQ ([HQ_COUNTRY_FKID] ,[HQ_STATE_FKID] ,[HQ_CITY_FKID] ,[HQ_NAME] ,[HQ_ACTIVE] )  values(@CountryId,@StateId,@CityId,@HqName,1)"
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

async function updateHq(HqId, obj) {
  console.log("obj: ", obj);
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("input_parameter", parseInt(HqId))
    .input("HqName", obj.HqName)
    .input("CityId", obj.CityId)
    .input("StateId", obj.StateId)
    .input("CountryId", obj.CountryId)
    .query(
      `UPDATE HQ SET HQ_COUNTRY_FKID = @CountryId, HQ_STATE_FKID= @StateId,HQ_CITY_FKID=@CityId, HQ_NAME= @HqName WHERE HQ_PKID =@input_parameter`
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

async function deleteHq(HqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", HqId)
      .query("DELETE FROM HQ WHERE HQ_PKID=@input_parameter");
    pool.close();

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteHq-->", error);
    // pool.close();
  }
}

module.exports = {
  getHq: getHq,
  addHq: addHq,
  updateHq: updateHq,
  deleteHq: deleteHq,
};
