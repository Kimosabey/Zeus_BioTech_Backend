/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 19:13:14
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-21 18:27:45
 */
var config = require("../dbconfig");
const sql = require("mssql");

async function getCities() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT *FROM [CITY_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

async function addCity(obj) {
  console.log("addCity obj ----->: ", obj);

  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CityCode", sql.VarChar, obj.CityCode)
      .input("CityName", sql.VarChar, obj.CityName)
      .query("SELECT * from CITY_MASTER WHERE CITY_NAME=@CityName");
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CityCode", sql.NVarChar, obj.CityCode)
        .input("CityName", sql.NVarChar, obj.CityName)
        .input("StateId", sql.Int, obj.StateId)
        .input("CountryId", sql.Int, obj.CountryId)
        .query(
          "insert into CITY_MASTER ([CITY_COUNTRY_FKID] ,[CITY_STATE_FKID], [CITY_CODE],[CITY_NAME],[CITY_ACTIVE])  values(@CountryId,@StateId,@CityCode,@CityName,1)"
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

async function updateCity(cityId, obj) {
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("cityId", sql.Int, cityId)
    .input("StateId", sql.Int, obj.StateId)
    .input("CountryId", sql.Int, obj.CountryId)
    .input("CityName", sql.NVarChar, obj.CityName)
    .input("CityCode", sql.NVarChar, obj.CityCode)
    .query(
      `UPDATE CITY_MASTER SET CITY_COUNTRY_FKID = @CountryId, CITY_STATE_FKID= @StateId,CITY_CODE=@CityCode,CITY_NAME=@CityName WHERE CITY_PKID =@cityId`
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

async function deleteCity(cityId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", cityId)
      .query("DELETE FROM CITY_MASTER WHERE CITY_PKID=@input_parameter");
    pool.close();
    console.log("delete__>>", result);
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

async function getCitiesByStateId(stateId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("input_parameter", stateId)
      .query(
        "SELECT * FROM [CITY_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID WHERE CITY_STATE_FKID=@input_parameter"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

module.exports = {
  getCities: getCities,
  addCity: addCity,
  updateCity: updateCity,
  deleteCity: deleteCity,
  getCitiesByStateId: getCitiesByStateId,
};
