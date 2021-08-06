// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Components/Component.ts":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;

var Component = /*#__PURE__*/function () {
  function Component(parentElement) {
    _classCallCheck(this, Component);

    this.parentElement = parentElement;
    this.eventsMap = {};
    this.regionsMap = {};
    this.regions = {};
  }

  _createClass(Component, [{
    key: "onRender",
    value: function onRender() {}
  }, {
    key: "createEventsMap",
    value: function createEventsMap() {
      return {};
    }
  }, {
    key: "createRegionsMap",
    value: function createRegionsMap() {
      return {};
    }
  }, {
    key: "render",
    value: function render() {
      this.parentElement.innerHTML = "";
      var templateElement = document.createElement('template');
      templateElement.innerHTML = this.template();
      this.bindEvents(templateElement.content);
      this.mapRegions(templateElement.content);
      this.onRender();
      this.parentElement.append(templateElement.content);
    }
  }, {
    key: "mapRegions",
    value: function mapRegions(fragment) {
      for (var key in this.regionsMap) {
        var selector = this.regionsMap[key];
        var element = fragment.querySelector(selector);

        if (element) {
          this.regions[key] = element;
        }
      }
    }
  }, {
    key: "isElement",
    value: function isElement(prop) {
      return prop instanceof Element;
    }
  }, {
    key: "isListOfElements",
    value: function isListOfElements(prop) {
      return NodeList.prototype.isPrototypeOf(prop);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents(fragment) {
      var _this = this;

      var _loop = function _loop(eventKey) {
        var _eventKey$split = eventKey.split(':'),
            _eventKey$split2 = _slicedToArray(_eventKey$split, 2),
            eventName = _eventKey$split2[0],
            selector = _eventKey$split2[1];

        fragment.querySelectorAll(selector).forEach(function (element) {
          _this.eventsMap[eventKey].forEach(function (callback) {
            element.addEventListener(eventName, callback);
          });
        });
      };

      for (var eventKey in this.eventsMap) {
        _loop(eventKey);
      }
    }
  }, {
    key: "bindModel",
    value: function bindModel(model) {
      var _this2 = this;

      model.addEvent('change', function () {
        _this2.render();
      });
    }
  }, {
    key: "addToEventsMap",
    value: function addToEventsMap(eventKey, callback) {
      if (!this.eventsMap[eventKey]) {
        this.eventsMap[eventKey] = [];
      }

      this.eventsMap[eventKey].push(callback);
    }
  }]);

  return Component;
}();

exports.Component = Component;
},{}],"src/Utils/dates.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullDate = exports.calculateDayDifference = exports.getTimeString = exports.getDateString = exports.getWeekdayName = exports.isTheSameMonth = exports.areDatesTheSame = exports.getFirstDayOfWeek = exports.getMonthTitle = exports.getMonthName = void 0;
var intl = new Intl.DateTimeFormat('lt-LT');

var getMonthName = function getMonthName(date) {
  return date.toLocaleString('en-LT', {
    month: 'long'
  });
};

exports.getMonthName = getMonthName;

var getMonthTitle = function getMonthTitle(firstDayOfWeek) {
  var lastDayOfWeek = new Date(firstDayOfWeek.getTime());
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  var firstDayMonthName = exports.getMonthName(firstDayOfWeek);
  var lastDayMonthName = exports.getMonthName(lastDayOfWeek);
  return firstDayMonthName === lastDayMonthName ? firstDayMonthName : "".concat(firstDayMonthName.substr(0, 3), " - ").concat(lastDayMonthName.substr(0, 3));
};

exports.getMonthTitle = getMonthTitle;

var getFirstDayOfWeek = function getFirstDayOfWeek(week) {
  var weekCopy = new Date(week.getTime());
  weekCopy.setDate(weekCopy.getDate() - weekCopy.getDay());
  return weekCopy;
};

exports.getFirstDayOfWeek = getFirstDayOfWeek;

var areDatesTheSame = function areDatesTheSame(firstDate, secondDate) {
  return intl.format(firstDate) === intl.format(secondDate);
};

exports.areDatesTheSame = areDatesTheSame;

var isTheSameMonth = function isTheSameMonth(firstDate, secondDate) {
  return firstDate.getMonth() === secondDate.getMonth();
};

exports.isTheSameMonth = isTheSameMonth;

var getWeekdayName = function getWeekdayName(dayId) {
  var weekdays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  return weekdays[dayId];
};

exports.getWeekdayName = getWeekdayName;

var getDateString = function getDateString(date) {
  return intl.format(date);
};

exports.getDateString = getDateString;

var getTimeString = function getTimeString(date) {
  return new Intl.DateTimeFormat('en-LT', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).format(date);
};

exports.getTimeString = getTimeString;

var calculateDayDifference = function calculateDayDifference(date1, date2) {
  var dayInMiliseconds = 86400000;
  var date1WithoutHours = new Date(exports.getDateString(date1));
  var date2WithoutHours = new Date(exports.getDateString(date2));
  return (date2WithoutHours.getTime() - date1WithoutHours.getTime()) / dayInMiliseconds;
};

exports.calculateDayDifference = calculateDayDifference;

var getFullDate = function getFullDate(date, hours) {
  console.log(date, hours);
  return new Date("".concat(date, " ").concat(hours));
};

exports.getFullDate = getFullDate;
},{}],"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridCells/MiniCalGridCell.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalGridCell = void 0;

var __1 = require("../../../..");

var dates_1 = require("../../../../Utils/dates");

var Component_1 = require("../../../Component");

var MiniCalGridCell = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalGridCell, _Component_1$Componen);

  var _super = _createSuper(MiniCalGridCell);

  function MiniCalGridCell(parentElement, cellDate) {
    var _this;

    _classCallCheck(this, MiniCalGridCell);

    _this = _super.call(this, parentElement);
    _this.miniCalendarModel = __1.store.miniCalendar;
    _this.cellDate = cellDate;
    return _this;
  }

  _createClass(MiniCalGridCell, [{
    key: "template",
    value: function template() {
      return "".concat(this.cellDate.getDate());
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var today = this.miniCalendarModel.get('today');

      if (!today) {
        throw new Error("Mini calendar doesn't have today object!");
      }

      var isToday = dates_1.areDatesTheSame(this.cellDate, today);
      var isSameMonth = dates_1.isTheSameMonth(this.cellDate, this.miniCalendarModel.getCurrentMonthDate());
      this.parentElement.classList.toggle('mini-calendar__cell--colored-circle', isToday);
      this.parentElement.classList.toggle('mini-calendar__cell--secondary', !isSameMonth);
    }
  }]);

  return MiniCalGridCell;
}(Component_1.Component);

exports.MiniCalGridCell = MiniCalGridCell;
},{"../../../..":"src/index.ts","../../../../Utils/dates":"src/Utils/dates.ts","../../../Component":"src/Components/Component.ts"}],"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridCells/MiniCalGridRow.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalGridRow = void 0;

var Component_1 = require("../../../Component");

var MiniCalGridCell_1 = require("./MiniCalGridCell");

var MiniCalGridRow = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalGridRow, _Component_1$Componen);

  var _super = _createSuper(MiniCalGridRow);

  function MiniCalGridRow(parentElement, rowStartingDate) {
    var _this;

    _classCallCheck(this, MiniCalGridRow);

    _this = _super.call(this, parentElement);
    _this.rowStartingDate = rowStartingDate;
    _this.regionsMap = {
      miniCalGridRow: '.mini-calendar__cell'
    };
    return _this;
  }

  _createClass(MiniCalGridRow, [{
    key: "template",
    value: function template() {
      var cellElementString = '<li class="mini-calendar__cell"></li>';
      var cellAmount = 7;
      var templateString = '';

      for (var i = 0; i < cellAmount; i++) {
        templateString += cellElementString;
      }

      return templateString;
    }
  }, {
    key: "mapRegions",
    value: function mapRegions(fragment) {
      for (var key in this.regionsMap) {
        var selector = this.regionsMap[key];
        var elements = fragment.querySelectorAll(selector);

        if (elements) {
          this.regions[key] = elements;
        }
      }
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var _this2 = this;

      if (!this.isListOfElements(this.regions.miniCalGridRow)) {
        return;
      }

      this.regions.miniCalGridRow.forEach(function (element, index) {
        var cellDate = new Date(_this2.rowStartingDate.getTime());
        cellDate.setDate(cellDate.getDate() + index);
        new MiniCalGridCell_1.MiniCalGridCell(element, cellDate).render();
      });
    }
  }]);

  return MiniCalGridRow;
}(Component_1.Component);

