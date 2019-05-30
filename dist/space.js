(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["space"] = factory();
	else
		root["space"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/editorMode.js":
/*!***************************!*\
  !*** ./src/editorMode.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./render */ \"./src/render.js\"),\n    renderBackground = _require.renderBackground,\n    renderDot = _require.renderDot,\n    renderConnector = _require.renderConnector,\n    renderConnectors = _require.renderConnectors,\n    Vec2 = __webpack_require__(/*! ./vec2 */ \"./src/vec2.js\"),\n    _require2 = __webpack_require__(/*! ./mode */ \"./src/mode.js\"),\n    makeMode = _require2.makeMode;\n\nvar mousePos = null,\n    mouseDragPos = new Vec2(),\n    // position where the drag initiated\ndragging = false;\n\nfunction snapToNearestConnector(game, v) {\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = game.connectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var connector = _step.value;\n\n      if (Vec2.distance(connector.p1, v) < 20) {\n        v = connector.p1;\n      }\n\n      if (Vec2.distance(connector.p2, v) < 20) {\n        v = connector.p2;\n      }\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  return v;\n}\n\nfunction makeEditorMouseDown(game) {\n  return function (e) {\n    if (mousePos !== null) {\n      // make sure we have had a mouseMove event first\n      dragging = true;\n      mouseDragPos = new Vec2(e.x, e.y);\n    }\n  };\n}\n\nfunction makeEditorMouseUp(game) {\n  return function (e) {\n    if (dragging) {\n      if (Vec2.distance(mouseDragPos, mousePos) > 10) {\n        makeConnector(game, mouseDragPos.clone(), mousePos.clone());\n      }\n\n      dragging = false;\n      mouseDragPos = new Vec2();\n    }\n  };\n}\n\nfunction makeEditorClick(game) {\n  return function (e) {};\n}\n\nfunction makeEditorMouseMove(game) {\n  return function (e) {\n    if (mousePos === null) {\n      mousePos = new Vec2();\n    }\n\n    mousePos.x = e.x;\n    mousePos.y = e.y;\n\n    if (e.shiftKey) {\n      mousePos = mousePos.roundTo(20);\n      mouseDragPos = mouseDragPos.roundTo(20);\n      mouseDragPos = snapToNearestConnector(game, mouseDragPos).clone();\n      mousePos = snapToNearestConnector(game, mousePos).clone();\n    }\n  };\n}\n\nfunction makeConnector(game, p1, p2) {\n  game.connectors.push({\n    p1: p1,\n    p2: p2\n  });\n}\n\nmakeMode('editor', function (game) {\n  game.editorClick = makeEditorClick(game);\n  game.connectors = [];\n  game.mouseDown = makeEditorMouseDown(game);\n  game.mouseUp = makeEditorMouseUp(game);\n  game.mouseMove = makeEditorMouseMove(game);\n  window.addEventListener('click', game.editorClick);\n  window.addEventListener('mousemove', game.mouseMove);\n  window.addEventListener('mousedown', game.mouseDown);\n  window.addEventListener('mouseup', game.mouseUp);\n}, function (game) {\n  window.removeEventListener('click', game.editorClick);\n  window.removeEventListener('mousemove', game.mouseMove);\n  window.removeEventListener('mousedown', game.mouseDown);\n  window.removeEventListener('mouseup', game.mouseUp);\n  game.map = game.connectors;\n  delete game.connectors;\n}, function (game, dTime) {\n  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);\n  renderBackground(game.ctx, game.canvas.width, game.canvas.height);\n\n  if (mousePos !== null) {\n    if (dragging) {\n      renderConnector(game.ctx, mouseDragPos, mousePos, {\n        r: 5\n      });\n    } else {\n      renderDot(game.ctx, mousePos, {\n        r: 5,\n        color: 'cyan'\n      });\n    }\n  }\n\n  renderConnectors(game.ctx, game.connectors);\n});\n\n//# sourceURL=webpack://space/./src/editorMode.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./mode */ \"./src/mode.js\"),\n    getMode = _require.getMode,\n    selectMode = _require.selectMode;\n\nvar canvas = document.getElementById('screen'),\n    ctx = canvas.getContext('2d'),\n    game = {\n  canvas: canvas,\n  ctx: ctx,\n  mode: getMode('play')\n};\nvar time = new Date();\n\nfunction init(game) {\n  game.mode.init(game);\n}\n\ninit(game);\n\nfunction loop() {\n  var dTime = new Date() - time;\n  game.mode.update(game, dTime);\n  requestAnimationFrame(loop);\n}\n\nrequestAnimationFrame(loop);\nwindow.addEventListener('keydown', function (e) {\n  switch (e.key) {\n    case 'p':\n      selectMode(game, 'play');\n      break;\n\n    case 'e':\n      selectMode(game, 'editor');\n      break;\n  }\n});\n\n//# sourceURL=webpack://space/./src/main.js?");

/***/ }),

