/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-08 12:20:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-07 10:58:51
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getEmpTypes() {
  try {
    let pool = await sql.connect(config);

    let result = await pool.request().query("SELECT * FROM [EMPLOYEE_TYPE]");

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpTypes-->", error);
    // pool.close();
  }
}

async function addEmpType(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EmpTypeName", sql.VarChar, obj.EmpTypeName)
      .query(
        "SELECT * from EMPLOYEE_TYPE WHERE EMPLOYEE_TYPE_NAME=@EmpTypeName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("EmpTypeName", sql.VarChar, obj.EmpTypeName)
        .query(
          "insert into EMPLOYEE_TYPE ([EMPLOYEE_TYPE_NAME] ,[EMPLOYEE_TYPE_ISMANAGER] ,[EMPLOYEE_TYPE_ACTIVE])  values(@EmpTypeName,1,1)"
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

async function updateEmpType(empId, obj) {
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("input_parameter", empId)
    .input("EmpTypeName", obj.EmpTypeName)
    .query(
      `UPDATE EMPLOYEE_TYPE SET EMPLOYEE_TYPE_NAME = @EmpTypeName WHERE EMPLOYEE_TYPE_PKID =@input_parameter`
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

async function deleteEmpType(empId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", empId)
      .query(
        "DELETE FROM EMPLOYEE_TYPE WHERE EMPLOYEE_TYPE_PKID=@input_parameter"
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
    console.log("deleteEmpType-->", error);
    // pool.close();
  }
}

async function getEmpSubTypes() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT est.*,et.EMPLOYEE_TYPE_NAME FROM [EMPLOYEE_SUB_TYPE] est JOIN EMPLOYEE_TYPE et ON EMPLOYEE_TYPE_PKID=EMPLOYEE_SUB_TYPE_TYPE_FKID "
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpSubTypes-->", error);
    // pool.close();
  }
}

async function getEmpSubTypesById(EmpTypeId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EmpTypeId", sql.Int, EmpTypeId)
      .query(
        "SELECT * FROM [EMPLOYEE_SUB_TYPE] WHERE EMPLOYEE_SUB_TYPE_TYPE_FKID=@EmpTypeId"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpSubTypesById-->", error);
    // pool.close();
  }
}

async function addEmpSubType(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EmpTypeId", sql.VarChar, obj.EmpTypeId)
      .input("EmpSubTypeName", sql.VarChar, obj.EmpSubTypeName)
      .query(
        "SELECT * from EMPLOYEE_SUB_TYPE WHERE EMPLOYEE_SUB_TYPE_NAME=@EmpSubTypeName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("EmpTypeId", sql.Int, obj.EmpTypeId)
        .input("EmpSubTypeName", sql.VarChar, obj.EmpSubTypeName)
        .query(
          "insert into EMPLOYEE_SUB_TYPE ([EMPLOYEE_SUB_TYPE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_NAME] ,[EMPLOYEE_SUB_TYPE_ACTIVE])  values(@EmpTypeId,@EmpSubTypeName,1)"
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

async function deleteEmpSubType(empSubId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", empSubId)
      .query(
        "DELETE FROM EMPLOYEE_SUB_TYPE WHERE EMPLOYEE_SUB_TYPE_PKID=@input_parameter"
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
    console.log("deleteEmpSubType-->", error);
    // pool.close();
  }
}

async function updateEmpSubType(empSubtypeId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", empSubtypeId)
      .input("EmpTypeId", obj.EmpTypeId)
      .input("EmpSubTypeName", obj.EmpSubTypeName)
      .query(
        `UPDATE EMPLOYEE_SUB_TYPE SET EMPLOYEE_SUB_TYPE_TYPE_FKID = @EmpTypeId,EMPLOYEE_SUB_TYPE_NAME=@EmpSubTypeName WHERE EMPLOYEE_SUB_TYPE_PKID =@input_parameter`
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
    console.log("updateEmpSubType-->", error);
  }
}

async function getEmp() {
  try {
    let pool = await sql.connect(config);

    let result = await pool.request().execute("ViewAllEmployees");

    pool.close();
    console.log("result.recordsets[0]: ", result.recordsets[0].length);
    return result.recordsets[0];
  } catch (error) {
    console.log("getEmp-->", error);
  }
}

async function addEmp(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EMPLOYEE_EMAIL", obj.Email)
      .input("EMPLOYEE_CONTACT", obj.PhoneNumber)
      .query(
        "SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_CONTACT=@EMPLOYEE_CONTACT"
      );

    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("EMPLOYEE_TYPE_FKID", obj.Emptype)
        .input("EMPOYEE_SUB_TYPE_FKID", obj.EmpSubtype)
        .input("EMPLOYEE_HQ_FKID", obj.EmpHQ)
        .input("EMPLOYEE_COMPANY_FKID", obj.Company)
        .input("EMPLOYEE_NAME", obj.Name)
        .input("EMPLOYEE_PROFILE", obj.Profile)
        .input("EMPLOYEE_EMAIL", obj.Email)
        .input("EMPLOYEE_ALT_EMAIL", obj.Email2)
        .input("EMPLOYEE_CONTACT", obj.PhoneNumber)
        .input("EMPLOYEE_ALT_CONTACT", obj.AlterNateNumber)
        .input("EMPLOYEE_DESIGNATION", obj.Designation)
        .input("EMPLOYEE_QUALIFICATION", obj.Qualification)
        .input("EMPLOYEE_DOJ", obj.JoiningDate)
        .input("EMPLOYEE_DOB", obj.DateofBirth)
        .input("EMPLOYEE_REGION", obj.Region)
        .input("EMPLOYEE_PASSWORD", obj.password)
        .input("EMPLOYEE_GENDER", obj.Gender)
        .input("EMPLOYEE_REPORTING_TO", obj.ReportingTo)
        .input("EMPOLYEE_IS_MANAGER", obj.Ismanager)
        .input("EMPLOYEE_SALARY", obj.salary)
        .input("EMPLOYEE_DOR", obj.dateofreleaving)
        .input("EMPLOYEE_ADDRESS1", obj.address1)
        .input("EMPLOYEE_ADDRESS2", obj.address2)
        .input("EMPLOYEE_ADDRESS3", obj.address3)
        .input("EMPLOYEE_ADDRESS_ZIP", obj.ZipCode)
        .input("EMPLOYEE_ALT_ADDRESS1", obj.altaddress1)
        .input("EMPLOYEE_ALT_ADDRESS2", obj.altaddress2)
        .input("EMPLOYEE_ALT_ADDRESS3", obj.altaddress3)
        .input("EMPLOYEE_ALT_ADDRESS_ZIP", obj.altZipCode)
        .query(
          "insert into EMPLOYEE_MASTER ([EMPLOYEE_TYPE_FKID],[EMPOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_HQ_FKID] ,[EMPLOYEE_COMPANY_FKID] ,[EMPLOYEE_NAME] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_ALT_EMAIL] ,[EMPLOYEE_CONTACT] ,[EMPLOYEE_ALT_CONTACT] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_DOB] ,[EMPLOYEE_REGION] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REPORTING_TO] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPOLYEE_IS_MANAGER] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_DOR] ,[EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP] ,[EMPLOYEE_ACTIVE])  values(@EMPLOYEE_TYPE_FKID ,@EMPOYEE_SUB_TYPE_FKID ,@EMPLOYEE_HQ_FKID ,@EMPLOYEE_COMPANY_FKID ,@EMPLOYEE_NAME ,@EMPLOYEE_EMAIL ,@EMPLOYEE_ALT_EMAIL ,@EMPLOYEE_CONTACT ,@EMPLOYEE_ALT_CONTACT ,@EMPLOYEE_DESIGNATION ,@EMPLOYEE_QUALIFICATION ,@EMPLOYEE_DOJ ,@EMPLOYEE_DOB ,@EMPLOYEE_REGION ,@EMPLOYEE_GENDER ,@EMPLOYEE_REPORTING_TO ,@EMPLOYEE_PASSWORD ,@EMPLOYEE_PROFILE ,@EMPOLYEE_IS_MANAGER ,@EMPLOYEE_SALARY ,@EMPLOYEE_DOR ,@EMPLOYEE_ADDRESS1 ,@EMPLOYEE_ADDRESS2 ,@EMPLOYEE_ADDRESS3 ,@EMPLOYEE_ADDRESS_ZIP ,@EMPLOYEE_ALT_ADDRESS1 ,@EMPLOYEE_ALT_ADDRESS2 ,@EMPLOYEE_ALT_ADDRESS3 ,@EMPLOYEE_ALT_ADDRESS_ZIP ,1)"
        );

      if (insertInto.rowsAffected == 1) {
        let result = await pool
          .request()
          .query("SELECT MAX(EMPLOYEE_PKID) AS PKID from EMPLOYEE_MASTER");

        if (result.recordsets[0].length == 1) {
          let insertProduct = await pool;
          obj.OtherDocs.map((i) => {
            insertProduct
              .request()
              .input("PKID", result.recordsets[0][0].PKID)
              .input("doc", i)
              .query(
                `insert into EMPLOYEE_DOCS ([EMPLOYEE_DOCS_EMP_FKID] ,[EMPLOYEE_DOCS_FILE] ,[EMPLOYEE_DOCS_ACTIVE])  values(@PKID,@doc,1)`
              );
          });
          let insertProduct2 = await pool;
          obj.CoveredArea.map((i) => {
            insertProduct2
              .request()
              .input("PKID", result.recordsets[0][0].PKID)
              .input("doc", i)
              .query(
                `insert into EMPLOYEE_COVERED_AREA ([EMPLOYEE_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_COVERED_AREA_ACTIVE])  values(@PKID,@doc,1)`
              );
          });
          let insertProduct3 = await pool;
          obj.OtherCoveredArea.map((i) => {
            insertProduct3
              .request()
              .input("PKID", result.recordsets[0][0].PKID)
              .input("doc", i)
              .query(
                `insert into EMPLOYEE_OTHER_COVERED_AREA ([EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_ACTIVE] )  values(@PKID,@doc,1)`
              );
          });
          return true;
        } else {
          pool.close();
          return false;
        }
      } else {
        pool.close();
        return false;
      }
    } else {
      pool.close();
      return "0";
    }
  } catch (err) {
    console.log("addEmp-->", err);
  }
}

async function updateEmp(empId, obj) {
  let pkid = empId;
  try {
    let pool = await sql.connect(config);
    let result4 = await pool
      .request()
      .input("input_parameter", empId)
      .input("EMPLOYEE_TYPE_FKID", obj.Emptype)
      .input("EMPOYEE_SUB_TYPE_FKID", obj.EmpSubtype)
      .input("EMPLOYEE_HQ_FKID", obj.EmpHQ)
      .input("EMPLOYEE_COMPANY_FKID", obj.Company)
      .input("EMPLOYEE_NAME", obj.Name)
      .input("EMPLOYEE_PROFILE", obj.Profile)
      .input("EMPLOYEE_EMAIL", obj.Email)
      .input("EMPLOYEE_ALT_EMAIL", obj.Email2)
      .input("EMPLOYEE_CONTACT", obj.PhoneNumber)
      .input("EMPLOYEE_ALT_CONTACT", obj.AlterNateNumber)
      .input("EMPLOYEE_DESIGNATION", obj.Designation)
      .input("EMPLOYEE_QUALIFICATION", obj.Qualification)
      .input("EMPLOYEE_DOJ", obj.JoiningDate)
      .input("EMPLOYEE_DOB", obj.DateofBirth)
      .input("EMPLOYEE_REGION", obj.Region)
      .input("EMPLOYEE_PASSWORD", obj.password)
      .input("EMPLOYEE_GENDER", obj.Gender)
      .input("EMPLOYEE_REPORTING_TO", obj.ReportingTo)
      .input("EMPOLYEE_IS_MANAGER", obj.Ismanager)
      .input("EMPLOYEE_SALARY", obj.salary)
      .input("EMPLOYEE_DOR", obj.dateofreleaving)
      .input("EMPLOYEE_ADDRESS1", obj.address1)
      .input("EMPLOYEE_ADDRESS2", obj.address2)
      .input("EMPLOYEE_ADDRESS3", obj.address3)
      .input("EMPLOYEE_ADDRESS_ZIP", obj.ZipCode)
      .input("EMPLOYEE_ALT_ADDRESS1", obj.altaddress1)
      .input("EMPLOYEE_ALT_ADDRESS2", obj.altaddress2)
      .input("EMPLOYEE_ALT_ADDRESS3", obj.altaddress3)
      .input("EMPLOYEE_ALT_ADDRESS_ZIP", obj.altZipCode)
      .query(
        `UPDATE EMPLOYEE_MASTER SET [EMPLOYEE_TYPE_FKID]=@EMPLOYEE_TYPE_FKID,[EMPOYEE_SUB_TYPE_FKID]=@EMPOYEE_SUB_TYPE_FKID ,[EMPLOYEE_HQ_FKID]=@EMPLOYEE_HQ_FKID ,[EMPLOYEE_COMPANY_FKID]=@EMPLOYEE_COMPANY_FKID ,[EMPLOYEE_NAME]=@EMPLOYEE_NAME ,[EMPLOYEE_EMAIL]=@EMPLOYEE_EMAIL ,[EMPLOYEE_ALT_EMAIL]=@EMPLOYEE_ALT_EMAIL ,[EMPLOYEE_CONTACT]=@EMPLOYEE_CONTACT ,[EMPLOYEE_ALT_CONTACT]=@EMPLOYEE_ALT_CONTACT ,[EMPLOYEE_DESIGNATION]=@EMPLOYEE_DESIGNATION ,[EMPLOYEE_QUALIFICATION]=@EMPLOYEE_QUALIFICATION ,[EMPLOYEE_DOJ]=@EMPLOYEE_DOJ ,[EMPLOYEE_DOB]=@EMPLOYEE_DOB ,[EMPLOYEE_REGION]=@EMPLOYEE_REGION ,[EMPLOYEE_GENDER]=@EMPLOYEE_GENDER ,[EMPLOYEE_REPORTING_TO]=@EMPLOYEE_REPORTING_TO ,[EMPLOYEE_PASSWORD]=@EMPLOYEE_PASSWORD ,[EMPLOYEE_PROFILE]=@EMPLOYEE_PROFILE ,[EMPOLYEE_IS_MANAGER]=@EMPOLYEE_IS_MANAGER ,[EMPLOYEE_SALARY]=@EMPLOYEE_SALARY ,[EMPLOYEE_DOR]=@EMPLOYEE_DOR ,[EMPLOYEE_ADDRESS1]=@EMPLOYEE_ADDRESS1 ,[EMPLOYEE_ADDRESS2]=@EMPLOYEE_ADDRESS2 ,[EMPLOYEE_ADDRESS3]=@EMPLOYEE_ADDRESS3 ,[EMPLOYEE_ADDRESS_ZIP]=@EMPLOYEE_ADDRESS_ZIP ,[EMPLOYEE_ALT_ADDRESS1]=@EMPLOYEE_ALT_ADDRESS1 ,[EMPLOYEE_ALT_ADDRESS2]=@EMPLOYEE_ALT_ADDRESS2 ,[EMPLOYEE_ALT_ADDRESS3]=@EMPLOYEE_ALT_ADDRESS3 ,[EMPLOYEE_ALT_ADDRESS_ZIP]=@EMPLOYEE_ALT_ADDRESS_ZIP ,[EMPLOYEE_ACTIVE]=1 WHERE EMPLOYEE_PKID =@input_parameter`
      );

    console.log("result4.rowsAffected: ", result4.rowsAffected);
    if (result4.rowsAffected) {
      //message = true;
      let result = await pool
        .request()
        .input("input_parameter", pkid)
        .query(
          "DELETE FROM EMPLOYEE_DOCS WHERE EMPLOYEE_DOCS_EMP_FKID=@input_parameter"
        );

      let result2 = await pool
        .request()
        .input("input_parameter", pkid)
        .query(
          "DELETE FROM EMPLOYEE_COVERED_AREA WHERE EMPLOYEE_COVERED_AREA_EMP_FKID=@input_parameter"
        );

      let result3 = await pool
        .request()
        .input("input_parameter", pkid)
        .query(
          "DELETE FROM EMPLOYEE_OTHER_COVERED_AREA WHERE EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID=@input_parameter"
        );

      console.log(
        result.rowsAffected[0],
        result2.rowsAffected[0],
        result3.rowsAffected[0]
      );

      console.log("---- when its 1 ----");

      let insertProduct = await pool;
      obj.OtherDocs.map((i) => {
        insertProduct
          .request()
          .input("PKID", pkid)
          .input("doc", i)
          .query(
            `insert into EMPLOYEE_DOCS ([EMPLOYEE_DOCS_EMP_FKID] ,[EMPLOYEE_DOCS_FILE] ,[EMPLOYEE_DOCS_ACTIVE])  values(@PKID,@doc,1)`
          );
      });

      let insertProduct2 = await pool;
      obj.CoveredArea.map((i) => {
        insertProduct2
          .request()
          .input("PKID", pkid)
          .input("doc", i)
          .query(
            `insert into EMPLOYEE_COVERED_AREA ([EMPLOYEE_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_COVERED_AREA_ACTIVE])  values(@PKID,@doc,1)`
          );
      });

      let insertProduct3 = await pool;
      obj.OtherCoveredArea.map((i) => {
        console.log("OtherCoveredArea i: ", i);
        insertProduct3
          .request()
          .input("PKID", pkid)
          .input("doc", i)
          .query(
            `insert into EMPLOYEE_OTHER_COVERED_AREA ([EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_ACTIVE])  values(@PKID,@doc,1)`
          );
      });

      return true;
    } else {
      pool.close();
      return false;
    }
  } catch (err) {
    console.log("updateEmp-->", err);
  }
}

async function deleteEmp(empId) {
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("empId", empId)
    .query(
      `UPDATE EMPLOYEE_MASTER SET EMPLOYEE_ACTIVE = 0 WHERE EMPLOYEE_PKID=@empId`
    );

  pool.close();
  let message = false;

  if (result.rowsAffected) {
    message = true;
  }
  pool.close();

  return message;
}

async function getEmpById(EmpId) {
  console.log("EmpId: ", EmpId);
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EmpId", EmpId)
      .query("SELECT * FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_PKID=@EmpId");
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpById-->", error);
    // pool.close();
  }
}

async function getAddressByEmpId(EmpId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EmpId", EmpId)
      .query(
        "SELECT [EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP]  FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_PKID=@EmpId"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getAddressByEmpId-->", error);
    // pool.close();
  }
}

async function getCoveredAreaByEmpId(EmpId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EmpId", EmpId)
      .query(
        "SELECT  EMPLOYEE_COVERED_AREA_PKID ,AREA_NAME,COUNTRY_NAME,STATE_NAME,CITY_NAME FROM AREA_MASTER JOIN EMPLOYEE_COVERED_AREA ON AREA_PKID=EMPLOYEE_COVERED_AREA_AREA_FKID JOIN CITY_MASTER ON CITY_PKID=AREA_CITY_FKID JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID  WHERE EMPLOYEE_COVERED_AREA_EMP_FKID=@EmpId"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getCoveredAreaByEmpId-->", error);
    // pool.close();
  }
}
async function GetEmployeeCoveredAreasForEdit(EmpId, hqId) {
  console.log("EmpId, hqId: ", EmpId, hqId);
  if (hqId === "0") {
    return [];
  } else {
    try {
      let pool = await sql.connect(config);

      let result = await pool
        .request()
        .input("hqId", hqId)
        .input("EmpId", EmpId)
        .query(
          "SELECT a.*,isnull(e.EMPLOYEE_COVERED_AREA_ACTIVE, 0) as status FROM AREA_MASTER a JOIN HQ ON HQ_CITY_FKID=AREA_CITY_FKID left join EMPLOYEE_COVERED_AREA e on EMPLOYEE_COVERED_AREA_AREA_FKID = AREA_PKID and EMPLOYEE_COVERED_AREA_EMP_FKID = @EmpId WHERE HQ_PKID=@hqId"
        );
      pool.close();
      // console.log(result.recordsets);
      return result.recordsets[0];
    } catch (error) {
      console.log("GetEmployeeCoveredAreasForEdit-->", error);
      // pool.close();
    }
  }
}

async function getOtherCoveredAreasByEmpId(EmpId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EmpId", EmpId)
      .query(
        "SELECT EMPLOYEE_OTHER_COVERED_AREA_PKID, AREA_NAME,COUNTRY_NAME,STATE_NAME,CITY_NAME FROM AREA_MASTER JOIN EMPLOYEE_OTHER_COVERED_AREA ON AREA_PKID=EMPLOYEE_OTHER_COVERED_AREA_AREA_FKID JOIN CITY_MASTER ON CITY_PKID=AREA_CITY_FKID JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID  WHERE EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID=@EmpId"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getOtherCoveredAreasByEmpId-->", error);
    // pool.close();
  }
}
async function getDocsByEmpId(EmpId) {
  let pool = await sql.connect(config);
  try {
    let result = await pool
      .request()
      .input("EmpId", EmpId)
      .query(
        "SELECT EMPLOYEE_DOCS_FILE,EMPLOYEE_DOCS_PKID FROM [EMPLOYEE_DOCS] WHERE EMPLOYEE_DOCS_EMP_FKID=@EmpId AND EMPLOYEE_DOCS_ACTIVE=1"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getDocsByEmpId-->", error);
  }
  pool.close();
}

async function getEmpByIsManager(IsManager) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("IsManager", IsManager)
      .query(
        "SELECT * FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_ISMANAGER=@IsManager"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("GetEmployeeCoveredAreasForEdit-->", error);
    // pool.close();
  }
}

async function getAllManagers() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("IsManager", "1")
      .query(
        "SELECT EMPLOYEE_NAME,EMPLOYEE_PKID FROM [EMPLOYEE_MASTER] WHERE EMPOLYEE_IS_MANAGER=@IsManager"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getAllManagers-->", error);
    // pool.close();
  }
}

async function importEmps(obj) {
  function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var d = new Date(date_info),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  console.log(ExcelDateToJSDate(44599));
  var x = await obj.Employees;

  try {
    for (var i = 0; i < x.length; i++) {
      console.log(x[i].Email);
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("EMPLOYEE_EMAIL", x[i].Email)
        .input("EMPLOYEE_CONTACT", x[i].PhoneNumber)
        .query(
          "SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_CONTACT=@EMPLOYEE_CONTACT"
        );
      console.log("result.rowsAffected[0]: ", result.rowsAffected[0]);
      if (result.rowsAffected[0] == 0) {
        console.log("inside", x[i].Name);
        let pool = await sql.connect(config);
        let insertInto = await pool
          .request()
          .input("EMPLOYEE_NAME", x[i].Name)
          .input("EMPLOYEE_EMAIL", x[i].Email)
          .input("EMPLOYEE_ALT_EMAIL", x[i].Email2)
          .input("EMPLOYEE_CONTACT", x[i].PhoneNumber)
          .input("EMPLOYEE_ALT_CONTACT", x[i].AlterNateNumber)
          .input("EMPLOYEE_DESIGNATION", x[i].Designation)
          .input("EMPLOYEE_QUALIFICATION", x[i].Qualification)
          .input("EMPLOYEE_DOJ", sql.Date, ExcelDateToJSDate(x[i].JoiningDate))
          .input("EMPLOYEE_DOB", sql.Date, ExcelDateToJSDate(x[i].DateofBirth))
          .input("EMPLOYEE_REGION", x[i].Region)
          .input("EMPLOYEE_PASSWORD", x[i].password)
          .input("EMPLOYEE_GENDER", x[i].Gender)
          .input("EMPOLYEE_IS_MANAGER", x[i].Ismanager)
          .input("EMPLOYEE_SALARY", x[i].salary)
          .input(
            "EMPLOYEE_DOR",
            sql.Date,
            ExcelDateToJSDate(x[i].dateofreleaving)
          )
          .input("EMPLOYEE_ADDRESS1", x[i].address1)
          .input("EMPLOYEE_ADDRESS2", x[i].address2)
          .input("EMPLOYEE_ADDRESS3", x[i].address3)
          .input("EMPLOYEE_ADDRESS_ZIP", x[i].ZipCode)
          .input("EMPLOYEE_ALT_ADDRESS1", x[i].altaddress1)
          .input("EMPLOYEE_ALT_ADDRESS2", x[i].altaddress2)
          .input("EMPLOYEE_ALT_ADDRESS3", x[i].altaddress3)
          .input("EMPLOYEE_ALT_ADDRESS_ZIP", x[i].altZipCode)
          .query(
            "insert into EMPLOYEE_MASTER ([EMPLOYEE_NAME] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_ALT_EMAIL] ,[EMPLOYEE_CONTACT] ,[EMPLOYEE_ALT_CONTACT] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_DOB] ,[EMPLOYEE_REGION] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_PASSWORD]  ,[EMPOLYEE_IS_MANAGER] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_DOR] ,[EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP] ,[EMPLOYEE_ACTIVE])  values(@EMPLOYEE_NAME ,@EMPLOYEE_EMAIL ,@EMPLOYEE_ALT_EMAIL ,@EMPLOYEE_CONTACT ,@EMPLOYEE_ALT_CONTACT ,@EMPLOYEE_DESIGNATION ,@EMPLOYEE_QUALIFICATION ,@EMPLOYEE_DOJ ,@EMPLOYEE_DOB ,@EMPLOYEE_REGION ,@EMPLOYEE_GENDER  ,@EMPLOYEE_PASSWORD  ,@EMPOLYEE_IS_MANAGER ,@EMPLOYEE_SALARY ,@EMPLOYEE_DOR ,@EMPLOYEE_ADDRESS1 ,@EMPLOYEE_ADDRESS2 ,@EMPLOYEE_ADDRESS3 ,@EMPLOYEE_ADDRESS_ZIP ,@EMPLOYEE_ALT_ADDRESS1 ,@EMPLOYEE_ALT_ADDRESS2 ,@EMPLOYEE_ALT_ADDRESS3 ,@EMPLOYEE_ALT_ADDRESS_ZIP ,1)"
          );
        console.log("insertInto.rowsAffected: ", insertInto.rowsAffected);
        pool.close();
      } else {
        pool.close();
      }
    }
    return true;
  } catch (error) {
    console.log("importEmps-->", error);
  }
}

async function getEmpCountriesInCoveredAreasForEdit(empId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("empId", empId)
      .input("type", "Country")
      .execute("GetLocationMasterForEmployeeEdit");
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpCountriesInCoveredAreasForEdit-->", error);
    // pool.close();
  }
}

async function getEmpStatesInCoveredAreasForEdit(empId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("empId", empId)
      .input("type", "State")
      .execute("GetLocationMasterForEmployeeEdit");
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpStatesInCoveredAreasForEdit-->", error);
    // pool.close();
  }
}

