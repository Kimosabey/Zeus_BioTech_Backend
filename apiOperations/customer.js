/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-12 18:47:46
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-21 17:37:25
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getCustomersCat() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT [CUSTOMER_CATEGORY_PKID] ,[CUSTOMER_CATEGORY_NAME] ,[CUSTOMER_CATEGORY_ISACTIVE] FROM [CUSTOMER_CATEGORY] WHERE [CUSTOMER_CATEGORY_ISACTIVE]=1"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getCustomersCat-->", error);
    //pool.close();
  }
}

async function addCustomersCat(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CustCatName", obj.CustCatName)
      .query(
        "SELECT * from CUSTOMER_CATEGORY WHERE CUSTOMER_CATEGORY_NAME=@CustCatName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CustCatName", obj.CustCatName)
        .query(
          "insert into CUSTOMER_CATEGORY ([CUSTOMER_CATEGORY_NAME] ,[CUSTOMER_CATEGORY_ISACTIVE])  values(@CustCatName,1)"
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
    console.log("addCustomersCat-->", err);
  }
}

async function deleteCustomersCat(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .query(
        "DELETE FROM CUSTOMER_CATEGORY WHERE CUSTOMER_CATEGORY_PKID=@custId"
      );

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCustomersCat-->", error);
    //pool.close();
  }
}

async function updateCustomersCat(custId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .input("CustCatName", obj.CustCatName)
      .query(
        `UPDATE CUSTOMER_CATEGORY SET CUSTOMER_CATEGORY_NAME = @CustCatName WHERE CUSTOMER_CATEGORY_PKID =@input_parameter`
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
    console.log("updateCustomersCat-->", error);
  }
}

async function getCustomersType() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query("SELECT * FROM [CUSTOMER_TYPE] WHERE [CUSTOMER_TYPE_ACTIVE]=1");
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustomersType-->", error);
  }
}

async function addCustomersType(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CustTypeName", obj.CustTypeName)
      .query(
        "SELECT * from CUSTOMER_TYPE WHERE CUSTOMER_TYPE_NAME=@CustTypeName"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CustTypeName", obj.CustTypeName)
        .query(
          "insert into CUSTOMER_TYPE ([CUSTOMER_TYPE_NAME] ,[CUSTOMER_TYPE_ACTIVE])  values(@CustTypeName,1)"
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
    console.log("addCustomersType-->", err);
  }
}

async function updateCustomersType(custId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .input("CustTypeName", obj.CustTypeName)
      .query(
        `UPDATE CUSTOMER_TYPE SET CUSTOMER_TYPE_NAME = @CustTypeName WHERE CUSTOMER_TYPE_PKID =@custId`
      );

    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("updateCustomersType-->", error);
  }
}

async function deleteCustomersType(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .query("DELETE FROM CUSTOMER_TYPE WHERE CUSTOMER_TYPE_PKID=@custId");

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCustomersType-->", error);
  }
}

async function getCustomersSubType() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT * FROM [CUSTOMER_SUBTYPE] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_SUBTYPE_TYPE_FKID  WHERE [CUSTOMER_SUBTYPE_ISACTIVE]=1"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustomersSubType-->", error);
  }
}

async function addCustomersSubType(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CustType", obj.CustType)
      .input("CustSubTypeName", obj.CustSubType)
      .query(
        "SELECT * from CUSTOMER_SUBTYPE WHERE CUSTOMER_SUBTYPE_NAME=@CustSubTypeName AND CUSTOMER_SUBTYPE_TYPE_FKID=@CustType"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CustType", obj.CustType)
        .input("CustSubTypeName", obj.CustSubType)
        .query(
          "insert into CUSTOMER_SUBTYPE (CUSTOMER_SUBTYPE_TYPE_FKID ,CUSTOMER_SUBTYPE_NAME,CUSTOMER_SUBTYPE_ISACTIVE)  values(@CustType,@CustSubTypeName,1)"
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
    console.log("addCustomersSubType-->", err);
  }
}

async function updateCustomersSubType(custId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .input("CustType", obj.CustType)
      .input("CustSubTypeName", obj.CustSubType)
      .query(
        `UPDATE CUSTOMER_SUBTYPE SET CUSTOMER_SUBTYPE_NAME = @CustSubTypeName,CUSTOMER_SUBTYPE_TYPE_FKID=@CustType WHERE CUSTOMER_SUBTYPE_PKID =@custId`
      );

    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("updateCustomersSubType-->", error);
  }
}

async function deleteCustomersSubType(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .query(
        "DELETE FROM CUSTOMER_SUBTYPE WHERE CUSTOMER_SUBTYPE_PKID=@custId"
      );

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCustomersSubType-->", error);
  }
}

