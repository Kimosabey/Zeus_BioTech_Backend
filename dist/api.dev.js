"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 18:02:44
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-03-04 18:17:55
 */
var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var helmet = require("helmet");

var morgan = require("morgan");

var app = express(); // using bodyParser to parse JSON bodies into JS objects

app.use(bodyParser.json());
var router = express.Router(); // using bodyParser to parse JSON bodies into JS objects

router.use(bodyParser.json()); // -------Operations Files ----------

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

var OrdDb = require("./apiOperations/OrderManagement"); // ----------------Building a Secure Node js REST API---------------------//


app.use(express["static"](__dirname + "/static"));
app.get("/*", function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
}); // adding Helmet to enhance your Rest API's security

app.use(helmet()); // adding morgan to log HTTP requests

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.options("*", cors());
app.all("*", function (req, res, next) {
  res.set("X-Frame-Options", "ALLOWALL");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set("Cache-Control", "public, max-age=1000"); // max-age=31557600

  next();
});
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(cors());
router.options("*", cors());
router.all("*", function (req, res, next) {
  res.set("X-Frame-Options", "ALLOWALL");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set("Cache-Control", "public, max-age=1000.");
  next();
}); // let setCache = function (req, res, next) {
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

app.use("/api", router); // // allow cross-origin requests
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
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

var initRoutes = require("./src/routes"); // app.use(express.urlencoded({ extended: true }));


initRoutes(app); // file Upload --------------------------------
// ----------------Building a Secure Node js REST API---------------------//

app.get("/", function (req, res) {
  var responseText = '<h1 style="color:green;">Hello Kimo Restful Api Using Nodejs is Working!!!</h1>';
  res.send(responseText);
});
app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.get("/example/a", function (req, res) {
  res.json("Hello from A!");
});
router.use(function (req, res, next) {
  // console.log("Time:", new Date());
  next();
}); // router.route("/orders").get(async (request, response) => {
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

router.get("/AdminLogin/:email/:password", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = res;
          _context.next = 3;
          return regeneratorRuntime.awrap(AdmDb.getAdminLogin(req.params.email, req.params.password));

        case 3:
          _context.t1 = _context.sent;

          _context.t0.json.call(_context.t0, _context.t1);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // -----------Country Api's--------------- //

router.get("/countries", function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(CountryDb.getCountries().then(function (data) {
            res.json(data);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.route("/countries/:id").get(function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(CountryDb.getCountryById(req.params.id).then(function (data) {
            res.json(data[0]);
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.route("/countries").post(function _callee4(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context4.next = 3;
          return regeneratorRuntime.awrap(CountryDb.addCountry(obj).then(function (data) {
            res.status(201).json(data);
          }));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.route("/countries/:id")["delete"](function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(CountryDb.deleteCountry(req.params.id).then(function (data) {
            res.json(data);
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.put("/countries/:id", function _callee6(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context6.prev = 1;
          _context6.t0 = res;
          _context6.next = 5;
          return regeneratorRuntime.awrap(CountryDb.updateCountry(req.params.id, obj));

        case 5:
          _context6.t1 = _context6.sent;

          _context6.t0.json.call(_context6.t0, _context6.t1);

          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t2 = _context6["catch"](1);
          console.error("Error while updating", _context6.t2.message);
          next(_context6.t2);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------State Api's--------//

router.route("/states").get(function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(StateDb.getStates().then(function (data) {
            res.json(data);
          }));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.route("/states/:id").get(function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(StateDb.getStatesById(req.params.id).then(function (data) {
            res.json(data[0]);
          }));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.route("/states").post(function _callee9(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context9.next = 3;
          return regeneratorRuntime.awrap(StateDb.addState(obj).then(function (data) {
            res.status(201).json(data);
          }));

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
});
router.post("/statesCheckBox", function _callee10(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context10.prev = 1;
          _context10.t0 = res;
          _context10.next = 5;
          return regeneratorRuntime.awrap(StateDb.getForCheckBoxStateByCountryId(obj));

        case 5:
          _context10.t1 = _context10.sent;

          _context10.t0.json.call(_context10.t0, _context10.t1);

          _context10.next = 13;
          break;

        case 9:
          _context10.prev = 9;
          _context10.t2 = _context10["catch"](1);
          console.error("Error while Adding", _context10.t2.message);
          next(_context10.t2);

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/states/:id", function _callee11(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context11.prev = 1;
          _context11.t0 = res;
          _context11.next = 5;
          return regeneratorRuntime.awrap(StateDb.updateState(req.params.id, obj));

        case 5:
          _context11.t1 = _context11.sent;

          _context11.t0.json.call(_context11.t0, _context11.t1);

          _context11.next = 13;
          break;

        case 9:
          _context11.prev = 9;
          _context11.t2 = _context11["catch"](1);
          console.error("Error while updating", _context11.t2.message);
          next(_context11.t2);

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.route("/getStateByCountryId/:id").get(function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(StateDb.getStateByCountryId(req.params.id).then(function (data) {
            res.json(data);
          }));

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router["delete"]("/states/:id", function _callee13(req, res) {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          console.log("id :>> ", req.params.id);
          _context13.t0 = res;
          _context13.next = 4;
          return regeneratorRuntime.awrap(StateDb.deleteState(req.params.id));

        case 4:
          _context13.t1 = _context13.sent;

          _context13.t0.json.call(_context13.t0, _context13.t1);

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
}); // -------City Api's----------------------------------------------------//

router.route("/cities").get(function _callee14(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context14.next = 3;
          return regeneratorRuntime.awrap(CityDb.getCities(obj).then(function (data) {
            res.status(201).json(data);
          }));

        case 3:
        case "end":
          return _context14.stop();
      }
    }
  });
});
router.route("/citiesByStateId/:id").get(function _callee15(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context15.t0 = res.status(201);
          _context15.next = 4;
          return regeneratorRuntime.awrap(CityDb.getCitiesByStateId(req.params.id));

        case 4:
          _context15.t1 = _context15.sent;

          _context15.t0.json.call(_context15.t0, _context15.t1);

        case 6:
        case "end":
          return _context15.stop();
      }
    }
  });
});
router.post("/cities", function _callee16(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context16.prev = 1;
          _context16.t0 = res;
          _context16.next = 5;
          return regeneratorRuntime.awrap(CityDb.addCity(obj));

        case 5:
          _context16.t1 = _context16.sent;

          _context16.t0.json.call(_context16.t0, _context16.t1);

          _context16.next = 13;
          break;

        case 9:
          _context16.prev = 9;
          _context16.t2 = _context16["catch"](1);
          console.error("Error while Adding", _context16.t2.message);
          next(_context16.t2);

        case 13:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.post("/citiesCheckBox", function _callee17(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context17.prev = 1;
          _context17.t0 = res;
          _context17.next = 5;
          return regeneratorRuntime.awrap(CityDb.getForCheckBoxCityByStateId(obj));

        case 5:
          _context17.t1 = _context17.sent;

          _context17.t0.json.call(_context17.t0, _context17.t1);

          _context17.next = 13;
          break;

        case 9:
          _context17.prev = 9;
          _context17.t2 = _context17["catch"](1);
          console.error("Error while Adding", _context17.t2.message);
          next(_context17.t2);

        case 13:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/cities/:id", function _callee18(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          console.log("obj :>> ", obj);
          _context18.prev = 2;
          _context18.t0 = res;
          _context18.next = 6;
          return regeneratorRuntime.awrap(CityDb.updateCity(req.params.id, obj));

        case 6:
          _context18.t1 = _context18.sent;

          _context18.t0.json.call(_context18.t0, _context18.t1);

          _context18.next = 14;
          break;

        case 10:
          _context18.prev = 10;
          _context18.t2 = _context18["catch"](2);
          console.error("Error while updating", _context18.t2.message);
          next(_context18.t2);

        case 14:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
router["delete"]("/cities/:id", function _callee19(req, res) {
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.t0 = res;
          _context19.next = 3;
          return regeneratorRuntime.awrap(CityDb.deleteCity(req.params.id));

        case 3:
          _context19.t1 = _context19.sent;

          _context19.t0.json.call(_context19.t0, _context19.t1);

        case 5:
        case "end":
          return _context19.stop();
      }
    }
  });
}); // -------Area Api's----------------------------------------------------//

router.get("/areas", function _callee20(req, res) {
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.t0 = res;
          _context20.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreas());

        case 3:
          _context20.t1 = _context20.sent;

          _context20.t0.json.call(_context20.t0, _context20.t1);

        case 5:
        case "end":
          return _context20.stop();
      }
    }
  });
});
router.get("/areasByCityId/:id", function _callee21(req, res) {
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.t0 = res;
          _context21.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreasByCityId(req.params.id));

        case 3:
          _context21.t1 = _context21.sent;

          _context21.t0.json.call(_context21.t0, _context21.t1);

        case 5:
        case "end":
          return _context21.stop();
      }
    }
  });
});
router.post("/areas", function _callee22(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context22.prev = 1;
          _context22.t0 = res;
          _context22.next = 5;
          return regeneratorRuntime.awrap(AreaDb.addArea(obj));

        case 5:
          _context22.t1 = _context22.sent;

          _context22.t0.json.call(_context22.t0, _context22.t1);

          _context22.next = 13;
          break;

        case 9:
          _context22.prev = 9;
          _context22.t2 = _context22["catch"](1);
          console.error("Error while Adding", _context22.t2.message);
          next(_context22.t2);

        case 13:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.post("/areasCheckBox", function _callee23(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context23.prev = 1;
          _context23.t0 = res;
          _context23.next = 5;
          return regeneratorRuntime.awrap(AreaDb.getForCheckBoxAreaByCityId(obj));

        case 5:
          _context23.t1 = _context23.sent;

          _context23.t0.json.call(_context23.t0, _context23.t1);

          _context23.next = 13;
          break;

        case 9:
          _context23.prev = 9;
          _context23.t2 = _context23["catch"](1);
          console.error("Error while Adding", _context23.t2.message);
          next(_context23.t2);

        case 13:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/areas/:id", function _callee24(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context24.prev = 1;
          _context24.t0 = res;
          _context24.next = 5;
          return regeneratorRuntime.awrap(AreaDb.updateArea(req.params.id, obj));

        case 5:
          _context24.t1 = _context24.sent;

          _context24.t0.json.call(_context24.t0, _context24.t1);

          _context24.next = 13;
          break;

        case 9:
          _context24.prev = 9;
          _context24.t2 = _context24["catch"](1);
          console.error("Error while Adding", _context24.t2.message);
          next(_context24.t2);

        case 13:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/areas/:id", function _callee25(req, res) {
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.t0 = res;
          _context25.next = 3;
          return regeneratorRuntime.awrap(AreaDb.deleteArea(req.params.id));

        case 3:
          _context25.t1 = _context25.sent;

          _context25.t0.json.call(_context25.t0, _context25.t1);

        case 5:
        case "end":
          return _context25.stop();
      }
    }
  });
});
router.get("/getAreasByHq/:id", function _callee26(req, res) {
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.t0 = res;
          _context26.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreasByHq(req.params.id));

        case 3:
          _context26.t1 = _context26.sent;

          _context26.t0.json.call(_context26.t0, _context26.t1);

        case 5:
        case "end":
          return _context26.stop();
      }
    }
  });
}); // -------HeadQuarter Api's----------------------------------------------------//

