"use strict";

/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-08 12:20:30
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-04 14:32:23
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
          console.log("getEmpTypes-->", _context.t0); // pool.close();

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
          console.log("deleteEmpType-->", _context4.t0); // pool.close();

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
          console.log("getEmpSubTypes-->", _context5.t0); // pool.close();

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
          console.log("getEmpSubTypesById-->", _context6.t0); // pool.close();

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
          console.log("deleteEmpSubType-->", _context8.t0); // pool.close();

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
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empSubtypeId).input("EmpTypeId", obj.EmpTypeId).input("EmpSubTypeName", obj.EmpSubTypeName).query("UPDATE EMPLOYEE_SUB_TYPE SET EMPLOYEE_SUB_TYPE_TYPE_FKID = @EmpTypeId,EMPLOYEE_SUB_TYPE_NAME=@EmpSubTypeName WHERE EMPLOYEE_SUB_TYPE_PKID =@input_parameter"));

        case 6:
          result = _context9.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context9.abrupt("return", message);

        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](0);
          console.log("updateEmpSubType-->", _context9.t0);

        case 17:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 14]]);
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
          return regeneratorRuntime.awrap(pool.request().execute("ViewAllEmployees"));

        case 6:
          result = _context10.sent;
          pool.close();
          return _context10.abrupt("return", result.recordsets[0]);

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.log("getEmp-->", _context10.t0);

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addEmp(obj) {
  var pool, result, insertInto, _result, insertProduct, insertProduct2, insertProduct3;

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
          return regeneratorRuntime.awrap(pool.request().input("EMPLOYEE_EMAIL", obj.Email).input("EMPLOYEE_CONTACT", obj.PhoneNumber).query("SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_CONTACT=@EMPLOYEE_CONTACT"));

        case 6:
          result = _context11.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context11.next = 39;
            break;
          }

          _context11.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("EMPLOYEE_TYPE_FKID", obj.Emptype).input("EMPOYEE_SUB_TYPE_FKID", obj.EmpSubtype).input("EMPLOYEE_HQ_FKID", obj.EmpHQ).input("EMPLOYEE_COMPANY_FKID", obj.Company).input("EMPLOYEE_NAME", obj.Name).input("EMPLOYEE_PROFILE", obj.Profile).input("EMPLOYEE_EMAIL", obj.Email).input("EMPLOYEE_ALT_EMAIL", obj.Email2).input("EMPLOYEE_CONTACT", obj.PhoneNumber).input("EMPLOYEE_ALT_CONTACT", obj.AlterNateNumber).input("EMPLOYEE_DESIGNATION", obj.Designation).input("EMPLOYEE_QUALIFICATION", obj.Qualification).input("EMPLOYEE_DOJ", obj.JoiningDate).input("EMPLOYEE_DOB", obj.DateofBirth).input("EMPLOYEE_REGION", obj.Region).input("EMPLOYEE_PASSWORD", obj.password).input("EMPLOYEE_GENDER", obj.Gender).input("EMPLOYEE_REPORTING_TO", obj.ReportingTo).input("EMPOLYEE_IS_MANAGER", obj.Ismanager).input("EMPLOYEE_SALARY", obj.salary).input("EMPLOYEE_DOR", obj.dateofreleaving).input("EMPLOYEE_ADDRESS1", obj.address1).input("EMPLOYEE_ADDRESS2", obj.address2).input("EMPLOYEE_ADDRESS3", obj.address3).input("EMPLOYEE_ADDRESS_ZIP", obj.ZipCode).input("EMPLOYEE_ALT_ADDRESS1", obj.altaddress1).input("EMPLOYEE_ALT_ADDRESS2", obj.altaddress2).input("EMPLOYEE_ALT_ADDRESS3", obj.altaddress3).input("EMPLOYEE_ALT_ADDRESS_ZIP", obj.altZipCode).query("insert into EMPLOYEE_MASTER ([EMPLOYEE_TYPE_FKID],[EMPOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_HQ_FKID] ,[EMPLOYEE_COMPANY_FKID] ,[EMPLOYEE_NAME] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_ALT_EMAIL] ,[EMPLOYEE_CONTACT] ,[EMPLOYEE_ALT_CONTACT] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_DOB] ,[EMPLOYEE_REGION] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REPORTING_TO] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPOLYEE_IS_MANAGER] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_DOR] ,[EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP] ,[EMPLOYEE_ACTIVE])  values(@EMPLOYEE_TYPE_FKID ,@EMPOYEE_SUB_TYPE_FKID ,@EMPLOYEE_HQ_FKID ,@EMPLOYEE_COMPANY_FKID ,@EMPLOYEE_NAME ,@EMPLOYEE_EMAIL ,@EMPLOYEE_ALT_EMAIL ,@EMPLOYEE_CONTACT ,@EMPLOYEE_ALT_CONTACT ,@EMPLOYEE_DESIGNATION ,@EMPLOYEE_QUALIFICATION ,@EMPLOYEE_DOJ ,@EMPLOYEE_DOB ,@EMPLOYEE_REGION ,@EMPLOYEE_GENDER ,@EMPLOYEE_REPORTING_TO ,@EMPLOYEE_PASSWORD ,@EMPLOYEE_PROFILE ,@EMPOLYEE_IS_MANAGER ,@EMPLOYEE_SALARY ,@EMPLOYEE_DOR ,@EMPLOYEE_ADDRESS1 ,@EMPLOYEE_ADDRESS2 ,@EMPLOYEE_ADDRESS3 ,@EMPLOYEE_ADDRESS_ZIP ,@EMPLOYEE_ALT_ADDRESS1 ,@EMPLOYEE_ALT_ADDRESS2 ,@EMPLOYEE_ALT_ADDRESS3 ,@EMPLOYEE_ALT_ADDRESS_ZIP ,1)"));

        case 10:
          insertInto = _context11.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context11.next = 35;
            break;
          }

          _context11.next = 14;
          return regeneratorRuntime.awrap(pool.request().query("SELECT MAX(EMPLOYEE_PKID) AS PKID from EMPLOYEE_MASTER"));

        case 14:
          _result = _context11.sent;

          if (!(_result.recordsets[0].length == 1)) {
            _context11.next = 31;
            break;
          }

          _context11.next = 18;
          return regeneratorRuntime.awrap(pool);

        case 18:
          insertProduct = _context11.sent;
          obj.OtherDocs.map(function (i) {
            insertProduct.request().input("PKID", _result.recordsets[0][0].PKID).input("doc", i).query("insert into EMPLOYEE_DOCS ([EMPLOYEE_DOCS_EMP_FKID] ,[EMPLOYEE_DOCS_FILE] ,[EMPLOYEE_DOCS_ACTIVE])  values(@PKID,@doc,1)");
          });
          _context11.next = 22;
          return regeneratorRuntime.awrap(pool);

        case 22:
          insertProduct2 = _context11.sent;
          obj.CoveredArea.map(function (i) {
            insertProduct2.request().input("PKID", _result.recordsets[0][0].PKID).input("doc", i).query("insert into EMPLOYEE_COVERED_AREA ([EMPLOYEE_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_COVERED_AREA_ACTIVE])  values(@PKID,@doc,1)");
          });
          _context11.next = 26;
          return regeneratorRuntime.awrap(pool);

        case 26:
          insertProduct3 = _context11.sent;
          obj.OtherCoveredArea.map(function (i) {
            insertProduct3.request().input("PKID", _result.recordsets[0][0].PKID).input("doc", i).query("insert into EMPLOYEE_OTHER_COVERED_AREA ([EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_ACTIVE] )  values(@PKID,@doc,1)");
          });
          return _context11.abrupt("return", true);

        case 31:
          pool.close();
          return _context11.abrupt("return", false);

        case 33:
          _context11.next = 37;
          break;

        case 35:
          pool.close();
          return _context11.abrupt("return", false);

        case 37:
          _context11.next = 41;
          break;

        case 39:
          pool.close();
          return _context11.abrupt("return", "0");

        case 41:
          _context11.next = 46;
          break;

        case 43:
          _context11.prev = 43;
          _context11.t0 = _context11["catch"](0);
          console.log("addEmp-->", _context11.t0);

        case 46:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 43]]);
}