async function getCustomers() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT  [CUSTOMER_PKID] ,[CUSTOMER_CATEGORY_FKID] ,[CUSTOMER_TYPE_FKID] ,[CUSTOMER_SUBTYPE_FKID] ,[CUSTOMER_NAME] ,[CUSTOMER_EMAIL] ,[CUSTOMER_EMAIL2] ,[CUSTOMER_MOBILE] ,[CUSTOMER_ALT_MOBILE] ,[CUSTOMER_FIRM_NAME] ,[CUSTOMER_CAPACITY] ,[CUSTOMER_REPRESENTATIVE_FKID] ,[CUSTOMER_PRFILE] ,[CUSTOMER_DOC1] ,[CUSTOMER_DOC2] ,[CUSTOMER_DOC3] ,[CUSTOMER_DOC4] ,[CUSTOMER_DOC5] ,[CUSTOMER_DOC6] ,[CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2] ,[CUSTOMER_ISACTIVE] ,EMPLOYEE_NAME,CUSTOMER_TYPE_NAME,CUSTOMER_SUBTYPE_NAME,CUSTOMER_PASSWORD, CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2 , CUSTOMER_CONTACT_SEC_PERSON_PHO , CUSTOMER_CONTACT_SEC_PERSON_PHO2, CUSTOMER_CONTACT_SEC_PERSON_EMAIL,CUSTOMER_CATEGORY_NAME FROM [CUSTOMER_MASTER] JOIN [CUSTOMER_SUBTYPE] ON CUSTOMER_SUBTYPE_PKID=CUSTOMER_SUBTYPE_FKID  JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_TYPE_FKID JOIN CUSTOMER_CATEGORY ON CUSTOMER_CATEGORY_PKID=CUSTOMER_CATEGORY_FKID JOIN EMPLOYEE_MASTER ON EMPLOYEE_PKID=CUSTOMER_REPRESENTATIVE_FKID  WHERE [CUSTOMER_ISACTIVE]=1"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustomers-->", error);
  }
}

async function getCustById(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_PKID", custId)
      .query(
        "SELECT  [CUSTOMER_PKID] ,[CUSTOMER_CATEGORY_FKID] ,[CUSTOMER_TYPE_FKID] ,[CUSTOMER_SUBTYPE_FKID] ,[CUSTOMER_NAME] ,[CUSTOMER_EMAIL] ,[CUSTOMER_EMAIL2] ,[CUSTOMER_MOBILE] ,[CUSTOMER_ALT_MOBILE] ,[CUSTOMER_FIRM_NAME] ,[CUSTOMER_CAPACITY] ,[CUSTOMER_REPRESENTATIVE_FKID] ,[CUSTOMER_PRFILE] ,[CUSTOMER_DOC1] ,[CUSTOMER_DOC2] ,[CUSTOMER_DOC3] ,[CUSTOMER_DOC4] ,[CUSTOMER_DOC5] ,[CUSTOMER_DOC6] ,[CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2] ,[CUSTOMER_ISACTIVE] ,EMPLOYEE_NAME,CUSTOMER_TYPE_NAME,CUSTOMER_SUBTYPE_NAME,CUSTOMER_PASSWORD, CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2 , CUSTOMER_CONTACT_SEC_PERSON_PHO , CUSTOMER_CONTACT_SEC_PERSON_PHO2, CUSTOMER_CONTACT_SEC_PERSON_EMAIL,CUSTOMER_CATEGORY_NAME FROM [CUSTOMER_MASTER] JOIN [CUSTOMER_SUBTYPE] ON CUSTOMER_SUBTYPE_PKID=CUSTOMER_SUBTYPE_FKID  JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_TYPE_FKID JOIN CUSTOMER_CATEGORY ON CUSTOMER_CATEGORY_PKID=CUSTOMER_CATEGORY_FKID JOIN EMPLOYEE_MASTER ON EMPLOYEE_PKID=CUSTOMER_REPRESENTATIVE_FKID  WHERE [CUSTOMER_ISACTIVE]=1 and CUSTOMER_PKID=@CUSTOMER_PKID"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustById-->", error);
    //pool.close();
  }
}

