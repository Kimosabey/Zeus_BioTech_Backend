/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-14 14:39:09
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-15 11:43:33
 */

var config = require("../dbconfig");
const sql = require("mssql");

async function getProductSpecies() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT * FROM [PRODUCT_SPECIES] WHERE [PRODUCT_SPECIES_ISACTIVE]=1"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getProductSpecies-->", error);
  }
}

async function addProductSpecies(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME)
      .query(
        "SELECT * from PRODUCT_SPECIES WHERE PRODUCT_SPECIES_NAME=@PRODUCT_SPECIES_NAME"
      );
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME)
        .input("PRODUCT_SPECIES_ISACTIVE", "1")
        .query(
          "insert into PRODUCT_SPECIES ([PRODUCT_SPECIES_NAME] ,[PRODUCT_SPECIES_ISACTIVE])  values(@PRODUCT_SPECIES_NAME,@PRODUCT_SPECIES_ISACTIVE)"
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
    console.log("addProductSpecies-->", err);
  }
}

async function deleteProductSpecies(specId) {
  console.log("specId: ", specId);

  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRODUCT_SPECIES_PKID", specId)
      .query(
        "UPDATE PRODUCT_SPECIES SET PRODUCT_SPECIES_ISACTIVE=0 WHERE PRODUCT_SPECIES_PKID=@PRODUCT_SPECIES_PKID"
      );

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteProductSpecies-->", error);
  }
}

