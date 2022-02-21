const { Console } = require("console");
const fs = require("fs");
const uploadFile = require("../middleware/upload");
const baseUrl = require("url");
// const baseUrl = "https://bposervicestemp.tranquildevelopers.com/tempfold/";

// console.log(baseUrl);
const upload = async (req, res) => {
  console.log("req.file---->", req);

  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


const getListFiles = (req, res) => {
  console.log("__basedir", __basedir);
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  // const directoryPath =
  // ("https://bposervicestemp.tranquildevelopers.com/tempfold/");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      console.log(baseUrl + file);
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};



module.exports = {
  upload,
  getListFiles,
  download,
};