async function getOrderPlaceCustDetails(obj) {
  console.log("obj: ", obj);
  try {
    var pool = await sql.connect(config);

    let x = obj.arr;
    let rerArr = [];
    for (var i = 0; i < x.length; i++) {
      let result = await pool
        .request()
        .input("PRODUCT_PKID", x[i].ProductID)
        .input("PRD_PACKAG_PKID", x[i].PackageID)
        .query(
          "SELECT PRD_PACKAGE_UNIT,[PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_CODE] ,[PRODUCT_BAR_CODE],[PRODUCT_IMAGE],[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,[COMPANY_NAME],PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID JOIN  PRODUCT_PACKAGES ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID AND PRD_PACKAG_PKID=@PRD_PACKAG_PKID WHERE [PRODUCT_ISACTIVE]=1 AND PRODUCT_PKID=@PRODUCT_PKID"
        );

      console.log(
        "pool._connected recon getOrderPlaceCustDetails: 1",
        pool._connected
      );

      if (pool._connected == false) {
        pool = await sql.connect(config);
      }

      var KimoObj = {
        COMPANY_NAME: result.recordsets[0][0].COMPANY_NAME,
        PRODUCT_SPECIES_NAME: result.recordsets[0][0].PRODUCT_SPECIES_NAME,
        PRODUCT_NAME: result.recordsets[0][0].PRODUCT_NAME,
        PRODUCT_PKID: result.recordsets[0][0].PRODUCT_PKID,
        UNIT_OF_MEASUREMENT_SHORT_KEY:
          result.recordsets[0][0].UNIT_OF_MEASUREMENT_SHORT_KEY,
        PackageID: result.recordsets[0][0].PRD_PACKAGE_UNIT,
        Quantity: x[i].Quantity,
        PackageAmt: x[i].PackageAmt,
        Discount: x[i].Discount,
        FreeUnitScheme: x[i].FreeUnitScheme,
        FinalAmount: x[i].FinalAmount,
        ProductAmount: x[i].ProductAmount,
      };

      console.log(
        "pool._connected recon getOrderPlaceCustDetails: 2",
        pool._connected
      );

      rerArr.push(KimoObj);

      if (pool._connected == false) {
        pool = await sql.connect(config);
      }

      console.log(
        "pool._connected recon getOrderPlaceCustDetails: 3",
        pool._connected
      );
    }

    pool.close();

    console.log(
      "pool._connected recon getOrderPlaceCustDetails: 4",
      pool._connected
    );

    return rerArr;
  } catch (error) {
    console.log("getOrderPlaceCustDetails-->", error);
    //pool.close();
  }
}