async function updateProductSpecies(specId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRODUCT_SPECIES_PKID", specId)
      .input("PRODUCT_SPECIES_NAME", obj.PRODUCT_SPECIES_NAME)
      .query(
        `UPDATE PRODUCT_SPECIES SET PRODUCT_SPECIES_NAME = @PRODUCT_SPECIES_NAME WHERE PRODUCT_SPECIES_PKID =@PRODUCT_SPECIES_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();
    console.log("message: ", message);
    return message;
  } catch (error) {
    console.log("updateProductSpecies-->", error);
  }
}

async function getProducts() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .query(
        "SELECT [PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,COMPANY_NAME,PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID  WHERE [PRODUCT_ISACTIVE]=1  ORDER BY PRODUCT_PKID DESC"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getProducts-->", error);
  }
}

async function getProductsByCompany(CompanyID) {
  var kimoArray = [];
  var Obj = {};
  var pool = await sql.connect(config);
  try {
    var result = await pool
      .request()
      .input("PRODUCT_COMPANY_FKID", CompanyID)
      .query(
        "SELECT [PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_CODE] ,[PRODUCT_BAR_CODE],[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,COMPANY_NAME,PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID  WHERE [PRODUCT_ISACTIVE]=1 AND PRODUCT_COMPANY_FKID=@PRODUCT_COMPANY_FKID"
      );

    var kimo = result.recordsets[0];

    for (let i = 0; i < kimo.length; i++) {
      var res2 = await pool
        .request()
        .input("PRD_PACKAGE_PRODUCT_FKID", kimo[i].PRODUCT_PKID)
        .query(
          "SELECT PCKS.*,UNIT_OF_MEASUREMENT_SHORT_KEY from [PRODUCT_PACKAGES] PCKS JOIN PRODUCT_MASTER  ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID WHERE [PRD_PACKAGE_PRODUCT_FKID]=@PRD_PACKAGE_PRODUCT_FKID"
        );

      Obj = {
        COMPANY_NAME: kimo[i].COMPANY_NAME,
        PRODUCT_SPECIES_NAME: kimo[i].PRODUCT_SPECIES_NAME,
        PRODUCT_NAME: kimo[i].PRODUCT_NAME,
        PRODUCT_PKID: kimo[i].PRODUCT_PKID,
        UNIT_OF_MEASUREMENT_SHORT_KEY: kimo[i].UNIT_OF_MEASUREMENT_SHORT_KEY,
        packagesArr: res2.recordsets[0],
      };
      kimoArray.push(Obj);
    }

    console.log("OUTSIDE SCOPE", kimoArray);
    pool.close();
    return kimoArray;
  } catch (error) {
    console.log("getProductsByCompany-->", error);
  }
}

async function addProducts(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRODUCT_CODE", obj.PRODUCT_CODE)
      .query("SELECT * FROM PRODUCT_MASTER WHERE PRODUCT_CODE=@PRODUCT_CODE");
    if (result.rowsAffected[0] == 0) {
      let insertInto = await pool
        .request()
        .input("PRODUCT_COMPANY_FKID", obj.PRODUCT_COMPANY_FKID)
        .input("PRODUCT_SPECIES_FKID", obj.PRODUCT_SPECIES_FKID)
        .input("PRODUCT_NAME", obj.PRODUCT_NAME)
        .input("PRODUCT_UOM_FKID", obj.PRODUCT_UOM_FKID)
        .input("PRODUCT_CODE", obj.PRODUCT_CODE)
        .input("PRODUCT_BAR_CODE", obj.PRODUCT_BAR_CODE)
        .input("PRODUCT_IMAGE", obj.PRODUCT_IMAGE)
        .input("PRODUCT_CATALOGUE", obj.PRODUCT_CATALOGUE)
        .input("PRODUCT_ISACTIVE", "1")
        .query(
          "insert into PRODUCT_MASTER ([PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE])  values(@PRODUCT_COMPANY_FKID,@PRODUCT_SPECIES_FKID,@PRODUCT_NAME ,@PRODUCT_UOM_FKID,@PRODUCT_CODE ,@PRODUCT_BAR_CODE ,@PRODUCT_IMAGE ,@PRODUCT_CATALOGUE ,@PRODUCT_ISACTIVE)"
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
    console.log("addProducts-->", err);
  }
}

async function deleteProducts(prodId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRODUCT_PKID", prodId)
      .query(
        "UPDATE PRODUCT_MASTER SET PRODUCT_ISACTIVE=0 WHERE PRODUCT_PKID=@PRODUCT_PKID"
      );

    if (result.rowsAffected[0] == 0) {
      pool.close();
      return false;
    } else {
      pool.close();
      return true;
    }
  } catch (error) {
    console.log("deleteProducts-->", error);
  }
}

async function updateProducts(prodId, obj) {
  console.log("prodId, obj: ", prodId, obj);
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRODUCT_PKID", prodId)
      .input("PRODUCT_COMPANY_FKID", obj.PRODUCT_COMPANY_FKID)
      .input("PRODUCT_SPECIES_FKID", obj.PRODUCT_SPECIES_FKID)
      .input("PRODUCT_NAME", obj.PRODUCT_NAME)
      .input("PRODUCT_UOM_FKID", obj.PRODUCT_UOM_FKID)
      .input("PRODUCT_CODE", obj.PRODUCT_CODE)
      .input("PRODUCT_BAR_CODE", obj.PRODUCT_BAR_CODE)
      .input("PRODUCT_IMAGE", obj.PRODUCT_IMAGE)
      .input("PRODUCT_CATALOGUE", obj.PRODUCT_CATALOGUE)
      .query(
        `UPDATE PRODUCT_MASTER SET PRODUCT_COMPANY_FKID=@PRODUCT_COMPANY_FKID, PRODUCT_SPECIES_FKID=@PRODUCT_SPECIES_FKID, PRODUCT_NAME=@PRODUCT_NAME,PRODUCT_UOM_FKID=@PRODUCT_UOM_FKID, PRODUCT_CODE=@PRODUCT_CODE, PRODUCT_BAR_CODE=@PRODUCT_BAR_CODE, PRODUCT_IMAGE=@PRODUCT_IMAGE, PRODUCT_CATALOGUE=@PRODUCT_CATALOGUE WHERE PRODUCT_PKID=@PRODUCT_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();

    return message;
  } catch (error) {
    console.log("updateProducts-->", error);
  }
}

async function getProductPackages(prodId) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("PRD_PACKAGE_PRODUCT_FKID", prodId)
      .query(
        "SELECT PCKS.*,UNIT_OF_MEASUREMENT_SHORT_KEY from [PRODUCT_PACKAGES] PCKS JOIN PRODUCT_MASTER  ON PRODUCT_PKID=PRD_PACKAGE_PRODUCT_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID WHERE [PRD_PACKAGE_PRODUCT_FKID]=@PRD_PACKAGE_PRODUCT_FKID"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getProductPackages-->", error);
  }
}

