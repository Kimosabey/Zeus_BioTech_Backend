"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 18:02:44
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-22 11:59:16
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
});
router.route("/orders").get(function _callee(request, response) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Db.getOrders().then(function (data) {
            response.json(data);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.route("/orders/:id").get(function _callee2(request, response) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Db.getOrder(request.params.id).then(function (data) {
            response.json(data[0]);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.route("/orders").post(function _callee3(request, response) {
  var order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          order = _objectSpread({}, request.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(Db.addOrder(order).then(function (data) {
            response.status(201).json(data);
          }));

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // -----------Login Api's--------------- //

router.get("/AdminLogin/:email/:password", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = res;
          _context4.next = 3;
          return regeneratorRuntime.awrap(AdmDb.getAdminLogin(req.params.email, req.params.password));

        case 3:
          _context4.t1 = _context4.sent;

          _context4.t0.json.call(_context4.t0, _context4.t1);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // -----------Country Api's--------------- //
// router.route("/countries").get((req, res) => {
//   CountryDb.getCountries().then((data) => {
//     // console.log("data: ", data[0]);
//     res.json(data[0]);
//   });
// });

router.get("/countries", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.t0 = res;
          _context5.next = 3;
          return regeneratorRuntime.awrap(CountryDb.getCountries());

        case 3:
          _context5.t1 = _context5.sent;

          _context5.t0.json.call(_context5.t0, _context5.t1);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.route("/countries/:id").get(function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(CountryDb.getCountryById(req.params.id).then(function (data) {
            res.json(data[0]);
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.route("/countries").post(function _callee7(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context7.next = 3;
          return regeneratorRuntime.awrap(CountryDb.addCountry(obj).then(function (data) {
            res.status(201).json(data);
          }));

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.route("/countries/:id")["delete"](function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(CountryDb.deleteCountry(req.params.id).then(function (data) {
            // console.log(data);
            res.json(data);
          }));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.put("/countries/:id", function _callee9(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context9.prev = 1;
          _context9.t0 = res;
          _context9.next = 5;
          return regeneratorRuntime.awrap(CountryDb.updateCountry(req.params.id, obj));

        case 5:
          _context9.t1 = _context9.sent;

          _context9.t0.json.call(_context9.t0, _context9.t1);

          _context9.next = 13;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t2 = _context9["catch"](1);
          console.error("Error while updating", _context9.t2.message);
          next(_context9.t2);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------State Api's--------//

router.route("/states").get(function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(StateDb.getStates().then(function (data) {
            res.json(data);
          }));

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
});
router.route("/states/:id").get(function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(StateDb.getStatesById(req.params.id).then(function (data) {
            res.json(data[0]);
          }));

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.route("/states").post(function _callee12(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context12.next = 3;
          return regeneratorRuntime.awrap(StateDb.addState(obj).then(function (data) {
            res.status(201).json(data);
          }));

        case 3:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router.route("/statesCheckBox").post(function _callee13(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          obj = _objectSpread({}, req.body); // obj = obj.CountryId;

          console.log("obj: ", obj);
          StateDb.getForCheckBoxStateByCountryId(obj).then(function (data) {
            res.status(201).json(data);
          });

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  });
});
router.put("/states/:id", function _callee14(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context14.prev = 1;
          _context14.t0 = res;
          _context14.next = 5;
          return regeneratorRuntime.awrap(StateDb.updateState(req.params.id, obj));

        case 5:
          _context14.t1 = _context14.sent;

          _context14.t0.json.call(_context14.t0, _context14.t1);

          _context14.next = 13;
          break;

        case 9:
          _context14.prev = 9;
          _context14.t2 = _context14["catch"](1);
          console.error("Error while updating", _context14.t2.message);
          next(_context14.t2);

        case 13:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.route("/getStateByCountryId/:id").get(function _callee15(req, res) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(StateDb.getStateByCountryId(req.params.id).then(function (data) {
            res.json(data[0]);
          }));

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  });
});
router["delete"]("/states/:id", function _callee16(req, res) {
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          console.log("id :>> ", req.params.id);
          _context16.t0 = res;
          _context16.next = 4;
          return regeneratorRuntime.awrap(StateDb.deleteState(req.params.id));

        case 4:
          _context16.t1 = _context16.sent;

          _context16.t0.json.call(_context16.t0, _context16.t1);

        case 6:
        case "end":
          return _context16.stop();
      }
    }
  });
}); // -------City Api's----------------------------------------------------//

router.route("/cities").get(function _callee17(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          CityDb.getCities(obj).then(function (data) {
            res.status(201).json(data);
          });

        case 2:
        case "end":
          return _context17.stop();
      }
    }
  });
});
router.route("/citiesByStateId/:id").get(function _callee18(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context18.t0 = res.status(201);
          _context18.next = 4;
          return regeneratorRuntime.awrap(CityDb.getCitiesByStateId(req.params.id));

        case 4:
          _context18.t1 = _context18.sent;

          _context18.t0.json.call(_context18.t0, _context18.t1);

        case 6:
        case "end":
          return _context18.stop();
      }
    }
  });
});
router.post("/cities", function _callee19(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context19.prev = 1;
          _context19.t0 = res;
          _context19.next = 5;
          return regeneratorRuntime.awrap(CityDb.addCity(obj));

        case 5:
          _context19.t1 = _context19.sent;

          _context19.t0.json.call(_context19.t0, _context19.t1);

          _context19.next = 13;
          break;

        case 9:
          _context19.prev = 9;
          _context19.t2 = _context19["catch"](1);
          console.error("Error while Adding", _context19.t2.message);
          next(_context19.t2);

        case 13:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.put("/cities/:id", function _callee20(req, res, next) {
  var obj;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          console.log("obj :>> ", obj);
          _context20.prev = 2;
          _context20.t0 = res;
          _context20.next = 6;
          return regeneratorRuntime.awrap(CityDb.updateCity(req.params.id, obj));

        case 6:
          _context20.t1 = _context20.sent;

          _context20.t0.json.call(_context20.t0, _context20.t1);

          _context20.next = 14;
          break;

        case 10:
          _context20.prev = 10;
          _context20.t2 = _context20["catch"](2);
          console.error("Error while updating", _context20.t2.message);
          next(_context20.t2);

        case 14:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
router["delete"]("/cities/:id", function _callee21(req, res) {
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.t0 = res;
          _context21.next = 3;
          return regeneratorRuntime.awrap(CityDb.deleteCity(req.params.id));

        case 3:
          _context21.t1 = _context21.sent;

          _context21.t0.json.call(_context21.t0, _context21.t1);

        case 5:
        case "end":
          return _context21.stop();
      }
    }
  });
}); // -------Area Api's----------------------------------------------------//

router.get("/areas", function _callee22(req, res) {
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.t0 = res;
          _context22.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreas());

        case 3:
          _context22.t1 = _context22.sent;

          _context22.t0.json.call(_context22.t0, _context22.t1);

        case 5:
        case "end":
          return _context22.stop();
      }
    }
  });
});
router.get("/areasByCityId/:id", function _callee23(req, res) {
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.t0 = res;
          _context23.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreasByCityId(req.params.id));

        case 3:
          _context23.t1 = _context23.sent;

          _context23.t0.json.call(_context23.t0, _context23.t1);

        case 5:
        case "end":
          return _context23.stop();
      }
    }
  });
});
router.post("/areas", function _callee24(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context24.prev = 1;
          _context24.t0 = res;
          _context24.next = 5;
          return regeneratorRuntime.awrap(AreaDb.addArea(obj));

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
router.put("/areas/:id", function _callee25(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context25.prev = 1;
          _context25.t0 = res;
          _context25.next = 5;
          return regeneratorRuntime.awrap(AreaDb.updateArea(req.params.id, obj));

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
router["delete"]("/areas/:id", function _callee26(req, res) {
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.t0 = res;
          _context26.next = 3;
          return regeneratorRuntime.awrap(AreaDb.deleteArea(req.params.id));

        case 3:
          _context26.t1 = _context26.sent;

          _context26.t0.json.call(_context26.t0, _context26.t1);

        case 5:
        case "end":
          return _context26.stop();
      }
    }
  });
});
router.get("/getAreasByHq/:id", function _callee27(req, res) {
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.t0 = res;
          _context27.next = 3;
          return regeneratorRuntime.awrap(AreaDb.getAreasByHq(req.params.id));

        case 3:
          _context27.t1 = _context27.sent;

          _context27.t0.json.call(_context27.t0, _context27.t1);

        case 5:
        case "end":
          return _context27.stop();
      }
    }
  });
}); // -------HeadQuarter Api's----------------------------------------------------//

