/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-14 14:39:09
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-03 12:42:53
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
        "SELECT [PRODUCT_PKID] ,[PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_UNIT],[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_WHOLESALE_PRICE] ,[PRODUCT_DEALER_PRICE] ,[PRODUCT_MRP] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] ,UNIT_OF_MEASUREMENT_NAME,UNIT_OF_MEASUREMENT_SHORT_KEY,COMPANY_NAME,PRODUCT_SPECIES_NAME FROM PRODUCT_MASTER JOIN PRODUCT_SPECIES ON PRODUCT_SPECIES_PKID=PRODUCT_SPECIES_FKID JOIN UNIT_OF_MEASUREMENT ON UNIT_OF_MEASUREMENT_PKID=PRODUCT_UOM_FKID JOIN COMPANY ON COMPANY_PKID=PRODUCT_COMPANY_FKID  WHERE [PRODUCT_ISACTIVE]=1"
      );
    pool.close();

    return result.recordsets[0];
  } catch (error) {
    console.log("getProducts-->", error);
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
        .input("PRODUCT_UNIT", obj.PRODUCT_UNIT)
        .input("PRODUCT_CODE", obj.PRODUCT_CODE)
        .input("PRODUCT_BAR_CODE", obj.PRODUCT_BAR_CODE)
        .input("PRODUCT_WHOLESALE_PRICE", obj.PRODUCT_WHOLESALE_PRICE)
        .input("PRODUCT_DEALER_PRICE", obj.PRODUCT_DEALER_PRICE)
        .input("PRODUCT_MRP", obj.PRODUCT_MRP)
        .input("PRODUCT_IMAGE", obj.PRODUCT_IMAGE)
        .input("PRODUCT_CATALOGUE", obj.PRODUCT_CATALOGUE)
        .input("PRODUCT_ISACTIVE", "1")
        .query(
          "insert into PRODUCT_MASTER ([PRODUCT_COMPANY_FKID] ,PRODUCT_SPECIES_FKID,[PRODUCT_NAME] ,[PRODUCT_UOM_FKID] ,[PRODUCT_UNIT],[PRODUCT_CODE] ,[PRODUCT_BAR_CODE] ,[PRODUCT_WHOLESALE_PRICE] ,[PRODUCT_DEALER_PRICE] ,[PRODUCT_MRP] ,[PRODUCT_IMAGE] ,[PRODUCT_CATALOGUE] ,[PRODUCT_ISACTIVE] )  values(@PRODUCT_COMPANY_FKID,@PRODUCT_SPECIES_FKID,@PRODUCT_NAME ,@PRODUCT_UOM_FKID ,@PRODUCT_UNIT,@PRODUCT_CODE ,@PRODUCT_BAR_CODE ,@PRODUCT_WHOLESALE_PRICE ,@PRODUCT_DEALER_PRICE ,@PRODUCT_MRP ,@PRODUCT_IMAGE ,@PRODUCT_CATALOGUE ,@PRODUCT_ISACTIVE)"
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
      .input("PRODUCT_UNIT", obj.PRODUCT_UNIT)
      .input("PRODUCT_CODE", obj.PRODUCT_CODE)
      .input("PRODUCT_BAR_CODE", obj.PRODUCT_BAR_CODE)
      .input("PRODUCT_WHOLESALE_PRICE", obj.PRODUCT_WHOLESALE_PRICE)
      .input("PRODUCT_DEALER_PRICE", obj.PRODUCT_DEALER_PRICE)
      .input("PRODUCT_MRP", obj.PRODUCT_MRP)
      .input("PRODUCT_IMAGE", obj.PRODUCT_IMAGE)
      .input("PRODUCT_CATALOGUE", obj.PRODUCT_CATALOGUE)
      .query(
        `UPDATE PRODUCT_MASTER SET PRODUCT_COMPANY_FKID=@PRODUCT_COMPANY_FKID, PRODUCT_SPECIES_FKID=@PRODUCT_SPECIES_FKID, PRODUCT_NAME=@PRODUCT_NAME,PRODUCT_UOM_FKID=@PRODUCT_UOM_FKID, PRODUCT_UNIT=@PRODUCT_UNIT, PRODUCT_CODE=@PRODUCT_CODE, PRODUCT_BAR_CODE=@PRODUCT_BAR_CODE, PRODUCT_WHOLESALE_PRICE=@PRODUCT_WHOLESALE_PRICE, PRODUCT_DEALER_PRICE=@PRODUCT_DEALER_PRICE, PRODUCT_MRP=@PRODUCT_MRP, PRODUCT_IMAGE=@PRODUCT_IMAGE, PRODUCT_CATALOGUE=@PRODUCT_CATALOGUE WHERE PRODUCT_PKID=@PRODUCT_PKID`
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

module.exports = {
  addProductSpecies: addProductSpecies,
  getProductSpecies: getProductSpecies,
  updateProductSpecies: updateProductSpecies,
  deleteProductSpecies: deleteProductSpecies,
  addProducts: addProducts,
  deleteProducts: deleteProducts,
  updateProducts: updateProducts,
  getProducts: getProducts,
};
