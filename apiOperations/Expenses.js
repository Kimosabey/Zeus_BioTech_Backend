/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-03-15 18:35:00
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-15 19:06:56
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getPendingEmpExpenses() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT  exp.*,emp.EMPLOYEE_NAME FROM [EMPLOYEE_EXPENSES] exp JOIN EMPLOYEE_MASTER emp ON EMPLOYEE_PKID = EMPLOYEE_EXPENSES_EMP_FKID WHERE EMPLOYEE_EXPENSES_ISACTIVE=0 AND EMPLOYEE_EXPENSES_STATUS=0"
      );

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getPendingEmpExpenses-->", error);
  }
}

async function AcceptEmpExpenses(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EMPLOYEE_EXPENSES_PKID", reqId)
      .query(
        `UPDATE EMPLOYEE_EXPENSES SET EMPLOYEE_EXPENSES_ISACTIVE =1 , EMPLOYEE_EXPENSES_STATUS=1 WHERE EMPLOYEE_EXPENSES_PKID=@EMPLOYEE_EXPENSES_PKID`
      );

    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("AcceptEmpExpenses-->", error);
  }
}

async function RejectEmpExpenses(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .input("EMPLOYEE_EXPENSES_PKID", reqId)
      .query(
        `UPDATE EMPLOYEE_EXPENSES SET EMPLOYEE_EXPENSES_ISACTIVE=0 , EMPLOYEE_EXPENSES_STATUS=2 WHERE EMPLOYEE_EXPENSES_PKID=@EMPLOYEE_EXPENSES_PKID`
      );

    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("RejectEmpExpenses-->", error);
  }
}

module.exports = {
  getPendingEmpExpenses: getPendingEmpExpenses,
  AcceptEmpExpenses: AcceptEmpExpenses,
  RejectEmpExpenses: RejectEmpExpenses,
};
