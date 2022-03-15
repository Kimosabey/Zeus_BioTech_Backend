/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-07 11:04:06
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-14 17:14:17
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function AdminTypeLogin(em, pass, id) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EMPLOYEE_EMAIL", em)
      .input("EMPLOYEE_PASSWORD", pass)
      .input("EMPLOYEE_SUB_TYPE_FKID", id)
      .query(
        "SELECT * FROM EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_PASSWORD=@EMPLOYEE_PASSWORD AND EMPOYEE_SUB_TYPE_FKID=@EMPLOYEE_SUB_TYPE_FKID"
      );

    if (pool._connected == false) {
      pool = await sql.connect(config);
      console.log("pool._connected recon AdminTypeLogin: ", pool._connected);
    }

    pool.close();

    if (result.recordsets[0].length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("AdminTypeLogin-->", error);
  }
}

module.exports = {
  AdminTypeLogin: AdminTypeLogin,
};