router.get("/hq", function _callee28(req, res) {
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.t0 = res;
          _context28.next = 3;
          return regeneratorRuntime.awrap(HqDb.getHq());

        case 3:
          _context28.t1 = _context28.sent;

          _context28.t0.json.call(_context28.t0, _context28.t1);

        case 5:
        case "end":
          return _context28.stop();
      }
    }
  });
});
router.post("/hq", function _callee29(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context29.prev = 1;
          _context29.t0 = res;
          _context29.next = 5;
          return regeneratorRuntime.awrap(HqDb.addHq(obj));

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
router.put("/hq/:id", function _callee30(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context30.prev = 1;
          _context30.t0 = res;
          _context30.next = 5;
          return regeneratorRuntime.awrap(HqDb.updateHq(req.params.id, obj));

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
router["delete"]("/hq/:id", function _callee31(req, res) {
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.t0 = res;
          _context31.next = 3;
          return regeneratorRuntime.awrap(HqDb.deleteHq(req.params.id));

        case 3:
          _context31.t1 = _context31.sent;

          _context31.t0.json.call(_context31.t0, _context31.t1);

        case 5:
        case "end":
          return _context31.stop();
      }
    }
  });
}); // -------COMPANY MASTER Api's----------------------------------------------------//

router.get("/companies", function _callee32(req, res) {
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.t0 = res;
          _context32.next = 3;
          return regeneratorRuntime.awrap(CompDb.getCompanies());

        case 3:
          _context32.t1 = _context32.sent;

          _context32.t0.json.call(_context32.t0, _context32.t1);

        case 5:
        case "end":
          return _context32.stop();
      }
    }
  });
});
router.post("/companies", function _callee33(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context33.prev = 1;
          _context33.t0 = res;
          _context33.next = 5;
          return regeneratorRuntime.awrap(CompDb.addCompany(obj));

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
router.put("/companies/:id", function _callee34(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context34.prev = 1;
          _context34.t0 = res;
          _context34.next = 5;
          return regeneratorRuntime.awrap(CompDb.updateCompany(req.params.id, obj));

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
router["delete"]("/companies/:id", function _callee35(req, res) {
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.t0 = res;
          _context35.next = 3;
          return regeneratorRuntime.awrap(CompDb.deleteCompany(req.params.id));

        case 3:
          _context35.t1 = _context35.sent;

          _context35.t0.json.call(_context35.t0, _context35.t1);

        case 5:
        case "end":
          return _context35.stop();
      }
    }
  });
}); // -------EMPLOYEE-TYPE Api's----------------------------------------------------//

