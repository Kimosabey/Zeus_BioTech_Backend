/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-19 12:05:08
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-15 11:29:59
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getAdminLogin(AdminEmail, AdminPass) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("AdminEmail", AdminEmail)
      .input("AdminPass", AdminPass)
      .query(
        "SELECT * FROM [SUPER_ADMIN] WHERE SUPER_ADMIN_EMAIL=@AdminEmail AND SUPER_ADMIN_PASSWORD=@AdminPass"
      );

    if (pool._connected == false) {
      pool = await sql.connect(config);
      console.log("pool._connected recon getAdminLogin: ", pool._connected);
    }

    pool.close();

    if (result.recordsets[0].length > 0) {
      return true;
    } else {
      return false;
    }
    // return result.recordsets[0];
  } catch (error) {
    console.log("getAdminLogin-->", error);
    //pool.close();
  }
}

module.exports = {
  getAdminLogin: getAdminLogin,
};