async function addCustomers(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_EMAIL", obj.CUSTOMER_EMAIL)
      .input("CUSTOMER_MOBILE", obj.CUSTOMER_MOBILE)
      .query(
        "SELECT * FROM [CUSTOMER_MASTER] WHERE CUSTOMER_EMAIL=@CUSTOMER_EMAIL AND CUSTOMER_MOBILE=@CUSTOMER_MOBILE" 
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("CUSTOMER_CATEGORY_FKID", obj.CUSTOMER_CATEGORY_FKID)
        .input("CUSTOMER_TYPE_FKID", obj.CUSTOMER_TYPE_FKID)
        .input("CUSTOMER_SUBTYPE_FKID", obj.CUSTOMER_SUBTYPE_FKID)
        .input("CUSTOMER_NAME", obj.CUSTOMER_NAME)
        .input("CUSTOMER_EMAIL", obj.CUSTOMER_EMAIL)
        .input("CUSTOMER_EMAIL2", obj.CUSTOMER_EMAIL2)
        .input("CUSTOMER_MOBILE", obj.CUSTOMER_MOBILE)
        .input("CUSTOMER_ALT_MOBILE", obj.CUSTOMER_ALT_MOBILE)
        .input("CUSTOMER_FIRM_NAME", obj.CUSTOMER_FIRM_NAME)
        .input("CUSTOMER_CAPACITY", obj.CUSTOMER_CAPACITY)
        .input("CUSTOMER_REPRESENTATIVE_FKID", obj.CUSTOMER_REPRESENTATIVE_FKID)
        .input("CUSTOMER_PRFILE", obj.CUSTOMER_PRFILE)
        .input("CUSTOMER_DOC1", obj.CUSTOMER_DOC1)
        .input("CUSTOMER_DOC2", obj.CUSTOMER_DOC2)
        .input("CUSTOMER_DOC3", obj.CUSTOMER_DOC3)
        .input("CUSTOMER_DOC4", obj.CUSTOMER_DOC4)
        .input("CUSTOMER_DOC5", obj.CUSTOMER_DOC5)
        .input("CUSTOMER_DOC6", obj.CUSTOMER_DOC6)
        .input("CUSTOMER_CONTACT_PERSON_NAME", obj.CUSTOMER_CONTACT_PERSON_NAME)
        .input(
          "CUSTOMER_CONTACT_PERSON_EMAIL",
          obj.CUSTOMER_CONTACT_PERSON_EMAIL
        )
        .input(
          "CUSTOMER_CONTACT_PERSON_EMAIL2",
          obj.CUSTOMER_CONTACT_PERSON_EMAIL2
        )
        .input("CUSTOMER_CONTACT_PERSON_PHO", obj.CUSTOMER_CONTACT_PERSON_PHO)
        .input("CUSTOMER_CONTACT_PERSON_PHO2", obj.CUSTOMER_CONTACT_PERSON_PHO2)
        .input("CUSTOMER_ISACTIVE", "1")
        .input("CUSTOMER_PASSWORD", obj.CUSTOMER_PASSWORD)
        .input(
          "CUSTOMER_CONTACT_SEC_PERSON_NAME",
          obj.CUSTOMER_CONTACT_SEC_PERSON_NAME
        )
        .input(
          "CUSTOMER_CONTACT_SEC_PERSON_EMAIL",
          obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL
        )
        .input(
          "CUSTOMER_CONTACT_SEC_PERSON_EMAIL2",
          obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2
        )
        .input(
          "CUSTOMER_CONTACT_SEC_PERSON_PHO",
          obj.CUSTOMER_CONTACT_SEC_PERSON_PHO
        )
        .input(
          "CUSTOMER_CONTACT_SEC_PERSON_PHO2",
          obj.CUSTOMER_CONTACT_SEC_PERSON_PHO2
        )
        .query(
          "insert into CUSTOMER_MASTER ([CUSTOMER_CATEGORY_FKID] , [CUSTOMER_TYPE_FKID] , [CUSTOMER_SUBTYPE_FKID] , [CUSTOMER_NAME] , [CUSTOMER_EMAIL] , [CUSTOMER_EMAIL2] ,[CUSTOMER_MOBILE] ,[CUSTOMER_ALT_MOBILE] , [CUSTOMER_FIRM_NAME] ,[CUSTOMER_CAPACITY] , [CUSTOMER_REPRESENTATIVE_FKID] , [CUSTOMER_PRFILE] ,[CUSTOMER_DOC1] , [CUSTOMER_DOC2] ,[CUSTOMER_DOC3] ,[CUSTOMER_DOC4] , [CUSTOMER_DOC5] ,[CUSTOMER_DOC6] , [CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2] ,[CUSTOMER_ISACTIVE],[CUSTOMER_PASSWORD],[CUSTOMER_CONTACT_SEC_PERSON_NAME], [CUSTOMER_CONTACT_SEC_PERSON_EMAIL], [CUSTOMER_CONTACT_SEC_PERSON_EMAIL2], [CUSTOMER_CONTACT_SEC_PERSON_PHO], [CUSTOMER_CONTACT_SEC_PERSON_PHO2])  values( @CUSTOMER_CATEGORY_FKID , @CUSTOMER_TYPE_FKID , @CUSTOMER_SUBTYPE_FKID , @CUSTOMER_NAME , @CUSTOMER_EMAIL , @CUSTOMER_EMAIL2 ,@CUSTOMER_MOBILE ,@CUSTOMER_ALT_MOBILE , @CUSTOMER_FIRM_NAME ,@CUSTOMER_CAPACITY , @CUSTOMER_REPRESENTATIVE_FKID , @CUSTOMER_PRFILE ,@CUSTOMER_DOC1 , @CUSTOMER_DOC2 ,@CUSTOMER_DOC3 ,@CUSTOMER_DOC4 , @CUSTOMER_DOC5 ,@CUSTOMER_DOC6 , @CUSTOMER_CONTACT_PERSON_NAME ,@CUSTOMER_CONTACT_PERSON_EMAIL ,@CUSTOMER_CONTACT_PERSON_EMAIL2 ,@CUSTOMER_CONTACT_PERSON_PHO ,@CUSTOMER_CONTACT_PERSON_PHO2 ,@CUSTOMER_ISACTIVE,@CUSTOMER_PASSWORD,@CUSTOMER_CONTACT_SEC_PERSON_NAME, @CUSTOMER_CONTACT_SEC_PERSON_EMAIL, @CUSTOMER_CONTACT_SEC_PERSON_EMAIL2, @CUSTOMER_CONTACT_SEC_PERSON_PHO, @CUSTOMER_CONTACT_SEC_PERSON_PHO2)"
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
    console.log("addCustomers-->", err);
  }
}

async function updateCustomers(custId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_PKID", custId)
      .input("CUSTOMER_CATEGORY_FKID", obj.CUSTOMER_CATEGORY_FKID)
      .input("CUSTOMER_TYPE_FKID", obj.CUSTOMER_TYPE_FKID)
      .input("CUSTOMER_SUBTYPE_FKID", obj.CUSTOMER_SUBTYPE_FKID)
      .input("CUSTOMER_NAME", obj.CUSTOMER_NAME)
      .input("CUSTOMER_EMAIL", obj.CUSTOMER_EMAIL)
      .input("CUSTOMER_EMAIL2", obj.CUSTOMER_EMAIL2)
      .input("CUSTOMER_MOBILE", obj.CUSTOMER_MOBILE)
      .input("CUSTOMER_ALT_MOBILE", obj.CUSTOMER_ALT_MOBILE)
      .input("CUSTOMER_FIRM_NAME", obj.CUSTOMER_FIRM_NAME)
      .input("CUSTOMER_CAPACITY", obj.CUSTOMER_CAPACITY)
      .input("CUSTOMER_REPRESENTATIVE_FKID", obj.CUSTOMER_REPRESENTATIVE_FKID)
      .input("CUSTOMER_PRFILE", obj.CUSTOMER_PRFILE)
      .input("CUSTOMER_DOC1", obj.CUSTOMER_DOC1)
      .input("CUSTOMER_DOC2", obj.CUSTOMER_DOC2)
      .input("CUSTOMER_DOC3", obj.CUSTOMER_DOC3)
      .input("CUSTOMER_DOC4", obj.CUSTOMER_DOC4)
      .input("CUSTOMER_DOC5", obj.CUSTOMER_DOC5)
      .input("CUSTOMER_DOC6", obj.CUSTOMER_DOC6)
      .input("CUSTOMER_CONTACT_PERSON_NAME", obj.CUSTOMER_CONTACT_PERSON_NAME)
      .input("CUSTOMER_CONTACT_PERSON_EMAIL", obj.CUSTOMER_CONTACT_PERSON_EMAIL)
      .input(
        "CUSTOMER_CONTACT_PERSON_EMAIL2",
        obj.CUSTOMER_CONTACT_PERSON_EMAIL2
      )
      .input("CUSTOMER_CONTACT_PERSON_PHO", obj.CUSTOMER_CONTACT_PERSON_PHO)
      .input("CUSTOMER_CONTACT_PERSON_PHO2", obj.CUSTOMER_CONTACT_PERSON_PHO2)
      .input("CUSTOMER_ISACTIVE", "1")
      .input("CUSTOMER_PASSWORD", obj.CUSTOMER_PASSWORD)
      .input(
        "CUSTOMER_CONTACT_SEC_PERSON_NAME",
        obj.CUSTOMER_CONTACT_SEC_PERSON_NAME
      )
      .input(
        "CUSTOMER_CONTACT_SEC_PERSON_EMAIL",
        obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL
      )
      .input(
        "CUSTOMER_CONTACT_SEC_PERSON_EMAIL2",
        obj.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2
      )
      .input(
        "CUSTOMER_CONTACT_SEC_PERSON_PHO",
        obj.CUSTOMER_CONTACT_SEC_PERSON_PHO
      )
      .input(
        "CUSTOMER_CONTACT_SEC_PERSON_PHO2",
        obj.CUSTOMER_CONTACT_SEC_PERSON_PHO2
      )
      .query(
        `UPDATE CUSTOMER_MASTER SET CUSTOMER_CATEGORY_FKID=@CUSTOMER_CATEGORY_FKID , CUSTOMER_TYPE_FKID=@CUSTOMER_TYPE_FKID , CUSTOMER_SUBTYPE_FKID=@CUSTOMER_SUBTYPE_FKID , CUSTOMER_NAME=@CUSTOMER_NAME , CUSTOMER_EMAIL=@CUSTOMER_EMAIL , CUSTOMER_EMAIL2=@CUSTOMER_EMAIL2 ,CUSTOMER_MOBILE=@CUSTOMER_MOBILE ,CUSTOMER_ALT_MOBILE=@CUSTOMER_ALT_MOBILE , CUSTOMER_FIRM_NAME=@CUSTOMER_FIRM_NAME ,CUSTOMER_CAPACITY=@CUSTOMER_CAPACITY , CUSTOMER_REPRESENTATIVE_FKID=@CUSTOMER_REPRESENTATIVE_FKID , CUSTOMER_PRFILE=@CUSTOMER_PRFILE ,CUSTOMER_DOC1=@CUSTOMER_DOC1 , CUSTOMER_DOC2=@CUSTOMER_DOC2 ,CUSTOMER_DOC3=@CUSTOMER_DOC3 ,CUSTOMER_DOC4=@CUSTOMER_DOC4 , CUSTOMER_DOC5=@CUSTOMER_DOC5 ,CUSTOMER_DOC6=@CUSTOMER_DOC6 , CUSTOMER_CONTACT_PERSON_NAME=@CUSTOMER_CONTACT_PERSON_NAME ,CUSTOMER_CONTACT_PERSON_EMAIL=@CUSTOMER_CONTACT_PERSON_EMAIL ,CUSTOMER_CONTACT_PERSON_EMAIL2=@CUSTOMER_CONTACT_PERSON_EMAIL2 ,CUSTOMER_CONTACT_PERSON_PHO=@CUSTOMER_CONTACT_PERSON_PHO ,CUSTOMER_CONTACT_PERSON_PHO2=@CUSTOMER_CONTACT_PERSON_PHO2 ,CUSTOMER_ISACTIVE=@CUSTOMER_ISACTIVE, CUSTOMER_PASSWORD=@CUSTOMER_PASSWORD,CUSTOMER_CONTACT_SEC_PERSON_NAME=@CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL=@CUSTOMER_CONTACT_SEC_PERSON_EMAIL, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2=@CUSTOMER_CONTACT_SEC_PERSON_EMAIL2, CUSTOMER_CONTACT_SEC_PERSON_PHO=@CUSTOMER_CONTACT_SEC_PERSON_PHO, CUSTOMER_CONTACT_SEC_PERSON_PHO2=@CUSTOMER_CONTACT_SEC_PERSON_PHO2 WHERE CUSTOMER_PKID =@CUSTOMER_PKID`
      );

    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("updateCustomers-->", error);
  }
}