exports.MiniCalGridRow = MiniCalGridRow;
},{"../../../Component":"src/Components/Component.ts","./MiniCalGridCell":"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridCells/MiniCalGridCell.ts"}],"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridCells/MiniCalGridCellsContainer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalGridCellsContainer = void 0;

var __1 = require("../../../..");

var Component_1 = require("../../../Component");

var MiniCalGridRow_1 = require("./MiniCalGridRow");

var MiniCalGridCellsContainer = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalGridCellsContainer, _Component_1$Componen);

  var _super = _createSuper(MiniCalGridCellsContainer);

  function MiniCalGridCellsContainer(parentElement) {
    var _this;

    _classCallCheck(this, MiniCalGridCellsContainer);

    _this = _super.call(this, parentElement);
    _this.regions = {};
    _this.miniCalendarModel = __1.store.miniCalendar;

    _this.bindModel(_this.miniCalendarModel);

    _this.regionsMap = {
      miniCalGridRow: '.mini-calendar__row'
    };
    return _this;
  }

  _createClass(MiniCalGridCellsContainer, [{
    key: "template",
    value: function template() {
      var rowElementString = '<ul class="mini-calendar__row"></ul>';
      var rowAmount = 6;
      var templateString = '';

      for (var i = 0; i < rowAmount; i++) {
        templateString += rowElementString;
      }

      return templateString;
    }
  }, {
    key: "mapRegions",
    value: function mapRegions(fragment) {
      for (var key in this.regionsMap) {
        var selector = this.regionsMap[key];
        var elements = fragment.querySelectorAll(selector);

        if (elements) {
          this.regions[key] = elements;
        }
      }
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var startingDate = this.miniCalendarModel.getCalendarFirstDayDate();

      if (!this.isListOfElements(this.regions.miniCalGridRow)) {
        return;
      }

      this.regions.miniCalGridRow.forEach(function (element, index) {
        var rowStartingDate = new Date(startingDate.getTime());
        rowStartingDate.setDate(startingDate.getDate() + 7 * index);
        new MiniCalGridRow_1.MiniCalGridRow(element, rowStartingDate).render();
      });
    }
  }]);

  return MiniCalGridCellsContainer;
}(Component_1.Component);

exports.MiniCalGridCellsContainer = MiniCalGridCellsContainer;
},{"../../../..":"src/index.ts","../../../Component":"src/Components/Component.ts","./MiniCalGridRow":"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridCells/MiniCalGridRow.ts"}],"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridHeader.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalGridHeader = void 0;

var Component_1 = require("../../Component");

var MiniCalGridHeader = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalGridHeader, _Component_1$Componen);

  var _super = _createSuper(MiniCalGridHeader);

  function MiniCalGridHeader() {
    _classCallCheck(this, MiniCalGridHeader);

    return _super.apply(this, arguments);
  }

  _createClass(MiniCalGridHeader, [{
    key: "template",
    value: function template() {
      return "\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">S</div>\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">M</div>\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">T</div>\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">W</div>\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">T</div>\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">F</div>\n        <div class=\"mini-calendar__cell mini-calendar__cell--secondary\">S</div>\n    ";
    }
  }]);

  return MiniCalGridHeader;
}(Component_1.Component);

exports.MiniCalGridHeader = MiniCalGridHeader;
},{"../../Component":"src/Components/Component.ts"}],"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGrid.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalGrid = void 0;

var Component_1 = require("../../Component");

var MiniCalGridCellsContainer_1 = require("./MiniCalGridCells/MiniCalGridCellsContainer");

var MiniCalGridHeader_1 = require("./MiniCalGridHeader");

var MiniCalGrid = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalGrid, _Component_1$Componen);

  var _super = _createSuper(MiniCalGrid);

  function MiniCalGrid(parentElement) {
    var _this;

    _classCallCheck(this, MiniCalGrid);

    _this = _super.call(this, parentElement);
    _this.regionsMap = {
      miniCalGridHeader: '.mini-calendar-grid__header',
      miniCalGridContainer: '.mini-calendar-grid__container'
    };
    return _this;
  }

  _createClass(MiniCalGrid, [{
    key: "template",
    value: function template() {
      return "\n    <header class=\"mini-calendar-grid__header mini-calendar__row\"></header>\n    <div class=\"mini-calendar-grid__container\"></div>\n    ";
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.miniCalGridHeader) || !this.isElement(this.regions.miniCalGridContainer)) {
        return;
      }

      new MiniCalGridHeader_1.MiniCalGridHeader(this.regions.miniCalGridHeader).render();
      new MiniCalGridCellsContainer_1.MiniCalGridCellsContainer(this.regions.miniCalGridContainer).render();
    }
  }]);

  return MiniCalGrid;
}(Component_1.Component);

exports.MiniCalGrid = MiniCalGrid;
},{"../../Component":"src/Components/Component.ts","./MiniCalGridCells/MiniCalGridCellsContainer":"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridCells/MiniCalGridCellsContainer.ts","./MiniCalGridHeader":"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGridHeader.ts"}],"src/Components/Mini Calendar/MiniCalHeader.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalHeader = void 0;

var __1 = require("../..");

var Component_1 = require("../Component");

var MiniCalHeader = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalHeader, _Component_1$Componen);

  var _super = _createSuper(MiniCalHeader);

  function MiniCalHeader(parentElement) {
    var _this;

    _classCallCheck(this, MiniCalHeader);

    _this = _super.call(this, parentElement);
    _this.miniCalendarModel = __1.store.miniCalendar;

    _this.bindModel(_this.miniCalendarModel);

    _this.eventsMap = _this.createEventsMap();
    return _this;
  }

  _createClass(MiniCalHeader, [{
    key: "template",
    value: function template() {
      return "\n    <h3 class=\"mini-calendar__top-name\">".concat(this.miniCalendarModel.getCurrentMonthTitle(), "</h3>\n              <div class=\"mini-calendar__movement-buttons\">\n                <button\n                  class=\"btn mini-calendar__movement-button left-arrow\"\n                  data-mini-action=\"left\"\n                ></button>\n                <button\n                  class=\"btn mini-calendar__movement-button right-arrow\"\n                  data-mini-action=\"right\"\n                ></button>\n              </div>\n    ");
    }
  }, {
    key: "createEventsMap",
    value: function createEventsMap() {
      return {
        'click:.left-arrow': [this.miniCalendarModel.goOneMonthBack],
        'click:.right-arrow': [this.miniCalendarModel.goOneMonthForward]
      };
    }
  }]);

  return MiniCalHeader;
}(Component_1.Component);

exports.MiniCalHeader = MiniCalHeader;
},{"../..":"src/index.ts","../Component":"src/Components/Component.ts"}],"src/Components/Mini Calendar/MiniCalendar.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalendar = void 0;

var __1 = require("../..");

var Component_1 = require("../Component");

var MiniCalGrid_1 = require("./Mini Calendar Grid/MiniCalGrid");

var MiniCalHeader_1 = require("./MiniCalHeader");

