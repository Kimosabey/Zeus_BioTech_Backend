"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 18:02:44
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-21 13:26:27
 */
var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var app = express();
app.use(bodyParser.json());
var router = express.Router();
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

var CompDb = require("./apiOperations/company"); // -------------------------------------//


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(cors());
app.use("/api", router); // allow cross-origin requests

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); //file Upload -----------------------

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

var initRoutes = require("./src/routes"); // app.use(express.urlencoded({ extended: true }));


initRoutes(app); // --------------------------------

app.get("/", function (req, res) {
  var responseText = '<h1 style="color:green;">Hello Kimo Restful Api Using Nodejs is Working!!!</h1>';
  res.send(responseText);
});
app.get("/example/a", function (req, res) {
  res.jsonp("Hello from A!");
});
router.use(function (req, res, next) {
  // console.log("Time:", new Date());
  next();
});
router.route("/orders").get(function (request, response) {
  Db.getOrders().then(function (data) {
    response.json(data);
  });
});
router.route("/orders/:id").get(function (request, response) {
  Db.getOrder(request.params.id).then(function (data) {
    response.json(data[0]);
  });
});
router.route("/orders").post(function (request, response) {
  var order = _objectSpread({}, request.body);

  Db.addOrder(order).then(function (data) {
    response.status(201).json(data);
  });
}); // -----------Login Api's--------------- //

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

          _context.t0.jsonp.call(_context.t0, _context.t1);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // -----------Country Api's--------------- //

