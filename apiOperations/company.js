/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-19 16:45:50
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-15 11:30:05
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getCompanies() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query("SELECT * FROM [COMPANY] JOIN HQ ON HQ_PKID = COMPANY_HQ_FKID");
    pool.close();
    // console.log(result.recordsets);
    return result.recordsets[0];
  } catch (error) {
    console.log("getCompanies-->", error);
    //pool.close();
  }
}

async function getCompanyNamebyId(id) {
  try {
    let pool = await sql.connect(config);
    if (pool._connected == false) {
      pool = await sql.connect(config);
      console.log("pool._connected  recon getCompanyNamebyId: ", pool._connected);
    }
    let result = await pool
      .request()
      .input("COMPANY_PKID", id)
      .query(
        "SELECT * FROM [COMPANY] JOIN HQ ON HQ_PKID = COMPANY_HQ_FKID WHERE COMPANY_PKID=@COMPANY_PKID"
      );
    if (pool._connected == false) {
      pool = await sql.connect(config);
      console.log("pool._connected  recon getCompanyNamebyId: ", pool._connected);
    }

    pool.close();
    // console.log(result.recordsets);
    return result.recordsets[0];
  } catch (error) {
    console.log("getCompanyNamebyId-->", error);
    //pool.close();
  }
}

async function addCompany(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("COMPANY_HQ_FKID", obj.COMPANY_HQ_FKID)
      .input("COMPANY_NAME", obj.COMPANY_NAME)
      .query(
        "SELECT * FROM [COMPANY] JOIN HQ ON HQ_PKID = COMPANY_HQ_FKID WHERE COMPANY_HQ_FKID=@COMPANY_HQ_FKID AND COMPANY_NAME=@COMPANY_NAME"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("COMPANY_HQ_FKID", obj.COMPANY_HQ_FKID)
        .input("COMPANY_NAME", obj.COMPANY_NAME)
        .input("COMPANY_EMAIL", obj.COMPANY_EMAIL)
        .input("COMPANY_PHONE", obj.COMPANY_PHONE)
        .input("COMPANY_ADDRESS", obj.COMPANY_ADDRESS)
        .input("COMPANY_SHORT_KEY", obj.COMPANY_SHORT_KEY)
        .query(
          "insert into COMPANY ([COMPANY_NAME] ,[COMPANY_HQ_FKID] ,[COMPANY_EMAIL] ,[COMPANY_PHONE] ,[COMPANY_ADDRESS] ,[COMPANY_ISACTIVE],COMPANY_SHORT_KEY)  values(@COMPANY_NAME,@COMPANY_HQ_FKID,@COMPANY_EMAIL,@COMPANY_PHONE,@COMPANY_ADDRESS,1,@COMPANY_SHORT_KEY)"
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
    console.log("addCompany-->", err);
  }
}

async function updateCompany(Compid, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("COMPANY_PKID", Compid)
      .input("COMPANY_HQ_FKID", obj.COMPANY_HQ_FKID)
      .input("COMPANY_NAME", obj.COMPANY_NAME)
      .input("COMPANY_EMAIL", obj.COMPANY_EMAIL)
      .input("COMPANY_PHONE", obj.COMPANY_PHONE)
      .input("COMPANY_ADDRESS", obj.COMPANY_ADDRESS)
      .input("COMPANY_SHORT_KEY", obj.COMPANY_SHORT_KEY)
      .query(
        `UPDATE COMPANY SET [COMPANY_NAME]=@COMPANY_NAME ,[COMPANY_HQ_FKID]=@COMPANY_HQ_FKID ,[COMPANY_EMAIL]=@COMPANY_EMAIL ,[COMPANY_PHONE]=@COMPANY_PHONE ,[COMPANY_ADDRESS]=@COMPANY_ADDRESS,COMPANY_SHORT_KEY=@COMPANY_SHORT_KEY WHERE COMPANY_PKID =@COMPANY_PKID`
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
    console.log("updateCompany-->", error);
  }
}

async function deleteCompany(Compid) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("COMPANY_PKID", Compid)
      .query("DELETE FROM COMPANY WHERE COMPANY_PKID=@COMPANY_PKID");
    pool.close();

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCompany-->", error);
    //pool.close();
  }
}

module.exports = {
  getCompanies: getCompanies,
  addCompany: addCompany,
  updateCompany: updateCompany,
  deleteCompany: deleteCompany,
  getCompanyNamebyId: getCompanyNamebyId,
};