var MiniCalendar = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(MiniCalendar, _Component_1$Componen);

  var _super = _createSuper(MiniCalendar);

  function MiniCalendar(parentElement) {
    var _this;

    _classCallCheck(this, MiniCalendar);

    _this = _super.call(this, parentElement);
    _this.miniCalendarModel = __1.store.miniCalendar;
    _this.regionsMap = {
      miniCalHeader: '.mini-calendar__header',
      miniCalGrid: '.mini-calendar__grid'
    };
    return _this;
  }

  _createClass(MiniCalendar, [{
    key: "template",
    value: function template() {
      return "\n    <header class=\"mini-calendar__header\"></header>\n    <div class=\"mini-calendar__grid\"></div>\n    ";
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.miniCalHeader) || !this.isElement(this.regions.miniCalGrid)) {
        return;
      }

      new MiniCalHeader_1.MiniCalHeader(this.regions.miniCalHeader).render();
      new MiniCalGrid_1.MiniCalGrid(this.regions.miniCalGrid).render();
    }
  }]);

  return MiniCalendar;
}(Component_1.Component);

exports.MiniCalendar = MiniCalendar;
},{"../..":"src/index.ts","../Component":"src/Components/Component.ts","./Mini Calendar Grid/MiniCalGrid":"src/Components/Mini Calendar/Mini Calendar Grid/MiniCalGrid.ts","./MiniCalHeader":"src/Components/Mini Calendar/MiniCalHeader.ts"}],"src/Components/Sidebar.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var __1 = require("..");

var Component_1 = require("./Component");

var MiniCalendar_1 = require("./Mini Calendar/MiniCalendar");

var Sidebar = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(Sidebar, _Component_1$Componen);

  var _super = _createSuper(Sidebar);

  function Sidebar(parentElement) {
    var _this;

    _classCallCheck(this, Sidebar);

    _this = _super.call(this, parentElement);

    _this.toggleSidebar = function () {
      _this.parentElement.classList.toggle('sidebar--closed');
    };

    _this.sidebarModel = __1.store.sidebar;

    _this.bindModel(__1.store.sidebar);

    _this.sidebarModel.addEvent('toggle', _this.toggleSidebar);

    _this.regionsMap = _this.createRegionsMap();
    return _this;
  }

  _createClass(Sidebar, [{
    key: "createRegionsMap",
    value: function createRegionsMap() {
      return {
        miniCalendar: '.mini-calendar'
      };
    }
  }, {
    key: "template",
    value: function template() {
      return "\n    <section class=\"mini-calendar\"></section>\n    ";
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.miniCalendar)) {
        return;
      }

      new MiniCalendar_1.MiniCalendar(this.regions.miniCalendar).render();
    }
  }]);

  return Sidebar;
}(Component_1.Component);

exports.Sidebar = Sidebar;
},{"..":"src/index.ts","./Component":"src/Components/Component.ts","./Mini Calendar/MiniCalendar":"src/Components/Mini Calendar/MiniCalendar.ts"}],"src/Components/Header.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var __1 = require("../");

var Component_1 = require("./Component");

var Header = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(Header, _Component_1$Componen);

  var _super = _createSuper(Header);

  function Header(parentElement) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, parentElement);
    _this.calendarModel = __1.store.calendar;
    _this.miniCalendarModel = __1.store.miniCalendar;
    _this.sidebar = __1.store.sidebar;

    _this.bindModel(_this.calendarModel);

    _this.eventsMap = _this.createEventsMap();
    return _this;
  }

  _createClass(Header, [{
    key: "template",
    value: function template() {
      return "\n        <button class=\"hamburger\"></button>\n        <h1 class=\"header__title\">Calendar</h1>\n        <button class=\"btn-regular header__today\" data-main-action=\"today\">\n          Today\n        </button>\n        <div class=\"header__movement-buttons\">\n          <button\n            class=\"btn header__movement-button left-arrow\"\n            data-main-action=\"left\"\n          ></button>\n          <button\n            class=\"btn header__movement-button right-arrow\"\n            data-main-action=\"right\"\n          ></button>\n        </div>\n        <h2 class=\"header__month-title\">\n          ".concat(this.calendarModel.getCurrentMonthTitle(), "\n        </h2>\n        <button class=\"btn-regular header__view-button\">Week</button>\n        ");
    }
  }, {
    key: "createEventsMap",
    value: function createEventsMap() {
      return {
        'click:.left-arrow': [this.calendarModel.goOneWeekBack],
        'click:.right-arrow': [this.calendarModel.goOneWeekForward],
        'click:.header__today': [this.onTodayButtonClick.bind(this)],
        'click:.hamburger': [this.onHamburgerButtonClick.bind(this)]
      };
    }
  }, {
    key: "onTodayButtonClick",
    value: function onTodayButtonClick() {
      this.calendarModel.setToToday();
      this.miniCalendarModel.setToToday();
    }
  }, {
    key: "onHamburgerButtonClick",
    value: function onHamburgerButtonClick() {
      this.sidebar.triggerEvent('toggle');
    }
  }]);

  return Header;
}(Component_1.Component);

exports.Header = Header;
},{"../":"src/index.ts","./Component":"src/Components/Component.ts"}],"src/Components/Calendar/Events/CalendarEvent.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarEvent = void 0;

var dates_1 = require("../../../Utils/dates");

var Component_1 = require("../../Component");

var CalendarEvent = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarEvent, _Component_1$Componen);

  var _super = _createSuper(CalendarEvent);

  function CalendarEvent(parentElement, eventModel, firstWeekDayDate) {
    var _this;

    _classCallCheck(this, CalendarEvent);

    _this = _super.call(this, parentElement);
    _this.eventModel = eventModel;
    _this.firstWeekDayDate = firstWeekDayDate;
    return _this;
  }

  _createClass(CalendarEvent, [{
    key: "template",
    value: function template() {
      var eventElementsStrings = this.createTemplateStrings();
      return "\n        ".concat(eventElementsStrings, "\n    ");
    }
  }, {
    key: "createTemplateStrings",
    value: function createTemplateStrings() {
      var lastWeekDayDate = new Date(this.firstWeekDayDate);
      lastWeekDayDate.setDate(lastWeekDayDate.getDate() + 6);
      var positionsThisWeek = this.eventModel.getPositionsInRange(this.firstWeekDayDate, lastWeekDayDate);
      var positions = this.eventModel.get('positions') || {};
      var oneColumnWidth = 100 / 7;
      console.log();
      var eventElementsStrings = '';
      var eventTextElementString = "<p>\n    <strong>".concat(this.eventModel.get('title'), "</strong>,\n    ").concat(this.eventModel.get('description'), "\n    </p>\n    ");

      for (var date in positionsThisWeek) {
        var daysSinceSunday = dates_1.calculateDayDifference(this.firstWeekDayDate, new Date(date));
        var minutesInADay = 24 * 60;
        var positionByDate = positions[date] || {
          top: 0,
          height: 0
        };

        if (minutesInADay - positionByDate.top < 24) {
          positionByDate.top = minutesInADay - 24;
          positionByDate.height = 24;
        }

        console.log(positionByDate.height / minutesInADay);
        var eventElementString = "<div class=\"calendar__event\" style=\"\n        top: ".concat(positionByDate.top / minutesInADay * 100, "%;\n        height: ").concat(positionByDate.height / minutesInADay * 100, "%;\n        left:calc(100%/7 * ").concat(daysSinceSunday, ");\n        width:calc(100%/7 - 15px);\">\n          ").concat(eventTextElementString, "\n        </div>");
        eventElementsStrings += eventElementString;
        eventTextElementString = '';
      }

      return eventElementsStrings;
    }
  }]);

  return CalendarEvent;
}(Component_1.Component);

exports.CalendarEvent = CalendarEvent;
},{"../../../Utils/dates":"src/Utils/dates.ts","../../Component":"src/Components/Component.ts"}],"src/Components/Calendar/Events/CalendarEventContainer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarEventContainer = void 0;

var __1 = require("../../..");

var Component_1 = require("../../Component");

var CalendarEvent_1 = require("./CalendarEvent");

