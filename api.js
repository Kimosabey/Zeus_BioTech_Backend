/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 18:02:44
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-21 16:20:44
 */

var express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(bodyParser.json());

var router = express.Router();
router.use(bodyParser.json());

// -------Operations Files ----------
var Db = require("./apiOperations/dboperations");
var CountryDb = require("./apiOperations/countries");
var StateDb = require("./apiOperations/states");
var CityDb = require("./apiOperations/cities");
var AreaDb = require("./apiOperations/Area");
var EmpsDb = require("./apiOperations/Employee");
var EmpsDb = require("./apiOperations/Employee");
var CustsDb = require("./apiOperations/customer");
var UomDb = require("./apiOperations/uom");
var AdmDb = require("./apiOperations/AdminLogin");
var HqDb = require("./apiOperations/HeadQuarter");
var CompDb = require("./apiOperations/company");

// -------------------------------------//

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
app.use("/api", router);

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//file Upload -----------------------

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
const initRoutes = require("./src/routes");
// app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// --------------------------------

app.get("/", (req, res) => {
  var responseText =
    '<h1 style="color:green;">Hello Kimo Restful Api Using Nodejs is Working!!!</h1>';
  res.send(responseText);
});

app.get("/example/a", (req, res) => {
  res.jsonp("Hello from A!");
});

router.use((req, res, next) => {
  // console.log("Time:", new Date());
  next();
});

router.route("/orders").get((request, response) => {
  Db.getOrders().then((data) => {
    response.json(data);
  });
});

router.route("/orders/:id").get((request, response) => {
  Db.getOrder(request.params.id).then((data) => {
    response.json(data[0]);
  });
});

router.route("/orders").post((request, response) => {
  let order = { ...request.body };
  Db.addOrder(order).then((data) => {
    response.status(201).json(data);
  });
});

// -----------Login Api's--------------- //

router.get("/AdminLogin/:email/:password", async (req, res) => {
  res.jsonp(await AdmDb.getAdminLogin(req.params.email, req.params.password));
});

// -----------Country Api's--------------- //

router.route("/countries").get((req, res) => {
  CountryDb.getCountries().then((data) => {
    res.json(data[0]);
  });
});

router.route("/countries/:id").get((req, res) => {
  CountryDb.getCountryById(req.params.id).then((data) => {
    res.json(data[0]);
  });
});