router.get("/hq", function _callee27(req, res) {
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.t0 = res;
          _context27.next = 3;
          return regeneratorRuntime.awrap(HqDb.getHq());

        case 3:
          _context27.t1 = _context27.sent;

          _context27.t0.json.call(_context27.t0, _context27.t1);

        case 5:
        case "end":
          return _context27.stop();
      }
    }
  });
});
router.post("/hq", function _callee28(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context28.prev = 1;
          _context28.t0 = res;
          _context28.next = 5;
          return regeneratorRuntime.awrap(HqDb.addHq(obj));

        case 5:
          _context28.t1 = _context28.sent;

          _context28.t0.json.call(_context28.t0, _context28.t1);

          _context28.next = 13;
          break;

        case 9:
          _context28.prev = 9;
          _context28.t2 = _context28["catch"](1);
          console.error("Error while Adding", _context28.t2.message);
          next(_context28.t2);

        case 13:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/hq/:id", function _callee29(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context29.prev = 1;
          _context29.t0 = res;
          _context29.next = 5;
          return regeneratorRuntime.awrap(HqDb.updateHq(req.params.id, obj));

        case 5:
          _context29.t1 = _context29.sent;

          _context29.t0.json.call(_context29.t0, _context29.t1);

          _context29.next = 13;
          break;

        case 9:
          _context29.prev = 9;
          _context29.t2 = _context29["catch"](1);
          console.error("Error while Adding", _context29.t2.message);
          next(_context29.t2);

        case 13:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/hq/:id", function _callee30(req, res) {
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.t0 = res;
          _context30.next = 3;
          return regeneratorRuntime.awrap(HqDb.deleteHq(req.params.id));

        case 3:
          _context30.t1 = _context30.sent;

          _context30.t0.json.call(_context30.t0, _context30.t1);

        case 5:
        case "end":
          return _context30.stop();
      }
    }
  });
}); // -------COMPANY MASTER Api's----------------------------------------------------//

router.get("/companies", function _callee31(req, res) {
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.t0 = res;
          _context31.next = 3;
          return regeneratorRuntime.awrap(CompDb.getCompanies());

        case 3:
          _context31.t1 = _context31.sent;

          _context31.t0.json.call(_context31.t0, _context31.t1);

        case 5:
        case "end":
          return _context31.stop();
      }
    }
  });
});
router.post("/companies", function _callee32(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context32.prev = 1;
          _context32.t0 = res;
          _context32.next = 5;
          return regeneratorRuntime.awrap(CompDb.addCompany(obj));

        case 5:
          _context32.t1 = _context32.sent;

          _context32.t0.json.call(_context32.t0, _context32.t1);

          _context32.next = 13;
          break;

        case 9:
          _context32.prev = 9;
          _context32.t2 = _context32["catch"](1);
          console.error("Error while Adding", _context32.t2.message);
          next(_context32.t2);

        case 13:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/companies/:id", function _callee33(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context33.prev = 1;
          _context33.t0 = res;
          _context33.next = 5;
          return regeneratorRuntime.awrap(CompDb.updateCompany(req.params.id, obj));

        case 5:
          _context33.t1 = _context33.sent;

          _context33.t0.json.call(_context33.t0, _context33.t1);

          _context33.next = 13;
          break;

        case 9:
          _context33.prev = 9;
          _context33.t2 = _context33["catch"](1);
          console.error("Error while Adding", _context33.t2.message);
          next(_context33.t2);

        case 13:
        case "end":
          return _context33.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/companies/:id", function _callee34(req, res) {
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.t0 = res;
          _context34.next = 3;
          return regeneratorRuntime.awrap(CompDb.deleteCompany(req.params.id));

        case 3:
          _context34.t1 = _context34.sent;

          _context34.t0.json.call(_context34.t0, _context34.t1);

        case 5:
        case "end":
          return _context34.stop();
      }
    }
  });
}); // -------EMPLOYEE-TYPE Api's----------------------------------------------------//

router.get("/emptypes", function _callee35(req, res) {
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.t0 = res;
          _context35.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpTypes());

        case 3:
          _context35.t1 = _context35.sent;

          _context35.t0.json.call(_context35.t0, _context35.t1);

        case 5:
        case "end":
          return _context35.stop();
      }
    }
  });
});
router.post("/emptypes", function _callee36(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context36.prev = 1;
          _context36.t0 = res;
          _context36.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpType(obj));

        case 5:
          _context36.t1 = _context36.sent;

          _context36.t0.json.call(_context36.t0, _context36.t1);

          _context36.next = 13;
          break;

        case 9:
          _context36.prev = 9;
          _context36.t2 = _context36["catch"](1);
          console.error("Error while Adding", _context36.t2.message);
          next(_context36.t2);

        case 13:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/emptypes/:id", function _callee37(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context37.prev = 1;
          _context37.t0 = res;
          _context37.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpType(req.params.id, obj));

        case 5:
          _context37.t1 = _context37.sent;

          _context37.t0.json.call(_context37.t0, _context37.t1);

          _context37.next = 13;
          break;

        case 9:
          _context37.prev = 9;
          _context37.t2 = _context37["catch"](1);
          console.error("Error while Adding", _context37.t2.message);
          next(_context37.t2);

        case 13:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/emptypes/:id", function _callee38(req, res) {
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.t0 = res;
          _context38.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmpType(req.params.id));

        case 3:
          _context38.t1 = _context38.sent;

          _context38.t0.json.call(_context38.t0, _context38.t1);

        case 5:
        case "end":
          return _context38.stop();
      }
    }
  });
}); // -------EMPLOYEE-SUB-TYPE Api's----------------------------------------------------//