async function deleteCustomers(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_PKID", custId)
      .query(
        `UPDATE CUSTOMER_MASTER SET CUSTOMER_ISACTIVE = 0 WHERE CUSTOMER_PKID=@CUSTOMER_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("deleteCustomers-->", error);
  }
}

async function getCustSubTypeByType(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("custId", custId)
      .query(
        "SELECT * FROM [CUSTOMER_SUBTYPE] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=CUSTOMER_SUBTYPE_TYPE_FKID  WHERE [CUSTOMER_SUBTYPE_ISACTIVE]=1 AND CUSTOMER_SUBTYPE_TYPE_FKID=@custId"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustSubTypeByType-->", error);
    //pool.close();
  }
}

async function getCustDocsById(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_PKID", custId)
      .query(
        "SELECT CUSTOMER_DOC1,CUSTOMER_DOC2,CUSTOMER_DOC3,CUSTOMER_DOC4,CUSTOMER_DOC5,CUSTOMER_DOC6 FROM CUSTOMER_MASTER WHERE CUSTOMER_PKID=@CUSTOMER_PKID"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustDocsById-->", error);
    //pool.close();
  }
}

async function getCustContactPersons(custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_PKID", custId)
      .query(
        "SELECT [CUSTOMER_CONTACT_PERSON_NAME] ,[CUSTOMER_CONTACT_PERSON_EMAIL] ,[CUSTOMER_CONTACT_PERSON_EMAIL2] ,[CUSTOMER_CONTACT_PERSON_PHO] ,[CUSTOMER_CONTACT_PERSON_PHO2]  ,CUSTOMER_CONTACT_SEC_PERSON_NAME, CUSTOMER_CONTACT_SEC_PERSON_EMAIL2 , CUSTOMER_CONTACT_SEC_PERSON_PHO , CUSTOMER_CONTACT_SEC_PERSON_PHO2, CUSTOMER_CONTACT_SEC_PERSON_EMAIL FROM CUSTOMER_MASTER WHERE CUSTOMER_PKID=@CUSTOMER_PKID"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustContactPersons-->", error);
    //pool.close();
  }
}

async function getAddressType(custId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("custId", custId)
      .query(
        "SELECT [CUSTOMER_ADDRESS_PKID] ,[CUSTOMER_ADDRESS_CUST_FKID] ,[CUSTOMER_ADDRESS_ADDRESS1] ,[CUSTOMER_ADDRESS_ADDRESS2] ,[CUSTOMER_ADDRESS_ADDRESS3] ,[CUSTOMER_ADDRESS_ZIP_CODE] ,[CUSTOMER_ADDRESS_TYPE] ,[CUSTOMER_ADDRESS_ISACTIVE] FROM [CUSTOMER_ADDRESS] JOIN CUSTOMER_MASTER ON CUSTOMER_PKID=CUSTOMER_ADDRESS_CUST_FKID WHERE CUSTOMER_ADDRESS_ISACTIVE=1 AND CUSTOMER_ADDRESS_CUST_FKID=@custId"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustomersType-->", error);
  }
}

async function addAddressType(obj) {
  try {
    let pool = await sql.connect(config);

    let insertInto = await pool
      .request()
      .input("CUSTOMER_ADDRESS_CUST_FKID", obj.CUSTOMER_ADDRESS_CUST_FKID)
      .input("CUSTOMER_ADDRESS_ADDRESS1", obj.CUSTOMER_ADDRESS_ADDRESS1)
      .input("CUSTOMER_ADDRESS_ADDRESS2", obj.CUSTOMER_ADDRESS_ADDRESS2)
      .input("CUSTOMER_ADDRESS_ADDRESS3", obj.CUSTOMER_ADDRESS_ADDRESS3)
      .input("CUSTOMER_ADDRESS_ZIP_CODE", obj.CUSTOMER_ADDRESS_ZIP_CODE)
      .input("CUSTOMER_ADDRESS_TYPE", obj.CUSTOMER_ADDRESS_TYPE)
      .input("CUSTOMER_ADDRESS_ISACTIVE", "1")
      .query(
        "insert into CUSTOMER_ADDRESS ([CUSTOMER_ADDRESS_CUST_FKID] ,[CUSTOMER_ADDRESS_ADDRESS1] ,[CUSTOMER_ADDRESS_ADDRESS2] ,[CUSTOMER_ADDRESS_ADDRESS3] ,[CUSTOMER_ADDRESS_ZIP_CODE] ,[CUSTOMER_ADDRESS_TYPE],CUSTOMER_ADDRESS_ISACTIVE)  values(@CUSTOMER_ADDRESS_CUST_FKID,@CUSTOMER_ADDRESS_ADDRESS1,@CUSTOMER_ADDRESS_ADDRESS2,@CUSTOMER_ADDRESS_ADDRESS3,@CUSTOMER_ADDRESS_ZIP_CODE,@CUSTOMER_ADDRESS_TYPE,@CUSTOMER_ADDRESS_ISACTIVE)"
      );

    if (insertInto.rowsAffected == 1) {
      pool.close();
      return true;
    } else {
      pool.close();
      return false;
    }
  } catch (err) {
    console.log("addAddressType-->", err);
  }
}

async function updateAddressType(TypeId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_ADDRESS_PKID", TypeId)
      .input("CUSTOMER_ADDRESS_CUST_FKID", obj.CUSTOMER_ADDRESS_CUST_FKID)
      .input("CUSTOMER_ADDRESS_ADDRESS1", obj.CUSTOMER_ADDRESS_ADDRESS1)
      .input("CUSTOMER_ADDRESS_ADDRESS2", obj.CUSTOMER_ADDRESS_ADDRESS2)
      .input("CUSTOMER_ADDRESS_ADDRESS3", obj.CUSTOMER_ADDRESS_ADDRESS3)
      .input("CUSTOMER_ADDRESS_ZIP_CODE", obj.CUSTOMER_ADDRESS_ZIP_CODE)
      .query(
        `UPDATE CUSTOMER_ADDRESS SET CUSTOMER_ADDRESS_CUST_FKID = @CUSTOMER_ADDRESS_CUST_FKID,CUSTOMER_ADDRESS_ADDRESS1=@CUSTOMER_ADDRESS_ADDRESS1,CUSTOMER_ADDRESS_ADDRESS2=@CUSTOMER_ADDRESS_ADDRESS2,CUSTOMER_ADDRESS_ADDRESS3=@CUSTOMER_ADDRESS_ADDRESS3,CUSTOMER_ADDRESS_ZIP_CODE=@CUSTOMER_ADDRESS_ZIP_CODE WHERE CUSTOMER_ADDRESS_PKID =@CUSTOMER_ADDRESS_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("updateAddressType-->", error);
  }
}