var CalendarEventContainer = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarEventContainer, _Component_1$Componen);

  var _super = _createSuper(CalendarEventContainer);

  function CalendarEventContainer(parentElement) {
    var _this;

    _classCallCheck(this, CalendarEventContainer);

    _this = _super.call(this, parentElement);
    _this.eventsModel = __1.store.events;
    _this.calendarModel = __1.store.calendar;

    _this.bindModel(_this.eventsModel);

    _this.bindModel(_this.calendarModel);

    _this.currentWeekEvents = [];
    _this.regionsMap = _this.createRegionsMap();
    return _this;
  }

  _createClass(CalendarEventContainer, [{
    key: "template",
    value: function template() {
      console.log('test');
      this.currentWeekEvents = this.getThisWeeksEvents();
      var eventElementString = '<div class="event"></div>';
      var eventElementsStrings = '';
      this.currentWeekEvents.forEach(function () {
        eventElementsStrings += eventElementString;
      });
      return "\n        ".concat(eventElementsStrings, "\n    ");
    }
  }, {
    key: "createRegionsMap",
    value: function createRegionsMap() {
      return {
        events: '.event'
      };
    }
  }, {
    key: "mapRegions",
    value: function mapRegions(fragment) {
      for (var key in this.regionsMap) {
        var selector = this.regionsMap[key];
        var elements = fragment.querySelectorAll(selector);

        if (elements) {
          this.regions[key] = elements;
        }
      }
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var _this2 = this;

      if (!this.isListOfElements(this.regions.events)) {
        return;
      }

      this.regions.events.forEach(function (element, index) {
        new CalendarEvent_1.CalendarEvent(element, _this2.currentWeekEvents[index], _this2.calendarModel.getCurrentWeekStart()).render();
      });
    }
  }, {
    key: "getThisWeeksEvents",
    value: function getThisWeeksEvents() {
      var events = this.eventsModel.get('events');

      if (!events) {
        return [];
      }

      var weekStart = this.calendarModel.getCurrentWeekStart();
      var weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return events.filter(function (event) {
        return event.isEventIntersectingDates(weekStart, weekEnd);
      });
    }
  }]);

  return CalendarEventContainer;
}(Component_1.Component);

exports.CalendarEventContainer = CalendarEventContainer;
},{"../../..":"src/index.ts","../../Component":"src/Components/Component.ts","./CalendarEvent":"src/Components/Calendar/Events/CalendarEvent.ts"}],"src/Components/Calendar/Calendar Grid/CalendarGrid.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarGrid = void 0;

var Component_1 = require("../../Component");

var CalendarGrid = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarGrid, _Component_1$Componen);

  var _super = _createSuper(CalendarGrid);

  function CalendarGrid() {
    _classCallCheck(this, CalendarGrid);

    return _super.apply(this, arguments);
  }

  _createClass(CalendarGrid, [{
    key: "template",
    value: function template() {
      var cellElementString = "<li class=\"calendar-grid__cell\"></li>";
      var daysInAWeek = 7;
      var hoursInADay = 24;
      var cellElementsStrings = '';

      for (var i = 0; i < daysInAWeek * hoursInADay; i++) {
        cellElementsStrings += cellElementString;
      }

      return cellElementsStrings;
    }
  }]);

  return CalendarGrid;
}(Component_1.Component);

exports.CalendarGrid = CalendarGrid;
},{"../../Component":"src/Components/Component.ts"}],"src/Components/Calendar/Calendar Grid/CalendarHours.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHours = void 0;

var Component_1 = require("../../Component");

var CalendarHours = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarHours, _Component_1$Componen);

  var _super = _createSuper(CalendarHours);

  function CalendarHours(parentElement) {
    var _this;

    _classCallCheck(this, CalendarHours);

    _this = _super.call(this, parentElement);
    _this.regionsMap = {
      CalendarHours: '.calendar__hour-cells',
      CalendarGrid: '.calendar-grid'
    };
    return _this;
  }

  _createClass(CalendarHours, [{
    key: "template",
    value: function template() {
      var shownHoursAmount = 23;
      var cellElementsStrings = '';

      for (var i = 1; i <= shownHoursAmount; i++) {
        var hour = this.convert24HourClockTimeTo12String(i);
        var hourCellElementString = "<li class=\"calendar__hour-cell\">\n                                      <span class=\"calendar__hour-text\">".concat(hour, "</span>\n                                    </li>");
        cellElementsStrings += hourCellElementString;
      }

      return "\n        <ul class=\"calendar__hour-cells-container\">\n        ".concat(cellElementsStrings, "\n        </ul>\n    ");
    }
  }, {
    key: "convert24HourClockTimeTo12String",
    value: function convert24HourClockTimeTo12String(hour) {
      var date = new Date();
      date.setHours(hour);
      var options = {
        hour: 'numeric',
        hour12: true
      };
      return new Intl.DateTimeFormat('en-LT', options).format(date);
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.CalendarHours) || !this.isElement(this.regions.CalendarGrid)) {
        return;
      }

      new CalendarHours(this.regions.CalendarHours).render(); // new MiniCalGrid(this.regions.miniCalGrid).render();
    }
  }]);

  return CalendarHours;
}(Component_1.Component);

exports.CalendarHours = CalendarHours;
},{"../../Component":"src/Components/Component.ts"}],"src/Components/Calendar/Calendar Grid/CalendarGridContainer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarGridContainer = void 0;

var Component_1 = require("../../Component");

var CalendarEventContainer_1 = require("../Events/CalendarEventContainer");

var CalendarGrid_1 = require("./CalendarGrid");

var CalendarHours_1 = require("./CalendarHours");

var CalendarGridContainer = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarGridContainer, _Component_1$Componen);

  var _super = _createSuper(CalendarGridContainer);

  function CalendarGridContainer(parentElement) {
    var _this;

    _classCallCheck(this, CalendarGridContainer);

    _this = _super.call(this, parentElement);
    _this.regionsMap = {
      CalendarHours: '.calendar__hour-cells',
      CalendarGrid: '.calendar-grid',
      CalendarEventContainer: '.calendar-event-container'
    };
    return _this;
  }

  _createClass(CalendarGridContainer, [{
    key: "template",
    value: function template() {
      return "\n    <aside class=\"calendar__hour-cells\"></aside>\n    <div class=\"calendar-grid-container\">\n        <ul class=\"calendar-grid\"></ul>\n        <div class=\"calendar-event-container\"></div>\n    </div>\n    ";
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.CalendarHours) || !this.isElement(this.regions.CalendarGrid) || !this.isElement(this.regions.CalendarEventContainer)) {
        return;
      }

      new CalendarHours_1.CalendarHours(this.regions.CalendarHours).render();
      new CalendarGrid_1.CalendarGrid(this.regions.CalendarGrid).render();
      new CalendarEventContainer_1.CalendarEventContainer(this.regions.CalendarEventContainer).render();
    }
  }]);

  return CalendarGridContainer;
}(Component_1.Component);

exports.CalendarGridContainer = CalendarGridContainer;
},{"../../Component":"src/Components/Component.ts","../Events/CalendarEventContainer":"src/Components/Calendar/Events/CalendarEventContainer.ts","./CalendarGrid":"src/Components/Calendar/Calendar Grid/CalendarGrid.ts","./CalendarHours":"src/Components/Calendar/Calendar Grid/CalendarHours.ts"}],"src/Components/Calendar/Calendar Header/CalendarHeaderCell.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeaderCell = void 0;

var __1 = require("../../..");

var dates_1 = require("../../../Utils/dates");

var Component_1 = require("../../Component");

