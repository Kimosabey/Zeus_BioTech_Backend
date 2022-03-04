/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 18:02:44
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-04 18:17:55
 */

var express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
var app = express();
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

var router = express.Router();
// using bodyParser to parse JSON bodies into JS objects
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
var ProdDb = require("./apiOperations/products");
var OrdDb = require("./apiOperations/OrderManagement");

// ----------------Building a Secure Node js REST API---------------------//
app.use(express.static(__dirname + "/static"));
app.get("/*", function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});

// adding Helmet to enhance your Rest API's security
app.use(helmet());
// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.all("*", function (req, res, next) {
  res.set("X-Frame-Options", "ALLOWALL");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set("Cache-Control", "public, max-age=1000");
  // max-age=31557600
  next();
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
router.options("*", cors());
router.all("*", function (req, res, next) {
  res.set("X-Frame-Options", "ALLOWALL");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set("Cache-Control", "public, max-age=1000.");
  next();
});

// let setCache = function (req, res, next) {
//   // here you can define period in second, this one is 5 minutes
//   const period = 60 * 5;

//   // you only want to cache for GET requests
//   if (req.method == "GET") {
//     res.set("Cache-control", `public, max-age=${period}`);
//   } else {
//     // for the other requests set strict no caching parameters
//     res.set("Cache-control", `no-store`);
//   }

//   // remember to call next() to pass on the request
//   next();
// };

// now call the new middleware function in your app

// app.use(setCache);

app.use("/api", router);

// // allow cross-origin requests
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// file Upload -----------------------
global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
const initRoutes = require("./src/routes");
// app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// file Upload --------------------------------

// ----------------Building a Secure Node js REST API---------------------//