router.get("/emptypes", function _callee36(req, res) {
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.t0 = res;
          _context36.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpTypes());

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
router.post("/emptypes", function _callee37(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context37.prev = 1;
          _context37.t0 = res;
          _context37.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpType(obj));

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
router.put("/emptypes/:id", function _callee38(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context38.prev = 1;
          _context38.t0 = res;
          _context38.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpType(req.params.id, obj));

        case 5:
          _context38.t1 = _context38.sent;

          _context38.t0.json.call(_context38.t0, _context38.t1);

          _context38.next = 13;
          break;

        case 9:
          _context38.prev = 9;
          _context38.t2 = _context38["catch"](1);
          console.error("Error while Adding", _context38.t2.message);
          next(_context38.t2);

        case 13:
        case "end":
          return _context38.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/emptypes/:id", function _callee39(req, res) {
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.t0 = res;
          _context39.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmpType(req.params.id));

        case 3:
          _context39.t1 = _context39.sent;

          _context39.t0.json.call(_context39.t0, _context39.t1);

        case 5:
        case "end":
          return _context39.stop();
      }
    }
  });
}); // -------EMPLOYEE-SUB-TYPE Api's----------------------------------------------------//

router.get("/empsubtypes", function _callee40(req, res) {
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.t0 = res;
          _context40.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpSubTypes());

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
router.get("/empsubtypesById/:id", function _callee41(req, res) {
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.t0 = res;
          _context41.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpSubTypesById(req.params.id));

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
router.post("/empsubtypes", function _callee42(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context42.prev = 1;
          _context42.t0 = res;
          _context42.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmpSubType(obj));

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
});
router["delete"]("/empsubtypes/:id", function _callee43(req, res) {
  return regeneratorRuntime.async(function _callee43$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.t0 = res;
          _context43.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmpSubType(req.params.id));

        case 3:
          _context43.t1 = _context43.sent;

          _context43.t0.json.call(_context43.t0, _context43.t1);

        case 5:
        case "end":
          return _context43.stop();
      }
    }
  });
});
router.put("/empsubtypes/:id", function _callee44(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context44.prev = 1;
          _context44.t0 = res;
          _context44.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.updateEmpSubType(req.params.id, obj));

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
}); // -------EMPLOYEE Details Api's----------------------------------------------------//