var CalendarHeaderCell = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarHeaderCell, _Component_1$Componen);

  var _super = _createSuper(CalendarHeaderCell);

  function CalendarHeaderCell(parentElement, dayId) {
    var _this;

    _classCallCheck(this, CalendarHeaderCell);

    _this = _super.call(this, parentElement);
    _this.dayId = dayId;
    _this.calendarModel = __1.store.calendar;

    _this.bindModel(_this.calendarModel);

    _this.regionsMap = {
      cellDayName: '.calendar__top-cell-day',
      cellDayNumber: '.calendar__top-cell-day-number'
    };
    return _this;
  }

  _createClass(CalendarHeaderCell, [{
    key: "template",
    value: function template() {
      return "\n            <p class=\"calendar__top-cell-day\">".concat(dates_1.getWeekdayName(this.dayId).substr(0, 3), "</p>\n            <p class=\"calendar__top-cell-day-number\">").concat(this.getDayNumber(), "</p>\n    ");
    }
  }, {
    key: "getDayNumber",
    value: function getDayNumber() {
      return this.getDayDate().getDate();
    }
  }, {
    key: "getDayDate",
    value: function getDayDate() {
      var date = dates_1.getFirstDayOfWeek(this.calendarModel.getCurrentWeek());
      date.setDate(date.getDate() + this.dayId);
      return date;
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var today = this.calendarModel.get('today');

      if (!this.isElement(this.regions.cellDayName) || !this.isElement(this.regions.cellDayNumber) || !today) {
        return;
      }

      var isDateToday = dates_1.areDatesTheSame(this.getDayDate(), today);
      this.regions.cellDayName.classList.toggle('calendar__top-cell--colored', isDateToday);
      this.regions.cellDayNumber.classList.toggle('calendar__top-cell--colored-circle', isDateToday);
    }
  }]);

  return CalendarHeaderCell;
}(Component_1.Component);

exports.CalendarHeaderCell = CalendarHeaderCell;
},{"../../..":"src/index.ts","../../../Utils/dates":"src/Utils/dates.ts","../../Component":"src/Components/Component.ts"}],"src/Components/Calendar/Calendar Header/CalendarHeader.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeader = void 0;

var Component_1 = require("../../Component");

var CalendarHeaderCell_1 = require("./CalendarHeaderCell");

var CalendarHeader = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(CalendarHeader, _Component_1$Componen);

  var _super = _createSuper(CalendarHeader);

  function CalendarHeader(parentElement) {
    var _this;

    _classCallCheck(this, CalendarHeader);

    _this = _super.call(this, parentElement);
    _this.regionsMap = {
      CalendarHeaderCell: '.calendar__top-cell'
    };
    return _this;
  }

  _createClass(CalendarHeader, [{
    key: "template",
    value: function template() {
      var headerCellElementString = '<li class="calendar__top-cell"></li>';
      var daysInAWeek = 7;
      var cellElementsStrings = '';

      for (var i = 0; i < daysInAWeek; i++) {
        cellElementsStrings += headerCellElementString;
      }

      return "\n            <aside class=\"calendar__top-hour-cell\">\n              <span class=\"text--size-small text--color-secondary\">gmt+03</span>\n            </aside>\n            <ul\n              class=\"calendar__top-cells list-s-type-none text--color-secondary\"\n            >\n              ".concat(cellElementsStrings, "\n            </ul>\n    ");
    }
  }, {
    key: "mapRegions",
    value: function mapRegions(fragment) {
      for (var key in this.regionsMap) {
        var selector = this.regionsMap[key];
        var elements = fragment.querySelectorAll(selector);

        if (elements) {
          this.regions[key] = elements;
        }
      }
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isListOfElements(this.regions.CalendarHeaderCell)) {
        return;
      }

      this.regions.CalendarHeaderCell.forEach(function (element, index) {
        new CalendarHeaderCell_1.CalendarHeaderCell(element, index).render();
      }); // new MiniCalGrid(this.regions.miniCalGrid).render();
    }
  }]);

  return CalendarHeader;
}(Component_1.Component);

exports.CalendarHeader = CalendarHeader;
},{"../../Component":"src/Components/Component.ts","./CalendarHeaderCell":"src/Components/Calendar/Calendar Header/CalendarHeaderCell.ts"}],"src/Components/Calendar/Calendar.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var Component_1 = require("../Component");

var CalendarGridContainer_1 = require("./Calendar Grid/CalendarGridContainer");

var CalendarHeader_1 = require("./Calendar Header/CalendarHeader");

var Calendar = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(Calendar, _Component_1$Componen);

  var _super = _createSuper(Calendar);

  function Calendar(parentElement) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _super.call(this, parentElement);
    _this.regionsMap = {
      CalendarHeader: '.calendar__top',
      CalendarContainer: '.calendar__container'
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "template",
    value: function template() {
      return "\n    <header class=\"calendar__top\"></header>\n    <div class=\"calendar__container\"></div>\n    ";
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.CalendarHeader) || !this.isElement(this.regions.CalendarContainer)) {
        return;
      }

      new CalendarHeader_1.CalendarHeader(this.regions.CalendarHeader).render();
      new CalendarGridContainer_1.CalendarGridContainer(this.regions.CalendarContainer).render();
    }
  }]);

  return Calendar;
}(Component_1.Component);

exports.Calendar = Calendar;
},{"../Component":"src/Components/Component.ts","./Calendar Grid/CalendarGridContainer":"src/Components/Calendar/Calendar Grid/CalendarGridContainer.ts","./Calendar Header/CalendarHeader":"src/Components/Calendar/Calendar Header/CalendarHeader.ts"}],"src/Components/EventButton.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventButton = void 0;

var __1 = require("..");

var Component_1 = require("./Component");

var EventButton = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(EventButton, _Component_1$Componen);

  var _super = _createSuper(EventButton);

  function EventButton(parentElement) {
    var _this;

    _classCallCheck(this, EventButton);

    _this = _super.call(this, parentElement);
    _this.modalModel = __1.store.modal;

    __1.store.sidebar.addEvent('toggle', _this.toggleShrinkage.bind(_assertThisInitialized(_this)));

    _this.modalModel.addEvent('change', _this.toggleDisabled.bind(_assertThisInitialized(_this)));

    _this.eventsMap = _this.createEventsMap();
    _this.regionsMap = _this.createRegionsMap();
    return _this;
  }

  _createClass(EventButton, [{
    key: "template",
    value: function template() {
      return "\n        <button class=\"btn-round event-btn\">Create Event</button>\n        ";
    }
  }, {
    key: "createEventsMap",
    value: function createEventsMap() {
      return {
        'click:.event-btn': [this.showModal.bind(this)]
      };
    }
  }, {
    key: "createRegionsMap",
    value: function createRegionsMap() {
      return {
        eventButton: '.event-btn'
      };
    }
  }, {
    key: "showModal",
    value: function showModal() {
      if (!this.isElement(this.regions.eventButton)) {
        return;
      }

      var rect = this.regions.eventButton.getBoundingClientRect();
      var top = rect.top + 'px';
      var left = rect.right + 10 + 'px';
      this.modalModel.show({
        top: top,
        left: left
      });
    }
  }, {
    key: "toggleShrinkage",
    value: function toggleShrinkage() {
      if (!this.isElement(this.regions.eventButton)) {
        return;
      }

      this.regions.eventButton.classList.toggle('event-btn--circle');
    }
  }, {
    key: "toggleDisabled",
    value: function toggleDisabled() {
      if (!this.isElement(this.regions.eventButton)) {
        return;
      }

      this.regions.eventButton.classList.toggle('event-btn--disabled', this.modalModel.get('isOpen'));
    }
  }]);

  return EventButton;
}(Component_1.Component);

exports.EventButton = EventButton;
},{"..":"src/index.ts","./Component":"src/Components/Component.ts"}],"src/Models/Model.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var Model = /*#__PURE__*/function () {
  function Model(data) {
    _classCallCheck(this, Model);

    this.data = data;
    this.events = {};
  }

  _createClass(Model, [{
    key: "get",
    value: function get(key) {
      return this.data[key];
    }
  }, {
    key: "set",
    value: function set(update) {
      Object.assign(this.data, update);
      this.triggerEvent('change');
    }
  }, {
    key: "addEvent",
    value: function addEvent(eventName, callback) {
      var handlers = this.events[eventName] || [];
      handlers.push(callback);
      this.events[eventName] = handlers;
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(eventName) {
      var handlers = this.events[eventName];

      if (!handlers) {
        return;
      }

      handlers.forEach(function (callback) {
        callback();
      });
    }
  }]);

  return Model;
}();

