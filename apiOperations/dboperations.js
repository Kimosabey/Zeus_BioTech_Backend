/*
 * @Author: Hey Kimo here! 
 * @Date: 2022-02-04 16:20:34 
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-17 14:48:27
 */
var config = require("../dbconfig");
const sql = require("mssql");

async function getOrders() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * from Orders");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getOrder(productId) {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .input("input_parameter", productId)
      .query("SELECT * from Orders where Id = @input_parameter");
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addOrder(order) {
  try {
    let pool = await sql.connect(config);
    let exOrders = await pool
      .request()
      .input("Id", sql.Int, order.Id)
      .query("SELECT * from Orders where Id = @Id");
    if (exOrders.rowsAffected[0] == 0) {
      let insertProduct = await pool
        .request()
        .input("Id", sql.Int, order.Id)
        .input("Title", sql.NVarChar, order.Title)
        .input("Quantity", sql.Int, order.Quantity)
        .input("Message", sql.NVarChar, order.Message)
        .input("City", sql.NVarChar, order.City)
        .query(
          "insert into Orders values(@Id,@Title,@Quantity,@Message,@City)"
        );
      // .execute('InsertOrders');
      if (insertProduct.rowsAffected == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return "Already Exist";
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
};