router.get("/emps", function _callee45(req, res) {
  return regeneratorRuntime.async(function _callee45$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          _context45.t0 = res;
          _context45.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmp());

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
router.post("/emps", function _callee46(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context46.prev = 1;
          _context46.t0 = res;
          _context46.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.addEmp(obj));

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
});
router.post("/importemps", function _callee47(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee47$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context47.prev = 1;
          _context47.t0 = res;
          _context47.next = 5;
          return regeneratorRuntime.awrap(EmpsDb.importEmps(obj));

        case 5:
          _context47.t1 = _context47.sent;

          _context47.t0.json.call(_context47.t0, _context47.t1);

          _context47.next = 13;
          break;

        case 9:
          _context47.prev = 9;
          _context47.t2 = _context47["catch"](1);
          console.error("Error while Adding", _context47.t2.message);
          next(_context47.t2);

        case 13:
        case "end":
          return _context47.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/emps/:id", function _callee48(req, res) {
  return regeneratorRuntime.async(function _callee48$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          _context48.t0 = res;
          _context48.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.deleteEmp(req.params.id));

        case 3:
          _context48.t1 = _context48.sent;

          _context48.t0.json.call(_context48.t0, _context48.t1);

        case 5:
        case "end":
          return _context48.stop();
      }
    }
  });
});
router.get("/empById/:id", function _callee49(req, res) {
  return regeneratorRuntime.async(function _callee49$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.t0 = res;
          _context49.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpById(req.params.id));

        case 3:
          _context49.t1 = _context49.sent;

          _context49.t0.json.call(_context49.t0, _context49.t1);

          console.log("req.params.id: ", req.params.id);

        case 6:
        case "end":
          return _context49.stop();
      }
    }
  });
});
router.get("/getEmpByIsManager/:id", function _callee50(req, res) {
  return regeneratorRuntime.async(function _callee50$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          _context50.t0 = res;
          _context50.next = 3;
          return regeneratorRuntime.awrap(EmpsDb.getEmpByIsManager(req.params.id));

        case 3:
          _context50.t1 = _context50.sent;

          _context50.t0.json.call(_context50.t0, _context50.t1);

        case 5:
        case "end":
          return _context50.stop();
      }
    }
  });
}); // -------CUSTOMER Api's----------------------------------------------------//