exports.Model = Model;
},{}],"src/Models/EventModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventModel = void 0;

var dates_1 = require("../Utils/dates");

var Model_1 = require("./Model");

var EventModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(EventModel, _Model_1$Model);

  var _super = _createSuper(EventModel);

  function EventModel(title, startingDate, endingDate, description) {
    var _this;

    _classCallCheck(this, EventModel);

    _this = _super.call(this, {
      title: title,
      startingDate: startingDate,
      endingDate: endingDate,
      description: description
    });
    Object.assign(_this.data, {
      positions: _this.getPositionsByDay(_this.data.startingDate, _this.data.endingDate)
    });
    return _this;
  }

  _createClass(EventModel, [{
    key: "isEventIntersectingDates",
    value: function isEventIntersectingDates(dateStart, dateEnd) {
      return this.data.startingDate <= dateEnd && this.data.endingDate >= dateStart;
    }
  }, {
    key: "getPositionsInRange",
    value: function getPositionsInRange(startingDate, endingDate) {
      if (!this.data.positions) {
        return {};
      }

      var positionsInRange = {};

      for (var date = new Date(startingDate); date <= endingDate; date.setDate(date.getDate() + 1)) {
        var stringDate = dates_1.getDateString(date);

        if (this.data.positions[stringDate]) {
          positionsInRange[stringDate] = this.data.positions[stringDate];
        }
      }

      return positionsInRange;
    }
  }, {
    key: "getPositionsByDay",
    value: function getPositionsByDay(startingDate, endingDate) {
      var date = new Date(startingDate);
      var positions = {};
      var fullHeight = this.getMinutesBetweenDates(endingDate, startingDate);

      if (fullHeight === 0) {
        fullHeight = 1;
      }

      var minutesFromTop = startingDate.getHours() * 60 + startingDate.getMinutes();

      while (fullHeight > 0) {
        var dayHeight = this.getDayHeight(minutesFromTop, fullHeight);
        positions[dates_1.getDateString(date)] = {
          top: minutesFromTop,
          height: dayHeight
        };
        minutesFromTop = 0;
        date.setDate(date.getDate() + 1);
        fullHeight -= dayHeight;
      }

      return positions;
    }
  }, {
    key: "getMinutesBetweenDates",
    value: function getMinutesBetweenDates(date1, date2) {
      return (date1.getTime() - date2.getTime()) / 60000;
    }
  }, {
    key: "getDayHeight",
    value: function getDayHeight(fromTop, height) {
      var pixelsInDay = 24 * 60;

      if (pixelsInDay - fromTop - height > 0) {
        return height;
      }

      return pixelsInDay - fromTop;
    }
  }], [{
    key: "fromJsonObject",
    value: function fromJsonObject(jsonObject) {
      console.log(jsonObject);
      return new EventModel(jsonObject.data.title, new Date(jsonObject.data.startingDate), new Date(jsonObject.data.endingDate), jsonObject.data.description);
    }
  }]);

  return EventModel;
}(Model_1.Model);

exports.EventModel = EventModel;
},{"../Utils/dates":"src/Utils/dates.ts","./Model":"src/Models/Model.ts"}],"src/Utils/debounce.ts":[function(require,module,exports) {
"use strict";

var _this = this;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = void 0;

var debounce = function debounce(func, delay) {
  var debounceTimer;
  return function () {
    var context = _this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      return func.apply(context);
    }, delay);
  };
};

exports.debounce = debounce;
},{}],"src/Services/localSession.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveEvents = exports.fetchEvents = void 0;

var EventModel_1 = require("../Models/EventModel");

var eventsKey = 'events';

var fetchEvents = function fetchEvents() {
  var _a;

  var JSONevents = (_a = window.localStorage.getItem(eventsKey)) !== null && _a !== void 0 ? _a : '';
  var eventsArray = [];
  JSON.parse(JSONevents).forEach(function (object) {
    eventsArray.push(EventModel_1.EventModel.fromJsonObject(object));
  });
  return eventsArray;
};

exports.fetchEvents = fetchEvents;

var saveEvents = function saveEvents(eventsModel) {
  window.localStorage.setItem(eventsKey, JSON.stringify(eventsModel.get('events')));
};

exports.saveEvents = saveEvents;
},{"../Models/EventModel":"src/Models/EventModel.ts"}],"src/Components/Modal/ModalForm.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalForm = void 0;

var __1 = require("../..");

var EventModel_1 = require("../../Models/EventModel");

var dates_1 = require("../../Utils/dates");

var Component_1 = require("../Component");

var debounce_1 = require("../../Utils/debounce");

var localSession_1 = require("../../Services/localSession");

var ModalForm = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(ModalForm, _Component_1$Componen);

  var _super = _createSuper(ModalForm);

  function ModalForm(parentElement) {
    var _this;

    _classCallCheck(this, ModalForm);

    _this = _super.call(this, parentElement);
    _this.modalModel = __1.store.modal;

    _this.bindModel(_this.modalModel);

    _this.eventsMap = _this.createEventsMap();
    return _this;
  }

  _createClass(ModalForm, [{
    key: "template",
    value: function template() {
      return "\n        <input\n              name=\"title\"\n              class=\"modal-form__title-input\"\n              type=\"text\"\n              placeholder=\"Add title\"\n              required\n            />\n            <ul class=\"list-s-type-none\">\n              <li class=\"list--custom-icon mg-t-10\">\n                <input\n                  name=\"starting-date\"\n                  class=\"input\"\n                  id=\"starting-date\"\n                  value=\"".concat(dates_1.getDateString(new Date()), "\"\n                  type=\"date\"\n                  required\n                />\n                <input\n                  name=\"starting-hour\"\n                  class=\"input-text input--short input\"\n                  id=\"starting-hour\"\n                  value=\"").concat(dates_1.getTimeString(new Date()), "\"\n                  type=\"time\"\n                  required\n                />\n              </li>\n              <li class=\"list--custom-icon\">\n                <input\n                  name=\"ending-date\"\n                  class=\"input\"\n                  id=\"ending-date\"\n                  value=\"").concat(dates_1.getDateString(new Date()), "\"\n                  type=\"date\"\n                  required\n                />\n                <input\n                  name=\"ending-hour\"\n                  class=\"input-text input--short input\"\n                  id=\"ending-hour\"\n                  value=\"").concat(dates_1.getTimeString(new Date()), "\"\n                  type=\"time\"\n                  required\n                />\n              </li>\n              <li class=\"list--custom-icon\">\n                <textarea\n                  name=\"description\"\n                  placeholder=\"Description\"\n                  class=\"modal-form--description\"\n                ></textarea>\n              </li>\n            </ul>\n            <div class=\"modal-footer\">\n              <button class=\"modal-footer__button\" type=\"submit\" class=\"btn\">\n                Save\n              </button>\n            </div>\n    ");
    }
  }, {
    key: "createEventsMap",
    value: function createEventsMap() {
      return {
        'click:.modal-footer__button': [this.onSubmit.bind(this)],
        'change:#starting-date': [this.onDateChange.call(this)],
        'change:#ending-date': [this.onDateChange.call(this)],
        'change:#starting-hour': [this.onHourChange.call(this)],
        'change:#ending-hour': [this.onHourChange.call(this)]
      };
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      if (!event) {
        return;
      }

      event.preventDefault();
      var formData = this.parentElement.elements;
      var title = formData.namedItem('title').value;
      var startingDate = formData.namedItem('starting-date').value;
      var startingHour = formData.namedItem('starting-hour').value;
      var endingDate = formData.namedItem('ending-date').value;
      var endingHour = formData.namedItem('ending-hour').value;
      var description = formData.namedItem('description').value;
      var fullStartingDate = dates_1.getFullDate(startingDate, startingHour);
      var fullEndingDate = dates_1.getFullDate(endingDate, endingHour);

      __1.store.events.addEventToList(new EventModel_1.EventModel(title, fullStartingDate, fullEndingDate, description));

      localSession_1.saveEvents(__1.store.events);

      __1.store.modal.close();
    }
  }, {
    key: "onDateChange",
    value: function onDateChange() {
      var _this2 = this;

      var onChange = function onChange() {
        var formData = _this2.parentElement.elements;
        var startingDateElement = formData.namedItem('starting-date');
        var endingDateElement = formData.namedItem('ending-date');

        if (dates_1.calculateDayDifference(new Date(startingDateElement.value), new Date(endingDateElement.value)) > 0) {
          return;
        }

        endingDateElement.setAttribute('min', dates_1.getDateString(new Date(startingDateElement.value)));
        endingDateElement.value = startingDateElement.value;
      };

      return debounce_1.debounce(onChange, 500);
    }
  }, {
    key: "onHourChange",
    value: function onHourChange() {
      var _this3 = this;

      var onChange = function onChange() {
        var formData = _this3.parentElement.elements;
        var startingDateElement = formData.namedItem('starting-date');
        var endingDateElement = formData.namedItem('ending-date');
        var startingHourElement = formData.namedItem('starting-hour');
        var endingHourElement = formData.namedItem('ending-hour');

        if (startingDateElement.value !== endingDateElement.value) {
          return;
        }

        var _startingHourElement$ = startingHourElement.value.split(':'),
            _startingHourElement$2 = _slicedToArray(_startingHourElement$, 2),
            startingHour = _startingHourElement$2[0],
            startingMinutes = _startingHourElement$2[1];

        var _endingHourElement$va = endingHourElement.value.split(':'),
            _endingHourElement$va2 = _slicedToArray(_endingHourElement$va, 2),
            endingHour = _endingHourElement$va2[0],
            endingMinutes = _endingHourElement$va2[1];

        if (startingHour < endingHour || startingHour === endingHour && startingMinutes <= endingMinutes) {
          return;
        }

        endingHourElement.value = startingHourElement.value;
      };

      return debounce_1.debounce(onChange, 500);
    }
  }]);

  return ModalForm;
}(Component_1.Component);

