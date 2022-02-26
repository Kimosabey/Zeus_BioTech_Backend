/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-14 14:39:09
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-26 18:03:58
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
    console.log('specId, obj: ', specId, obj);
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

    return message;
  } catch (error) {
    console.log("updateProductSpecies-->", error);
  }
}

module.exports = {
  addProductSpecies: addProductSpecies,
  getProductSpecies: getProductSpecies,
  updateProductSpecies: updateProductSpecies,
  deleteProductSpecies: deleteProductSpecies,
};