app.get("/", (req, res) => {
  var responseText =
    '<h1 style="color:green;">Hello Kimo Restful Api Using Nodejs is Working!!!</h1>';
  res.send(responseText);
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.get("/example/a", (req, res) => {
  res.json("Hello from A!");
});

router.use((req, res, next) => {
  // console.log("Time:", new Date());
  next();
});

// router.route("/orders").get(async (request, response) => {
//   await Db.getOrders().then((data) => {
//     response.json(data);
//   });
// });

// router.route("/orders/:id").get(async (request, response) => {
//   await Db.getOrder(request.params.id).then((data) => {
//     response.json(data[0]);
//   });
// });

// router.route("/orders").post(async (request, response) => {
//   let order = { ...request.body };
//   await Db.addOrder(order).then((data) => {
//     response.status(201).json(data);
//   });
// });

// -----------Login Api's--------------- //

router.get("/AdminLogin/:email/:password", async (req, res) => {
  res.json(await AdmDb.getAdminLogin(req.params.email, req.params.password));
});

// -----------Country Api's--------------- //

router.get("/countries", async (req, res, next) => {
  await CountryDb.getCountries().then((data) => {
    res.json(data);
  });
});

router.route("/countries/:id").get(async (req, res) => {
  await CountryDb.getCountryById(req.params.id).then((data) => {
    res.json(data[0]);
  });
});

router.route("/countries").post(async (req, res) => {
  let obj = { ...req.body };

  await CountryDb.addCountry(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/countries/:id").delete(async (req, res) => {
  await CountryDb.deleteCountry(req.params.id).then((data) => {
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
router.route("/states").get(async (req, res) => {
  await StateDb.getStates().then((data) => {
    res.json(data);
  });
});

router.route("/states/:id").get(async (req, res) => {
  await StateDb.getStatesById(req.params.id).then((data) => {
    res.json(data[0]);
  });
});

router.route("/states").post(async (req, res) => {
  let obj = { ...req.body };
  await StateDb.addState(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.post("/statesCheckBox", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await StateDb.getForCheckBoxStateByCountryId(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
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

router.route("/getStateByCountryId/:id").get(async (req, res) => {
  await StateDb.getStateByCountryId(req.params.id).then((data) => {
    res.json(data);
  });
});

router.delete("/states/:id", async (req, res) => {
  console.log("id :>> ", req.params.id);
  res.json(await StateDb.deleteState(req.params.id));
});

// -------City Api's----------------------------------------------------//

router.route("/cities").get(async (req, res) => {
  let obj = { ...req.body };
  await CityDb.getCities(obj).then((data) => {
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

router.post("/citiesCheckBox", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await CityDb.getForCheckBoxCityByStateId(obj));
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
  res.json(await AreaDb.getAreas());
});

router.get("/areasByCityId/:id", async (req, res) => {
  res.json(await AreaDb.getAreasByCityId(req.params.id));
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

router.post("/areasCheckBox", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await AreaDb.getForCheckBoxAreaByCityId(obj));
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
  res.json(await AreaDb.getAreasByHq(req.params.id));
});
// -------HeadQuarter Api's----------------------------------------------------//

router.get("/hq", async (req, res) => {
  res.json(await HqDb.getHq());
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
  res.json(await CompDb.getCompanies());
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
  res.json(await EmpsDb.getEmpTypes());
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
  res.json(await EmpsDb.getEmpSubTypes());
});

router.get("/empsubtypesById/:id", async (req, res) => {
  res.json(await EmpsDb.getEmpSubTypesById(req.params.id));
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
  res.json(await EmpsDb.getEmp());
});

router.post("/emps", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await EmpsDb.addEmp(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.post("/importemps", async (req, res, next) => {
  let obj = { ...req.body };
  console.log("obj: ", obj);

  try {
    res.json(await EmpsDb.importEmps(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/emps/:id", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await EmpsDb.updateEmp(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.put("/deletemps/:id", async (req, res, next) => {
  try {
    res.json(await EmpsDb.deleteEmp(req.params.id));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.delete("/DeleteEmpDocs/:id", async (req, res) => {
  res.json(await EmpsDb.DeleteEmpDocs(req.params.id));
});

router.get("/empById/:id", async (req, res) => {
  res.json(await EmpsDb.getEmpById(req.params.id));
});

router.get("/getEmpByIsManager/:id", async (req, res) => {
  res.json(await EmpsDb.getEmpByIsManager(req.params.id));
});

router.get("/GetEmployeeAddress/:id", async (req, res) => {
  res.json(await EmpsDb.getAddressByEmpId(req.params.id));
});

router.get("/GetEmployeeCoveredAreas/:id", async (req, res) => {
  res.json(await EmpsDb.getCoveredAreaByEmpId(req.params.id));
});

router.get("/GetEmployeeOtherCoveredAreas/:id", async (req, res) => {
  res.json(await EmpsDb.getOtherCoveredAreasByEmpId(req.params.id));
});

router.get("/GetEmployeeOtherDocs/:id", async (req, res) => {
  res.json(await EmpsDb.getDocsByEmpId(req.params.id));
});

router.get("/GetEmployeeCoveredAreasForEdit/:EmpId/:hqId", async (req, res) => {
  console.log(
    "req.params.EmpId-req.params.hqId:",
    req.params.EmpId,
    req.params.hqId
  );
  res.json(
    await EmpsDb.GetEmployeeCoveredAreasForEdit(
      req.params.EmpId,
      req.params.hqId
    )
  );
});

router.get("/getEmpCountriesInCoveredAreasForEdit/:EmpId", async (req, res) => {
  res.json(await EmpsDb.getEmpCountriesInCoveredAreasForEdit(req.params.EmpId));
});

router.get("/getEmpStatesInCoveredAreasForEdit/:EmpId", async (req, res) => {
  res.json(await EmpsDb.getEmpStatesInCoveredAreasForEdit(req.params.EmpId));
});

router.get("/getEmpCitiesInCoveredAreasForEdit/:EmpId", async (req, res) => {
  res.json(await EmpsDb.getEmpCitiesInCoveredAreasForEdit(req.params.EmpId));
});

router.get("/getEmpAreasInCoveredAreasForEdit/:EmpId", async (req, res) => {
  res.json(await EmpsDb.getEmpAreasInCoveredAreasForEdit(req.params.EmpId));
});

router.get("/getAllManagers", async (req, res) => {
  res.json(await EmpsDb.getAllManagers());
});

router.get("/incentives", async (req, res) => {
  res.json(await EmpsDb.getEmpIncentives());
});

router.post("/incentives", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await EmpsDb.addEmpIncentives(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/deleteincentives/:id", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await EmpsDb.DeleteEmpIncentives(req.params.id));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/incentives/:id", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await EmpsDb.updateEmpIncentives(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.get("/leaves", async (req, res) => {
  res.json(await EmpsDb.getEmpLeaves());
});

router.get("/leavereason/:id", async (req, res) => {
  res.json(await EmpsDb.getReasonForLeave(req.params.id));
});

router.get("/leavesbyemp/:id", async (req, res) => {
  res.json(await EmpsDb.getAllLeavesForEmployee(req.params.id));
});

router.put("/acceptleaves/:id", async (req, res, next) => {
  try {
    res.json(await EmpsDb.AcceptLeaves(req.params.id));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.put("/rejectleaves/:id", async (req, res, next) => {
  try {
    res.json(await EmpsDb.RejectLeaves(req.params.id));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.get("/leavesforallemps", async (req, res) => {
  res.json(await EmpsDb.getAllEmployeeLeaves());
});
// -------CUSTOMER Api's----------------------------------------------------//

router.get("/custcat", async (req, res) => {
  res.json(await CustsDb.getCustomersCat());
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

router.put("/custcat/:id", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await CustsDb.updateCustomersCat(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/custtype", async (req, res) => {
  res.json(await CustsDb.getCustomersType());
});

router.post("/custtype", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await CustsDb.addCustomersType(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.delete("/custtype/:id", async (req, res) => {
  res.json(await CustsDb.deleteCustomersType(req.params.id));
});

router.put("/custtype/:id", async (req, res, next) => {
  let obj = { ...req.body };
  try {
    res.json(await CustsDb.updateCustomersType(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/custsubtype", async (req, res) => {
  res.json(await CustsDb.getCustomersSubType());
});
router.get("/custsubtypebytype/:id", async (req, res) => {
  res.json(await CustsDb.getCustSubTypeByType(req.params.id));
});

router.post("/custsubtype", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await CustsDb.addCustomersSubType(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.delete("/custsubtype/:id", async (req, res) => {
  res.json(await CustsDb.deleteCustomersSubType(req.params.id));
});

router.put("/custsubtype/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await CustsDb.updateCustomersSubType(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/customer", async (req, res) => {
  res.json(await CustsDb.getCustomers());
});

router.get("/customerdocs/:id", async (req, res) => {
  res.json(await CustsDb.getCustDocsById(req.params.id));
});

router.get("/customercontactpersons/:id", async (req, res) => {
  res.json(await CustsDb.getCustContactPersons(req.params.id));
});

router.get("/customerreaoson/:id", async (req, res) => {
  res.json(await CustsDb.getCustReasonForDelete(req.params.id));
});

router.post("/customer", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await CustsDb.addCustomers(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.put("/customer/:id", async (req, res) => {
  res.json(await CustsDb.deleteCustomers(req.params.id));
});

router.put("/customer/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await CustsDb.updateCustomers(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/addresstype/:custId", async (req, res) => {
  res.json(await CustsDb.getAddressType(req.params.custId));
});

router.post("/addresstype", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await CustsDb.addAddressType(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.delete("/addresstype/:id", async (req, res) => {
  res.json(await CustsDb.deleteAddressType(req.params.id));
});

router.put("/addresstype/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await CustsDb.updateAddressType(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/custdeletereq", async (req, res) => {
  res.json(await CustsDb.getCustDeleteNewRequest());
});

router.put("/custdeleteacceptreq/:reqid/:custid", async (req, res, next) => {
  console.log("hit");
  console.log(
    "req.params.reqid,req.params.custid: ",
    req.params.reqid,
    req.params.custid
  );
  try {
    res.json(
      await CustsDb.AcceptDeleteRequest(req.params.reqid, req.params.custid)
    );
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/custdeleterejectreq/:id", async (req, res, next) => {
  try {
    res.json(await CustsDb.RejectDeleteRequest(req.params.id));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

// -------PRODUCT Api's----------------------------------------------------//

router.get("/prodspecies", async (req, res) => {
  res.json(await ProdDb.getProductSpecies());
});

router.post("/prodspecies", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await ProdDb.addProductSpecies(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.put("/deleteprodspecies/:id", async (req, res) => {
  res.json(await ProdDb.deleteProductSpecies(req.params.id));
});

router.put("/prodspecies/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await ProdDb.updateProductSpecies(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/prod", async (req, res) => {
  res.json(await ProdDb.getProducts());
});

router.post("/prod", async (req, res) => {
  let obj = { ...req.body };
  try {
    res.json(await ProdDb.addProducts(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
  }
});

router.put("/deleteprod/:id", async (req, res) => {
  res.json(await ProdDb.deleteProducts(req.params.id));
});

router.put("/prod/:id", async (req, res, next) => {
  let obj = { ...req.body };
  console.log("req.params.id, obj: ", req.params.id, obj);

  try {
    res.json(await ProdDb.updateProducts(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

// -------UOM Api's----------------------------------------------------//

router.get("/uom", async (req, res) => {
  res.json(await UomDb.getUom());
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

router.put("/uom/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await UomDb.updateUom(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

// -------ORDER MANAGEMENT Api's----------------------------------------------------//

router.get("/GetAllOrderRequest", async (req, res) => {
  res.json(await OrdDb.getOrders());
});

router.get("/GetOrderItemOrderID/:id", async (req, res) => {
  res.json(await OrdDb.getItemsByOrderId(req.params.id));
});

router.get("/OrderRemark/:id", async (req, res) => {
  res.json(await OrdDb.getRemarksOrdersById(req.params.id));
});

router.get("/OrderBillingAddress/:id", async (req, res) => {
  res.json(await OrdDb.getBillingAddressOrdersById(req.params.id));
});

router.get("/OrderShippingAddress/:id", async (req, res) => {
  res.json(await OrdDb.getShippingAddressOrdersById(req.params.id));
});

router.put("/AcceptOrder/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await OrdDb.AcceptOrderRequest(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/RejectOrder/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await OrdDb.RejectOrderRequest(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/OrderSupplyType", async (req, res) => {
  res.json(await OrdDb.getSupplyType());
});

router.put("/OrderSupplyType/:id", async (req, res, next) => {
  let obj = { ...req.body };

  try {
    res.json(await OrdDb.updateSupplyType(req.params.id, obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.post("/OrderSupplyType", async (req, res) => {
  let obj = { ...req.body };

  try {
    res.json(await OrdDb.addSupplyType(obj));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.put("/OrderSupplyTypeDel/:id", async (req, res, next) => {
  try {
    res.json(await OrdDb.deleteSupplyType(req.params.id));
  } catch (err) {
    console.error(`Error while Adding`, err.message);
    next(err);
  }
});

router.get("/GetPendingOrdersBySupplayType/:id", async (req, res) => {
  res.json(await OrdDb.GetPendingOrdersBySupplyType(req.params.id));
});

// -------END----------------------------------------------------//
var port = process.env.PORT || 7760;
// app.listen(port);
// console.log("API is runnning at http://localhost:" + port);

const server = app.listen(port, () =>
  console.log("API is runnning at http://localhost:" + port)
);

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