exports.ModalForm = ModalForm;
},{"../..":"src/index.ts","../../Models/EventModel":"src/Models/EventModel.ts","../../Utils/dates":"src/Utils/dates.ts","../Component":"src/Components/Component.ts","../../Utils/debounce":"src/Utils/debounce.ts","../../Services/localSession":"src/Services/localSession.ts"}],"src/Components/Modal/Modal.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var __1 = require("../..");

var Component_1 = require("../Component");

var ModalForm_1 = require("./ModalForm");

var Modal = /*#__PURE__*/function (_Component_1$Componen) {
  _inherits(Modal, _Component_1$Componen);

  var _super = _createSuper(Modal);

  function Modal(parentElement) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _super.call(this, parentElement);
    _this.modalModel = __1.store.modal;

    _this.bindModel(_this.modalModel);

    _this.eventsMap = _this.createEventsMap();
    _this.regionsMap = _this.createRegionsMap();

    _this.modalModel.addEvent('change', _this.toggleModal.bind(_assertThisInitialized(_this)));

    _this.toggleModal();

    _this.addEventToDocument('click', _this.closeModalOnOutsideClick());

    return _this;
  }

  _createClass(Modal, [{
    key: "template",
    value: function template() {
      var isOpen = this.modalModel.get('isOpen');
      var position = this.getPosition();

      if (!isOpen) {
        return '';
      }

      console.log('hella true');
      return "\n        <section style=\"top:".concat(position.top, "; left:").concat(position.left, "\" class=\"modal\">\n          <header class=\"modal-header\">\n            <button class=\"modal-header__button\">&times</button>\n          </header>\n          <form class=\"modal-form\">\n          </form>\n        </section>\n    ");
    }
  }, {
    key: "onRender",
    value: function onRender() {
      if (!this.isElement(this.regions.form)) {
        return;
      }

      new ModalForm_1.ModalForm(this.regions.form).render();
    }
  }, {
    key: "createEventsMap",
    value: function createEventsMap() {
      return {
        'click:.modal-header__button': [this.modalModel.close]
      };
    }
  }, {
    key: "createRegionsMap",
    value: function createRegionsMap() {
      return {
        form: '.modal-form'
      };
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.modalModel.get('position') || {
        top: '0',
        left: '0'
      };
    }
  }, {
    key: "toggleModal",
    value: function toggleModal() {
      var isOpen = this.modalModel.get('isOpen');

      if (isOpen === undefined) {
        return;
      }

      this.parentElement.classList.toggle('modal-container__hidden', !isOpen);
    }
  }, {
    key: "closeModalOnOutsideClick",
    value: function closeModalOnOutsideClick() {
      var _this2 = this;

      return function (event) {
        var target = event.target;

        if (!target || !(target instanceof Element)) {
          return;
        }

        if (_this2.parentElement.contains(target) || _this2.parentElement === target) {
          return;
        }

        _this2.modalModel.close();
      };
    }
  }, {
    key: "addEventToDocument",
    value: function addEventToDocument(eventName, callback) {
      document.addEventListener(eventName, callback);
    }
  }]);

  return Modal;
}(Component_1.Component);

exports.Modal = Modal;
},{"../..":"src/index.ts","../Component":"src/Components/Component.ts","./ModalForm":"src/Components/Modal/ModalForm.ts"}],"src/App.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0; // import { Header } from './Components/Header';
// import { MiniCalendar } from './Components/Mini Calendar/MiniCalendar';

var Sidebar_1 = require("./Components/Sidebar");

var Header_1 = require("./Components/Header");

var Calendar_1 = require("./Components/Calendar/Calendar");

var EventButton_1 = require("./Components/EventButton");

var Modal_1 = require("./Components/Modal/Modal");

var _1 = require(".");

var localSession_1 = require("./Services/localSession");

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    _1.store.events.addEventsToList(localSession_1.fetchEvents());

    this.header = new Header_1.Header(this.getElement('.header'));
    this.sidebar = new Sidebar_1.Sidebar(this.getElement('.sidebar'));
    this.calendar = new Calendar_1.Calendar(this.getElement('.calendar'));
    this.eventButton = new EventButton_1.EventButton(this.getElement('.event-button--container'));
    this.modal = new Modal_1.Modal(this.getElement('.modal-container'));
    this.render();
  }

  _createClass(App, [{
    key: "getElement",
    value: function getElement(selector) {
      var element = document.querySelector(selector);

      if (!element) {
        throw new Error("Element by selector: ".concat(selector, " is missing!"));
      }

      return element;
    }
  }, {
    key: "render",
    value: function render() {
      this.header.render();
      this.sidebar.render();
      this.calendar.render();
      this.eventButton.render();
      this.modal.render();
    }
  }]);

  return App;
}();

exports.App = App;
},{"./Components/Sidebar":"src/Components/Sidebar.ts","./Components/Header":"src/Components/Header.ts","./Components/Calendar/Calendar":"src/Components/Calendar/Calendar.ts","./Components/EventButton":"src/Components/EventButton.ts","./Components/Modal/Modal":"src/Components/Modal/Modal.ts",".":"src/index.ts","./Services/localSession":"src/Services/localSession.ts"}],"src/Models/CalendarModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarModel = void 0;

var dates_1 = require("../Utils/dates");

var Model_1 = require("./Model");

var CalendarModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(CalendarModel, _Model_1$Model);

  var _super = _createSuper(CalendarModel);

  function CalendarModel() {
    var _this;

    _classCallCheck(this, CalendarModel);

    _this = _super.call(this, {
      weekOffset: 0,
      today: new Date()
    });

    _this.setToToday = function () {
      _this.set(Object.assign(Object.assign({}, _this.data), {
        weekOffset: 0
      }));
    };

    _this.goOneWeekBack = function () {
      if (_this.data.weekOffset === undefined) return;

      _this.set({
        weekOffset: _this.data.weekOffset - 1
      });
    };

    _this.goOneWeekForward = function () {
      if (_this.data.weekOffset === undefined) return;

      _this.set({
        weekOffset: _this.data.weekOffset + 1
      });
    };

    return _this;
  }

  _createClass(CalendarModel, [{
    key: "getCurrentMonthTitle",
    value: function getCurrentMonthTitle() {
      return dates_1.getMonthTitle(dates_1.getFirstDayOfWeek(this.getCurrentWeek()));
    }
  }, {
    key: "getCurrentWeek",
    value: function getCurrentWeek() {
      var daysInAWeek = 7;
      var today = this.get('today');
      var weekOffset = this.get('weekOffset');

      if (!today || !weekOffset) {
        return new Date();
      }

      var currentWeekDate = new Date(today.getTime());
      currentWeekDate.setDate(currentWeekDate.getDate() + weekOffset * daysInAWeek);
      return currentWeekDate;
    }
  }, {
    key: "getCurrentWeekStart",
    value: function getCurrentWeekStart() {
      return dates_1.getFirstDayOfWeek(this.getCurrentWeek());
    }
  }]);

  return CalendarModel;
}(Model_1.Model);

exports.CalendarModel = CalendarModel;
},{"../Utils/dates":"src/Utils/dates.ts","./Model":"src/Models/Model.ts"}],"src/Models/EventsModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsModel = void 0;

var Model_1 = require("./Model");

var EventsModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(EventsModel, _Model_1$Model);

  var _super = _createSuper(EventsModel);

  function EventsModel() {
    _classCallCheck(this, EventsModel);

    return _super.call(this, {
      events: []
    });
  }

  _createClass(EventsModel, [{
    key: "addEventToList",
    value: function addEventToList(event) {
      var updatedEvents = this.data.events;
      updatedEvents.push(event);
      this.set({
        events: updatedEvents
      });
      console.log(this.data.events);
    }
  }, {
    key: "addEventsToList",
    value: function addEventsToList(events) {
      var updatedEvents = [].concat(_toConsumableArray(this.data.events), _toConsumableArray(events));
      this.set({
        events: updatedEvents
      });
    }
  }, {
    key: "clearList",
    value: function clearList() {
      this.set({
        events: []
      });
    }
  }]);

  return EventsModel;
}(Model_1.Model);

exports.EventsModel = EventsModel;
},{"./Model":"src/Models/Model.ts"}],"src/Models/MiniCalendarModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniCalendarModel = void 0;

var dates_1 = require("../Utils/dates");

var Model_1 = require("./Model");

var MiniCalendarModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(MiniCalendarModel, _Model_1$Model);

  var _super = _createSuper(MiniCalendarModel);

  function MiniCalendarModel() {
    var _this;

    _classCallCheck(this, MiniCalendarModel);

    _this = _super.call(this, {
      monthOffset: 0,
      today: new Date()
    });

    _this.setToToday = function () {
      _this.set({
        monthOffset: 0
      });
    };

    _this.goOneMonthBack = function () {
      if (_this.data.monthOffset === undefined) return;

      _this.set({
        monthOffset: _this.data.monthOffset - 1
      });
    };

    _this.goOneMonthForward = function () {
      if (_this.data.monthOffset === undefined) return;

      _this.set({
        monthOffset: _this.data.monthOffset + 1
      });
    };

    return _this;
  }

  _createClass(MiniCalendarModel, [{
    key: "getCurrentMonthDate",
    value: function getCurrentMonthDate() {
      if (!this.data.today) {
        throw new Error("Mini Calendar doesn't have today object!");
      }

      if (this.data.monthOffset === undefined) {
        throw new Error("Mini Calendar doesn't have month offset!");
      }

      var today = this.data.today;
      return new Date(today.getFullYear(), today.getMonth() + this.data.monthOffset, 1);
    }
  }, {
    key: "getCurrentMonthTitle",
    value: function getCurrentMonthTitle() {
      return dates_1.getMonthName(this.getCurrentMonthDate());
    }
  }, {
    key: "getCalendarFirstDayDate",
    value: function getCalendarFirstDayDate() {
      return dates_1.getFirstDayOfWeek(this.getCurrentMonthDate());
    }
  }]);

  return MiniCalendarModel;
}(Model_1.Model);

exports.MiniCalendarModel = MiniCalendarModel;
},{"../Utils/dates":"src/Utils/dates.ts","./Model":"src/Models/Model.ts"}],"src/Models/ModalModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalModel = void 0;

var Model_1 = require("./Model");

var ModalModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(ModalModel, _Model_1$Model);

  var _super = _createSuper(ModalModel);

  function ModalModel() {
    var _this;

    _classCallCheck(this, ModalModel);

    _this = _super.call(this, {
      isOpen: false,
      lastOpened: 0,
      position: {
        top: '0',
        left: '0'
      }
    });

    _this.show = function (position) {
      if (!_this.data.isOpen) {
        _this.set({
          isOpen: true,
          lastOpened: new Date().getTime(),
          position: position
        });
      }
    };

    _this.close = function () {
      if (_this.data.isOpen && _this.isAfterTimeoutPeriod()) {
        _this.set({
          isOpen: false
        });
      }
    };

    return _this;
  }

  _createClass(ModalModel, [{
    key: "isAfterTimeoutPeriod",
    value: function isAfterTimeoutPeriod() {
      var _a;

      var timeout = 25;
      var now = new Date().getTime();
      var lastOpened = (_a = this.data.lastOpened) !== null && _a !== void 0 ? _a : 0;
      return now - lastOpened > timeout;
    }
  }]);

  return ModalModel;
}(Model_1.Model);

exports.ModalModel = ModalModel;
},{"./Model":"src/Models/Model.ts"}],"src/Models/SidebarModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarModel = void 0;

var Model_1 = require("./Model");

var SidebarModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(SidebarModel, _Model_1$Model);

  var _super = _createSuper(SidebarModel);

  function SidebarModel() {
    var _this;

    _classCallCheck(this, SidebarModel);

    _this = _super.call(this, {});

    _this.toggle = function () {
      _this.triggerEvent('toggle');
    };

    return _this;
  }

  return SidebarModel;
}(Model_1.Model);

exports.SidebarModel = SidebarModel;
},{"./Model":"src/Models/Model.ts"}],"src/Models/Store.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;

var CalendarModel_1 = require("./CalendarModel");

var EventsModel_1 = require("./EventsModel");

var MiniCalendarModel_1 = require("./MiniCalendarModel");

var ModalModel_1 = require("./ModalModel");

var SidebarModel_1 = require("./SidebarModel");

var Store = function Store() {
  _classCallCheck(this, Store);

  this.calendar = new CalendarModel_1.CalendarModel();
  this.miniCalendar = new MiniCalendarModel_1.MiniCalendarModel();
  this.sidebar = new SidebarModel_1.SidebarModel();
  this.modal = new ModalModel_1.ModalModel();
  this.events = new EventsModel_1.EventsModel();
};

exports.Store = Store;
},{"./CalendarModel":"src/Models/CalendarModel.ts","./EventsModel":"src/Models/EventsModel.ts","./MiniCalendarModel":"src/Models/MiniCalendarModel.ts","./ModalModel":"src/Models/ModalModel.ts","./SidebarModel":"src/Models/SidebarModel.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var App_1 = require("./App");

var Store_1 = require("./Models/Store");

exports.store = new Store_1.Store();
var app = new App_1.App();
},{"./App":"src/App.ts","./Models/Store":"src/Models/Store.ts"}],"../../.fnm/node-versions/v14.17.0/installation/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49419" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.fnm/node-versions/v14.17.0/installation/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map