async function getEmpCitiesInCoveredAreasForEdit(empId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("empId", empId)
      .input("type", "City")
      .execute("GetLocationMasterForEmployeeEdit");
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpCitiesInCoveredAreasForEdit-->", error);
    // pool.close();
  }
}

async function getEmpAreasInCoveredAreasForEdit(empId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("empId", empId)
      .input("type", "Area")
      .execute("GetLocationMasterForEmployeeEdit");
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpAreasInCoveredAreasForEdit-->", error);
    // pool.close();
  }
}

async function DeleteEmpDocs(docId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("docId", sql.Int, docId)
      .query("DELETE FROM EMPLOYEE_DOCS WHERE EMPLOYEE_DOCS_PKID=@docId");
    console.log("result.rowsAffected[0]: ", result.rowsAffected[0]);

    pool.close();

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("DeleteEmpDocs-->", error);
  }
}

async function getEmpIncentives() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT INCENTIVE_PKID,INCENTIVE_EMPLOYEE_FKID,INCENTIVE_AMOUNT,INCENTIVE_MONTH,INCENTIVE_DESCRIPTION,EMPLOYEE_NAME,INCENTIVE_ISACTIVE,(SELECT DATENAME(MONTH, INCENTIVE_MONTH) +' '+CAST(YEAR(INCENTIVE_MONTH) AS VARCHAR(4))) as Month FROM INCENTIVE JOIN EMPLOYEE_MASTER ON EMPLOYEE_PKID=INCENTIVE_EMPLOYEE_FKID WHERE INCENTIVE_ISACTIVE=1"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("EmpIncentives-->", error);
    // pool.close();
  }
}