function updateEmp(empId, obj) {
  var pkid, pool, result4, result, result2, result3, insertProduct, insertProduct2, insertProduct3;
  return regeneratorRuntime.async(function updateEmp$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          pkid = empId;
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context12.sent;
          _context12.next = 7;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", empId).input("EMPLOYEE_TYPE_FKID", obj.Emptype).input("EMPOYEE_SUB_TYPE_FKID", obj.EmpSubtype).input("EMPLOYEE_HQ_FKID", obj.EmpHQ).input("EMPLOYEE_COMPANY_FKID", obj.Company).input("EMPLOYEE_NAME", obj.Name).input("EMPLOYEE_PROFILE", obj.Profile).input("EMPLOYEE_EMAIL", obj.Email).input("EMPLOYEE_ALT_EMAIL", obj.Email2).input("EMPLOYEE_CONTACT", obj.PhoneNumber).input("EMPLOYEE_ALT_CONTACT", obj.AlterNateNumber).input("EMPLOYEE_DESIGNATION", obj.Designation).input("EMPLOYEE_QUALIFICATION", obj.Qualification).input("EMPLOYEE_DOJ", obj.JoiningDate).input("EMPLOYEE_DOB", obj.DateofBirth).input("EMPLOYEE_REGION", obj.Region).input("EMPLOYEE_PASSWORD", obj.password).input("EMPLOYEE_GENDER", obj.Gender).input("EMPLOYEE_REPORTING_TO", obj.ReportingTo).input("EMPOLYEE_IS_MANAGER", obj.Ismanager).input("EMPLOYEE_SALARY", obj.salary).input("EMPLOYEE_DOR", obj.dateofreleaving).input("EMPLOYEE_ADDRESS1", obj.address1).input("EMPLOYEE_ADDRESS2", obj.address2).input("EMPLOYEE_ADDRESS3", obj.address3).input("EMPLOYEE_ADDRESS_ZIP", obj.ZipCode).input("EMPLOYEE_ALT_ADDRESS1", obj.altaddress1).input("EMPLOYEE_ALT_ADDRESS2", obj.altaddress2).input("EMPLOYEE_ALT_ADDRESS3", obj.altaddress3).input("EMPLOYEE_ALT_ADDRESS_ZIP", obj.altZipCode).query("UPDATE EMPLOYEE_MASTER SET [EMPLOYEE_TYPE_FKID]=@EMPLOYEE_TYPE_FKID,[EMPOYEE_SUB_TYPE_FKID]=@EMPOYEE_SUB_TYPE_FKID ,[EMPLOYEE_HQ_FKID]=@EMPLOYEE_HQ_FKID ,[EMPLOYEE_COMPANY_FKID]=@EMPLOYEE_COMPANY_FKID ,[EMPLOYEE_NAME]=@EMPLOYEE_NAME ,[EMPLOYEE_EMAIL]=@EMPLOYEE_EMAIL ,[EMPLOYEE_ALT_EMAIL]=@EMPLOYEE_ALT_EMAIL ,[EMPLOYEE_CONTACT]=@EMPLOYEE_CONTACT ,[EMPLOYEE_ALT_CONTACT]=@EMPLOYEE_ALT_CONTACT ,[EMPLOYEE_DESIGNATION]=@EMPLOYEE_DESIGNATION ,[EMPLOYEE_QUALIFICATION]=@EMPLOYEE_QUALIFICATION ,[EMPLOYEE_DOJ]=@EMPLOYEE_DOJ ,[EMPLOYEE_DOB]=@EMPLOYEE_DOB ,[EMPLOYEE_REGION]=@EMPLOYEE_REGION ,[EMPLOYEE_GENDER]=@EMPLOYEE_GENDER ,[EMPLOYEE_REPORTING_TO]=@EMPLOYEE_REPORTING_TO ,[EMPLOYEE_PASSWORD]=@EMPLOYEE_PASSWORD ,[EMPLOYEE_PROFILE]=@EMPLOYEE_PROFILE ,[EMPOLYEE_IS_MANAGER]=@EMPOLYEE_IS_MANAGER ,[EMPLOYEE_SALARY]=@EMPLOYEE_SALARY ,[EMPLOYEE_DOR]=@EMPLOYEE_DOR ,[EMPLOYEE_ADDRESS1]=@EMPLOYEE_ADDRESS1 ,[EMPLOYEE_ADDRESS2]=@EMPLOYEE_ADDRESS2 ,[EMPLOYEE_ADDRESS3]=@EMPLOYEE_ADDRESS3 ,[EMPLOYEE_ADDRESS_ZIP]=@EMPLOYEE_ADDRESS_ZIP ,[EMPLOYEE_ALT_ADDRESS1]=@EMPLOYEE_ALT_ADDRESS1 ,[EMPLOYEE_ALT_ADDRESS2]=@EMPLOYEE_ALT_ADDRESS2 ,[EMPLOYEE_ALT_ADDRESS3]=@EMPLOYEE_ALT_ADDRESS3 ,[EMPLOYEE_ALT_ADDRESS_ZIP]=@EMPLOYEE_ALT_ADDRESS_ZIP ,[EMPLOYEE_ACTIVE]=1 WHERE EMPLOYEE_PKID =@input_parameter"));

        case 7:
          result4 = _context12.sent;
          console.log("result4.rowsAffected: ", result4.rowsAffected);

          if (!result4.rowsAffected) {
            _context12.next = 36;
            break;
          }

          _context12.next = 12;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", pkid).query("DELETE FROM EMPLOYEE_DOCS WHERE EMPLOYEE_DOCS_EMP_FKID=@input_parameter"));

        case 12:
          result = _context12.sent;
          _context12.next = 15;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", pkid).query("DELETE FROM EMPLOYEE_COVERED_AREA WHERE EMPLOYEE_COVERED_AREA_EMP_FKID=@input_parameter"));

        case 15:
          result2 = _context12.sent;
          _context12.next = 18;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", pkid).query("DELETE FROM EMPLOYEE_OTHER_COVERED_AREA WHERE EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID=@input_parameter"));

        case 18:
          result3 = _context12.sent;
          console.log(result.rowsAffected[0], result2.rowsAffected[0], result3.rowsAffected[0]);
          console.log("---- when its 1 ----");
          _context12.next = 23;
          return regeneratorRuntime.awrap(pool);

        case 23:
          insertProduct = _context12.sent;
          obj.OtherDocs.map(function (i) {
            insertProduct.request().input("PKID", pkid).input("doc", i).query("insert into EMPLOYEE_DOCS ([EMPLOYEE_DOCS_EMP_FKID] ,[EMPLOYEE_DOCS_FILE] ,[EMPLOYEE_DOCS_ACTIVE])  values(@PKID,@doc,1)");
          });
          _context12.next = 27;
          return regeneratorRuntime.awrap(pool);

        case 27:
          insertProduct2 = _context12.sent;
          obj.CoveredArea.map(function (i) {
            insertProduct2.request().input("PKID", pkid).input("doc", i).query("insert into EMPLOYEE_COVERED_AREA ([EMPLOYEE_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_COVERED_AREA_ACTIVE])  values(@PKID,@doc,1)");
          });
          _context12.next = 31;
          return regeneratorRuntime.awrap(pool);

        case 31:
          insertProduct3 = _context12.sent;
          obj.OtherCoveredArea.map(function (i) {
            console.log("OtherCoveredArea i: ", i);
            insertProduct3.request().input("PKID", pkid).input("doc", i).query("insert into EMPLOYEE_OTHER_COVERED_AREA ([EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_AREA_FKID] ,[EMPLOYEE_OTHER_COVERED_AREA_ACTIVE])  values(@PKID,@doc,1)");
          });
          return _context12.abrupt("return", true);

        case 36:
          pool.close();
          return _context12.abrupt("return", false);

        case 38:
          _context12.next = 43;
          break;

        case 40:
          _context12.prev = 40;
          _context12.t0 = _context12["catch"](1);
          console.log("updateEmp-->", _context12.t0);

        case 43:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 40]]);
}