router.route("/countries").get(function (req, res) {
  CountryDb.getCountries().then(function (data) {
    res.json(data[0]);
  });
});
router.route("/countries/:id").get(function (req, res) {
  CountryDb.getCountryById(req.params.id).then(function (data) {
    res.json(data[0]);
  });
});
router.route("/countries").post(function (req, res) {
  var obj = _objectSpread({}, req.body);

  CountryDb.addCountry(obj).then(function (data) {
    res.status(201).json(data);
  });
});
router.route("/countries/:id")["delete"](function (req, res) {
  CountryDb.deleteCountry(req.params.id).then(function (data) {
    // console.log(data);
    res.json(data);
  });
});
router.put("/countries/:id", function _callee2(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context2.prev = 1;
          _context2.t0 = res;
          _context2.next = 5;
          return regeneratorRuntime.awrap(CountryDb.updateCountry(req.params.id, obj));

        case 5:
          _context2.t1 = _context2.sent;

          _context2.t0.json.call(_context2.t0, _context2.t1);

          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t2 = _context2["catch"](1);
          console.error("Error while updating", _context2.t2.message);
          next(_context2.t2);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------State Api's--------//

router.route("/states").get(function (req, res) {
  StateDb.getStates().then(function (data) {
    res.jsonp(data);
  });
});
router.route("/states/:id").get(function (req, res) {
  StateDb.getStatesById(req.params.id).then(function (data) {
    res.json(data[0]);
  });
});
router.route("/states").post(function (req, res) {
  var obj = _objectSpread({}, req.body);

  StateDb.addState(obj).then(function (data) {
    res.status(201).json(data);
  });
});
router.put("/states/:id", function _callee3(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context3.prev = 1;
          _context3.t0 = res;
          _context3.next = 5;
          return regeneratorRuntime.awrap(StateDb.updateState(req.params.id, obj));

        case 5:
          _context3.t1 = _context3.sent;

          _context3.t0.json.call(_context3.t0, _context3.t1);

          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t2 = _context3["catch"](1);
          console.error("Error while updating", _context3.t2.message);
          next(_context3.t2);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.route("/getStateByCountryId/:id").get(function (req, res) {
  StateDb.getStateByCountryId(req.params.id).then(function (data) {
    res.json(data[0]);
  });
});
router["delete"]("/states/:id", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("id :>> ", req.params.id);
          _context4.t0 = res;
          _context4.next = 4;
          return regeneratorRuntime.awrap(StateDb.deleteState(req.params.id));

        case 4:
          _context4.t1 = _context4.sent;

          _context4.t0.json.call(_context4.t0, _context4.t1);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // -------City Api's----------------------------------------------------//

router.route("/cities").get(function _callee5(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          CityDb.getCities(obj).then(function (data) {
            res.status(201).json(data);
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.route("/citiesByStateId/:id").get(function _callee6(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context6.t0 = res.status(201);
          _context6.next = 4;
          return regeneratorRuntime.awrap(CityDb.getCitiesByStateId(req.params.id));

        case 4:
          _context6.t1 = _context6.sent;

          _context6.t0.json.call(_context6.t0, _context6.t1);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.post("/cities", function _callee7(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context7.prev = 1;
          _context7.t0 = res;
          _context7.next = 5;
          return regeneratorRuntime.awrap(CityDb.addCity(obj));

        case 5:
          _context7.t1 = _context7.sent;

          _context7.t0.json.call(_context7.t0, _context7.t1);

          _context7.next = 13;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t2 = _context7["catch"](1);
          console.error("Error while Adding", _context7.t2.message);
          next(_context7.t2);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/cities/:id", function _callee8(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          console.log("obj :>> ", obj);
          _context8.prev = 2;
          _context8.t0 = res;
          _context8.next = 6;
          return regeneratorRuntime.awrap(CityDb.updateCity(req.params.id, obj));

        case 6:
          _context8.t1 = _context8.sent;

          _context8.t0.json.call(_context8.t0, _context8.t1);

          _context8.next = 14;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t2 = _context8["catch"](2);
          console.error("Error while updating", _context8.t2.message);
          next(_context8.t2);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
router["delete"]("/cities/:id", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.t0 = res;
          _context9.next = 3;
          return regeneratorRuntime.awrap(CityDb.deleteCity(req.params.id));

        case 3:
          _context9.t1 = _context9.sent;

          _context9.t0.json.call(_context9.t0, _context9.t1);

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
}); // -------Area Api's----------------------------------------------------//

router.get("/areas", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.t0 = res;
          _context10.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreas());

        case 3:
          _context10.t1 = _context10.sent;

          _context10.t0.jsonp.call(_context10.t0, _context10.t1);

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
});
router.get("/areasByCityId/:id", function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.t0 = res;
          _context11.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreasByCityId(req.params.id));

        case 3:
          _context11.t1 = _context11.sent;

          _context11.t0.jsonp.call(_context11.t0, _context11.t1);

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.post("/areas", function _callee12(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context12.prev = 1;
          _context12.t0 = res;
          _context12.next = 5;
          return regeneratorRuntime.awrap(AreaDb.addArea(obj));

        case 5:
          _context12.t1 = _context12.sent;

          _context12.t0.json.call(_context12.t0, _context12.t1);

          _context12.next = 13;
          break;

        case 9:
          _context12.prev = 9;
          _context12.t2 = _context12["catch"](1);
          console.error("Error while Adding", _context12.t2.message);
          next(_context12.t2);

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/areas/:id", function _callee13(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context13.prev = 1;
          _context13.t0 = res;
          _context13.next = 5;
          return regeneratorRuntime.awrap(AreaDb.updateArea(req.params.id, obj));

        case 5:
          _context13.t1 = _context13.sent;

          _context13.t0.json.call(_context13.t0, _context13.t1);

          _context13.next = 13;
          break;

        case 9:
          _context13.prev = 9;
          _context13.t2 = _context13["catch"](1);
          console.error("Error while Adding", _context13.t2.message);
          next(_context13.t2);

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/areas/:id", function _callee14(req, res) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.t0 = res;
          _context14.next = 3;
          return regeneratorRuntime.awrap(AreaDb.deleteArea(req.params.id));

        case 3:
          _context14.t1 = _context14.sent;

          _context14.t0.json.call(_context14.t0, _context14.t1);

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
});
router.get("/getAreasByHq/:id", function _callee15(req, res) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.t0 = res;
          _context15.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreasByHq(req.params.id));

        case 3:
          _context15.t1 = _context15.sent;

          _context15.t0.jsonp.call(_context15.t0, _context15.t1);

        case 5:
        case "end":
          return _context15.stop();
      }
    }
  });
}); // -------HeadQuarter Api's----------------------------------------------------//

router.get("/hq", function _callee16(req, res) {
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.t0 = res;
          _context16.next = 3;
          return regeneratorRuntime.awrap(HqDb.getHq());

        case 3:
          _context16.t1 = _context16.sent;

          _context16.t0.jsonp.call(_context16.t0, _context16.t1);

        case 5:
        case "end":
          return _context16.stop();
      }
    }
  });
});
router.post("/hq", function _callee17(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context17.prev = 1;
          _context17.t0 = res;
          _context17.next = 5;
          return regeneratorRuntime.awrap(HqDb.addHq(obj));

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
router.put("/hq/:id", function _callee18(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context18.prev = 1;
          _context18.t0 = res;
          _context18.next = 5;
          return regeneratorRuntime.awrap(HqDb.updateHq(req.params.id, obj));

        case 5:
          _context18.t1 = _context18.sent;

          _context18.t0.json.call(_context18.t0, _context18.t1);

          _context18.next = 13;
          break;

        case 9:
          _context18.prev = 9;
          _context18.t2 = _context18["catch"](1);
          console.error("Error while Adding", _context18.t2.message);
          next(_context18.t2);

        case 13:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/hq/:id", function _callee19(req, res) {
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.t0 = res;
          _context19.next = 3;
          return regeneratorRuntime.awrap(HqDb.deleteHq(req.params.id));

        case 3:
          _context19.t1 = _context19.sent;

          _context19.t0.json.call(_context19.t0, _context19.t1);

        case 5:
        case "end":
          return _context19.stop();
      }
    }
  });
}); // -------COMPANY MASTER Api's----------------------------------------------------//

