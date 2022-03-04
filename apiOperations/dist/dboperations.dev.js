"use strict";

/*
 * @Author: Hey Kimo here! 
 * @Date: 2022-02-04 16:20:34 
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-03 19:52:21
 */
var config = require("../dbconfig");

var sql = require("mssql");

function getOrders() {
  var pool, products;
  return regeneratorRuntime.async(function getOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * from Orders"));

        case 6:
          products = _context.sent;
          return _context.abrupt("return", products.recordsets);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function getOrder(productId) {
  var pool, product;
  return regeneratorRuntime.async(function getOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("input_parameter", productId).query("SELECT * from Orders where Id = @input_parameter"));

        case 6:
          product = _context2.sent;
          return _context2.abrupt("return", product.recordsets);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function addOrder(order) {
  var pool, exOrders, insertProduct;
  return regeneratorRuntime.async(function addOrder$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().input("Id", sql.Int, order.Id).query("SELECT * from Orders where Id = @Id"));

        case 6:
          exOrders = _context3.sent;

          if (!(exOrders.rowsAffected[0] == 0)) {
            _context3.next = 18;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(pool.request().input("Id", sql.Int, order.Id).input("Title", sql.NVarChar, order.Title).input("Quantity", sql.Int, order.Quantity).input("Message", sql.NVarChar, order.Message).input("City", sql.NVarChar, order.City).query("insert into Orders values(@Id,@Title,@Quantity,@Message,@City)"));

        case 10:
          insertProduct = _context3.sent;

          if (!(insertProduct.rowsAffected == 1)) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", true);

        case 15:
          return _context3.abrupt("return", false);

        case 16:
          _context3.next = 19;
          break;

        case 18:
          return _context3.abrupt("return", "Already Exist");

        case 19:
          _context3.next = 24;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder
};