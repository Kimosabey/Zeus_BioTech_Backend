/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-08 12:20:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-24 18:31:43
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    // pool.close();
  }
}

async function updateEmpSubType(empSubtypeId, obj) {
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
}

async function getEmp() {
  try {
    let pool = await sql.connect(config);

    let result = await pool.request().execute("ViewAllEmployees");

    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
}

async function addEmp(obj) {
  // console.log("OtherDocs: ", obj.OtherDocs);
  // console.log("CoveredArea: ", obj.CoveredArea);
  // console.log("OtherCoveredArea: ", obj.OtherCoveredArea);

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
    console.log(err);
  }
}

async function updateEmp(empId, obj) {
  console.log("OtherDocs: ", obj.OtherDocs);
  console.log("CoveredArea: ", obj.CoveredArea);
  console.log("OtherCoveredArea: ", obj.OtherCoveredArea);
  let pkid = empId;
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
    console.log("pkid: ", pkid);
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
    if (
      result.rowsAffected[0] == 0 &&
      result2.rowsAffected[0] == 0 &&
      result3.rowsAffected[0] == 0
    ) {
      pool.close();
      return false;
    } else {
      console.log("---- when its 1 ----");
      let pool = await sql.connect(config);

      let insertProduct = await pool;
      obj.OtherDocs.map((i) => {
        console.log(" OtherDocs i: ", i);
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
        console.log("CoveredArea i: ", i);
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

      console.log("insertProduct.rowsAffected", insertProduct.rowsAffected);
      console.log("insertProduct2.rowsAffected", insertProduct2.rowsAffected);
      console.log("insertProduct3.rowsAffected", insertProduct3.rowsAffected);

      return true;
    }
  } else {
    pool.close();
    return false;
  }
}

async function deleteEmp(empId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", empId)
      .query(
        "DELETE FROM EMPLOYEE_MASTER WHERE EMPLOYEE_PKID=@input_parameter"
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
    console.log(error);
    // pool.close();
  }
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    // pool.close();
  }
}
async function GetEmployeeCoveredAreasForEdit(EmpId, hqId) {
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
    console.log(error);
    // pool.close();
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
    console.log(error);
    // pool.close();
  }
}
async function getDocsByEmpId(EmpId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EmpId", EmpId)
      .query(
        "SELECT EMPLOYEE_DOCS_FILE,EMPLOYEE_DOCS_PKID FROM [EMPLOYEE_DOCS] WHERE EMPLOYEE_DOCS_EMP_FKID=@EmpId AND EMPLOYEE_DOCS_ACTIVE=1"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    // pool.close();
  }
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
    console.log(error);
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
    console.log(error);
    // pool.close();
  }
}

async function importEmps(obj) {
  console.log("obj: ", obj);

  // try {
  //   let insertInto = await pool
  //     .request()
  //     .input("Emptype", sql.VarChar, obj.Emptype)
  //     .input("EmpSubtype", sql.VarChar, obj.EmpSubtype)
  //     .input("Country", sql.VarChar, obj.Country)
  //     .input("State", sql.VarChar, obj.State)
  //     .input("City", sql.VarChar, obj.City)
  //     .input("Area", sql.VarChar, obj.Area)
  //     .input("FName", sql.VarChar, obj.FName)
  //     .input("LName", sql.VarChar, obj.LName)
  //     .input("Email", sql.VarChar, obj.Email)
  //     .input("Designation", sql.VarChar, obj.Designation)
  //     .input("HQtr", sql.VarChar, obj.HQtr)
  //     .input("Company", sql.VarChar, obj.Company)
  //     .input("Qlfn", sql.VarChar, obj.Qlfn)
  //     .input("Address1", sql.VarChar, obj.Address1)
  //     .input("Address2", sql.VarChar, obj.Address2)
  //     .input("Region", sql.VarChar, obj.Region)
  //     .input("Salary", sql.VarChar, obj.Salary)
  //     .input("Target", sql.VarChar, obj.Target)
  //     .input("Mobile", sql.VarChar, obj.Mobile)
  //     .input("Gender", sql.VarChar, obj.Gender)
  //     .input("IsManager", sql.VarChar, obj.IsManager)
  //     .input("ReportingTo", sql.Int, obj.ReportingTo)
  //     .input("Dob", sql.VarChar, obj.Dob)
  //     .input("Doj", sql.VarChar, obj.Doj)
  //     .input("Password", sql.VarChar, obj.Password)
  //     .query(
  //       "INSERT INTO [EMPLOYEE_MASTER] ([EMPLOYEE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_ISMANAGER] ,[EMPLOLYEE_MANAGER_FKID] ,[EMPLOYEE_CODE] ,[EMPLOYEE_FIRST_NAME] ,[EMPLOYEE_LAST_NAME] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_HEADQUARTER] ,[EMPLOYEE_COMPANY] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPLOYEE_MOBILE] ,[EMPLOYEE_COUNTRY_FKID] ,[EMPLOYEE_STATE_FKID] ,[EMPLOYEE_CITY_FKID] ,[EMPLOYEE_AREA_FKID] ,[EMPLOYEE_COMPLETE_ADDRESS] ,[EMPLOYEE_CORRESPONDENCE_ADDRESS] ,[EMPLOYEE_REGION] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_TARGET] ,[EMPLOYEE_DOB] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REG_DATE] ,[EMPLOYEE_ACTIVE]) VALUES (@Emptype,@EmpSubtype,@IsManager,@ReportingTo,'code',@FName,@LName,@Designation,@HQtr,@Company,@Qlfn,@Email,@Password,'-',@Mobile,@Country,@State,@City,@Area,@Address1,@Address2,@Region,@Salary,@Target,@Dob,@Doj,@Gender, CAST( GETDATE() AS Date ),'1')"
  //     );
  //   // .execute('InsertOrders');
  //   if (insertInto.rowsAffected == 1) {
  //     pool.close();
  //     return true;
  //   } else {
  //     pool.close();
  //     return false;
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    // pool.close();
  }
}

async function DeleteEmpDocs(docId) {
  console.log("DeleteEmpDocs: ", docId);
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
    console.log(error);
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
};