/***/ "./src/mode.js":
/*!*********************!*\
  !*** ./src/mode.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var modes = {};\n\nfunction makeMode(name, init, deinit, update) {\n  modes[name] = {\n    name: name,\n    init: init,\n    deinit: deinit,\n    update: update\n  };\n}\n\nfunction selectMode(game, newMode) {\n  if (game.mode) {\n    modes[game.mode.name].deinit(game);\n  }\n\n  modes[newMode].init(game);\n  game.mode = getMode(newMode);\n}\n\nfunction getMode(name) {\n  return modes[name];\n}\n\nObject.assign(module.exports, {\n  getMode: getMode,\n  selectMode: selectMode,\n  makeMode: makeMode\n});\n\n__webpack_require__(/*! ./playMode */ \"./src/playMode.js\");\n\n__webpack_require__(/*! ./editorMode */ \"./src/editorMode.js\");\n\n//# sourceURL=webpack://space/./src/mode.js?");

/***/ }),

/***/ "./src/playMode.js":
/*!*************************!*\
  !*** ./src/playMode.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./mode */ \"./src/mode.js\"),\n    makeMode = _require.makeMode;\n\nvar _require2 = __webpack_require__(/*! ./random */ \"./src/random.js\"),\n    randomRange = _require2.randomRange;\n\nvar _require3 = __webpack_require__(/*! ./util */ \"./src/util.js\"),\n    clamp = _require3.clamp;\n\nvar Vec2 = __webpack_require__(/*! ./vec2 */ \"./src/vec2.js\");\n\nvar _require4 = __webpack_require__(/*! ./render */ \"./src/render.js\"),\n    renderBullets = _require4.renderBullets,\n    renderConnectors = _require4.renderConnectors,\n    renderShip = _require4.renderShip,\n    renderBackground = _require4.renderBackground,\n    renderStars = _require4.renderStars;\n\nfunction makeStars(width, height) {\n  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;\n  var starColors = ['yellow', 'white', 'lightblue'],\n      stars = [];\n\n  for (var i = 0; i < n; ++i) {\n    stars.push({\n      pos: Vec2.random(0, width, 0, height),\n      r: 1,\n      color: starColors[randomRange(0, starColors.length - 1)]\n    });\n  }\n\n  return stars;\n}\n\nfunction makeBullet(bullets, pos, dir) {\n  var vel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;\n  bullets.push({\n    pos: pos,\n    dir: dir,\n    len: 10,\n    color: 'cyan',\n    vel: vel\n  });\n  return bullets;\n}\n\nfunction updateShip(ship) {\n  ship.vel = clamp(ship.vel + ship.acc, -ship.maxVelForward, ship.maxVelBackward);\n  ship.aVel = clamp(ship.aVel + ship.aAcc, -ship.maxAngularAcc, ship.maxAngularAcc);\n  ship.dir += ship.aVel;\n  var dir = ship.vel < 0 ? ship.dir : -Math.PI + ship.dir; // going backwards\n\n  var vel = Vec2.fromAngleCorrect(dir).mulScalar(Math.abs(ship.vel));\n  ship.pos = ship.pos.add(vel);\n}\n\nfunction updateBullets(bullets) {\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = bullets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var bullet = _step.value;\n      bullet.pos = bullet.dir.mulScalar(bullet.vel).add(bullet.pos);\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n}\n\nfunction update(game) {\n  updateShip(game.ship);\n  updateBullets(game.bullets);\n}\n\nfunction makeShipKeyUp(game) {\n  return function (e) {\n    var ship = game.ship;\n\n    switch (e.key) {\n      case 'w':\n      case 'ArrowUp':\n        ship.acc = 0;\n        break;\n\n      case 'a':\n      case 'ArrowLeft':\n        ship.aAcc = 0;\n        break;\n\n      case 's':\n      case 'ArrowDown':\n        ship.acc = 0;\n        break;\n\n      case 'd':\n      case 'ArrowRight':\n        ship.aAcc = 0;\n        break;\n    }\n  };\n}\n\nfunction makeShipKeyDown(game) {\n  return function (e) {\n    var ship = game.ship,\n        bullets = game.bullets;\n    var thrust = 0.05;\n\n    switch (e.key) {\n      case 'w':\n      case 'ArrowUp':\n        ship.acc = -thrust;\n        break;\n\n      case 'a':\n      case 'ArrowLeft':\n        var asdf = -Math.PI / 1500;\n        ship.aAcc = asdf * Math.abs(ship.vel / ship.maxVelForward);\n        break;\n\n      case 's':\n      case 'ArrowDown':\n        ship.acc = thrust;\n        break;\n\n      case 'd':\n      case 'ArrowRight':\n        var asdf = Math.PI / 1500;\n        ship.aAcc = asdf * Math.abs(ship.vel / ship.maxVelForward);\n        break;\n\n      case ' ':\n        var dir = Vec2.fromAngleCorrect(ship.dir);\n        makeBullet(bullets, ship.pos, dir, 10);\n        break;\n    }\n  };\n}\n\nmakeMode('play', function (game) {\n  game.stars = makeStars(game.canvas.width, game.canvas.height);\n  game.bullets = [];\n  game.ship = {\n    pos: new Vec2(game.canvas.width / 2, game.canvas.height / 2),\n    vel: 0,\n    acc: 0,\n    // a constant not a vector because the direction is determined by \"dir\"\n    aVel: 0,\n    // angular velocity\n    aAcc: 0,\n    // angular acceleration\n    dir: 0,\n    maxVelForward: 4,\n    maxVelBackward: 1,\n    maxAngularAcc: 0.03\n  };\n  game.shipKeyUp = makeShipKeyUp(game);\n  game.shipKeyDown = makeShipKeyDown(game);\n  window.addEventListener('keyup', game.shipKeyUp);\n  window.addEventListener('keydown', game.shipKeyDown);\n}, function (game) {\n  window.removeEventListener('keyup', game.shipKeyUp);\n  window.removeEventListener('keydown', game.shipKeyDown);\n  delete game.ship;\n  delete game.stars;\n  delete game.shipKeyUp;\n  delete game.shipKeyDown;\n}, function (game, dTime) {\n  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);\n  update(game);\n  renderBackground(game.ctx, game.canvas.width, game.canvas.height);\n  renderStars(game.ctx, game.stars);\n  renderShip(game.ctx, game.ship);\n  renderBullets(game.ctx, game.bullets);\n\n  if (game.map) {\n    renderConnectors(game.ctx, game.map);\n  }\n});\n\n//# sourceURL=webpack://space/./src/playMode.js?");

