"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controller/file.controller");

var routes = function routes(app) {
  router.post("/api/upload", controller.upload);
  router.get("/api/files", controller.getListFiles);
  router.get("/api/files/:name", controller.download);
  app.use(router);
};

module.exports = routes;