router.get("/companies", function _callee20(req, res) {
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.t0 = res;
          _context20.next = 3;
          return regeneratorRuntime.awrap(CompDb.getCompanies());

        case 3:
          _context20.t1 = _context20.sent;

          _context20.t0.jsonp.call(_context20.t0, _context20.t1);

        case 5:
        case "end":
          return _context20.stop();
      }
    }
  });
});
router.post("/companies", function _callee21(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context21.prev = 1;
          _context21.t0 = res;
          _context21.next = 5;
          return regeneratorRuntime.awrap(CompDb.addCompany(obj));

        case 5:
          _context21.t1 = _context21.sent;

          _context21.t0.json.call(_context21.t0, _context21.t1);

          _context21.next = 13;
          break;

        case 9:
          _context21.prev = 9;
          _context21.t2 = _context21["catch"](1);
          console.error("Error while Adding", _context21.t2.message);
          next(_context21.t2);

        case 13:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/companies/:id", function _callee22(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context22.prev = 1;
          _context22.t0 = res;
          _context22.next = 5;
          return regeneratorRuntime.awrap(CompDb.updateCompany(req.params.id, obj));

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
router["delete"]("/companies/:id", function _callee23(req, res) {
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.t0 = res;
          _context23.next = 3;
          return regeneratorRuntime.awrap(CompDb.deleteCompany(req.params.id));

        case 3:
          _context23.t1 = _context23.sent;

          _context23.t0.json.call(_context23.t0, _context23.t1);

        case 5:
        case "end":
          return _context23.stop();
      }
    }
  });
}); // -------EMPLOYEE-TYPE Api's----------------------------------------------------//

router.get("/emptypes", function _callee24(req, res) {
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.t0 = res;
          _context24.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpTypes());

        case 3:
          _context24.t1 = _context24.sent;

          _context24.t0.jsonp.call(_context24.t0, _context24.t1);

        case 5:
        case "end":
          return _context24.stop();
      }
    }
  });
});
router.post("/emptypes", function _callee25(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context25.prev = 1;
          _context25.t0 = res;
          _context25.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpType(obj));

        case 5:
          _context25.t1 = _context25.sent;

          _context25.t0.json.call(_context25.t0, _context25.t1);

          _context25.next = 13;
          break;

        case 9:
          _context25.prev = 9;
          _context25.t2 = _context25["catch"](1);
          console.error("Error while Adding", _context25.t2.message);
          next(_context25.t2);

        case 13:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/emptypes/:id", function _callee26(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context26.prev = 1;
          _context26.t0 = res;
          _context26.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpType(req.params.id, obj));

        case 5:
          _context26.t1 = _context26.sent;

          _context26.t0.json.call(_context26.t0, _context26.t1);

          _context26.next = 13;
          break;

        case 9:
          _context26.prev = 9;
          _context26.t2 = _context26["catch"](1);
          console.error("Error while Adding", _context26.t2.message);
          next(_context26.t2);

        case 13:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/emptypes/:id", function _callee27(req, res) {
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.t0 = res;
          _context27.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmpType(req.params.id));

        case 3:
          _context27.t1 = _context27.sent;

          _context27.t0.json.call(_context27.t0, _context27.t1);

        case 5:
        case "end":
          return _context27.stop();
      }
    }
  });
}); // -------EMPLOYEE-SUB-TYPE Api's----------------------------------------------------//