async function addEmpIncentives(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("INCENTIVE_MONTH", obj.INCENTIVE_MONTH)
      .input("INCENTIVE_EMPLOYEE_FKID", obj.INCENTIVE_EMPLOYEE_FKID)
      .query(
        `SELECT *  from INCENTIVE WHERE INCENTIVE_MONTH=@INCENTIVE_MONTH AND INCENTIVE_EMPLOYEE_FKID=@INCENTIVE_EMPLOYEE_FKID AND INCENTIVE_ISACTIVE=1`
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("INCENTIVE_EMPLOYEE_FKID", obj.INCENTIVE_EMPLOYEE_FKID)
        .input("INCENTIVE_AMOUNT", obj.INCENTIVE_AMOUNT)
        .input("INCENTIVE_DESCRIPTION", obj.INCENTIVE_DESCRIPTION)
        .input("INCENTIVE_MONTH", obj.INCENTIVE_MONTH)
        .input("INCENTIVE_ISACTIVE", "1")
        .query(
          "INSERT INTO INCENTIVE (INCENTIVE_EMPLOYEE_FKID,INCENTIVE_AMOUNT,INCENTIVE_DESCRIPTION,INCENTIVE_ISACTIVE,INCENTIVE_MONTH) VALUES(@INCENTIVE_EMPLOYEE_FKID,@INCENTIVE_AMOUNT,@INCENTIVE_DESCRIPTION,@INCENTIVE_ISACTIVE,@INCENTIVE_MONTH)"
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
      return "0";
    }
  } catch (err) {
    console.log("addEmpIncentives-->", err);
  }
}