/***/ }),

/***/ "./src/random.js":
/*!***********************!*\
  !*** ./src/random.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function randomRange(min, max) {\n  //inclusive for min and max\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nfunction randomShipColor() {\n  var colors = [randomRange(100, 255), randomRange(100, 255), randomRange(100, 255)];\n  return 'rgb(' + colors.join(',') + ')';\n}\n\nObject.assign(module.exports, {\n  randomRange: randomRange,\n  randomShipColor: randomShipColor\n});\n\n//# sourceURL=webpack://space/./src/random.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./random */ \"./src/random.js\"),\n    randomShipColor = _require.randomShipColor;\n\nfunction renderStars(ctx, stars) {\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = stars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var star = _step.value;\n      ctx.save();\n      ctx.beginPath();\n      ctx.arc(star.pos.x, star.pos.y, star.r, 0, Math.PI * 2);\n      ctx.fillStyle = star.color;\n      ctx.fill();\n      ctx.closePath();\n      ctx.restore();\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n}\n\nfunction renderFlame(ctx, color) {\n  ctx.beginPath();\n  ctx.moveTo(10, 30);\n  ctx.lineTo(5, 30);\n  ctx.lineTo(0, 37);\n  ctx.lineTo(-5, 30);\n  ctx.lineTo(-10, 30);\n  ctx.lineTo(0, 20);\n  ctx.strokeStyle = color;\n  ctx.closePath();\n  ctx.stroke();\n}\n\nfunction renderShip(ctx, ship) {\n  ctx.save();\n  ctx.translate(ship.pos.x, ship.pos.y);\n  ctx.rotate(ship.dir);\n\n  if (ship.acc !== 0) {\n    ctx.save();\n    ctx.scale(0.5, 0.5);\n    ctx.translate(0, 20);\n    renderFlame(ctx, 'yellow');\n    ctx.restore();\n    renderFlame(ctx, 'red');\n  }\n\n  ctx.beginPath();\n  ctx.strokeStyle = randomShipColor();\n  ctx.moveTo(0, 0);\n  ctx.lineTo(-10, 30);\n  ctx.lineTo(0, 20);\n  ctx.lineTo(10, 30);\n  ctx.lineTo(10, 30);\n  ctx.closePath();\n  ctx.stroke();\n  ctx.restore();\n}\n\nfunction renderBullets(ctx, bullets) {\n  var _iteratorNormalCompletion2 = true;\n  var _didIteratorError2 = false;\n  var _iteratorError2 = undefined;\n\n  try {\n    for (var _iterator2 = bullets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n      var bullet = _step2.value;\n      ctx.save();\n      ctx.beginPath();\n      ctx.moveTo(bullet.pos.x, bullet.pos.y);\n      var endPoint = bullet.dir.mulScalar(bullet.len).add(bullet.pos);\n      ctx.lineTo(endPoint.x, endPoint.y);\n      ctx.strokeStyle = bullet.color;\n      ctx.stroke();\n      ctx.closePath();\n      ctx.restore();\n    }\n  } catch (err) {\n    _didIteratorError2 = true;\n    _iteratorError2 = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n        _iterator2[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError2) {\n        throw _iteratorError2;\n      }\n    }\n  }\n}\n\nfunction renderBackground(ctx, width, height) {\n  ctx.fillRect(0, 0, width, height);\n}\n\nfunction renderConnectors(ctx, connectors) {\n  var _iteratorNormalCompletion3 = true;\n  var _didIteratorError3 = false;\n  var _iteratorError3 = undefined;\n\n  try {\n    for (var _iterator3 = connectors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n      var connector = _step3.value;\n      renderConnector(ctx, connector.p1, connector.p2, {\n        showDots: false\n      });\n    }\n  } catch (err) {\n    _didIteratorError3 = true;\n    _iteratorError3 = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n        _iterator3[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError3) {\n        throw _iteratorError3;\n      }\n    }\n  }\n}\n\nfunction renderConnector(ctx, p1, p2) {\n  var init = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  var r = init.r || 5,\n      color = init.color || 'green',\n      showDots = init.showDots === undefined ? true : init.showDots;\n  ctx.save();\n  ctx.beginPath();\n  ctx.moveTo(p1.x - r, p1.y - r);\n  ctx.lineTo(p2.x - r, p2.y - r);\n  ctx.strokeStyle = color;\n  ctx.stroke();\n  ctx.closePath();\n  ctx.restore();\n\n  if (showDots) {\n    renderDot(ctx, p1, {\n      r: r,\n      color: color\n    });\n    renderDot(ctx, p2, {\n      r: r,\n      color: color\n    });\n  }\n}\n\nfunction renderDot(ctx, p) {\n  var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var color = init.color || 'green',\n      r = init.r || 5,\n      type = init.type || 'fill'; // fill or stroke\n\n  ctx.save();\n  ctx.beginPath();\n  ctx.arc(p.x - r, p.y - r, r, 0, Math.PI * 2);\n\n  if (type === 'fill') {\n    ctx.fillStyle = color;\n    ctx.fill();\n  } else {\n    ctx.strokeStyle = color;\n    ctx.stroke();\n  }\n\n  ctx.closePath();\n  ctx.restore();\n}\n\nObject.assign(module.exports, {\n  renderBullets: renderBullets,\n  renderBackground: renderBackground,\n  renderStars: renderStars,\n  renderFlame: renderFlame,\n  renderShip: renderShip,\n  renderDot: renderDot,\n  renderConnector: renderConnector,\n  renderConnectors: renderConnectors\n});\n\n//# sourceURL=webpack://space/./src/render.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function clamp(val, min, max) {\n  return Math.min(max, Math.max(min, val));\n}\n\nObject.assign(module.exports, {\n  clamp: clamp\n});\n\n//# sourceURL=webpack://space/./src/util.js?");

