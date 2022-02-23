"use strict";

var config = require("../dbconfig");

var sql = require("mssql");

function addEmp(obj) {
  var pool, result, insertInto, _result;

  return regeneratorRuntime.async(function addEmp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log("addEmp obj: ", obj);
          console.log("OtherDocs: ", obj.OtherDocs);
          console.log("CoveredArea: ", obj.CoveredArea);
          console.log("OtherCoveredArea: ", obj.OtherCoveredArea);
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 6:
          pool = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(pool.request().input("EMPLOYEE_EMAIL", obj.Email).input("EMPLOYEE_CONTACT", obj.PhoneNumber).query("SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL AND EMPLOYEE_CONTACT=@EMPLOYEE_CONTACT"));

        case 9:
          result = _context.sent;

          if (!(result.rowsAffected[0] == 0)) {
            _context.next = 25;
            break;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(pool.request().input("EMPLOYEE_TYPE_FKID", obj.Emptype).input("EMPOYEE_SUB_TYPE_FKID", obj.EmpSubtype).input("EMPLOYEE_HQ_FKID", obj.EmpHQ).input("EMPLOYEE_COMPANY_FKID", obj.Company).input("EMPLOYEE_NAME", obj.Name).input("EMPLOYEE_EMAIL", obj.Email).input("EMPLOYEE_ALT_EMAIL", obj.Email2).input("EMPLOYEE_CONTACT", obj.PhoneNumber).input("EMPLOYEE_ALT_CONTACT", obj.AlterNateNumber).input("EMPLOYEE_DESIGNATION", obj.Designation).input("EMPLOYEE_QUALIFICATION", obj.Qualification).input("EMPLOYEE_DOJ", obj.JoiningDate).input("EMPLOYEE_DOB", obj.DateofBirth).input("EMPLOYEE_REGION", obj.Region).input("EMPLOYEE_PASSWORD", obj.password).input("EMPLOYEE_GENDER", obj.Gender).input("EMPLOYEE_REPORTING_TO", obj.ReportingTo).input("EMPOLYEE_IS_MANAGER", obj.Ismanager).input("EMPLOYEE_SALARY", obj.salary).input("EMPLOYEE_DOR", obj.dateofreleaving).input("EMPLOYEE_ADDRESS1", obj.address1).input("EMPLOYEE_ADDRESS2", obj.address2).input("EMPLOYEE_ADDRESS3", obj.address3).input("EMPLOYEE_ADDRESS_ZIP", obj.ZipCode).input("EMPLOYEE_ALT_ADDRESS1", obj.altaddress1).input("EMPLOYEE_ALT_ADDRESS2", obj.altaddress2).input("EMPLOYEE_ALT_ADDRESS3", obj.altaddress3).input("EMPLOYEE_ALT_ADDRESS_ZIP", obj.altZipCode).query("insert into EMPLOYEE_MASTER ([EMPLOYEE_TYPE_FKID],[EMPOYEE_SUB_TYPE_FKID] ,[EMPLOYEE_HQ_FKID] ,[EMPLOYEE_COMPANY_FKID] ,[EMPLOYEE_NAME] ,[EMPLOYEE_EMAIL] ,[EMPLOYEE_ALT_EMAIL] ,[EMPLOYEE_CONTACT] ,[EMPLOYEE_ALT_CONTACT] ,[EMPLOYEE_DESIGNATION] ,[EMPLOYEE_QUALIFICATION] ,[EMPLOYEE_DOJ] ,[EMPLOYEE_DOB] ,[EMPLOYEE_REGION] ,[EMPLOYEE_GENDER] ,[EMPLOYEE_REPORTING_TO] ,[EMPLOYEE_PASSWORD] ,[EMPLOYEE_PROFILE] ,[EMPOLYEE_IS_MANAGER] ,[EMPLOYEE_SALARY] ,[EMPLOYEE_DOR] ,[EMPLOYEE_ADDRESS1] ,[EMPLOYEE_ADDRESS2] ,[EMPLOYEE_ADDRESS3] ,[EMPLOYEE_ADDRESS_ZIP] ,[EMPLOYEE_ALT_ADDRESS1] ,[EMPLOYEE_ALT_ADDRESS2] ,[EMPLOYEE_ALT_ADDRESS3] ,[EMPLOYEE_ALT_ADDRESS_ZIP] ,[EMPLOYEE_ACTIVE])  values(@EMPLOYEE_TYPE_FKID ,@EMPOYEE_SUB_TYPE_FKID ,@EMPLOYEE_HQ_FKID ,@EMPLOYEE_COMPANY_FKID ,@EMPLOYEE_NAME ,@EMPLOYEE_EMAIL ,@EMPLOYEE_ALT_EMAIL ,@EMPLOYEE_CONTACT ,@EMPLOYEE_ALT_CONTACT ,@EMPLOYEE_DESIGNATION ,@EMPLOYEE_QUALIFICATION ,@EMPLOYEE_DOJ ,@EMPLOYEE_DOB ,@EMPLOYEE_REGION ,@EMPLOYEE_GENDER ,@EMPLOYEE_REPORTING_TO ,@EMPLOYEE_PASSWORD ,@EMPLOYEE_PROFILE ,@EMPOLYEE_IS_MANAGER ,@EMPLOYEE_SALARY ,@EMPLOYEE_DOR ,@EMPLOYEE_ADDRESS1 ,@EMPLOYEE_ADDRESS2 ,@EMPLOYEE_ADDRESS3 ,@EMPLOYEE_ADDRESS_ZIP ,@EMPLOYEE_ALT_ADDRESS1 ,@EMPLOYEE_ALT_ADDRESS2 ,@EMPLOYEE_ALT_ADDRESS3 ,@EMPLOYEE_ALT_ADDRESS_ZIP ,1)"));

        case 13:
          insertInto = _context.sent;

          if (!(insertInto.rowsAffected == 1)) {
            _context.next = 21;
            break;
          }

          _context.next = 17;
          return regeneratorRuntime.awrap(pool.request().input("EmpTypeName", sql.VarChar, obj.EmpTypeName).query("SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_PKID=MAX(EMPLOYEE_PKID)"));

        case 17:
          _result = _context.sent;

          if (_result.recordsets[0].length > 0) {
            obj.OtherDocs.map(function (i) {// console.log("i--->", i);
              //   let OtherDocsInsert = await pool
              //   .request()
              //   .query(
              //     "insert into EMPLOYEE_DOCS ([EMPLOYEE_DOCS_EMP_FKID],[EMPLOYEE_DOCS_FILE],[EMPLOYEE_DOCS_ACTIVE])  values(@EmpTypeName,1,1)"
              //   );
            });
          } // 
          // pool.close();
          // return true;


          _context.next = 23;
          break;

        case 21:
          pool.close();
          return _context.abrupt("return", false);

        case 23:
          _context.next = 27;
          break;

        case 25:
          pool.close();
          return _context.abrupt("return", "0");

        case 27:
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 29]]);
}