async function DeleteEmpIncentives(IncId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("IncId", IncId)
      .query(
        `UPDATE INCENTIVE SET INCENTIVE_ISACTIVE = 0 WHERE INCENTIVE_PKID=@IncId`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {}
  console.log("DeleteEmpIncentives-->", error);
}

async function updateEmpIncentives(IncId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("IncId", IncId)
      .input("INCENTIVE_EMPLOYEE_FKID", obj.INCENTIVE_EMPLOYEE_FKID)
      .input("INCENTIVE_AMOUNT", obj.INCENTIVE_AMOUNT)
      .input("INCENTIVE_DESCRIPTION", obj.INCENTIVE_DESCRIPTION)
      .input("INCENTIVE_MONTH", obj.INCENTIVE_MONTH)
      .query(
        `UPDATE INCENTIVE SET INCENTIVE_EMPLOYEE_FKID = @INCENTIVE_EMPLOYEE_FKID,INCENTIVE_AMOUNT=@INCENTIVE_AMOUNT,INCENTIVE_DESCRIPTION=@INCENTIVE_DESCRIPTION,INCENTIVE_MONTH=@INCENTIVE_MONTH WHERE INCENTIVE_PKID =@IncId`
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
    console.log("updateEmpIncentives-->", error);
  }
}

async function getEmpLeaves() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select el.*,EMPLOYEE_NAME,[EMPOLYEE_IS_MANAGER],(select count(*) from [dbo].[EMPLOYEE_LEAVE] where [LEAVE_EMPLOYEE_FKID] = el.LEAVE_EMPLOYEE_FKID and LEAVE_ISACTIVE = 1) as LeaveCount from [dbo].[EMPLOYEE_LEAVE] as el join [dbo].[EMPLOYEE_MASTER] on [EMPLOYEE_PKID] = el.LEAVE_EMPLOYEE_FKID where [LEAVE_ISACTIVE] = 0"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getEmpLeaves-->", error);
  }
}

