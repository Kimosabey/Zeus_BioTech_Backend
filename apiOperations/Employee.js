/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-08 12:20:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-21 17:56:33
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

    let result = await pool
      .request()
      .query(
        "SELECT [EMPLOYEE_PKID] ,[EMPLOYEE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_ISMANAGER] ,[EMPLOLYEE_MANAGER_FKID] ,[EMPLOYEE_CODE] ,[EMPLOYEE_FIRST_NAME] ,[EMPLOYEE_LAST_NAME] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_HEADQUARTER] ,[EMPLOYEE_COMPANY] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPLOYEE_MOBILE] ,[EMPLOYEE_COUNTRY_FKID] ,[EMPLOYEE_STATE_FKID] ,[EMPLOYEE_CITY_FKID] ,[EMPLOYEE_AREA_FKID] ,[EMPLOYEE_COMPLETE_ADDRESS] ,[EMPLOYEE_CORRESPONDENCE_ADDRESS] ,[EMPLOYEE_REGION] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_TARGET] ,[EMPLOYEE_DOB] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REG_DATE] ,[EMPLOYEE_ACTIVE] FROM [EMPLOYEE_MASTER]"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
   // pool.close();
  }
}

async function addEmp(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("Email", sql.VarChar, obj.Email)
      .query("SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@Email");
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("Emptype", sql.VarChar, obj.Emptype)
        .input("EmpSubtype", sql.VarChar, obj.EmpSubtype)
        .input("Country", sql.VarChar, obj.Country)
        .input("State", sql.VarChar, obj.State)
        .input("City", sql.VarChar, obj.City)
        .input("Area", sql.VarChar, obj.Area)
        .input("FName", sql.VarChar, obj.FName)
        .input("LName", sql.VarChar, obj.LName)
        .input("Email", sql.VarChar, obj.Email)
        .input("Designation", sql.VarChar, obj.Designation)
        .input("HQtr", sql.VarChar, obj.HQtr)
        .input("Company", sql.VarChar, obj.Company)
        .input("Qlfn", sql.VarChar, obj.Qlfn)
        .input("Address1", sql.VarChar, obj.Address1)
        .input("Address2", sql.VarChar, obj.Address2)
        .input("Region", sql.VarChar, obj.Region)
        .input("Salary", sql.VarChar, obj.Salary)
        .input("Target", sql.VarChar, obj.Target)
        .input("Mobile", sql.VarChar, obj.Mobile)
        .input("Gender", sql.VarChar, obj.Gender)
        .input("IsManager", sql.VarChar, obj.IsManager)
        .input("ReportingTo", sql.Int, obj.ReportingTo)
        .input("Dob", sql.VarChar, obj.Dob)
        .input("Doj", sql.VarChar, obj.Doj)
        .input("Password", sql.VarChar, obj.Password)
        .query(
          "INSERT INTO [EMPLOYEE_MASTER] ([EMPLOYEE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_ISMANAGER] ,[EMPLOLYEE_MANAGER_FKID] ,[EMPLOYEE_CODE] ,[EMPLOYEE_FIRST_NAME] ,[EMPLOYEE_LAST_NAME] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_HEADQUARTER] ,[EMPLOYEE_COMPANY] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPLOYEE_MOBILE] ,[EMPLOYEE_COUNTRY_FKID] ,[EMPLOYEE_STATE_FKID] ,[EMPLOYEE_CITY_FKID] ,[EMPLOYEE_AREA_FKID] ,[EMPLOYEE_COMPLETE_ADDRESS] ,[EMPLOYEE_CORRESPONDENCE_ADDRESS] ,[EMPLOYEE_REGION] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_TARGET] ,[EMPLOYEE_DOB] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REG_DATE] ,[EMPLOYEE_ACTIVE]) VALUES (@Emptype,@EmpSubtype,@IsManager,@ReportingTo,'code',@FName,@LName,@Designation,@HQtr,@Company,@Qlfn,@Email,@Password,'-',@Mobile,@Country,@State,@City,@Area,@Address1,@Address2,@Region,@Salary,@Target,@Dob,@Doj,@Gender, CAST( GETDATE() AS Date ),'1')"
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

async function updateEmp(empId, obj) {
  let pool = await sql.connect(config);
  let result = await pool
    .request()
    .input("input_parameter", empId)
    .input("Emptype", sql.VarChar, obj.Emptype)
    .input("EmpSubtype", sql.VarChar, obj.EmpSubtype)
    .input("Country", sql.VarChar, obj.Country)
    .input("State", sql.VarChar, obj.State)
    .input("City", sql.VarChar, obj.City)
    .input("Area", sql.VarChar, obj.Area)
    .input("FName", sql.VarChar, obj.FName)
    .input("LName", sql.VarChar, obj.LName)
    .input("Email", sql.VarChar, obj.Email)
    .input("Designation", sql.VarChar, obj.Designation)
    .input("HQtr", sql.VarChar, obj.HQtr)
    .input("Company", sql.VarChar, obj.Company)
    .input("Qlfn", sql.VarChar, obj.Qlfn)
    .input("Address1", sql.VarChar, obj.Address1)
    .input("Address2", sql.VarChar, obj.Address2)
    .input("Region", sql.VarChar, obj.Region)
    .input("Salary", sql.VarChar, obj.Salary)
    .input("Target", sql.VarChar, obj.Target)
    .input("Mobile", sql.VarChar, obj.Mobile)
    .input("Gender", sql.VarChar, obj.Gender)
    .input("IsManager", sql.VarChar, obj.IsManager)
    .input("ReportingTo", sql.Int, obj.ReportingTo)
    .input("Dob", sql.VarChar, obj.Dob)
    .input("Doj", sql.VarChar, obj.Doj)
    .input("Password", sql.VarChar, obj.Password)
    .query(
      `UPDATE EMPLOYEE_MASTER SET [EMPLOYEE_TYPE_FKID]=@Emptype ,[EMPLOYEE_SUB_TYPE_FKID]=@EmpSubtype ,[EMPLOYEE_ISMANAGER] =@IsManager,[EMPLOLYEE_MANAGER_FKID]=@ReportingTo ,[EMPLOYEE_FIRST_NAME]=@FName ,[EMPLOYEE_LAST_NAME]=@LName,[EMPLOYEE_DESIGNATION]=@Designation ,[EMPLOYEE_HEADQUARTER]=@HQtr ,[EMPLOYEE_COMPANY]=@Company ,[EMPLOYEE_QUALIFICATION]=@Qlfn ,[EMPLOYEE_EMAIL]=@Email ,[EMPLOYEE_PASSWORD]=@Password ,[EMPLOYEE_MOBILE] =@Mobile,[EMPLOYEE_COUNTRY_FKID]=@Country ,[EMPLOYEE_STATE_FKID] =@State,[EMPLOYEE_CITY_FKID]=@City ,[EMPLOYEE_AREA_FKID] =@Area,[EMPLOYEE_COMPLETE_ADDRESS]=@Address1 ,[EMPLOYEE_CORRESPONDENCE_ADDRESS]=@Address2 ,[EMPLOYEE_REGION] =@Region,[EMPLOYEE_SALARY]=@Salary ,[EMPLOYEE_TARGET]=@Target ,[EMPLOYEE_DOB]=@Dob ,[EMPLOYEE_DOJ]=@Doj ,[EMPLOYEE_GENDER]=@Gender  WHERE EMPLOYEE_PKID =@input_parameter`
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
};