router.get("/empsubtypes", function _callee39(req, res) {
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.t0 = res;
          _context39.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpSubTypes());

        case 3:
          _context39.t1 = _context39.sent;

          _context39.t0.json.call(_context39.t0, _context39.t1);

        case 5:
        case "end":
          return _context39.stop();
      }
    }
  });
});
router.get("/empsubtypesById/:id", function _callee40(req, res) {
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.t0 = res;
          _context40.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpSubTypesById(req.params.id));

        case 3:
          _context40.t1 = _context40.sent;

          _context40.t0.json.call(_context40.t0, _context40.t1);

        case 5:
        case "end":
          return _context40.stop();
      }
    }
  });
});
router.post("/empsubtypes", function _callee41(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context41.prev = 1;
          _context41.t0 = res;
          _context41.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpSubType(obj));

        case 5:
          _context41.t1 = _context41.sent;

          _context41.t0.json.call(_context41.t0, _context41.t1);

          _context41.next = 13;
          break;

        case 9:
          _context41.prev = 9;
          _context41.t2 = _context41["catch"](1);
          console.error("Error while Adding", _context41.t2.message);
          next(_context41.t2);

        case 13:
        case "end":
          return _context41.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/empsubtypes/:id", function _callee42(req, res) {
  return regeneratorRuntime.async(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          _context42.t0 = res;
          _context42.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmpSubType(req.params.id));

        case 3:
          _context42.t1 = _context42.sent;

          _context42.t0.json.call(_context42.t0, _context42.t1);

        case 5:
        case "end":
          return _context42.stop();
      }
    }
  });
});
router.put("/empsubtypes/:id", function _callee43(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee43$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context43.prev = 1;
          _context43.t0 = res;
          _context43.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpSubType(req.params.id, obj));

        case 5:
          _context43.t1 = _context43.sent;

          _context43.t0.json.call(_context43.t0, _context43.t1);

          _context43.next = 13;
          break;

        case 9:
          _context43.prev = 9;
          _context43.t2 = _context43["catch"](1);
          console.error("Error while Adding", _context43.t2.message);
          next(_context43.t2);

        case 13:
        case "end":
          return _context43.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------EMPLOYEE Details Api's----------------------------------------------------//

router.get("/emps", function _callee44(req, res) {
  return regeneratorRuntime.async(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          _context44.t0 = res;
          _context44.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmp());

        case 3:
          _context44.t1 = _context44.sent;

          _context44.t0.json.call(_context44.t0, _context44.t1);

        case 5:
        case "end":
          return _context44.stop();
      }
    }
  });
});
router.post("/emps", function _callee45(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee45$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context45.prev = 1;
          _context45.t0 = res;
          _context45.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmp(obj));

        case 5:
          _context45.t1 = _context45.sent;

          _context45.t0.json.call(_context45.t0, _context45.t1);

          _context45.next = 13;
          break;

        case 9:
          _context45.prev = 9;
          _context45.t2 = _context45["catch"](1);
          console.error("Error while Adding", _context45.t2.message);
          next(_context45.t2);

        case 13:
        case "end":
          return _context45.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.post("/importemps", function _callee46(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          console.log("obj: ", obj);
          _context46.prev = 2;
          _context46.t0 = res;
          _context46.next = 6;
          return regeneratorRuntime.awrap(EmpsDb.importEmps(obj));

        case 6:
          _context46.t1 = _context46.sent;

          _context46.t0.json.call(_context46.t0, _context46.t1);

          _context46.next = 14;
          break;

        case 10:
          _context46.prev = 10;
          _context46.t2 = _context46["catch"](2);
          console.error("Error while Adding", _context46.t2.message);
          next(_context46.t2);

        case 14:
        case "end":
          return _context46.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
router.put("/emps/:id", function _callee47(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee47$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context47.prev = 1;
          _context47.t0 = res;
          _context47.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmp(req.params.id, obj));

        case 5:
          _context47.t1 = _context47.sent;

          _context47.t0.json.call(_context47.t0, _context47.t1);

          _context47.next = 13;
          break;

        case 9:
          _context47.prev = 9;
          _context47.t2 = _context47["catch"](1);
          console.error("Error while Updating", _context47.t2.message);
          next(_context47.t2);

        case 13:
        case "end":
          return _context47.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/deletemps/:id", function _callee48(req, res, next) {
  return regeneratorRuntime.async(function _callee48$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          _context48.prev = 0;
          _context48.t0 = res;
          _context48.next = 4;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmp(req.params.id));

        case 4:
          _context48.t1 = _context48.sent;

          _context48.t0.json.call(_context48.t0, _context48.t1);

          _context48.next = 12;
          break;

        case 8:
          _context48.prev = 8;
          _context48.t2 = _context48["catch"](0);
          console.error("Error while Updating", _context48.t2.message);
          next(_context48.t2);

        case 12:
        case "end":
          return _context48.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router["delete"]("/DeleteEmpDocs/:id", function _callee49(req, res) {
  return regeneratorRuntime.async(function _callee49$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.t0 = res;
          _context49.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.DeleteEmpDocs(req.params.id));

        case 3:
          _context49.t1 = _context49.sent;

          _context49.t0.json.call(_context49.t0, _context49.t1);

        case 5:
        case "end":
          return _context49.stop();
      }
    }
  });
});
router.get("/empById/:id", function _callee50(req, res) {
  return regeneratorRuntime.async(function _callee50$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          _context50.t0 = res;
          _context50.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpById(req.params.id));

        case 3:
          _context50.t1 = _context50.sent;

          _context50.t0.json.call(_context50.t0, _context50.t1);

        case 5:
        case "end":
          return _context50.stop();
      }
    }
  });
});
router.get("/getEmpByIsManager/:id", function _callee51(req, res) {
  return regeneratorRuntime.async(function _callee51$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          _context51.t0 = res;
          _context51.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpByIsManager(req.params.id));

        case 3:
          _context51.t1 = _context51.sent;

          _context51.t0.json.call(_context51.t0, _context51.t1);

        case 5:
        case "end":
          return _context51.stop();
      }
    }
  });
});
router.get("/GetEmployeeAddress/:id", function _callee52(req, res) {
  return regeneratorRuntime.async(function _callee52$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          _context52.t0 = res;
          _context52.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getAddressByEmpId(req.params.id));

        case 3:
          _context52.t1 = _context52.sent;

          _context52.t0.json.call(_context52.t0, _context52.t1);

        case 5:
        case "end":
          return _context52.stop();
      }
    }
  });
});
router.get("/GetEmployeeCoveredAreas/:id", function _callee53(req, res) {
  return regeneratorRuntime.async(function _callee53$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          _context53.t0 = res;
          _context53.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getCoveredAreaByEmpId(req.params.id));

        case 3:
          _context53.t1 = _context53.sent;

          _context53.t0.json.call(_context53.t0, _context53.t1);

        case 5:
        case "end":
          return _context53.stop();
      }
    }
  });
});
router.get("/GetEmployeeOtherCoveredAreas/:id", function _callee54(req, res) {
  return regeneratorRuntime.async(function _callee54$(_context54) {
    while (1) {
      switch (_context54.prev = _context54.next) {
        case 0:
          _context54.t0 = res;
          _context54.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getOtherCoveredAreasByEmpId(req.params.id));

        case 3:
          _context54.t1 = _context54.sent;

          _context54.t0.json.call(_context54.t0, _context54.t1);

        case 5:
        case "end":
          return _context54.stop();
      }
    }
  });
});
router.get("/GetEmployeeOtherDocs/:id", function _callee55(req, res) {
  return regeneratorRuntime.async(function _callee55$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          _context55.t0 = res;
          _context55.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getDocsByEmpId(req.params.id));

        case 3:
          _context55.t1 = _context55.sent;

          _context55.t0.json.call(_context55.t0, _context55.t1);

        case 5:
        case "end":
          return _context55.stop();
      }
    }
  });
});
router.get("/GetEmployeeCoveredAreasForEdit/:EmpId/:hqId", function _callee56(req, res) {
  return regeneratorRuntime.async(function _callee56$(_context56) {
    while (1) {
      switch (_context56.prev = _context56.next) {
        case 0:
          console.log("req.params.EmpId-req.params.hqId:", req.params.EmpId, req.params.hqId);
          _context56.t0 = res;
          _context56.next = 4;
          return regeneratorRuntime.awrap(EmpsDb.GetEmployeeCoveredAreasForEdit(req.params.EmpId, req.params.hqId));

        case 4:
          _context56.t1 = _context56.sent;

          _context56.t0.json.call(_context56.t0, _context56.t1);

        case 6:
        case "end":
          return _context56.stop();
      }
    }
  });
});
router.get("/getEmpCountriesInCoveredAreasForEdit/:EmpId", function _callee57(req, res) {
  return regeneratorRuntime.async(function _callee57$(_context57) {
    while (1) {
      switch (_context57.prev = _context57.next) {
        case 0:
          _context57.t0 = res;
          _context57.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpCountriesInCoveredAreasForEdit(req.params.EmpId));

        case 3:
          _context57.t1 = _context57.sent;

          _context57.t0.json.call(_context57.t0, _context57.t1);

        case 5:
        case "end":
          return _context57.stop();
      }
    }
  });
});
router.get("/getEmpStatesInCoveredAreasForEdit/:EmpId", function _callee58(req, res) {
  return regeneratorRuntime.async(function _callee58$(_context58) {
    while (1) {
      switch (_context58.prev = _context58.next) {
        case 0:
          _context58.t0 = res;
          _context58.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpStatesInCoveredAreasForEdit(req.params.EmpId));

        case 3:
          _context58.t1 = _context58.sent;

          _context58.t0.json.call(_context58.t0, _context58.t1);

        case 5:
        case "end":
          return _context58.stop();
      }
    }
  });
});
router.get("/getEmpCitiesInCoveredAreasForEdit/:EmpId", function _callee59(req, res) {
  return regeneratorRuntime.async(function _callee59$(_context59) {
    while (1) {
      switch (_context59.prev = _context59.next) {
        case 0:
          _context59.t0 = res;
          _context59.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpCitiesInCoveredAreasForEdit(req.params.EmpId));

        case 3:
          _context59.t1 = _context59.sent;

          _context59.t0.json.call(_context59.t0, _context59.t1);

        case 5:
        case "end":
          return _context59.stop();
      }
    }
  });
});
router.get("/getEmpAreasInCoveredAreasForEdit/:EmpId", function _callee60(req, res) {
  return regeneratorRuntime.async(function _callee60$(_context60) {
    while (1) {
      switch (_context60.prev = _context60.next) {
        case 0:
          _context60.t0 = res;
          _context60.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpAreasInCoveredAreasForEdit(req.params.EmpId));

        case 3:
          _context60.t1 = _context60.sent;

          _context60.t0.json.call(_context60.t0, _context60.t1);

        case 5:
        case "end":
          return _context60.stop();
      }
    }
  });
});
router.get("/getAllManagers", function _callee61(req, res) {
  return regeneratorRuntime.async(function _callee61$(_context61) {
    while (1) {
      switch (_context61.prev = _context61.next) {
        case 0:
          _context61.t0 = res;
          _context61.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getAllManagers());

        case 3:
          _context61.t1 = _context61.sent;

          _context61.t0.json.call(_context61.t0, _context61.t1);

        case 5:
        case "end":
          return _context61.stop();
      }
    }
  });
});
router.get("/incentives", function _callee62(req, res) {
  return regeneratorRuntime.async(function _callee62$(_context62) {
    while (1) {
      switch (_context62.prev = _context62.next) {
        case 0:
          _context62.t0 = res;
          _context62.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpIncentives());

        case 3:
          _context62.t1 = _context62.sent;

          _context62.t0.json.call(_context62.t0, _context62.t1);

        case 5:
        case "end":
          return _context62.stop();
      }
    }
  });
});
router.post("/incentives", function _callee63(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee63$(_context63) {
    while (1) {
      switch (_context63.prev = _context63.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context63.prev = 1;
          _context63.t0 = res;
          _context63.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpIncentives(obj));

        case 5:
          _context63.t1 = _context63.sent;

          _context63.t0.json.call(_context63.t0, _context63.t1);

          _context63.next = 13;
          break;

        case 9:
          _context63.prev = 9;
          _context63.t2 = _context63["catch"](1);
          console.error("Error while Adding", _context63.t2.message);
          next(_context63.t2);

        case 13:
        case "end":
          return _context63.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/deleteincentives/:id", function _callee64(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee64$(_context64) {
    while (1) {
      switch (_context64.prev = _context64.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context64.prev = 1;
          _context64.t0 = res;
          _context64.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.DeleteEmpIncentives(req.params.id));

        case 5:
          _context64.t1 = _context64.sent;

          _context64.t0.json.call(_context64.t0, _context64.t1);

          _context64.next = 13;
          break;

        case 9:
          _context64.prev = 9;
          _context64.t2 = _context64["catch"](1);
          console.error("Error while Adding", _context64.t2.message);
          next(_context64.t2);

        case 13:
        case "end":
          return _context64.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/incentives/:id", function _callee65(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee65$(_context65) {
    while (1) {
      switch (_context65.prev = _context65.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context65.prev = 1;
          _context65.t0 = res;
          _context65.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpIncentives(req.params.id, obj));

        case 5:
          _context65.t1 = _context65.sent;

          _context65.t0.json.call(_context65.t0, _context65.t1);

          _context65.next = 13;
          break;

        case 9:
          _context65.prev = 9;
          _context65.t2 = _context65["catch"](1);
          console.error("Error while Updating", _context65.t2.message);
          next(_context65.t2);

        case 13:
        case "end":
          return _context65.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/leaves", function _callee66(req, res) {
  return regeneratorRuntime.async(function _callee66$(_context66) {
    while (1) {
      switch (_context66.prev = _context66.next) {
        case 0:
          _context66.t0 = res;
          _context66.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpLeaves());

        case 3:
          _context66.t1 = _context66.sent;

          _context66.t0.json.call(_context66.t0, _context66.t1);

        case 5:
        case "end":
          return _context66.stop();
      }
    }
  });
});
router.get("/leavereason/:id", function _callee67(req, res) {
  return regeneratorRuntime.async(function _callee67$(_context67) {
    while (1) {
      switch (_context67.prev = _context67.next) {
        case 0:
          _context67.t0 = res;
          _context67.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getReasonForLeave(req.params.id));

        case 3:
          _context67.t1 = _context67.sent;

          _context67.t0.json.call(_context67.t0, _context67.t1);

        case 5:
        case "end":
          return _context67.stop();
      }
    }
  });
});
router.get("/leavesbyemp/:id", function _callee68(req, res) {
  return regeneratorRuntime.async(function _callee68$(_context68) {
    while (1) {
      switch (_context68.prev = _context68.next) {
        case 0:
          _context68.t0 = res;
          _context68.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getAllLeavesForEmployee(req.params.id));

        case 3:
          _context68.t1 = _context68.sent;

          _context68.t0.json.call(_context68.t0, _context68.t1);

        case 5:
        case "end":
          return _context68.stop();
      }
    }
  });
});
router.put("/acceptleaves/:id", function _callee69(req, res, next) {
  return regeneratorRuntime.async(function _callee69$(_context69) {
    while (1) {
      switch (_context69.prev = _context69.next) {
        case 0:
          _context69.prev = 0;
          _context69.t0 = res;
          _context69.next = 4;
          return regeneratorRuntime.awrap(EmpsDb.AcceptLeaves(req.params.id));

        case 4:
          _context69.t1 = _context69.sent;

          _context69.t0.json.call(_context69.t0, _context69.t1);

          _context69.next = 12;
          break;

        case 8:
          _context69.prev = 8;
          _context69.t2 = _context69["catch"](0);
          console.error("Error while Updating", _context69.t2.message);
          next(_context69.t2);

        case 12:
        case "end":
          return _context69.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.put("/rejectleaves/:id", function _callee70(req, res, next) {
  return regeneratorRuntime.async(function _callee70$(_context70) {
    while (1) {
      switch (_context70.prev = _context70.next) {
        case 0:
          _context70.prev = 0;
          _context70.t0 = res;
          _context70.next = 4;
          return regeneratorRuntime.awrap(EmpsDb.RejectLeaves(req.params.id));

        case 4:
          _context70.t1 = _context70.sent;

          _context70.t0.json.call(_context70.t0, _context70.t1);

          _context70.next = 12;
          break;

        case 8:
          _context70.prev = 8;
          _context70.t2 = _context70["catch"](0);
          console.error("Error while Updating", _context70.t2.message);
          next(_context70.t2);

        case 12:
        case "end":
          return _context70.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get("/leavesforallemps", function _callee71(req, res) {
  return regeneratorRuntime.async(function _callee71$(_context71) {
    while (1) {
      switch (_context71.prev = _context71.next) {
        case 0:
          _context71.t0 = res;
          _context71.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getAllEmployeeLeaves());

        case 3:
          _context71.t1 = _context71.sent;

          _context71.t0.json.call(_context71.t0, _context71.t1);

        case 5:
        case "end":
          return _context71.stop();
      }
    }
  });
}); // -------CUSTOMER Api's----------------------------------------------------//

router.get("/custcat", function _callee72(req, res) {
  return regeneratorRuntime.async(function _callee72$(_context72) {
    while (1) {
      switch (_context72.prev = _context72.next) {
        case 0:
          _context72.t0 = res;
          _context72.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustomersCat());

        case 3:
          _context72.t1 = _context72.sent;

          _context72.t0.json.call(_context72.t0, _context72.t1);

        case 5:
        case "end":
          return _context72.stop();
      }
    }
  });
});
router.post("/custcat", function _callee73(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee73$(_context73) {
    while (1) {
      switch (_context73.prev = _context73.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context73.prev = 1;
          _context73.t0 = res;
          _context73.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addCustomersCat(obj));

        case 5:
          _context73.t1 = _context73.sent;

          _context73.t0.json.call(_context73.t0, _context73.t1);

          _context73.next = 12;
          break;

        case 9:
          _context73.prev = 9;
          _context73.t2 = _context73["catch"](1);
          console.error("Error while Adding", _context73.t2.message);

        case 12:
        case "end":
          return _context73.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/custcat/:id", function _callee74(req, res) {
  return regeneratorRuntime.async(function _callee74$(_context74) {
    while (1) {
      switch (_context74.prev = _context74.next) {
        case 0:
          _context74.t0 = res;
          _context74.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteCustomersCat(req.params.id));

        case 3:
          _context74.t1 = _context74.sent;

          _context74.t0.json.call(_context74.t0, _context74.t1);

        case 5:
        case "end":
          return _context74.stop();
      }
    }
  });
});
router.put("/custcat/:id", function _callee75(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee75$(_context75) {
    while (1) {
      switch (_context75.prev = _context75.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context75.prev = 1;
          _context75.t0 = res;
          _context75.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateCustomersCat(req.params.id, obj));

        case 5:
          _context75.t1 = _context75.sent;

          _context75.t0.json.call(_context75.t0, _context75.t1);

          _context75.next = 13;
          break;

        case 9:
          _context75.prev = 9;
          _context75.t2 = _context75["catch"](1);
          console.error("Error while Adding", _context75.t2.message);
          next(_context75.t2);

        case 13:
        case "end":
          return _context75.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/custtype", function _callee76(req, res) {
  return regeneratorRuntime.async(function _callee76$(_context76) {
    while (1) {
      switch (_context76.prev = _context76.next) {
        case 0:
          _context76.t0 = res;
          _context76.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustomersType());

        case 3:
          _context76.t1 = _context76.sent;

          _context76.t0.json.call(_context76.t0, _context76.t1);

        case 5:
        case "end":
          return _context76.stop();
      }
    }
  });
});
router.post("/custtype", function _callee77(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee77$(_context77) {
    while (1) {
      switch (_context77.prev = _context77.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context77.prev = 1;
          _context77.t0 = res;
          _context77.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addCustomersType(obj));

        case 5:
          _context77.t1 = _context77.sent;

          _context77.t0.json.call(_context77.t0, _context77.t1);

          _context77.next = 12;
          break;

        case 9:
          _context77.prev = 9;
          _context77.t2 = _context77["catch"](1);
          console.error("Error while Adding", _context77.t2.message);

        case 12:
        case "end":
          return _context77.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/custtype/:id", function _callee78(req, res) {
  return regeneratorRuntime.async(function _callee78$(_context78) {
    while (1) {
      switch (_context78.prev = _context78.next) {
        case 0:
          _context78.t0 = res;
          _context78.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteCustomersType(req.params.id));

        case 3:
          _context78.t1 = _context78.sent;

          _context78.t0.json.call(_context78.t0, _context78.t1);

        case 5:
        case "end":
          return _context78.stop();
      }
    }
  });
});
router.put("/custtype/:id", function _callee79(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee79$(_context79) {
    while (1) {
      switch (_context79.prev = _context79.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context79.prev = 1;
          _context79.t0 = res;
          _context79.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateCustomersType(req.params.id, obj));

        case 5:
          _context79.t1 = _context79.sent;

          _context79.t0.json.call(_context79.t0, _context79.t1);

          _context79.next = 13;
          break;

        case 9:
          _context79.prev = 9;
          _context79.t2 = _context79["catch"](1);
          console.error("Error while Adding", _context79.t2.message);
          next(_context79.t2);

        case 13:
        case "end":
          return _context79.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/custsubtype", function _callee80(req, res) {
  return regeneratorRuntime.async(function _callee80$(_context80) {
    while (1) {
      switch (_context80.prev = _context80.next) {
        case 0:
          _context80.t0 = res;
          _context80.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustomersSubType());

        case 3:
          _context80.t1 = _context80.sent;

          _context80.t0.json.call(_context80.t0, _context80.t1);

        case 5:
        case "end":
          return _context80.stop();
      }
    }
  });
});
router.get("/custsubtypebytype/:id", function _callee81(req, res) {
  return regeneratorRuntime.async(function _callee81$(_context81) {
    while (1) {
      switch (_context81.prev = _context81.next) {
        case 0:
          _context81.t0 = res;
          _context81.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustSubTypeByType(req.params.id));

        case 3:
          _context81.t1 = _context81.sent;

          _context81.t0.json.call(_context81.t0, _context81.t1);

        case 5:
        case "end":
          return _context81.stop();
      }
    }
  });
});
router.post("/custsubtype", function _callee82(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee82$(_context82) {
    while (1) {
      switch (_context82.prev = _context82.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context82.prev = 1;
          _context82.t0 = res;
          _context82.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addCustomersSubType(obj));

        case 5:
          _context82.t1 = _context82.sent;

          _context82.t0.json.call(_context82.t0, _context82.t1);

          _context82.next = 12;
          break;

        case 9:
          _context82.prev = 9;
          _context82.t2 = _context82["catch"](1);
          console.error("Error while Adding", _context82.t2.message);

        case 12:
        case "end":
          return _context82.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/custsubtype/:id", function _callee83(req, res) {
  return regeneratorRuntime.async(function _callee83$(_context83) {
    while (1) {
      switch (_context83.prev = _context83.next) {
        case 0:
          _context83.t0 = res;
          _context83.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteCustomersSubType(req.params.id));

        case 3:
          _context83.t1 = _context83.sent;

          _context83.t0.json.call(_context83.t0, _context83.t1);

        case 5:
        case "end":
          return _context83.stop();
      }
    }
  });
});
router.put("/custsubtype/:id", function _callee84(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee84$(_context84) {
    while (1) {
      switch (_context84.prev = _context84.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context84.prev = 1;
          _context84.t0 = res;
          _context84.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateCustomersSubType(req.params.id, obj));

        case 5:
          _context84.t1 = _context84.sent;

          _context84.t0.json.call(_context84.t0, _context84.t1);

          _context84.next = 13;
          break;

        case 9:
          _context84.prev = 9;
          _context84.t2 = _context84["catch"](1);
          console.error("Error while Adding", _context84.t2.message);
          next(_context84.t2);

        case 13:
        case "end":
          return _context84.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/customer", function _callee85(req, res) {
  return regeneratorRuntime.async(function _callee85$(_context85) {
    while (1) {
      switch (_context85.prev = _context85.next) {
        case 0:
          _context85.t0 = res;
          _context85.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustomers());

        case 3:
          _context85.t1 = _context85.sent;

          _context85.t0.json.call(_context85.t0, _context85.t1);

        case 5:
        case "end":
          return _context85.stop();
      }
    }
  });
});
router.get("/customerdocs/:id", function _callee86(req, res) {
  return regeneratorRuntime.async(function _callee86$(_context86) {
    while (1) {
      switch (_context86.prev = _context86.next) {
        case 0:
          _context86.t0 = res;
          _context86.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustDocsById(req.params.id));

        case 3:
          _context86.t1 = _context86.sent;

          _context86.t0.json.call(_context86.t0, _context86.t1);

        case 5:
        case "end":
          return _context86.stop();
      }
    }
  });
});
router.get("/customercontactpersons/:id", function _callee87(req, res) {
  return regeneratorRuntime.async(function _callee87$(_context87) {
    while (1) {
      switch (_context87.prev = _context87.next) {
        case 0:
          _context87.t0 = res;
          _context87.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustContactPersons(req.params.id));

        case 3:
          _context87.t1 = _context87.sent;

          _context87.t0.json.call(_context87.t0, _context87.t1);

        case 5:
        case "end":
          return _context87.stop();
      }
    }
  });
});
router.get("/customerreaoson/:id", function _callee88(req, res) {
  return regeneratorRuntime.async(function _callee88$(_context88) {
    while (1) {
      switch (_context88.prev = _context88.next) {
        case 0:
          _context88.t0 = res;
          _context88.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustReasonForDelete(req.params.id));

        case 3:
          _context88.t1 = _context88.sent;

          _context88.t0.json.call(_context88.t0, _context88.t1);

        case 5:
        case "end":
          return _context88.stop();
      }
    }
  });
});
router.post("/customer", function _callee89(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee89$(_context89) {
    while (1) {
      switch (_context89.prev = _context89.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context89.prev = 1;
          _context89.t0 = res;
          _context89.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addCustomers(obj));

        case 5:
          _context89.t1 = _context89.sent;

          _context89.t0.json.call(_context89.t0, _context89.t1);

          _context89.next = 12;
          break;

        case 9:
          _context89.prev = 9;
          _context89.t2 = _context89["catch"](1);
          console.error("Error while Adding", _context89.t2.message);

        case 12:
        case "end":
          return _context89.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/customer/:id", function _callee90(req, res) {
  return regeneratorRuntime.async(function _callee90$(_context90) {
    while (1) {
      switch (_context90.prev = _context90.next) {
        case 0:
          _context90.t0 = res;
          _context90.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteCustomers(req.params.id));

        case 3:
          _context90.t1 = _context90.sent;

          _context90.t0.json.call(_context90.t0, _context90.t1);

        case 5:
        case "end":
          return _context90.stop();
      }
    }
  });
});
router.put("/customer/:id", function _callee91(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee91$(_context91) {
    while (1) {
      switch (_context91.prev = _context91.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context91.prev = 1;
          _context91.t0 = res;
          _context91.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateCustomers(req.params.id, obj));

        case 5:
          _context91.t1 = _context91.sent;

          _context91.t0.json.call(_context91.t0, _context91.t1);

          _context91.next = 13;
          break;

        case 9:
          _context91.prev = 9;
          _context91.t2 = _context91["catch"](1);
          console.error("Error while Adding", _context91.t2.message);
          next(_context91.t2);

        case 13:
        case "end":
          return _context91.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/addresstype/:custId", function _callee92(req, res) {
  return regeneratorRuntime.async(function _callee92$(_context92) {
    while (1) {
      switch (_context92.prev = _context92.next) {
        case 0:
          _context92.t0 = res;
          _context92.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getAddressType(req.params.custId));

        case 3:
          _context92.t1 = _context92.sent;

          _context92.t0.json.call(_context92.t0, _context92.t1);

        case 5:
        case "end":
          return _context92.stop();
      }
    }
  });
});
router.post("/addresstype", function _callee93(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee93$(_context93) {
    while (1) {
      switch (_context93.prev = _context93.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context93.prev = 1;
          _context93.t0 = res;
          _context93.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addAddressType(obj));

        case 5:
          _context93.t1 = _context93.sent;

          _context93.t0.json.call(_context93.t0, _context93.t1);

          _context93.next = 12;
          break;

        case 9:
          _context93.prev = 9;
          _context93.t2 = _context93["catch"](1);
          console.error("Error while Adding", _context93.t2.message);

        case 12:
        case "end":
          return _context93.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/addresstype/:id", function _callee94(req, res) {
  return regeneratorRuntime.async(function _callee94$(_context94) {
    while (1) {
      switch (_context94.prev = _context94.next) {
        case 0:
          _context94.t0 = res;
          _context94.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteAddressType(req.params.id));

        case 3:
          _context94.t1 = _context94.sent;

          _context94.t0.json.call(_context94.t0, _context94.t1);

        case 5:
        case "end":
          return _context94.stop();
      }
    }
  });
});
router.put("/addresstype/:id", function _callee95(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee95$(_context95) {
    while (1) {
      switch (_context95.prev = _context95.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context95.prev = 1;
          _context95.t0 = res;
          _context95.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateAddressType(req.params.id, obj));

        case 5:
          _context95.t1 = _context95.sent;

          _context95.t0.json.call(_context95.t0, _context95.t1);

          _context95.next = 13;
          break;

        case 9:
          _context95.prev = 9;
          _context95.t2 = _context95["catch"](1);
          console.error("Error while Adding", _context95.t2.message);
          next(_context95.t2);

        case 13:
        case "end":
          return _context95.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/custdeletereq", function _callee96(req, res) {
  return regeneratorRuntime.async(function _callee96$(_context96) {
    while (1) {
      switch (_context96.prev = _context96.next) {
        case 0:
          _context96.t0 = res;
          _context96.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustDeleteNewRequest());

        case 3:
          _context96.t1 = _context96.sent;

          _context96.t0.json.call(_context96.t0, _context96.t1);

        case 5:
        case "end":
          return _context96.stop();
      }
    }
  });
});
router.put("/custdeleteacceptreq/:reqid/:custid", function _callee97(req, res, next) {
  return regeneratorRuntime.async(function _callee97$(_context97) {
    while (1) {
      switch (_context97.prev = _context97.next) {
        case 0:
          console.log("hit");
          console.log("req.params.reqid,req.params.custid: ", req.params.reqid, req.params.custid);
          _context97.prev = 2;
          _context97.t0 = res;
          _context97.next = 6;
          return regeneratorRuntime.awrap(CustsDb.AcceptDeleteRequest(req.params.reqid, req.params.custid));

        case 6:
          _context97.t1 = _context97.sent;

          _context97.t0.json.call(_context97.t0, _context97.t1);

          _context97.next = 14;
          break;

        case 10:
          _context97.prev = 10;
          _context97.t2 = _context97["catch"](2);
          console.error("Error while Adding", _context97.t2.message);
          next(_context97.t2);

        case 14:
        case "end":
          return _context97.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
router.put("/custdeleterejectreq/:id", function _callee98(req, res, next) {
  return regeneratorRuntime.async(function _callee98$(_context98) {
    while (1) {
      switch (_context98.prev = _context98.next) {
        case 0:
          _context98.prev = 0;
          _context98.t0 = res;
          _context98.next = 4;
          return regeneratorRuntime.awrap(CustsDb.RejectDeleteRequest(req.params.id));

        case 4:
          _context98.t1 = _context98.sent;

          _context98.t0.json.call(_context98.t0, _context98.t1);

          _context98.next = 12;
          break;

        case 8:
          _context98.prev = 8;
          _context98.t2 = _context98["catch"](0);
          console.error("Error while Adding", _context98.t2.message);
          next(_context98.t2);

        case 12:
        case "end":
          return _context98.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // -------PRODUCT Api's----------------------------------------------------//

router.get("/prodspecies", function _callee99(req, res) {
  return regeneratorRuntime.async(function _callee99$(_context99) {
    while (1) {
      switch (_context99.prev = _context99.next) {
        case 0:
          _context99.t0 = res;
          _context99.next = 3;
          return regeneratorRuntime.awrap(ProdDb.getProductSpecies());

        case 3:
          _context99.t1 = _context99.sent;

          _context99.t0.json.call(_context99.t0, _context99.t1);

        case 5:
        case "end":
          return _context99.stop();
      }
    }
  });
});
router.post("/prodspecies", function _callee100(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee100$(_context100) {
    while (1) {
      switch (_context100.prev = _context100.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context100.prev = 1;
          _context100.t0 = res;
          _context100.next = 5;
          return regeneratorRuntime.awrap(ProdDb.addProductSpecies(obj));

        case 5:
          _context100.t1 = _context100.sent;

          _context100.t0.json.call(_context100.t0, _context100.t1);

          _context100.next = 12;
          break;

        case 9:
          _context100.prev = 9;
          _context100.t2 = _context100["catch"](1);
          console.error("Error while Adding", _context100.t2.message);

        case 12:
        case "end":
          return _context100.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/deleteprodspecies/:id", function _callee101(req, res) {
  return regeneratorRuntime.async(function _callee101$(_context101) {
    while (1) {
      switch (_context101.prev = _context101.next) {
        case 0:
          _context101.t0 = res;
          _context101.next = 3;
          return regeneratorRuntime.awrap(ProdDb.deleteProductSpecies(req.params.id));

        case 3:
          _context101.t1 = _context101.sent;

          _context101.t0.json.call(_context101.t0, _context101.t1);

        case 5:
        case "end":
          return _context101.stop();
      }
    }
  });
});
router.put("/prodspecies/:id", function _callee102(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee102$(_context102) {
    while (1) {
      switch (_context102.prev = _context102.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context102.prev = 1;
          _context102.t0 = res;
          _context102.next = 5;
          return regeneratorRuntime.awrap(ProdDb.updateProductSpecies(req.params.id, obj));

        case 5:
          _context102.t1 = _context102.sent;

          _context102.t0.json.call(_context102.t0, _context102.t1);

          _context102.next = 13;
          break;

        case 9:
          _context102.prev = 9;
          _context102.t2 = _context102["catch"](1);
          console.error("Error while Adding", _context102.t2.message);
          next(_context102.t2);

        case 13:
        case "end":
          return _context102.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/prod", function _callee103(req, res) {
  return regeneratorRuntime.async(function _callee103$(_context103) {
    while (1) {
      switch (_context103.prev = _context103.next) {
        case 0:
          _context103.t0 = res;
          _context103.next = 3;
          return regeneratorRuntime.awrap(ProdDb.getProducts());

        case 3:
          _context103.t1 = _context103.sent;

          _context103.t0.json.call(_context103.t0, _context103.t1);

        case 5:
        case "end":
          return _context103.stop();
      }
    }
  });
});
router.post("/prod", function _callee104(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee104$(_context104) {
    while (1) {
      switch (_context104.prev = _context104.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context104.prev = 1;
          _context104.t0 = res;
          _context104.next = 5;
          return regeneratorRuntime.awrap(ProdDb.addProducts(obj));

        case 5:
          _context104.t1 = _context104.sent;

          _context104.t0.json.call(_context104.t0, _context104.t1);

          _context104.next = 12;
          break;

        case 9:
          _context104.prev = 9;
          _context104.t2 = _context104["catch"](1);
          console.error("Error while Adding", _context104.t2.message);

        case 12:
        case "end":
          return _context104.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/deleteprod/:id", function _callee105(req, res) {
  return regeneratorRuntime.async(function _callee105$(_context105) {
    while (1) {
      switch (_context105.prev = _context105.next) {
        case 0:
          _context105.t0 = res;
          _context105.next = 3;
          return regeneratorRuntime.awrap(ProdDb.deleteProducts(req.params.id));

        case 3:
          _context105.t1 = _context105.sent;

          _context105.t0.json.call(_context105.t0, _context105.t1);

        case 5:
        case "end":
          return _context105.stop();
      }
    }
  });
});
router.put("/prod/:id", function _callee106(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee106$(_context106) {
    while (1) {
      switch (_context106.prev = _context106.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          console.log("req.params.id, obj: ", req.params.id, obj);
          _context106.prev = 2;
          _context106.t0 = res;
          _context106.next = 6;
          return regeneratorRuntime.awrap(ProdDb.updateProducts(req.params.id, obj));

        case 6:
          _context106.t1 = _context106.sent;

          _context106.t0.json.call(_context106.t0, _context106.t1);

          _context106.next = 14;
          break;

        case 10:
          _context106.prev = 10;
          _context106.t2 = _context106["catch"](2);
          console.error("Error while Adding", _context106.t2.message);
          next(_context106.t2);

        case 14:
        case "end":
          return _context106.stop();
      }
    }
  }, null, null, [[2, 10]]);
}); // -------UOM Api's----------------------------------------------------//

router.get("/uom", function _callee107(req, res) {
  return regeneratorRuntime.async(function _callee107$(_context107) {
    while (1) {
      switch (_context107.prev = _context107.next) {
        case 0:
          _context107.t0 = res;
          _context107.next = 3;
          return regeneratorRuntime.awrap(UomDb.getUom());

        case 3:
          _context107.t1 = _context107.sent;

          _context107.t0.json.call(_context107.t0, _context107.t1);

        case 5:
        case "end":
          return _context107.stop();
      }
    }
  });
});
router.post("/uom", function _callee108(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee108$(_context108) {
    while (1) {
      switch (_context108.prev = _context108.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context108.prev = 1;
          _context108.t0 = res;
          _context108.next = 5;
          return regeneratorRuntime.awrap(UomDb.addUom(obj));

        case 5:
          _context108.t1 = _context108.sent;

          _context108.t0.json.call(_context108.t0, _context108.t1);

          _context108.next = 13;
          break;

        case 9:
          _context108.prev = 9;
          _context108.t2 = _context108["catch"](1);
          console.error("Error while Adding", _context108.t2.message);
          next(_context108.t2);

        case 13:
        case "end":
          return _context108.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/uom/:id", function _callee109(req, res) {
  return regeneratorRuntime.async(function _callee109$(_context109) {
    while (1) {
      switch (_context109.prev = _context109.next) {
        case 0:
          _context109.t0 = res;
          _context109.next = 3;
          return regeneratorRuntime.awrap(UomDb.deleteUom(req.params.id));

        case 3:
          _context109.t1 = _context109.sent;

          _context109.t0.json.call(_context109.t0, _context109.t1);

        case 5:
        case "end":
          return _context109.stop();
      }
    }
  });
});
router.put("/uom/:id", function _callee110(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee110$(_context110) {
    while (1) {
      switch (_context110.prev = _context110.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context110.prev = 1;
          _context110.t0 = res;
          _context110.next = 5;
          return regeneratorRuntime.awrap(UomDb.updateUom(req.params.id, obj));

        case 5:
          _context110.t1 = _context110.sent;

          _context110.t0.json.call(_context110.t0, _context110.t1);

          _context110.next = 13;
          break;

        case 9:
          _context110.prev = 9;
          _context110.t2 = _context110["catch"](1);
          console.error("Error while Adding", _context110.t2.message);
          next(_context110.t2);

        case 13:
        case "end":
          return _context110.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------ORDER MANAGEMENT Api's----------------------------------------------------//

router.get("/GetAllOrderRequest", function _callee111(req, res) {
  return regeneratorRuntime.async(function _callee111$(_context111) {
    while (1) {
      switch (_context111.prev = _context111.next) {
        case 0:
          _context111.t0 = res;
          _context111.next = 3;
          return regeneratorRuntime.awrap(OrdDb.getOrders());

        case 3:
          _context111.t1 = _context111.sent;

          _context111.t0.json.call(_context111.t0, _context111.t1);

        case 5:
        case "end":
          return _context111.stop();
      }
    }
  });
});
router.get("/GetOrderItemOrderID/:id", function _callee112(req, res) {
  return regeneratorRuntime.async(function _callee112$(_context112) {
    while (1) {
      switch (_context112.prev = _context112.next) {
        case 0:
          _context112.t0 = res;
          _context112.next = 3;
          return regeneratorRuntime.awrap(OrdDb.getItemsByOrderId(req.params.id));

        case 3:
          _context112.t1 = _context112.sent;

          _context112.t0.json.call(_context112.t0, _context112.t1);

        case 5:
        case "end":
          return _context112.stop();
      }
    }
  });
});
router.get("/OrderRemark/:id", function _callee113(req, res) {
  return regeneratorRuntime.async(function _callee113$(_context113) {
    while (1) {
      switch (_context113.prev = _context113.next) {
        case 0:
          _context113.t0 = res;
          _context113.next = 3;
          return regeneratorRuntime.awrap(OrdDb.getRemarksOrdersById(req.params.id));

        case 3:
          _context113.t1 = _context113.sent;

          _context113.t0.json.call(_context113.t0, _context113.t1);

        case 5:
        case "end":
          return _context113.stop();
      }
    }
  });
});
router.get("/OrderBillingAddress/:id", function _callee114(req, res) {
  return regeneratorRuntime.async(function _callee114$(_context114) {
    while (1) {
      switch (_context114.prev = _context114.next) {
        case 0:
          _context114.t0 = res;
          _context114.next = 3;
          return regeneratorRuntime.awrap(OrdDb.getBillingAddressOrdersById(req.params.id));

        case 3:
          _context114.t1 = _context114.sent;

          _context114.t0.json.call(_context114.t0, _context114.t1);

        case 5:
        case "end":
          return _context114.stop();
      }
    }
  });
});
router.get("/OrderShippingAddress/:id", function _callee115(req, res) {
  return regeneratorRuntime.async(function _callee115$(_context115) {
    while (1) {
      switch (_context115.prev = _context115.next) {
        case 0:
          _context115.t0 = res;
          _context115.next = 3;
          return regeneratorRuntime.awrap(OrdDb.getShippingAddressOrdersById(req.params.id));

        case 3:
          _context115.t1 = _context115.sent;

          _context115.t0.json.call(_context115.t0, _context115.t1);

        case 5:
        case "end":
          return _context115.stop();
      }
    }
  });
});
router.put("/AcceptOrder/:id", function _callee116(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee116$(_context116) {
    while (1) {
      switch (_context116.prev = _context116.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context116.prev = 1;
          _context116.t0 = res;
          _context116.next = 5;
          return regeneratorRuntime.awrap(OrdDb.AcceptOrderRequest(req.params.id, obj));

        case 5:
          _context116.t1 = _context116.sent;

          _context116.t0.json.call(_context116.t0, _context116.t1);

          _context116.next = 13;
          break;

        case 9:
          _context116.prev = 9;
          _context116.t2 = _context116["catch"](1);
          console.error("Error while Adding", _context116.t2.message);
          next(_context116.t2);

        case 13:
        case "end":
          return _context116.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/RejectOrder/:id", function _callee117(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee117$(_context117) {
    while (1) {
      switch (_context117.prev = _context117.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context117.prev = 1;
          _context117.t0 = res;
          _context117.next = 5;
          return regeneratorRuntime.awrap(OrdDb.RejectOrderRequest(req.params.id, obj));

        case 5:
          _context117.t1 = _context117.sent;

          _context117.t0.json.call(_context117.t0, _context117.t1);

          _context117.next = 13;
          break;

        case 9:
          _context117.prev = 9;
          _context117.t2 = _context117["catch"](1);
          console.error("Error while Adding", _context117.t2.message);
          next(_context117.t2);

        case 13:
        case "end":
          return _context117.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get("/OrderSupplyType", function _callee118(req, res) {
  return regeneratorRuntime.async(function _callee118$(_context118) {
    while (1) {
      switch (_context118.prev = _context118.next) {
        case 0:
          _context118.t0 = res;
          _context118.next = 3;
          return regeneratorRuntime.awrap(OrdDb.getSupplyType());

        case 3:
          _context118.t1 = _context118.sent;

          _context118.t0.json.call(_context118.t0, _context118.t1);

        case 5:
        case "end":
          return _context118.stop();
      }
    }
  });
});
router.put("/OrderSupplyType/:id", function _callee119(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee119$(_context119) {
    while (1) {
      switch (_context119.prev = _context119.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context119.prev = 1;
          _context119.t0 = res;
          _context119.next = 5;
          return regeneratorRuntime.awrap(OrdDb.updateSupplyType(req.params.id, obj));

        case 5:
          _context119.t1 = _context119.sent;

          _context119.t0.json.call(_context119.t0, _context119.t1);

          _context119.next = 13;
          break;

        case 9:
          _context119.prev = 9;
          _context119.t2 = _context119["catch"](1);
          console.error("Error while Adding", _context119.t2.message);
          next(_context119.t2);

        case 13:
        case "end":
          return _context119.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.post("/OrderSupplyType", function _callee120(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee120$(_context120) {
    while (1) {
      switch (_context120.prev = _context120.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context120.prev = 1;
          _context120.t0 = res;
          _context120.next = 5;
          return regeneratorRuntime.awrap(OrdDb.addSupplyType(obj));

        case 5:
          _context120.t1 = _context120.sent;

          _context120.t0.json.call(_context120.t0, _context120.t1);

          _context120.next = 13;
          break;

        case 9:
          _context120.prev = 9;
          _context120.t2 = _context120["catch"](1);
          console.error("Error while Adding", _context120.t2.message);
          next(_context120.t2);

        case 13:
        case "end":
          return _context120.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/OrderSupplyTypeDel/:id", function _callee121(req, res, next) {
  return regeneratorRuntime.async(function _callee121$(_context121) {
    while (1) {
      switch (_context121.prev = _context121.next) {
        case 0:
          _context121.prev = 0;
          _context121.t0 = res;
          _context121.next = 4;
          return regeneratorRuntime.awrap(OrdDb.deleteSupplyType(req.params.id));

        case 4:
          _context121.t1 = _context121.sent;

          _context121.t0.json.call(_context121.t0, _context121.t1);

          _context121.next = 12;
          break;

        case 8:
          _context121.prev = 8;
          _context121.t2 = _context121["catch"](0);
          console.error("Error while Adding", _context121.t2.message);
          next(_context121.t2);

        case 12:
        case "end":
          return _context121.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get("/GetPendingOrdersBySupplayType/:id", function _callee122(req, res) {
  return regeneratorRuntime.async(function _callee122$(_context122) {
    while (1) {
      switch (_context122.prev = _context122.next) {
        case 0:
          _context122.t0 = res;
          _context122.next = 3;
          return regeneratorRuntime.awrap(OrdDb.GetPendingOrdersBySupplyType(req.params.id));

        case 3:
          _context122.t1 = _context122.sent;

          _context122.t0.json.call(_context122.t0, _context122.t1);

        case 5:
        case "end":
          return _context122.stop();
      }
    }
  });
}); // -------END----------------------------------------------------//

var port = process.env.PORT || 7760; // app.listen(port);
// console.log("API is runnning at http://localhost:" + port);

var server = app.listen(port, function () {
  return console.log("API is runnning at http://localhost:" + port);
});
process.on("SIGTERM", function () {
  server.close(function () {
    console.log("Process terminated");
  });
});