async function deleteAddressType(TypeId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("TypeId", TypeId)
      .query(
        "UPDATE CUSTOMER_ADDRESS SET CUSTOMER_ADDRESS_ISACTIVE=0 WHERE CUSTOMER_ADDRESS_PKID=@TypeId"
      );

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteCustomersSubType-->", error);
  }
}

async function getCustDeleteNewRequest() {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query(
        "SELECT [CUSTOMER_DELETE_REQ_PKID],[CUSTOMER_DELETE_REQ_CUST_FKID] , [CUSTOMER_DELETE_REQ_EMP_FKID] ,[CUSTOMER_DELETE_REQ_DATE] , [CUSTOMER_DELETE_REQ_ACTIVE] ,[CUSTOMER_DELETE_REQ_REASON] ,CUSTOMER_NAME,EMPLOYEE_NAME,EMPLOYEE_TYPE_NAME,[EMPLOYEE_SUB_TYPE_NAME],CUSTOMER_CATEGORY_NAME,CUSTOMER_TYPE_NAME,CUSTOMER_SUBTYPE_NAME,CUSTOMER_EMAIL,CUSTOMER_MOBILE FROM CUSTOMER_DELETE_REQ JOIN CUSTOMER_MASTER ON CUSTOMER_PKID=CUSTOMER_DELETE_REQ_CUST_FKID JOIN EMPLOYEE_MASTER ON [EMPLOYEE_PKID]=[CUSTOMER_DELETE_REQ_EMP_FKID] JOIN EMPLOYEE_TYPE ON EMPLOYEE_TYPE_PKID=[EMPLOYEE_TYPE_FKID] JOIN EMPLOYEE_SUB_TYPE ON [EMPLOYEE_SUB_TYPE_TYPE_FKID]=EMPLOYEE_TYPE_PKID JOIN CUSTOMER_CATEGORY ON [CUSTOMER_CATEGORY_PKID]=[CUSTOMER_CATEGORY_FKID] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=[CUSTOMER_TYPE_FKID] JOIN [dbo].[CUSTOMER_SUBTYPE] ON [CUSTOMER_SUBTYPE_PKID]=[CUSTOMER_SUBTYPE_FKID]"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustDeleteNewRequest-->", error);
  }
}