router.route("/countries").post((req, res) => {
  let obj = { ...req.body };

  CountryDb.addCountry(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/countries/:id").delete((req, res) => {
  CountryDb.deleteCountry(req.params.id).then((data) => {
    // console.log(data);
    res.json(data);
  });
});

router.put("/countries/:id", async function (req, res, next) {
  let obj = { ...req.body };
  try {
    res.json(await CountryDb.updateCountry(req.params.id, obj));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

// -------State Api's--------//
router.route("/states").get((req, res) => {
  StateDb.getStates().then((data) => {
    res.jsonp(data);
  });
});

router.route("/states/:id").get((req, res) => {
  StateDb.getStatesById(req.params.id).then((data) => {
    res.json(data[0]);
  });
});

router.route("/states").post((req, res) => {
  let obj = { ...req.body };
  StateDb.addState(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.put("/states/:id", async function (req, res, next) {
  let obj = { ...req.body };
  try {
    res.json(await StateDb.updateState(req.params.id, obj));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

router.route("/getStateByCountryId/:id").get((req, res) => {
  StateDb.getStateByCountryId(req.params.id).then((data) => {
    res.json(data[0]);
  });
});

router.delete("/states/:id", async (req, res) => {
  console.log("id :>> ", req.params.id);
  res.json(await StateDb.deleteState(req.params.id));
});

// -------City Api's----------------------------------------------------//

router.route("/cities").get(async (req, res) => {
  let obj = { ...req.body };
  CityDb.getCities(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/citiesByStateId/:id").get(async (req, res) => {
  let obj = { ...req.body };

  res.status(201).json(await CityDb.getCitiesByStateId(req.params.id));
});

router.post("/cities", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await CityDb.addCity(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/cities/:id", async function (req, res, next) {
  let obj = { ...req.body };
  console.log("obj :>> ", obj);
  try {
    res.json(await CityDb.updateCity(req.params.id, obj));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

router.delete("/cities/:id", async (req, res) => {
  res.json(await CityDb.deleteCity(req.params.id));
});

// -------Area Api's----------------------------------------------------//

router.get("/areas", async (req, res) => {
  res.jsonp(await AreaDb.getAreas());
});

router.get("/areasByCityId/:id", async (req, res) => {
  res.jsonp(await AreaDb.getAreasByCityId(req.params.id));
});

router.post("/areas", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await AreaDb.addArea(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/areas/:id", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await AreaDb.updateArea(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/areas/:id", async (req, res) => {
  res.json(await AreaDb.deleteArea(req.params.id));
});

router.get("/getAreasByHq/:id", async (req, res) => {
  res.jsonp(await AreaDb.getAreasByHq(req.params.id));
});
// -------HeadQuarter Api's----------------------------------------------------//

router.get("/hq", async (req, res) => {
  res.jsonp(await HqDb.getHq());
});

router.post("/hq", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await HqDb.addHq(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/hq/:id", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await HqDb.updateHq(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/hq/:id", async (req, res) => {
  res.json(await HqDb.deleteHq(req.params.id));
});

// -------COMPANY MASTER Api's----------------------------------------------------//
router.get("/companies", async (req, res) => {
  res.jsonp(await CompDb.getCompanies());
});

router.post("/companies", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await CompDb.addCompany(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/companies/:id", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await CompDb.updateCompany(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/companies/:id", async (req, res) => {
  res.json(await CompDb.deleteCompany(req.params.id));
});

// -------EMPLOYEE-TYPE Api's----------------------------------------------------//
router.get("/emptypes", async (req, res) => {
  res.jsonp(await EmpsDb.getEmpTypes());
});

router.post("/emptypes", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await EmpsDb.addEmpType(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/emptypes/:id", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await EmpsDb.updateEmpType(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/emptypes/:id", async (req, res) => {
  res.json(await EmpsDb.deleteEmpType(req.params.id));
});

// -------EMPLOYEE-SUB-TYPE Api's----------------------------------------------------//
router.get("/empsubtypes", async (req, res) => {
  res.jsonp(await EmpsDb.getEmpSubTypes());
});

router.get("/empsubtypesById/:id", async (req, res) => {
  res.jsonp(await EmpsDb.getEmpSubTypesById(req.params.id));
});

router.post("/empsubtypes", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await EmpsDb.addEmpSubType(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/empsubtypes/:id", async (req, res) => {
  res.json(await EmpsDb.deleteEmpSubType(req.params.id));
});

router.put("/empsubtypes/:id", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await EmpsDb.updateEmpSubType(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

// -------EMPLOYEE Details Api's----------------------------------------------------//

router.get("/emps", async (req, res) => {
  res.jsonp(await EmpsDb.getEmp());
});

router.post("/emps", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await EmpsDb.addEmp(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});
router.post("/importemps", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await EmpsDb.importEmps(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/emps/:id", async (req, res) => {
  res.json(await EmpsDb.deleteEmp(req.params.id));
});

router.get("/empById/:id", async (req, res) => {
  res.jsonp(await EmpsDb.getEmpById(req.params.id));
  console.log("req.params.id: ", req.params.id);
});

router.get("/getEmpByIsManager/:id", async (req, res) => {
  res.jsonp(await EmpsDb.getEmpByIsManager(req.params.id));
});

// -------CUSTOMER Api's----------------------------------------------------//

router.get("/custcat", async (req, res) => {
  res.jsonp(await CustsDb.getCustomersCat());
});

router.post("/custcat", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await CustsDb.addCustomersCat(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.delete("/custcat/:id", async (req, res) => {
  res.json(await CustsDb.deleteCustomersCat(req.params.id));
});

router.put("/custcat/:id", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await CustsDb.updateCustomersCat(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

// -------UOM Api's----------------------------------------------------//

router.get("/uom", async (req, res) => {
  res.jsonp(await UomDb.getUom());
});

router.post("/uom", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await UomDb.addUom(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.delete("/uom/:id", async (req, res) => {
  res.json(await UomDb.deleteUom(req.params.id));
});

router.put("/uom/:id", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await UomDb.updateUom(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

// -------END----------------------------------------------------//
var port = process.env.PORT || 7760;
app.listen(port);
console.log("API is runnning at http://localhost:" + port);