function deleteEmp(empId) {
  var pool, result, message;
  return regeneratorRuntime.async(function deleteEmp$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context13.sent;
          _context13.next = 5;
          return regeneratorRuntime.awrap(pool.request().input("empId", empId).query("UPDATE EMPLOYEE_MASTER SET EMPLOYEE_ACTIVE = 0 WHERE EMPLOYEE_PKID=@empId"));

        case 5:
          result = _context13.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context13.abrupt("return", message);

        case 11:
        case "end":
          return _context13.stop();
      }
    }
  });
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
          console.log("getEmpById-->", _context14.t0); // pool.close();

        case 15:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 12]]);
}

function getAddressByEmpId(EmpId) {
  var pool, result;
  return regeneratorRuntime.async(function getAddressByEmpId$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context15.sent;
          _context15.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpId", EmpId).query("SELECT [EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP]  FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_PKID=@EmpId"));

        case 6:
          result = _context15.sent;
          pool.close();
          return _context15.abrupt("return", result.recordsets[0]);

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          console.log("getAddressByEmpId-->", _context15.t0); // pool.close();

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getCoveredAreaByEmpId(EmpId) {
  var pool, result;
  return regeneratorRuntime.async(function getCoveredAreaByEmpId$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context16.sent;
          _context16.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpId", EmpId).query("SELECT  EMPLOYEE_COVERED_AREA_PKID ,AREA_NAME,COUNTRY_NAME,STATE_NAME,CITY_NAME FROM AREA_MASTER JOIN EMPLOYEE_COVERED_AREA ON AREA_PKID=EMPLOYEE_COVERED_AREA_AREA_FKID JOIN CITY_MASTER ON CITY_PKID=AREA_CITY_FKID JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID  WHERE EMPLOYEE_COVERED_AREA_EMP_FKID=@EmpId"));

        case 6:
          result = _context16.sent;
          pool.close();
          return _context16.abrupt("return", result.recordsets[0]);

        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16["catch"](0);
          console.log("getCoveredAreaByEmpId-->", _context16.t0); // pool.close();

        case 14:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function GetEmployeeCoveredAreasForEdit(EmpId, hqId) {
  var pool, result;
  return regeneratorRuntime.async(function GetEmployeeCoveredAreasForEdit$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          console.log("EmpId, hqId: ", EmpId, hqId);

          if (!(hqId === "0")) {
            _context17.next = 5;
            break;
          }

          return _context17.abrupt("return", []);

        case 5:
          _context17.prev = 5;
          _context17.next = 8;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 8:
          pool = _context17.sent;
          _context17.next = 11;
          return regeneratorRuntime.awrap(pool.request().input("hqId", hqId).input("EmpId", EmpId).query("SELECT a.*,isnull(e.EMPLOYEE_COVERED_AREA_ACTIVE, 0) as status FROM AREA_MASTER a JOIN HQ ON HQ_CITY_FKID=AREA_CITY_FKID left join EMPLOYEE_COVERED_AREA e on EMPLOYEE_COVERED_AREA_AREA_FKID = AREA_PKID and EMPLOYEE_COVERED_AREA_EMP_FKID = @EmpId WHERE HQ_PKID=@hqId"));

        case 11:
          result = _context17.sent;
          pool.close(); // console.log(result.recordsets);

          return _context17.abrupt("return", result.recordsets[0]);

        case 16:
          _context17.prev = 16;
          _context17.t0 = _context17["catch"](5);
          console.log("GetEmployeeCoveredAreasForEdit-->", _context17.t0); // pool.close();

        case 19:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[5, 16]]);
}

function getOtherCoveredAreasByEmpId(EmpId) {
  var pool, result;
  return regeneratorRuntime.async(function getOtherCoveredAreasByEmpId$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context18.sent;
          _context18.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpId", EmpId).query("SELECT EMPLOYEE_OTHER_COVERED_AREA_PKID, AREA_NAME,COUNTRY_NAME,STATE_NAME,CITY_NAME FROM AREA_MASTER JOIN EMPLOYEE_OTHER_COVERED_AREA ON AREA_PKID=EMPLOYEE_OTHER_COVERED_AREA_AREA_FKID JOIN CITY_MASTER ON CITY_PKID=AREA_CITY_FKID JOIN COUNTRY_MASTER ON COUNTRY_PKID=CITY_COUNTRY_FKID JOIN STATE_MASTER ON STATE_PKID=CITY_STATE_FKID  WHERE EMPLOYEE_OTHER_COVERED_AREA_EMP_FKID=@EmpId"));

        case 6:
          result = _context18.sent;
          pool.close();
          return _context18.abrupt("return", result.recordsets[0]);

        case 11:
          _context18.prev = 11;
          _context18.t0 = _context18["catch"](0);
          console.log("getOtherCoveredAreasByEmpId-->", _context18.t0); // pool.close();

        case 14:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getDocsByEmpId(EmpId) {
  var pool, result;
  return regeneratorRuntime.async(function getDocsByEmpId$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 2:
          pool = _context19.sent;
          _context19.prev = 3;
          _context19.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("EmpId", EmpId).query("SELECT EMPLOYEE_DOCS_FILE,EMPLOYEE_DOCS_PKID FROM [EMPLOYEE_DOCS] WHERE EMPLOYEE_DOCS_EMP_FKID=@EmpId AND EMPLOYEE_DOCS_ACTIVE=1"));

        case 6:
          result = _context19.sent;
          pool.close();
          return _context19.abrupt("return", result.recordsets[0]);

        case 11:
          _context19.prev = 11;
          _context19.t0 = _context19["catch"](3);
          console.log("getDocsByEmpId-->", _context19.t0);

        case 14:
          pool.close();

        case 15:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[3, 11]]);
}

function getEmpByIsManager(IsManager) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpByIsManager$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context20.sent;
          _context20.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("IsManager", IsManager).query("SELECT * FROM [EMPLOYEE_MASTER] WHERE EMPLOYEE_ISMANAGER=@IsManager"));

        case 6:
          result = _context20.sent;
          pool.close();
          return _context20.abrupt("return", result.recordsets[0]);

        case 11:
          _context20.prev = 11;
          _context20.t0 = _context20["catch"](0);
          console.log("GetEmployeeCoveredAreasForEdit-->", _context20.t0); // pool.close();

        case 14:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getAllManagers() {
  var pool, result;
  return regeneratorRuntime.async(function getAllManagers$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context21.sent;
          _context21.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("IsManager", "1").query("SELECT EMPLOYEE_NAME,EMPLOYEE_PKID FROM [EMPLOYEE_MASTER] WHERE EMPOLYEE_IS_MANAGER=@IsManager"));

        case 6:
          result = _context21.sent;
          pool.close();
          return _context21.abrupt("return", result.recordsets[0]);

        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](0);
          console.log("getAllManagers-->", _context21.t0); // pool.close();

        case 14:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function importEmps(obj) {
  var ExcelDateToJSDate, x, i, pool, result, _pool, insertInto;

  return regeneratorRuntime.async(function importEmps$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          ExcelDateToJSDate = function _ref(serial) {
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
          };

          console.log(ExcelDateToJSDate(44599));
          _context22.next = 4;
          return regeneratorRuntime.awrap(obj.Employees);

        case 4:
          x = _context22.sent;
          _context22.prev = 5;
          i = 0;

        case 7:
          if (!(i < x.length)) {
            _context22.next = 32;
            break;
          }

          console.log(x[i].Email);
          _context22.next = 11;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 11:
          pool = _context22.sent;
          _context22.next = 14;
          return regeneratorRuntime.awrap(pool.request().input("EMPLOYEE_EMAIL", x[i].Email).input("EMPLOYEE_CONTACT", x[i].PhoneNumber).query("SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_CONTACT=@EMPLOYEE_CONTACT"));

        case 14:
          result = _context22.sent;
          console.log("result.rowsAffected[0]: ", result.rowsAffected[0]);

          if (!(result.rowsAffected[0] == 0)) {
            _context22.next = 28;
            break;
          }

          console.log("inside", x[i].Name);
          _context22.next = 20;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 20:
          _pool = _context22.sent;
          _context22.next = 23;
          return regeneratorRuntime.awrap(_pool.request().input("EMPLOYEE_NAME", x[i].Name).input("EMPLOYEE_EMAIL", x[i].Email).input("EMPLOYEE_ALT_EMAIL", x[i].Email2).input("EMPLOYEE_CONTACT", x[i].PhoneNumber).input("EMPLOYEE_ALT_CONTACT", x[i].AlterNateNumber).input("EMPLOYEE_DESIGNATION", x[i].Designation).input("EMPLOYEE_QUALIFICATION", x[i].Qualification).input("EMPLOYEE_DOJ", sql.Date, ExcelDateToJSDate(x[i].JoiningDate)).input("EMPLOYEE_DOB", sql.Date, ExcelDateToJSDate(x[i].DateofBirth)).input("EMPLOYEE_REGION", x[i].Region).input("EMPLOYEE_PASSWORD", x[i].password).input("EMPLOYEE_GENDER", x[i].Gender).input("EMPOLYEE_IS_MANAGER", x[i].Ismanager).input("EMPLOYEE_SALARY", x[i].salary).input("EMPLOYEE_DOR", sql.Date, ExcelDateToJSDate(x[i].dateofreleaving)).input("EMPLOYEE_ADDRESS1", x[i].address1).input("EMPLOYEE_ADDRESS2", x[i].address2).input("EMPLOYEE_ADDRESS3", x[i].address3).input("EMPLOYEE_ADDRESS_ZIP", x[i].ZipCode).input("EMPLOYEE_ALT_ADDRESS1", x[i].altaddress1).input("EMPLOYEE_ALT_ADDRESS2", x[i].altaddress2).input("EMPLOYEE_ALT_ADDRESS3", x[i].altaddress3).input("EMPLOYEE_ALT_ADDRESS_ZIP", x[i].altZipCode).query("insert into EMPLOYEE_MASTER ([EMPLOYEE_NAME] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_ALT_EMAIL] ,[EMPLOYEE_CONTACT] ,[EMPLOYEE_ALT_CONTACT] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_DOB] ,[EMPLOYEE_REGION] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_PASSWORD]  ,[EMPOLYEE_IS_MANAGER] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_DOR] ,[EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP] ,[EMPLOYEE_ACTIVE])  values(@EMPLOYEE_NAME ,@EMPLOYEE_EMAIL ,@EMPLOYEE_ALT_EMAIL ,@EMPLOYEE_CONTACT ,@EMPLOYEE_ALT_CONTACT ,@EMPLOYEE_DESIGNATION ,@EMPLOYEE_QUALIFICATION ,@EMPLOYEE_DOJ ,@EMPLOYEE_DOB ,@EMPLOYEE_REGION ,@EMPLOYEE_GENDER  ,@EMPLOYEE_PASSWORD  ,@EMPOLYEE_IS_MANAGER ,@EMPLOYEE_SALARY ,@EMPLOYEE_DOR ,@EMPLOYEE_ADDRESS1 ,@EMPLOYEE_ADDRESS2 ,@EMPLOYEE_ADDRESS3 ,@EMPLOYEE_ADDRESS_ZIP ,@EMPLOYEE_ALT_ADDRESS1 ,@EMPLOYEE_ALT_ADDRESS2 ,@EMPLOYEE_ALT_ADDRESS3 ,@EMPLOYEE_ALT_ADDRESS_ZIP ,1)"));

        case 23:
          insertInto = _context22.sent;
          console.log("insertInto.rowsAffected: ", insertInto.rowsAffected);

          _pool.close();

          _context22.next = 29;
          break;

        case 28:
          pool.close();

        case 29:
          i++;
          _context22.next = 7;
          break;

        case 32:
          return _context22.abrupt("return", true);

        case 35:
          _context22.prev = 35;
          _context22.t0 = _context22["catch"](5);
          console.log("importEmps-->", _context22.t0);

        case 38:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[5, 35]]);
}

function getEmpCountriesInCoveredAreasForEdit(empId) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpCountriesInCoveredAreasForEdit$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context23.sent;
          _context23.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("empId", empId).input("type", "Country").execute("GetLocationMasterForEmployeeEdit"));

        case 6:
          result = _context23.sent;
          pool.close();
          return _context23.abrupt("return", result.recordsets[0]);

        case 11:
          _context23.prev = 11;
          _context23.t0 = _context23["catch"](0);
          console.log("getEmpCountriesInCoveredAreasForEdit-->", _context23.t0); // pool.close();

        case 14:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getEmpStatesInCoveredAreasForEdit(empId) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpStatesInCoveredAreasForEdit$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context24.sent;
          _context24.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("empId", empId).input("type", "State").execute("GetLocationMasterForEmployeeEdit"));

        case 6:
          result = _context24.sent;
          pool.close();
          return _context24.abrupt("return", result.recordsets[0]);

        case 11:
          _context24.prev = 11;
          _context24.t0 = _context24["catch"](0);
          console.log("getEmpStatesInCoveredAreasForEdit-->", _context24.t0); // pool.close();

        case 14:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getEmpCitiesInCoveredAreasForEdit(empId) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpCitiesInCoveredAreasForEdit$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context25.sent;
          _context25.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("empId", empId).input("type", "City").execute("GetLocationMasterForEmployeeEdit"));

        case 6:
          result = _context25.sent;
          pool.close();
          return _context25.abrupt("return", result.recordsets[0]);

        case 11:
          _context25.prev = 11;
          _context25.t0 = _context25["catch"](0);
          console.log("getEmpCitiesInCoveredAreasForEdit-->", _context25.t0); // pool.close();

        case 14:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getEmpAreasInCoveredAreasForEdit(empId) {
  var pool, result;
  return regeneratorRuntime.async(function getEmpAreasInCoveredAreasForEdit$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context26.sent;
          _context26.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("empId", empId).input("type", "Area").execute("GetLocationMasterForEmployeeEdit"));

        case 6:
          result = _context26.sent;
          pool.close();
          return _context26.abrupt("return", result.recordsets[0]);

        case 11:
          _context26.prev = 11;
          _context26.t0 = _context26["catch"](0);
          console.log("getEmpAreasInCoveredAreasForEdit-->", _context26.t0); // pool.close();

        case 14:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function DeleteEmpDocs(docId) {
  var pool, result;
  return regeneratorRuntime.async(function DeleteEmpDocs$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context27.sent;
          _context27.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("docId", sql.Int, docId).query("DELETE FROM EMPLOYEE_DOCS WHERE EMPLOYEE_DOCS_PKID=@docId"));

        case 6:
          result = _context27.sent;
          console.log("result.rowsAffected[0]: ", result.rowsAffected[0]);
          pool.close();

          if (!(result.rowsAffected[0] == 0)) {
            _context27.next = 14;
            break;
          }

          pool.close();
          return _context27.abrupt("return", false);

        case 14:
          pool.close();
          return _context27.abrupt("return", true);

        case 16:
          _context27.next = 21;
          break;

        case 18:
          _context27.prev = 18;
          _context27.t0 = _context27["catch"](0);
          console.log("DeleteEmpDocs-->", _context27.t0);

        case 21:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function getEmpIncentives() {
  var pool, result;
  return regeneratorRuntime.async(function getEmpIncentives$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context28.sent;
          _context28.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT INCENTIVE_PKID,INCENTIVE_EMPLOYEE_FKID,INCENTIVE_AMOUNT,INCENTIVE_MONTH,INCENTIVE_DESCRIPTION,EMPLOYEE_NAME,INCENTIVE_ISACTIVE,(SELECT DATENAME(MONTH, INCENTIVE_MONTH) +' '+CAST(YEAR(INCENTIVE_MONTH) AS VARCHAR(4))) as Month FROM INCENTIVE JOIN EMPLOYEE_MASTER ON EMPLOYEE_PKID=INCENTIVE_EMPLOYEE_FKID WHERE INCENTIVE_ISACTIVE=1"));

        case 6:
          result = _context28.sent;
          pool.close();
          return _context28.abrupt("return", result.recordsets[0]);

        case 11:
          _context28.prev = 11;
          _context28.t0 = _context28["catch"](0);
          console.log("EmpIncentives-->", _context28.t0); // pool.close();

        case 14:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function addEmpIncentives(obj) {
  var pool, result, insertInto;
  return regeneratorRuntime.async(function addEmpIncentives$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context29.sent;
          _context29.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("INCENTIVE_MONTH", obj.INCENTIVE_MONTH).input("INCENTIVE_EMPLOYEE_FKID", obj.INCENTIVE_EMPLOYEE_FKID).query("SELECT *  from INCENTIVE WHERE INCENTIVE_MONTH=@INCENTIVE_MONTH AND INCENTIVE_EMPLOYEE_FKID=@INCENTIVE_EMPLOYEE_FKID AND INCENTIVE_ISACTIVE=1"));

        case 6:
          result = _context29.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context29.next = 20;
            break;
          }

          _context29.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("INCENTIVE_EMPLOYEE_FKID", obj.INCENTIVE_EMPLOYEE_FKID).input("INCENTIVE_AMOUNT", obj.INCENTIVE_AMOUNT).input("INCENTIVE_DESCRIPTION", obj.INCENTIVE_DESCRIPTION).input("INCENTIVE_MONTH", obj.INCENTIVE_MONTH).input("INCENTIVE_ISACTIVE", "1").query("INSERT INTO INCENTIVE (INCENTIVE_EMPLOYEE_FKID,INCENTIVE_AMOUNT,INCENTIVE_DESCRIPTION,INCENTIVE_ISACTIVE,INCENTIVE_MONTH) VALUES(@INCENTIVE_EMPLOYEE_FKID,@INCENTIVE_AMOUNT,@INCENTIVE_DESCRIPTION,@INCENTIVE_ISACTIVE,@INCENTIVE_MONTH)"));

        case 10:
          insertInto = _context29.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context29.next = 16;
            break;
          }

          pool.close();
          return _context29.abrupt("return", true);

        case 16:
          pool.close();
          return _context29.abrupt("return", false);

        case 18:
          _context29.next = 22;
          break;

        case 20:
          pool.close();
          return _context29.abrupt("return", "0");

        case 22:
          _context29.next = 27;
          break;

        case 24:
          _context29.prev = 24;
          _context29.t0 = _context29["catch"](0);
          console.log("addEmpIncentives-->", _context29.t0);

        case 27:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[0, 24]]);
}