async function addProductPackages(obj) {
  console.log("obj: ", obj);
  try {
    let pool = await sql.connect(config);

    let insertInto = await pool
      .request()
      .input("PRD_PACKAGE_PRODUCT_FKID", obj.PRD_PACKAGE_PRODUCT_FKID)
      .input("PRD_PACKAGE_WHOLESALE_PRICE", obj.PRD_PACKAGE_WHOLESALE_PRICE)
      .input("PRD_PACKAGE_DEALER_PRICE", obj.PRD_PACKAGE_DEALER_PRICE)
      .input("PRD_PACKAGE_MRP", obj.PRD_PACKAGE_MRP)
      .input("PRD_PACKAGE_UNIT", obj.PRD_PACKAGE_UNIT)
      .query(
        "insert into PRODUCT_PACKAGES ([PRD_PACKAGE_PRODUCT_FKID] ,[PRD_PACKAGE_WHOLESALE_PRICE] ,[PRD_PACKAGE_DEALER_PRICE] ,[PRD_PACKAGE_MRP] ,[PRD_PACKAGE_UNIT])  values(@PRD_PACKAGE_PRODUCT_FKID ,@PRD_PACKAGE_WHOLESALE_PRICE ,@PRD_PACKAGE_DEALER_PRICE ,@PRD_PACKAGE_MRP ,@PRD_PACKAGE_UNIT)"
      );

    if (insertInto.rowsAffected == 1) {
      pool.close();
      return true;
    } else {
      pool.close();
      return false;
    }
  } catch (err) {
    console.log("addProductPackages-->", err);
  }
}

async function deleteProductPackages(packId) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRD_PACKAG_PKID", packId)
      .query(
        "DELETE FROM PRODUCT_PACKAGES WHERE PRD_PACKAG_PKID=@PRD_PACKAG_PKID"
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
    console.log("deleteProductPackages-->", error);
  }
}

async function updateProductPackages(packId, obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("PRD_PACKAG_PKID", packId)
      .input("PRD_PACKAGE_PRODUCT_FKID", obj.PRD_PACKAGE_PRODUCT_FKID)
      .input("PRD_PACKAGE_WHOLESALE_PRICE", obj.PRD_PACKAGE_WHOLESALE_PRICE)
      .input("PRD_PACKAGE_DEALER_PRICE", obj.PRD_PACKAGE_DEALER_PRICE)
      .input("PRD_PACKAGE_MRP", obj.PRD_PACKAGE_MRP)
      .input("PRD_PACKAGE_UNIT", obj.PRD_PACKAGE_UNIT)
      .query(
        `UPDATE PRODUCT_PACKAGES SET PRD_PACKAGE_PRODUCT_FKID=@PRD_PACKAGE_PRODUCT_FKID ,PRD_PACKAGE_WHOLESALE_PRICE=@PRD_PACKAGE_WHOLESALE_PRICE ,PRD_PACKAGE_DEALER_PRICE=@PRD_PACKAGE_DEALER_PRICE ,PRD_PACKAGE_MRP=@PRD_PACKAGE_MRP ,PRD_PACKAGE_UNIT=@PRD_PACKAGE_UNIT WHERE PRD_PACKAG_PKID =@PRD_PACKAG_PKID`
      );

    pool.close();
    let message = false;

    if (result.rowsAffected) {
      message = true;
    }
    pool.close();
    // return { message };

    return message;
  } catch (error) {
    console.log("updateProductPackages-->", error);
  }
}

module.exports = {
  addProductSpecies: addProductSpecies,
  getProductSpecies: getProductSpecies,
  updateProductSpecies: updateProductSpecies,
  deleteProductSpecies: deleteProductSpecies,
  addProducts: addProducts,
  deleteProducts: deleteProducts,
  updateProducts: updateProducts,
  getProducts: getProducts,
  getProductsByCompany: getProductsByCompany,

  getProductPackages: getProductPackages,
  addProductPackages: addProductPackages,
  updateProductPackages: updateProductPackages,
  deleteProductPackages: deleteProductPackages,
};
