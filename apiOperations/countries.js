/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 16:20:31
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-25 17:15:44
 */
var config = require("../dbconfig");
const sql = require("mssql");

async function getCountries() {
  console.log("getCountries: hit! ");

  try {
    let pool = await sql.connect(config);

    let result = await pool.request().query("SELECT * FROM [COUNTRY_MASTER]");
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getCountries-->", error);
    // pool.close();
  }
}

async function getCountryById(countryId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("countryId", countryId)
      .query("SELECT * from COUNTRY_MASTER WHERE COUNTRY_PKID=@countryId");
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCountryById-->", error);
    // pool.close();
  }
}

async function addCountry(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("Countryname", sql.VarChar, obj.CountryName)
      .query("SELECT * from COUNTRY_MASTER WHERE COUNTRY_NAME=@Countryname");
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CountryName", sql.NVarChar, obj.CountryName)
        .input("CountryCode", sql.NVarChar, obj.CountryCode)
        .query(
          "insert into COUNTRY_MASTER ([COUNTRY_CODE] ,[COUNTRY_NAME] ,[COUNTRY_ACTIVE])  values(@CountryCode,@CountryName,1)"
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
    console.log("addCountry-->", err);
  }
}

async function deleteCountry(countryId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", countryId)
      .query("DELETE FROM COUNTRY_MASTER WHERE COUNTRY_PKID=@input_parameter");
    pool.close();

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCountry-->", error);
    // pool.close();
  }
}

async function updateCountry(countryId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", countryId)
      .input("CountryName", obj.CountryName)
      .input("CountryCode", obj.CountryCode)
      .query(
        `UPDATE COUNTRY_MASTER SET COUNTRY_CODE = @CountryCode, COUNTRY_NAME= @CountryName WHERE COUNTRY_PKID =@input_parameter`
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
    console.log("updateCountry-->", error);
  }
}

module.exports = {
  getCountries: getCountries,
  getCountryById: getCountryById,
  addCountry: addCountry,
  deleteCountry: deleteCountry,
  updateCountry: updateCountry,
};
