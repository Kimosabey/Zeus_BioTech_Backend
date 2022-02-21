/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 17:55:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-21 18:27:39
 */
var config = require("../dbconfig");
const sql = require("mssql");

async function getAreas() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT * FROM [AREA_MASTER] JOIN CITY_MASTER ON CITY_PKID=AREA_CITY_FKID JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
}

async function getAreasByCityId(cityId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("input_parameter", cityId)
      .query(
        "SELECT * FROM [AREA_MASTER] WHERE AREA_CITY_FKID=@input_parameter"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

async function getAreasByHq(hqId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("input_parameter", hqId)
      .query(
        "SELECT * FROM AREA_MASTER JOIN HQ ON HQ_CITY_FKID=AREA_CITY_FKID WHERE HQ_PKID=@input_parameter"
      );
    pool.close();
    // console.log(result.recordsets);
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

async function addArea(obj) {
  console.log("obj: ", obj);
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("AreaCode", sql.VarChar, obj.AreaCode)
      .input("AreaName", sql.VarChar, obj.AreaName)
      .input("AREA_ZIP_CODE", sql.VarChar, obj.AREA_ZIP_CODE)
      .query(
        "SELECT * from AREA_MASTER WHERE AREA_NAME=@AreaName AND AREA_ZIP_CODE=@AREA_ZIP_CODE"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("AreaName", sql.NVarChar, obj.AreaName)
        .input("AREA_ZIP_CODE", sql.NVarChar, obj.AREA_ZIP_CODE)
        .input("CityId", sql.Int, obj.CityId)
        .input("StateId", sql.Int, obj.StateId)
        .input("CountryId", sql.Int, obj.CountryId)
        .query(
          "insert into AREA_MASTER ([AREA_COUNTRY_FKID] ,[AREA_STATE_FKID], [AREA_CITY_FKID],[AREA_NAME],[AREA_ZIP_CODE],[AREA_ACTIVE])  values(@CountryId,@StateId,@CityId,@AreaName,@AREA_ZIP_CODE,1)"
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
      return "Already Existed!";
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateArea(AreaId, obj) {
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("AreaId", sql.Int, AreaId)
    .input("AREA_ZIP_CODE", obj.AREA_ZIP_CODE)
    .input("StateId", sql.Int, obj.StateId)
    .input("CountryId", sql.Int, obj.CountryId)
    .input("CityId", sql.Int, obj.CityId)
    .input("AreaName", sql.NVarChar, obj.AreaName)

    .query(
      `UPDATE AREA_MASTER SET AREA_COUNTRY_FKID = @CountryId, AREA_STATE_FKID= @StateId,AREA_CITY_FKID=@CityId,AREA_NAME=@AreaName ,AREA_ZIP_CODE=@AREA_ZIP_CODE WHERE AREA_PKID =@AreaId`
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

async function deleteArea(AreaId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", AreaId)
      .query("DELETE FROM AREA_MASTER WHERE AREA_PKID=@input_parameter");
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

module.exports = {
  getAreas: getAreas,
  getAreasByCityId: getAreasByCityId,
  addArea: addArea,
  updateArea: updateArea,
  deleteArea: deleteArea,
  getAreasByHq: getAreasByHq,
};