router.get("/custcat", function _callee51(req, res) {
  return regeneratorRuntime.async(function _callee51$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          _context51.t0 = res;
          _context51.next = 3;
          return regeneratorRuntime.awrap(CustsDb.getCustomersCat());

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
router.post("/custcat", function _callee52(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee52$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context52.prev = 1;
          _context52.t0 = res;
          _context52.next = 5;
          return regeneratorRuntime.awrap(CustsDb.addCustomersCat(obj));

        case 5:
          _context52.t1 = _context52.sent;

          _context52.t0.json.call(_context52.t0, _context52.t1);

          _context52.next = 12;
          break;

        case 9:
          _context52.prev = 9;
          _context52.t2 = _context52["catch"](1);
          console.error("Error while Adding", _context52.t2.message);

        case 12:
        case "end":
          return _context52.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/custcat/:id", function _callee53(req, res) {
  return regeneratorRuntime.async(function _callee53$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          _context53.t0 = res;
          _context53.next = 3;
          return regeneratorRuntime.awrap(CustsDb.deleteCustomersCat(req.params.id));

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
router.put("/custcat/:id", function _callee54(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee54$(_context54) {
    while (1) {
      switch (_context54.prev = _context54.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context54.prev = 1;
          _context54.t0 = res;
          _context54.next = 5;
          return regeneratorRuntime.awrap(CustsDb.updateCustomersCat(req.params.id, obj));

        case 5:
          _context54.t1 = _context54.sent;

          _context54.t0.json.call(_context54.t0, _context54.t1);

          _context54.next = 13;
          break;

        case 9:
          _context54.prev = 9;
          _context54.t2 = _context54["catch"](1);
          console.error("Error while Adding", _context54.t2.message);
          next(_context54.t2);

        case 13:
        case "end":
          return _context54.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------UOM Api's----------------------------------------------------//

router.get("/uom", function _callee55(req, res) {
  return regeneratorRuntime.async(function _callee55$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          _context55.t0 = res;
          _context55.next = 3;
          return regeneratorRuntime.awrap(UomDb.getUom());

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
router.post("/uom", function _callee56(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee56$(_context56) {
    while (1) {
      switch (_context56.prev = _context56.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context56.prev = 1;
          _context56.t0 = res;
          _context56.next = 5;
          return regeneratorRuntime.awrap(UomDb.addUom(obj));

        case 5:
          _context56.t1 = _context56.sent;

          _context56.t0.json.call(_context56.t0, _context56.t1);

          _context56.next = 13;
          break;

        case 9:
          _context56.prev = 9;
          _context56.t2 = _context56["catch"](1);
          console.error("Error while Adding", _context56.t2.message);
          next(_context56.t2);

        case 13:
        case "end":
          return _context56.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router["delete"]("/uom/:id", function _callee57(req, res) {
  return regeneratorRuntime.async(function _callee57$(_context57) {
    while (1) {
      switch (_context57.prev = _context57.next) {
        case 0:
          _context57.t0 = res;
          _context57.next = 3;
          return regeneratorRuntime.awrap(UomDb.deleteUom(req.params.id));

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
router.put("/uom/:id", function _callee58(req, res) {
  var obj;
  return regeneratorRuntime.async(function _callee58$(_context58) {
    while (1) {
      switch (_context58.prev = _context58.next) {
        case 0:
          obj = _objectSpread({}, req.body);
          _context58.prev = 1;
          _context58.t0 = res;
          _context58.next = 5;
          return regeneratorRuntime.awrap(UomDb.updateUom(req.params.id, obj));

        case 5:
          _context58.t1 = _context58.sent;

          _context58.t0.json.call(_context58.t0, _context58.t1);

          _context58.next = 13;
          break;

        case 9:
          _context58.prev = 9;
          _context58.t2 = _context58["catch"](1);
          console.error("Error while Adding", _context58.t2.message);
          next(_context58.t2);

        case 13:
        case "end":
          return _context58.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // -------END----------------------------------------------------//

var port = process.env.PORT || 7760;
app.listen(port);
console.log("API is runnning at http://localhost:" + port);