router.get("/empsubtypes", function _callee28(req, res) {
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.t0 = res;
          _context28.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpSubTypes());

        case 3:
          _context28.t1 = _context28.sent;

          _context28.t0.jsonp.call(_context28.t0, _context28.t1);

        case 5:
        case "end":
          return _context28.stop();
      }
    }
  });
});
router.get("/empsubtypesById/:id", function _callee29(req, res) {
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.t0 = res;
          _context29.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpSubTypesById(req.params.id));

        case 3:
          _context29.t1 = _context29.sent;

          _context29.t0.jsonp.call(_context29.t0, _context29.t1);

        case 5:
        case "end":
          return _context29.stop();
      }
    }
  });
});
router.post("/empsubtypes", function _callee30(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context30.prev = 1;
          _context30.t0 = res;
          _context30.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpSubType(obj));

        case 5:
          _context30.t1 = _context30.sent;

          _context30.t0.json.call(_context30.t0, _context30.t1);

          _context30.next = 13;
          break;

        case 9:
          _context30.prev = 9;
          _context30.t2 = _context30["catch"](1);
          console.error("Error while Adding", _context30.t2.message);
          next(_context30.t2);

        case 13:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/empsubtypes/:id", function _callee31(req, res) {
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.t0 = res;
          _context31.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmpSubType(req.params.id));

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
router.put("/empsubtypes/:id", function _callee32(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context32.prev = 1;
          _context32.t0 = res;
          _context32.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpSubType(req.params.id, obj));

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
}); // -------EMPLOYEE Details Api's----------------------------------------------------//

router.get("/emps", function _callee33(req, res) {
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.t0 = res;
          _context33.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmp());

        case 3:
          _context33.t1 = _context33.sent;

          _context33.t0.jsonp.call(_context33.t0, _context33.t1);

        case 5:
        case "end":
          return _context33.stop();
      }
    }
  });
});
router.post("/emps", function _callee34(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context34.prev = 1;
          _context34.t0 = res;
          _context34.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmp(obj));

        case 5:
          _context34.t1 = _context34.sent;

          _context34.t0.json.call(_context34.t0, _context34.t1);

          _context34.next = 13;
          break;

        case 9:
          _context34.prev = 9;
          _context34.t2 = _context34["catch"](1);
          console.error("Error while Adding", _context34.t2.message);
          next(_context34.t2);

        case 13:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.post("/importemps", function _callee35(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context35.prev = 1;
          _context35.t0 = res;
          _context35.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.importEmps(obj));

        case 5:
          _context35.t1 = _context35.sent;

          _context35.t0.json.call(_context35.t0, _context35.t1);

          _context35.next = 13;
          break;

        case 9:
          _context35.prev = 9;
          _context35.t2 = _context35["catch"](1);
          console.error("Error while Adding", _context35.t2.message);
          next(_context35.t2);

        case 13:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/emps/:id", function _callee36(req, res) {
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.t0 = res;
          _context36.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmp(req.params.id));

        case 3:
          _context36.t1 = _context36.sent;

          _context36.t0.json.call(_context36.t0, _context36.t1);

        case 5:
        case "end":
          return _context36.stop();
      }
    }
  });
});
router.get("/empById/:id", function _callee37(req, res) {
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.t0 = res;
          _context37.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpById(req.params.id));

        case 3:
          _context37.t1 = _context37.sent;

          _context37.t0.jsonp.call(_context37.t0, _context37.t1);

          console.log("req.params.id: ", req.params.id);

        case 6:
        case "end":
          return _context37.stop();
      }
    }
  });
});
router.get("/getEmpByIsManager/:id", function _callee38(req, res) {
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.t0 = res;
          _context38.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpByIsManager(req.params.id));

        case 3:
          _context38.t1 = _context38.sent;

          _context38.t0.jsonp.call(_context38.t0, _context38.t1);

        case 5:
        case "end":
          return _context38.stop();
      }
    }
  });
}); // -------CUSTOMER Api's----------------------------------------------------//