function DeleteEmpIncentives(IncId) {
  var pool, result, message;
  return regeneratorRuntime.async(function DeleteEmpIncentives$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context30.sent;
          _context30.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("IncId", IncId).query("UPDATE INCENTIVE SET INCENTIVE_ISACTIVE = 0 WHERE INCENTIVE_PKID=@IncId"));

        case 6:
          result = _context30.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context30.abrupt("return", message);

        case 14:
          _context30.prev = 14;
          _context30.t0 = _context30["catch"](0);

        case 16:
          console.log("DeleteEmpIncentives-->", error);

        case 17:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function updateEmpIncentives(IncId, obj) {
  var pool, result, message;
  return regeneratorRuntime.async(function updateEmpIncentives$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context31.sent;
          _context31.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("IncId", IncId).input("INCENTIVE_EMPLOYEE_FKID", obj.INCENTIVE_EMPLOYEE_FKID).input("INCENTIVE_AMOUNT", obj.INCENTIVE_AMOUNT).input("INCENTIVE_DESCRIPTION", obj.INCENTIVE_DESCRIPTION).input("INCENTIVE_MONTH", obj.INCENTIVE_MONTH).query("UPDATE INCENTIVE SET INCENTIVE_EMPLOYEE_FKID = @INCENTIVE_EMPLOYEE_FKID,INCENTIVE_AMOUNT=@INCENTIVE_AMOUNT,INCENTIVE_DESCRIPTION=@INCENTIVE_DESCRIPTION,INCENTIVE_MONTH=@INCENTIVE_MONTH WHERE INCENTIVE_PKID =@IncId"));

        case 6:
          result = _context31.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close(); // return { message };
          // console.log(pool._connected);

          return _context31.abrupt("return", message);

        case 14:
          _context31.prev = 14;
          _context31.t0 = _context31["catch"](0);
          console.log("updateEmpIncentives-->", _context31.t0);

        case 17:
        case "end":
          return _context31.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function getEmpLeaves() {
  var pool, result;
  return regeneratorRuntime.async(function getEmpLeaves$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          _context32.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context32.sent;
          _context32.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select el.*,EMPLOYEE_NAME,[EMPOLYEE_IS_MANAGER],(select count(*) from [dbo].[EMPLOYEE_LEAVE] where [LEAVE_EMPLOYEE_FKID] = el.LEAVE_EMPLOYEE_FKID and LEAVE_ISACTIVE = 1) as LeaveCount from [dbo].[EMPLOYEE_LEAVE] as el join [dbo].[EMPLOYEE_MASTER] on [EMPLOYEE_PKID] = el.LEAVE_EMPLOYEE_FKID where [LEAVE_ISACTIVE] = 0"));

        case 6:
          result = _context32.sent;
          pool.close();
          return _context32.abrupt("return", result.recordsets[0]);

        case 11:
          _context32.prev = 11;
          _context32.t0 = _context32["catch"](0);
          console.log("getEmpLeaves-->", _context32.t0);

        case 14:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function AcceptLeaves(reqId) {
  var pool, result, message;
  return regeneratorRuntime.async(function AcceptLeaves$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          _context33.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context33.sent;
          _context33.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("LEAVE_PKID", reqId).query("UPDATE EMPLOYEE_LEAVE SET LEAVE_ISACTIVE =1 WHERE LEAVE_PKID=@LEAVE_PKID"));

        case 6:
          result = _context33.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context33.abrupt("return", message);

        case 14:
          _context33.prev = 14;
          _context33.t0 = _context33["catch"](0);
          console.log("AcceptLeaves-->", _context33.t0);

        case 17:
        case "end":
          return _context33.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function RejectLeaves(reqId) {
  var pool, result, message;
  return regeneratorRuntime.async(function RejectLeaves$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context34.sent;
          _context34.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("LEAVE_PKID", reqId).query("UPDATE EMPLOYEE_LEAVE SET LEAVE_ISACTIVE =2 WHERE LEAVE_PKID=@LEAVE_PKID"));

        case 6:
          result = _context34.sent;
          pool.close();
          message = false;

          if (result.rowsAffected) {
            message = true;
          }

          pool.close();
          return _context34.abrupt("return", message);

        case 14:
          _context34.prev = 14;
          _context34.t0 = _context34["catch"](0);
          console.log("RejectLeaves-->", _context34.t0);

        case 17:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function getReasonForLeave(reqId) {
  var pool, result;
  return regeneratorRuntime.async(function getReasonForLeave$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          _context35.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context35.sent;
          _context35.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("LEAVE_PKID", reqId).query("SELECT LEAVE_REASON FROM [EMPLOYEE_LEAVE] WHERE LEAVE_PKID=@LEAVE_PKID"));

        case 6:
          result = _context35.sent;
          pool.close();
          return _context35.abrupt("return", result.recordsets[0]);

        case 11:
          _context35.prev = 11;
          _context35.t0 = _context35["catch"](0);
          console.log("getReasonForLeave-->", _context35.t0);

        case 14:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getAllLeavesForEmployee(empId) {
  var pool, result;
  return regeneratorRuntime.async(function getAllLeavesForEmployee$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context36.sent;
          _context36.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("LEAVE_EMPLOYEE_FKID", empId).query("SELECT * FROM [EMPLOYEE_LEAVE] WHERE LEAVE_EMPLOYEE_FKID=@LEAVE_EMPLOYEE_FKID"));

        case 6:
          result = _context36.sent;
          pool.close();
          return _context36.abrupt("return", result.recordsets[0]);

        case 11:
          _context36.prev = 11;
          _context36.t0 = _context36["catch"](0);
          console.log("getAllLeavesForEmployee-->", _context36.t0);

        case 14:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getAllEmployeeLeaves() {
  var pool, result;
  return regeneratorRuntime.async(function getAllEmployeeLeaves$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context37.sent;
          _context37.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select distinct [EMPLOYEE_PKID] as LEAVE_EMPLOYEE_FKID,[EMPLOYEE_TYPE_NAME],[EMPLOYEE_SUB_TYPE_NAME],[HQ_NAME],[COMPANY_NAME],[EMPLOYEE_NAME],[EMPOLYEE_IS_MANAGER],(select count(*) from [dbo].[EMPLOYEE_LEAVE] where [LEAVE_EMPLOYEE_FKID] = EMPLOYEE_PKID) as LeaveCount from [EMPLOYEE_MASTER] JOIN [dbo].[EMPLOYEE_TYPE] ON [EMPLOYEE_TYPE_PKID]=[EMPLOYEE_TYPE_FKID] JOIN [dbo].[EMPLOYEE_SUB_TYPE] ON [EMPLOYEE_SUB_TYPE_PKID]=[EMPOYEE_SUB_TYPE_FKID] JOIN [dbo].[HQ] ON [HQ_PKID]=[EMPLOYEE_HQ_FKID] JOIN [dbo].[COMPANY] ON [COMPANY_PKID]=[EMPLOYEE_COMPANY_FKID] JOIN [dbo].[EMPLOYEE_LEAVE] as el ON [LEAVE_EMPLOYEE_FKID]=[EMPLOYEE_PKID]"));

        case 6:
          result = _context37.sent;
          pool.close();
          return _context37.abrupt("return", result.recordsets[0]);

        case 11:
          _context37.prev = 11;
          _context37.t0 = _context37["catch"](0);
          console.log("getAllEmployeeLeaves-->", _context37.t0);

        case 14:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[0, 11]]);
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
  getAllEmployeeLeaves: getAllEmployeeLeaves
};