/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 16:20:37
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-23 12:30:38
 */
var config = require("../dbconfig");
const sql = require("mssql");

async function getStates() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT * FROM [STATE_MASTER] JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
}

async function getStatesById(stateId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("stateId", stateId)
      .query(
        "SELECT * from STATE_MASTER JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID WHERE STATE_PKID=@stateId"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
}

async function getStateByCountryId(countryId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("countryId", countryId)
      .query(
        "SELECT * from STATE_MASTER JOIN COUNTRY_MASTER ON COUNTRY_PKID=STATE_COUNTRY_FKID WHERE COUNTRY_PKID=@countryId"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
}

async function getForCheckBoxStateByCountryId(ObjOfArr) {
  let x = ObjOfArr.CountryId;

  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query(
        `select * from [dbo].[STATE_MASTER] where [STATE_COUNTRY_FKID] in (${x})`
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
}

async function addState(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("StateName", sql.VarChar, obj.StateName)
      .query("SELECT * from STATE_MASTER WHERE STATE_NAME=@StateName");
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("StateName", sql.NVarChar, obj.StateName)
        .input("CountryId", sql.Int, obj.CountryId)
        .query(
          "insert into STATE_MASTER ([STATE_COUNTRY_FKID] ,[STATE_NAME], [STATE_ACTIVE])  values(@CountryId,@StateName,1)"
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

async function updateState(stateId, obj) {
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("stateId", stateId)
    .input("StateName", sql.NVarChar, obj.StateName)
    .input("CountryId", sql.Int, obj.CountryId)
    .query(
      `UPDATE STATE_MASTER SET STATE_COUNTRY_FKID = @CountryId, STATE_NAME= @StateName WHERE STATE_PKID =@stateId`
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

async function deleteState(stateId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", stateId)
      .query("DELETE FROM STATE_MASTER WHERE STATE_PKID=@input_parameter");
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
  getStates: getStates,
  getStatesById: getStatesById,
  addState: addState,
  updateState: updateState,
  getStateByCountryId: getStateByCountryId,
  deleteState: deleteState,
  getForCheckBoxStateByCountryId: getForCheckBoxStateByCountryId,
};