/***/ }),

/***/ "./src/vec2.js":
/*!*********************!*\
  !*** ./src/vec2.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _require = __webpack_require__(/*! ./random */ \"./src/random.js\"),\n    randomRange = _require.randomRange;\n\nvar Vec2 =\n/*#__PURE__*/\nfunction () {\n  function Vec2() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n    _classCallCheck(this, Vec2);\n\n    this.x = x;\n    this.y = y;\n  }\n\n  _createClass(Vec2, [{\n    key: \"clampMag\",\n    value: function clampMag(m) {\n      var mag = this.mag();\n\n      if (mag > m) {\n        return this.normalize().mulScalar(m);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"mulScalar\",\n    value: function mulScalar(s) {\n      return new Vec2(this.x * s, this.y * s);\n    }\n  }, {\n    key: \"addScalar\",\n    value: function addScalar(s) {\n      return new Vec2(this.x + s, this.y + s);\n    }\n  }, {\n    key: \"mul\",\n    value: function mul(o) {\n      return new Vec2(this.x * o.x, this.y * o.y);\n    }\n  }, {\n    key: \"normalize\",\n    value: function normalize() {\n      var mag = this.mag();\n\n      if (mag === 0) {\n        return new Vec2(0, 0);\n      }\n\n      return new Vec2(this.x / mag, this.y / mag);\n    }\n  }, {\n    key: \"angle\",\n    value: function angle() {\n      var norm = this.normalize();\n      return Math.atan(norm.x, norm.y);\n    }\n  }, {\n    key: \"snapAngle\",\n    value: function snapAngle(o) {\n      var angle = this.sub(o).angle(),\n          snapThreshold = Math.PI / 6,\n          newAngle = Math.floor(angle / snapThreshold) * snapThreshold;\n      return Vec2.fromAngleCorrect(newAngle);\n    }\n  }, {\n    key: \"roundTo\",\n    value: function roundTo(s) {\n      var nx = Math.round(this.x / s),\n          ny = Math.round(this.y / s);\n      return new Vec2(nx * s, ny * s);\n    }\n  }, {\n    key: \"mag\",\n    value: function mag() {\n      return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n  }, {\n    key: \"add\",\n    value: function add(o) {\n      return new Vec2(this.x + o.x, this.y + o.y);\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(o) {\n      return new Vec2(this.x - o.x, this.y - o.y);\n    }\n  }, {\n    key: \"hyp\",\n    value: function hyp() {\n      return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n  }, {\n    key: \"clone\",\n    value: function clone() {\n      return new Vec2(this.x, this.y);\n    }\n  }], [{\n    key: \"fromAngleCorrect\",\n    value: function fromAngleCorrect(rads) {\n      return new Vec2(Math.sin(rads), -Math.cos(rads));\n    }\n  }, {\n    key: \"random\",\n    value: function random(minX, maxX, minY, maxY) {\n      return new Vec2(randomRange(minX, maxX), randomRange(minY, maxY));\n    }\n  }, {\n    key: \"distance\",\n    value: function distance(v1, v2) {\n      return v1.sub(v2).hyp();\n    }\n  }]);\n\n  return Vec2;\n}();\n\nmodule.exports = Vec2;\n\n//# sourceURL=webpack://space/./src/vec2.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack://space/multi_./src/main.js?");

/***/ })

/******/ });
});