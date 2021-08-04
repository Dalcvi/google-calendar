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
exports.isTheSameMonth = exports.areDatesTheSame = exports.getFirstDayOfWeek = exports.getMonthTitle = exports.getMonthName = void 0;

var getMonthName = function getMonthName(date) {
  return date.toLocaleString('default', {
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
  return new Intl.DateTimeFormat('en-us').format(firstDate) === new Intl.DateTimeFormat('en-us').format(secondDate);
};

exports.areDatesTheSame = areDatesTheSame;

var isTheSameMonth = function isTheSameMonth(firstDate, secondDate) {
  return firstDate.getMonth() === secondDate.getMonth();
};

exports.isTheSameMonth = isTheSameMonth;
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
        eventButtonContainer: '.event-button--container',
        miniCalendar: '.mini-calendar'
      };
    }
  }, {
    key: "template",
    value: function template() {
      return "\n    <div class=\"event-button--container\"></div>\n    <section class=\"mini-calendar\"></section>\n    ";
    }
  }, {
    key: "onRender",
    value: function onRender() {
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
      return "\n        <button class=\"hamburger\"></button>\n        <h1 class=\"header__title\">Calendar</h1>\n        <button class=\"btn-regular header__today\" data-main-action=\"today\">\n          Today\n        </button>\n        <div class=\"header__movement-buttons\">\n          <button\n            class=\"btn header__movement-button left-arrow\"\n            data-main-action=\"left\"\n          ></button>\n          <button\n            class=\"btn header__movement-button right-arrow\"\n            data-main-action=\"right\"\n          ></button>\n        </div>\n        <h2 class=\"header__month-title\">".concat(this.calendarModel.getCurrentMonthTitle(), "</h2>\n        <button class=\"btn-regular header__view-button\">Week</button>\n        ");
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
},{"../":"src/index.ts","./Component":"src/Components/Component.ts"}],"src/App.ts":[function(require,module,exports) {
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

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.header = new Header_1.Header(this.getElement('.header'));
    this.sidebar = new Sidebar_1.Sidebar(this.getElement('.sidebar'));
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
    }
  }]);

  return App;
}();

exports.App = App;
},{"./Components/Sidebar":"src/Components/Sidebar.ts","./Components/Header":"src/Components/Header.ts"}],"src/Models/Model.ts":[function(require,module,exports) {
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
},{}],"src/Models/CalendarModel.ts":[function(require,module,exports) {
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
      return dates_1.getMonthTitle(this.getCurrentWeek());
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
  }]);

  return CalendarModel;
}(Model_1.Model);

exports.CalendarModel = CalendarModel;
},{"../Utils/dates":"src/Utils/dates.ts","./Model":"src/Models/Model.ts"}],"src/Models/MiniCalendarModel.ts":[function(require,module,exports) {
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
},{"../Utils/dates":"src/Utils/dates.ts","./Model":"src/Models/Model.ts"}],"src/Models/SidebarModel.ts":[function(require,module,exports) {
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

var MiniCalendarModel_1 = require("./MiniCalendarModel");

var SidebarModel_1 = require("./SidebarModel");

var Store = function Store() {
  _classCallCheck(this, Store);

  this.calendar = new CalendarModel_1.CalendarModel();
  this.miniCalendar = new MiniCalendarModel_1.MiniCalendarModel();
  this.sidebar = new SidebarModel_1.SidebarModel();
};

exports.Store = Store;
},{"./CalendarModel":"src/Models/CalendarModel.ts","./MiniCalendarModel":"src/Models/MiniCalendarModel.ts","./SidebarModel":"src/Models/SidebarModel.ts"}],"src/index.ts":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61196" + '/');

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