router.get("/custcat", function _callee39(req, res) {
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.t0 = res;
          _context39.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustomersCat());

        case 3:
          _context39.t1 = _context39.sent;

          _context39.t0.jsonp.call(_context39.t0, _context39.t1);

        case 5:
        case "end":
          return _context39.stop();
      }
    }
  });
});
router.post("/custcat", function _callee40(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context40.prev = 1;
          _context40.t0 = res;
          _context40.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addCustomersCat(obj));

        case 5:
          _context40.t1 = _context40.sent;

          _context40.t0.json.call(_context40.t0, _context40.t1);

          _context40.next = 12;
          break;

        case 9:
          _context40.prev = 9;
          _context40.t2 = _context40["catch"](1);
          console.error("Error while Adding", _context40.t2.message);

        case 12:
        case "end":
          return _context40.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/custcat/:id", function _callee41(req, res) {
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.t0 = res;
          _context41.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteCustomersCat(req.params.id));

        case 3:
          _context41.t1 = _context41.sent;

          _context41.t0.json.call(_context41.t0, _context41.t1);

        case 5:
        case "end":
          return _context41.stop();
      }
    }
  });
});
router.put("/custcat/:id", function _callee42(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context42.prev = 1;
          _context42.t0 = res;
          _context42.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateCustomersCat(req.params.id, obj));

        case 5:
          _context42.t1 = _context42.sent;

          _context42.t0.json.call(_context42.t0, _context42.t1);

          _context42.next = 13;
          break;

        case 9:
          _context42.prev = 9;
          _context42.t2 = _context42["catch"](1);
          console.error("Error while Adding", _context42.t2.message);
          next(_context42.t2);

        case 13:
        case "end":
          return _context42.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------UOM Api's----------------------------------------------------//

router.get("/uom", function _callee43(req, res) {
  return regeneratorRuntime.async(function _callee43$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.t0 = res;
          _context43.next = 3;
          return regeneratorRuntime.awrap(UomDb.getUom());

        case 3:
          _context43.t1 = _context43.sent;

          _context43.t0.jsonp.call(_context43.t0, _context43.t1);

        case 5:
        case "end":
          return _context43.stop();
      }
    }
  });
});
router.post("/uom", function _callee44(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context44.prev = 1;
          _context44.t0 = res;
          _context44.next = 5;
          return regeneratorRuntime.awrap(UomDb.addUom(obj));

        case 5:
          _context44.t1 = _context44.sent;

          _context44.t0.json.call(_context44.t0, _context44.t1);

          _context44.next = 13;
          break;

        case 9:
          _context44.prev = 9;
          _context44.t2 = _context44["catch"](1);
          console.error("Error while Adding", _context44.t2.message);
          next(_context44.t2);

        case 13:
        case "end":
          return _context44.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/uom/:id", function _callee45(req, res) {
  return regeneratorRuntime.async(function _callee45$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          _context45.t0 = res;
          _context45.next = 3;
          return regeneratorRuntime.awrap(UomDb.deleteUom(req.params.id));

        case 3:
          _context45.t1 = _context45.sent;

          _context45.t0.json.call(_context45.t0, _context45.t1);

        case 5:
        case "end":
          return _context45.stop();
      }
    }
  });
});
router.put("/uom/:id", function _callee46(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context46.prev = 1;
          _context46.t0 = res;
          _context46.next = 5;
          return regeneratorRuntime.awrap(UomDb.updateUom(req.params.id, obj));

        case 5:
          _context46.t1 = _context46.sent;

          _context46.t0.json.call(_context46.t0, _context46.t1);

          _context46.next = 13;
          break;

        case 9:
          _context46.prev = 9;
          _context46.t2 = _context46["catch"](1);
          console.error("Error while Adding", _context46.t2.message);
          next(_context46.t2);

        case 13:
        case "end":
          return _context46.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------END----------------------------------------------------//

var port = process.env.PORT || 7760;
app.listen(port);
console.log("API is runnning at http://localhost:" + port);