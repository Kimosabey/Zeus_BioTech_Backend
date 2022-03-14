"use strict";

var _require = require("console"),
    Console = _require.Console;

var fs = require("fs");

var uploadFile = require("../middleware/upload");

var baseUrl = require("url"); // const baseUrl = "https://bposervicestemp.tranquildevelopers.com/tempfold/";
// console.log(baseUrl);


var upload = function upload(req, res) {
  return regeneratorRuntime.async(function upload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(uploadFile(req, res));

        case 3:
          console.log("req.file----------------->", req.file);

          if (!(req.file == undefined)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: "Please upload a file!"
          }));

        case 6:
          res.status(200).send( //   {
          //   message: "Uploaded the file successfully: " + req.file.originalname,
          // }
          req.file.originalname);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            message: "Could not upload the file: ".concat(req.file.originalname, ". ").concat(_context.t0)
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var getListFiles = function getListFiles(req, res) {
  var directoryPath = __basedir + "/resources/static/assets/uploads/"; // const directoryPath =
  // ("https://bposervicestemp.tranquildevelopers.com/tempfold/");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!"
      });
    }

    var fileInfos = [];
    files.forEach(function (file) {
      console.log(baseUrl + file);
      fileInfos.push({
        name: file,
        url: baseUrl + file
      });
    });
    res.status(200).send(fileInfos);
  });
};

var download = function download(req, res) {
  var fileName = req.params.name;
  var directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, function (err) {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err
      });
    }
  });
};

module.exports = {
  upload: upload,
  getListFiles: getListFiles,
  download: download
};