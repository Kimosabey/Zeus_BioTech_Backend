"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-08 12:20:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-22 12:06:42
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getEmpTypes() {
  var pool, result;
  return regeneratorRuntime.async(function getEmpTypes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [EMPLOYEE_TYPE]"));

        case 6:
          result = _context.sent;
          pool.close();
          return _context.abrupt("return", result.recordsets[0]);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); // pool.close();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addEmpType(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addEmpType$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpTypeName", sql.VarChar, obj.EmpTypeName).query("SELECT * from EMPLOYEE_TYPE WHERE EMPLOYEE_TYPE_NAME=@EmpTypeName"));

        case 6:
          result = _context2.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("EmpTypeName", sql.VarChar, obj.EmpTypeName).query("insert into EMPLOYEE_TYPE ([EMPLOYEE_TYPE_NAME] ,[EMPLOYEE_TYPE_ISMANAGER] ,[EMPLOYEE_TYPE_ACTIVE])  values(@EmpTypeName,1,1)"));

        case 10:
          insertInto = _context2.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context2.next = 16;
            break;
          }

          pool.close();
          return _context2.abrupt("return", true);

        case 16:
          pool.close();
          return _context2.abrupt("return", false);

        case 18:
          _context2.next = 22;
          break;

        case 20:
          pool.close();
          return _context2.abrupt("return", "Already Existed!");

        case 22:
          _context2.next = 27;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateEmpType(empId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateEmpType$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empId).input("EmpTypeName", obj.EmpTypeName).query("UPDATE EMPLOYEE_TYPE SET EMPLOYEE_TYPE_NAME = @EmpTypeName WHERE EMPLOYEE_TYPE_PKID =@input_parameter"));

        case 5:
          result = _context3.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context3.abrupt("return", message);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteEmpType(empId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteEmpType$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empId).query("DELETE FROM EMPLOYEE_TYPE WHERE EMPLOYEE_TYPE_PKID=@input_parameter"));

        case 6:
          result = _context4.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context4.next = 13;
            break;
          }

          pool.close();
          return _context4.abrupt("return", false);

        case 13:
          pool.close();
          return _context4.abrupt("return", true);

        case 15:
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0); // pool.close();

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function getEmpSubTypes() {
  var pool, result;
  return regeneratorRuntime.async(function getEmpSubTypes$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT est.*,et.EMPLOYEE_TYPE_NAME FROM [EMPLOYEE_SUB_TYPE] est JOIN EMPLOYEE_TYPE et ON EMPLOYEE_TYPE_PKID=EMPLOYEE_SUB_TYPE_TYPE_FKID "));

        case 6:
          result = _context5.sent;
          pool.close();
          return _context5.abrupt("return", result.recordsets[0]);

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0); // pool.close();

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getEmpSubTypesById(EmpTypeId) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpSubTypesById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpTypeId", sql.Int, EmpTypeId).query("SELECT * FROM [EMPLOYEE_SUB_TYPE] WHERE EMPLOYEE_SUB_TYPE_TYPE_FKID=@EmpTypeId"));

        case 6:
          result = _context6.sent;
          pool.close();
          return _context6.abrupt("return", result.recordsets[0]);

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0); // pool.close();

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addEmpSubType(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addEmpSubType$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpTypeId", sql.VarChar, obj.EmpTypeId).input("EmpSubTypeName", sql.VarChar, obj.EmpSubTypeName).query("SELECT * from EMPLOYEE_SUB_TYPE WHERE EMPLOYEE_SUB_TYPE_NAME=@EmpSubTypeName"));

        case 6:
          result = _context7.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context7.next = 20;
            break;
          }

          _context7.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("EmpTypeId", sql.Int, obj.EmpTypeId).input("EmpSubTypeName", sql.VarChar, obj.EmpSubTypeName).query("insert into EMPLOYEE_SUB_TYPE ([EMPLOYEE_SUB_TYPE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_NAME] ,[EMPLOYEE_SUB_TYPE_ACTIVE])  values(@EmpTypeId,@EmpSubTypeName,1)"));

        case 10:
          insertInto = _context7.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context7.next = 16;
            break;
          }

          pool.close();
          return _context7.abrupt("return", true);

        case 16:
          pool.close();
          return _context7.abrupt("return", false);

        case 18:
          _context7.next = 22;
          break;

        case 20:
          pool.close();
          return _context7.abrupt("return", "Already Existed!");

        case 22:
          _context7.next = 27;
          break;

        case 24:
          _context7.prev = 24;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 27:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function deleteEmpSubType(empSubId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteEmpSubType$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empSubId).query("DELETE FROM EMPLOYEE_SUB_TYPE WHERE EMPLOYEE_SUB_TYPE_PKID=@input_parameter"));

        case 6:
          result = _context8.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context8.next = 13;
            break;
          }

          pool.close();
          return _context8.abrupt("return", false);

        case 13:
          pool.close();
          return _context8.abrupt("return", true);

        case 15:
          _context8.next = 20;
          break;

        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0); // pool.close();

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function updateEmpSubType(empSubtypeId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateEmpSubType$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empSubtypeId).input("EmpTypeId", obj.EmpTypeId).input("EmpSubTypeName", obj.EmpSubTypeName).query("UPDATE EMPLOYEE_SUB_TYPE SET EMPLOYEE_SUB_TYPE_TYPE_FKID = @EmpTypeId,EMPLOYEE_SUB_TYPE_NAME=@EmpSubTypeName WHERE EMPLOYEE_SUB_TYPE_PKID =@input_parameter"));

        case 5:
          result = _context9.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context9.abrupt("return", message);

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function getEmp() {
  var pool, result;
  return regeneratorRuntime.async(function getEmp$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT [EMPLOYEE_PKID] ,[EMPLOYEE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_ISMANAGER] ,[EMPLOLYEE_MANAGER_FKID] ,[EMPLOYEE_CODE] ,[EMPLOYEE_FIRST_NAME] ,[EMPLOYEE_LAST_NAME] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_HEADQUARTER] ,[EMPLOYEE_COMPANY] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPLOYEE_MOBILE] ,[EMPLOYEE_COUNTRY_FKID] ,[EMPLOYEE_STATE_FKID] ,[EMPLOYEE_CITY_FKID] ,[EMPLOYEE_AREA_FKID] ,[EMPLOYEE_COMPLETE_ADDRESS] ,[EMPLOYEE_CORRESPONDENCE_ADDRESS] ,[EMPLOYEE_REGION] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_TARGET] ,[EMPLOYEE_DOB] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REG_DATE] ,[EMPLOYEE_ACTIVE] FROM [EMPLOYEE_MASTER]"));

        case 6:
          result = _context10.sent;
          pool.close();
          return _context10.abrupt("return", result.recordsets[0]);

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0); // pool.close();

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addEmp(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addEmp$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context11.sent;
          _context11.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("Email", sql.VarChar, obj.Email).query("SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@Email"));

        case 6:
          result = _context11.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context11.next = 20;
            break;
          }

          _context11.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("Emptype", sql.VarChar, obj.Emptype).input("EmpSubtype", sql.VarChar, obj.EmpSubtype).input("Country", sql.VarChar, obj.Country).input("State", sql.VarChar, obj.State).input("City", sql.VarChar, obj.City).input("Area", sql.VarChar, obj.Area).input("FName", sql.VarChar, obj.FName).input("LName", sql.VarChar, obj.LName).input("Email", sql.VarChar, obj.Email).input("Designation", sql.VarChar, obj.Designation).input("HQtr", sql.VarChar, obj.HQtr).input("Company", sql.VarChar, obj.Company).input("Qlfn", sql.VarChar, obj.Qlfn).input("Address1", sql.VarChar, obj.Address1).input("Address2", sql.VarChar, obj.Address2).input("Region", sql.VarChar, obj.Region).input("Salary", sql.VarChar, obj.Salary).input("Target", sql.VarChar, obj.Target).input("Mobile", sql.VarChar, obj.Mobile).input("Gender", sql.VarChar, obj.Gender).input("IsManager", sql.VarChar, obj.IsManager).input("ReportingTo", sql.Int, obj.ReportingTo).input("Dob", sql.VarChar, obj.Dob).input("Doj", sql.VarChar, obj.Doj).input("Password", sql.VarChar, obj.Password).query("INSERT INTO [EMPLOYEE_MASTER] ([EMPLOYEE_TYPE_FKID] ,[EMPLOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_ISMANAGER] ,[EMPLOLYEE_MANAGER_FKID] ,[EMPLOYEE_CODE] ,[EMPLOYEE_FIRST_NAME] ,[EMPLOYEE_LAST_NAME] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_HEADQUARTER] ,[EMPLOYEE_COMPANY] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPLOYEE_MOBILE] ,[EMPLOYEE_COUNTRY_FKID] ,[EMPLOYEE_STATE_FKID] ,[EMPLOYEE_CITY_FKID] ,[EMPLOYEE_AREA_FKID] ,[EMPLOYEE_COMPLETE_ADDRESS] ,[EMPLOYEE_CORRESPONDENCE_ADDRESS] ,[EMPLOYEE_REGION] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_TARGET] ,[EMPLOYEE_DOB] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REG_DATE] ,[EMPLOYEE_ACTIVE]) VALUES (@Emptype,@EmpSubtype,@IsManager,@ReportingTo,'code',@FName,@LName,@Designation,@HQtr,@Company,@Qlfn,@Email,@Password,'-',@Mobile,@Country,@State,@City,@Area,@Address1,@Address2,@Region,@Salary,@Target,@Dob,@Doj,@Gender, CAST( GETDATE() AS Date ),'1')"));

        case 10:
          insertInto = _context11.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context11.next = 16;
            break;
          }

          pool.close();
          return _context11.abrupt("return", true);

        case 16:
          pool.close();
          return _context11.abrupt("return", false);

        case 18:
          _context11.next = 22;
          break;

        case 20:
          pool.close();
          return _context11.abrupt("return", "Already Existed!");

        case 22:
          _context11.next = 27;
          break;

        case 24:
          _context11.prev = 24;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);

        case 27:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function updateEmp(empId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateEmp$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context12.sent;
          _context12.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empId).input("Emptype", sql.VarChar, obj.Emptype).input("EmpSubtype", sql.VarChar, obj.EmpSubtype).input("Country", sql.VarChar, obj.Country).input("State", sql.VarChar, obj.State).input("City", sql.VarChar, obj.City).input("Area", sql.VarChar, obj.Area).input("FName", sql.VarChar, obj.FName).input("LName", sql.VarChar, obj.LName).input("Email", sql.VarChar, obj.Email).input("Designation", sql.VarChar, obj.Designation).input("HQtr", sql.VarChar, obj.HQtr).input("Company", sql.VarChar, obj.Company).input("Qlfn", sql.VarChar, obj.Qlfn).input("Address1", sql.VarChar, obj.Address1).input("Address2", sql.VarChar, obj.Address2).input("Region", sql.VarChar, obj.Region).input("Salary", sql.VarChar, obj.Salary).input("Target", sql.VarChar, obj.Target).input("Mobile", sql.VarChar, obj.Mobile).input("Gender", sql.VarChar, obj.Gender).input("IsManager", sql.VarChar, obj.IsManager).input("ReportingTo", sql.Int, obj.ReportingTo).input("Dob", sql.VarChar, obj.Dob).input("Doj", sql.VarChar, obj.Doj).input("Password", sql.VarChar, obj.Password).query("UPDATE EMPLOYEE_MASTER SET [EMPLOYEE_TYPE_FKID]=@Emptype ,[EMPLOYEE_SUB_TYPE_FKID]=@EmpSubtype ,[EMPLOYEE_ISMANAGER] =@IsManager,[EMPLOLYEE_MANAGER_FKID]=@ReportingTo ,[EMPLOYEE_FIRST_NAME]=@FName ,[EMPLOYEE_LAST_NAME]=@LName,[EMPLOYEE_DESIGNATION]=@Designation ,[EMPLOYEE_HEADQUARTER]=@HQtr ,[EMPLOYEE_COMPANY]=@Company ,[EMPLOYEE_QUALIFICATION]=@Qlfn ,[EMPLOYEE_EMAIL]=@Email ,[EMPLOYEE_PASSWORD]=@Password ,[EMPLOYEE_MOBILE] =@Mobile,[EMPLOYEE_COUNTRY_FKID]=@Country ,[EMPLOYEE_STATE_FKID] =@State,[EMPLOYEE_CITY_FKID]=@City ,[EMPLOYEE_AREA_FKID] =@Area,[EMPLOYEE_COMPLETE_ADDRESS]=@Address1 ,[EMPLOYEE_CORRESPONDENCE_ADDRESS]=@Address2 ,[EMPLOYEE_REGION] =@Region,[EMPLOYEE_SALARY]=@Salary ,[EMPLOYEE_TARGET]=@Target ,[EMPLOYEE_DOB]=@Dob ,[EMPLOYEE_DOJ]=@Doj ,[EMPLOYEE_GENDER]=@Gender  WHERE EMPLOYEE_PKID =@input_parameter"));

        case 5:
          result = _context12.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context12.abrupt("return", message);

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function deleteEmp(empId) {
  var pool, result;
  return regeneratorRuntime.async(function deleteEmp$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context13.sent;
          _context13.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empId).query("DELETE FROM EMPLOYEE_MASTER WHERE EMPLOYEE_PKID=@input_parameter"));

        case 6:
          result = _context13.sent;
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context13.next = 13;
            break;
          }

          pool.close();
          return _context13.abrupt("return", false);

        case 13:
          pool.close();
          return _context13.abrupt("return", true);

        case 15:
          _context13.next = 20;
          break;

        case 17:
          _context13.prev = 17;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0); // pool.close();

        case 20:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function getEmpById(EmpId) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpById$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          console.log("EmpId: ", EmpId);
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context14.sent;
          _context14.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("EmpId", EmpId).query("SELECT * FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_PKID=@EmpId"));

        case 7:
          result = _context14.sent;
          pool.close();
          return _context14.abrupt("return", result.recordsets[0]);

        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](1);
          console.log(_context14.t0); // pool.close();

        case 15:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 12]]);
}

function getEmpByIsManager(IsManager) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpByIsManager$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context15.sent;
          _context15.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("IsManager", IsManager).query("SELECT * FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_ISMANAGER=@IsManager"));

        case 6:
          result = _context15.sent;
          pool.close();
          return _context15.abrupt("return", result.recordsets[0]);

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0); // pool.close();

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function importEmps(obj) {
  return regeneratorRuntime.async(function importEmps$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          console.log("obj: ", obj); // try {
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

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
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
  importEmps: importEmps
};