async function AcceptDeleteRequest(reqId, custId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_DELETE_REQ_PKID", reqId)
      .query(
        `UPDATE CUSTOMER_DELETE_REQ SET CUSTOMER_DELETE_REQ_ACTIVE =1 WHERE CUSTOMER_DELETE_REQ_PKID=@CUSTOMER_DELETE_REQ_PKID`
      );

    let result2 = await pool
      .request()
      .input("CUSTOMER_DELETE_REQ_CUST_FKID", custId)
      .query(
        `UPDATE CUSTOMER_MASTER SET CUSTOMER_ISACTIVE = 0 WHERE CUSTOMER_PKID=@CUSTOMER_DELETE_REQ_CUST_FKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected && result2.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("AcceptDeleteRequest-->", error);
  }
}

async function RejectDeleteRequest(reqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_DELETE_REQ_PKID", reqId)
      .query(
        `UPDATE CUSTOMER_DELETE_REQ SET CUSTOMER_DELETE_REQ_ACTIVE =2 WHERE CUSTOMER_DELETE_REQ_PKID=@CUSTOMER_DELETE_REQ_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("RejectDeleteRequest-->", error);
  }
}

async function getCustReasonForDelete(delreqId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CUSTOMER_DELETE_REQ_PKID", delreqId)
      .query(
        "SELECT [CUSTOMER_DELETE_REQ_PKID],[CUSTOMER_DELETE_REQ_REASON]  FROM CUSTOMER_DELETE_REQ JOIN CUSTOMER_MASTER ON CUSTOMER_PKID=CUSTOMER_DELETE_REQ_CUST_FKID JOIN EMPLOYEE_MASTER ON [EMPLOYEE_PKID]=[CUSTOMER_DELETE_REQ_EMP_FKID] JOIN EMPLOYEE_TYPE ON EMPLOYEE_TYPE_PKID=[EMPLOYEE_TYPE_FKID] JOIN EMPLOYEE_SUB_TYPE ON [EMPLOYEE_SUB_TYPE_TYPE_FKID]=EMPLOYEE_TYPE_PKID JOIN CUSTOMER_CATEGORY ON [CUSTOMER_CATEGORY_PKID]=[CUSTOMER_CATEGORY_FKID] JOIN CUSTOMER_TYPE ON CUSTOMER_TYPE_PKID=[CUSTOMER_TYPE_FKID] JOIN [dbo].[CUSTOMER_SUBTYPE] ON [CUSTOMER_SUBTYPE_PKID]=[CUSTOMER_SUBTYPE_FKID] WHERE CUSTOMER_DELETE_REQ_PKID=@CUSTOMER_DELETE_REQ_PKID"
      );
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log("getCustReasonForDelete-->", error);
  }
}