async function AcceptLeaves(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("LEAVE_PKID", reqId)
      .query(
        `UPDATE EMPLOYEE_LEAVE SET LEAVE_ISACTIVE =1 WHERE LEAVE_PKID=@LEAVE_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("AcceptLeaves-->", error);
  }
}

async function RejectLeaves(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("LEAVE_PKID", reqId)
      .query(
        `UPDATE EMPLOYEE_LEAVE SET LEAVE_ISACTIVE =2 WHERE LEAVE_PKID=@LEAVE_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("RejectLeaves-->", error);
  }
}

async function getReasonForLeave(reqId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("LEAVE_PKID", reqId)
      .query(
        "SELECT LEAVE_REASON FROM [EMPLOYEE_LEAVE] WHERE LEAVE_PKID=@LEAVE_PKID"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getReasonForLeave-->", error);
  }
}

async function getAllLeavesForEmployee(empId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("LEAVE_EMPLOYEE_FKID", empId)
      .query(
        "SELECT * FROM [EMPLOYEE_LEAVE] WHERE LEAVE_EMPLOYEE_FKID=@LEAVE_EMPLOYEE_FKID"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getAllLeavesForEmployee-->", error);
  }
}

async function getAllEmployeeLeaves() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "select distinct [EMPLOYEE_PKID] as LEAVE_EMPLOYEE_FKID,[EMPLOYEE_TYPE_NAME],[EMPLOYEE_SUB_TYPE_NAME],[HQ_NAME],[COMPANY_NAME],[EMPLOYEE_NAME],[EMPOLYEE_IS_MANAGER],(select count(*) from [dbo].[EMPLOYEE_LEAVE] where [LEAVE_EMPLOYEE_FKID] = EMPLOYEE_PKID) as LeaveCount from [EMPLOYEE_MASTER] JOIN [dbo].[EMPLOYEE_TYPE] ON [EMPLOYEE_TYPE_PKID]=[EMPLOYEE_TYPE_FKID] JOIN [dbo].[EMPLOYEE_SUB_TYPE] ON [EMPLOYEE_SUB_TYPE_PKID]=[EMPOYEE_SUB_TYPE_FKID] JOIN [dbo].[HQ] ON [HQ_PKID]=[EMPLOYEE_HQ_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[EMPLOYEE_COMPANY_FKID] JOIN [dbo].[EMPLOYEE_LEAVE] as el ON [LEAVE_EMPLOYEE_FKID]=[EMPLOYEE_PKID]"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getAllEmployeeLeaves-->", error);
  }
}
module.exports = {
  getEmpTypes: getEmpTypes,
  addEmpType: addEmpType,
  updateEmpType: updateEmpType,
  deleteEmpType: deleteEmpType,
  getEmpSubTypes: getEmpSubTypes,
  addEmpSubType: addEmpSubType,
  deleteEmpSubType: deleteEmpSubType,
  updateEmpSubType: updateEmpSubType,
  getEmp: getEmp,
  addEmp: addEmp,
  getEmpSubTypesById: getEmpSubTypesById,
  deleteEmp: deleteEmp,
  getEmpById: getEmpById,
  getEmpByIsManager: getEmpByIsManager,
  updateEmp: updateEmp,
  importEmps: importEmps,
  getAddressByEmpId: getAddressByEmpId,
  getCoveredAreaByEmpId: getCoveredAreaByEmpId,
  getDocsByEmpId: getDocsByEmpId,
  getOtherCoveredAreasByEmpId: getOtherCoveredAreasByEmpId,
  getAllManagers: getAllManagers,
  GetEmployeeCoveredAreasForEdit: GetEmployeeCoveredAreasForEdit,
  getEmpCountriesInCoveredAreasForEdit: getEmpCountriesInCoveredAreasForEdit,
  getEmpStatesInCoveredAreasForEdit: getEmpStatesInCoveredAreasForEdit,
  getEmpCitiesInCoveredAreasForEdit: getEmpCitiesInCoveredAreasForEdit,
  getEmpAreasInCoveredAreasForEdit: getEmpAreasInCoveredAreasForEdit,
  DeleteEmpDocs: DeleteEmpDocs,
  getEmpIncentives: getEmpIncentives,
  addEmpIncentives: addEmpIncentives,
  DeleteEmpIncentives: DeleteEmpIncentives,
  updateEmpIncentives: updateEmpIncentives,
  getEmpLeaves: getEmpLeaves,
  AcceptLeaves: AcceptLeaves,
  RejectLeaves: RejectLeaves,
  getReasonForLeave: getReasonForLeave,
  getAllLeavesForEmployee: getAllLeavesForEmployee,
  getAllEmployeeLeaves: getAllEmployeeLeaves,
};