module.exports = {
  getCustomersCat: getCustomersCat,
  deleteCustomersCat: deleteCustomersCat,
  addCustomersCat: addCustomersCat,
  updateCustomersCat: updateCustomersCat,
  getCustomersType: getCustomersType,
  addCustomersType: addCustomersType,
  updateCustomersType: updateCustomersType,
  deleteCustomersType: deleteCustomersType,
  getCustomersSubType: getCustomersSubType,
  addCustomersSubType: addCustomersSubType,
  deleteCustomersSubType: deleteCustomersSubType,
  updateCustomersSubType: updateCustomersSubType,
  getCustomers: getCustomers,
  addCustomers: addCustomers,
  updateCustomers: updateCustomers,
  deleteCustomers: deleteCustomers,
  getCustSubTypeByType: getCustSubTypeByType,
  getCustDocsById: getCustDocsById,
  getCustContactPersons: getCustContactPersons,
  getAddressType: getAddressType,
  addAddressType: addAddressType,
  deleteAddressType: deleteAddressType,
  updateAddressType: updateAddressType,
  getCustDeleteNewRequest: getCustDeleteNewRequest,
  AcceptDeleteRequest: AcceptDeleteRequest,
  RejectDeleteRequest: RejectDeleteRequest,
  getCustReasonForDelete: getCustReasonForDelete,
  getCustById: getCustById,
  getOrderPlaceCustDetails: getOrderPlaceCustDetails,
};
