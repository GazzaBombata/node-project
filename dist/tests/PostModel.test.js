"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _chai = require("chai");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _index = require("../models/index.js");
var _database = require("../database.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var expect = _chai.expect;
(0, _chai.use)(_chaiHttp["default"]);
describe('Post Model sequelize methods test', function () {
  var newUser;
  var newPost;
  var createStub;
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _index.User.create({
            nickname: 'test',
            age: 20,
            city: 'Paris',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        case 2:
          newUser = _context.sent;
          if (newUser) {
            _context.next = 5;
            break;
          }
          throw new Error('User creation failed');
        case 5:
          _context.next = 7;
          return _index.Post.create({
            title: 'test',
            creator_id: newUser.id,
            creation_date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        case 7:
          newPost = _context.sent;
          if (newPost) {
            _context.next = 10;
            break;
          }
          throw new Error('Post creation failed');
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!newPost) {
            _context2.next = 3;
            break;
          }
          _context2.next = 3;
          return _index.Post.destroy({
            where: {
              id: newPost.id
            }
          });
        case 3:
          ;
          if (!newUser) {
            _context2.next = 7;
            break;
          }
          _context2.next = 7;
          return _index.User.destroy({
            where: {
              id: newUser.id
            }
          });
        case 7:
          ;
          if (createStub) {
            createStub.restore();
          }
          ;
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it('should create a new post', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var createdPostPlain;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          createdPostPlain = newPost.toJSON(); // Assert: check createdPost
          expect(createdPostPlain).to.have.property('id').that.is.a('number');
          expect(createdPostPlain).to.have.property('title', newPost.title);
          expect(createdPostPlain).to.have.property('creator_id', newPost.creator_id);
          expect(createdPostPlain).to.have.property('creation_date').that.is.a('date');
          expect(createdPostPlain).to.have.property('createdAt').that.is.a('date');
          expect(createdPostPlain).to.have.property('updatedAt').that.is.a('date');
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it('should retrieve a post', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var retrievedPost, retrievedPostPlain;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _index.Post.findByPk(newPost.id);
        case 2:
          retrievedPost = _context4.sent;
          retrievedPostPlain = retrievedPost.toJSON(); // Assert: check retrievedPost
          expect(retrievedPostPlain).to.have.property('id', newPost.id);
          expect(retrievedPostPlain).to.have.property('title', newPost.title);
          expect(retrievedPostPlain).to.have.property('creator_id', newPost.creator_id);
          expect(retrievedPostPlain).to.have.property('creation_date').that.is.a('date');
          expect(retrievedPostPlain).to.have.property('createdAt').that.is.a('date');
          expect(retrievedPostPlain).to.have.property('updatedAt').that.is.a('date');
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it('should update a post', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var updatedData, updatedPost, updatedPostPlain;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          updatedData = {
            title: 'newTest'
          };
          _context5.next = 3;
          return _index.Post.update(updatedData, {
            where: {
              id: newPost.id
            }
          });
        case 3:
          _context5.next = 5;
          return _index.Post.findByPk(newPost.id);
        case 5:
          updatedPost = _context5.sent;
          updatedPostPlain = updatedPost.toJSON(); // Assert: check updatedPost
          expect(updatedPostPlain).to.have.property('id', newPost.id);
          expect(updatedPostPlain).to.have.property('title', updatedData.title);
          expect(updatedPostPlain).to.have.property('creator_id', newPost.creator_id);
          expect(updatedPostPlain).to.have.property('creation_date').that.is.a('date');
          expect(updatedPostPlain).to.have.property('createdAt').that.is.a('date');
          expect(updatedPostPlain).to.have.property('updatedAt').that.is.a('date');
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it('should delete a post', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var retrievedPost;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _index.Post.destroy({
            where: {
              id: newPost.id
            }
          });
        case 2:
          _context6.next = 4;
          return _index.Post.findByPk(newPost.id);
        case 4:
          retrievedPost = _context6.sent;
          // Assert: check that retrievedPost is null
          expect(retrievedPost).to.be["null"];
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
});
describe('Post Model custom methods test', function () {
  var newPost;
  var createStub;
  var retrieveStub;
  var updateStub;
  var destroyStub;
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          newPost = {
            id: 1,
            title: 'test',
            creator_id: 20,
            city: 'Paris',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          createStub = _sinon["default"].stub(_index.Post, 'create').returns(newPost);
          retrieveStub = _sinon["default"].stub(_index.Post, 'findByPk').returns(newPost);
        case 3:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          // Cleanup: delete the post created in each test
          if (createStub) {
            createStub.restore();
          }
          if (retrieveStub) {
            retrieveStub.restore();
          }
          if (updateStub) {
            updateStub.restore();
          }
          if (destroyStub) {
            destroyStub.restore();
          }
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  it('creates post successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var post;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _index.Post.createPost(newPost);
        case 2:
          post = _context9.sent;
          expect(post).deep.equal(newPost);
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  it('throws error when creating post fails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          createStub["throws"](new Error('Failed to create post'));
          _context10.prev = 1;
          _context10.next = 4;
          return _index.Post.createPost(newPost);
        case 4:
          _context10.next = 10;
          break;
        case 6:
          _context10.prev = 6;
          _context10.t0 = _context10["catch"](1);
          expect(_context10.t0).to.be.an('error');
          expect(_context10.t0.message).to.equal('Failed to create post');
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 6]]);
  })));
  it('gets post successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var post;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _index.Post.getPost(newPost.id);
        case 2:
          post = _context11.sent;
          expect(post).deep.equal(newPost);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  it('throws error when getting post fails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          createStub["throws"](new Error('Failed to get post'));
          _context12.prev = 1;
          _context12.next = 4;
          return _index.Post.getPost(newPost.id);
        case 4:
          _context12.next = 10;
          break;
        case 6:
          _context12.prev = 6;
          _context12.t0 = _context12["catch"](1);
          expect(_context12.t0).to.be.an('error');
          expect(_context12.t0.message).to.equal('Failed to get post');
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 6]]);
  })));
  it('updates post successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var updatedPost, post;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          retrieveStub.restore();
          updatedPost = _objectSpread(_objectSpread({}, newPost), {}, {
            title: 'updated'
          });
          retrieveStub = _sinon["default"].stub(_index.Post, 'findByPk').returns(updatedPost);
          _context13.next = 5;
          return _index.Post.updatePost(newPost.id, {
            title: 'updated'
          });
        case 5:
          _context13.next = 7;
          return _index.Post.getPost(newPost.id);
        case 7:
          post = _context13.sent;
          expect(post).deep.equal(updatedPost);
        case 9:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));
  it('throws error when updating post fails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var updatedPost;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          updatedPost = _objectSpread(_objectSpread({}, newPost), {}, {
            title: 'updated'
          });
          updateStub = _sinon["default"].stub(_index.Post, 'update').returns(updatedPost);
          updateStub["throws"](new Error('Failed to update post'));
          _context14.prev = 3;
          _context14.next = 6;
          return _index.Post.updatePost(newPost.id, {
            title: 'updated'
          });
        case 6:
          _context14.next = 12;
          break;
        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](3);
          expect(_context14.t0).to.be.an('error');
          expect(_context14.t0.message).to.equal('Failed to update post');
        case 12:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[3, 8]]);
  })));
  it('deletes post successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return _index.Post.deletePost(newPost.id);
        case 2:
          _context15.prev = 2;
          _context15.next = 5;
          return _index.Post.getPost(newPost.id);
        case 5:
          _context15.next = 11;
          break;
        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](2);
          expect(_context15.t0).to.be.an('error');
          expect(_context15.t0.message).to.equal('Post not found');
        case 11:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[2, 7]]);
  })));
  it('throws error when deleting post fails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          destroyStub = _sinon["default"].stub(_index.Post, 'destroy').returns(' ');
          destroyStub["throws"](new Error('Post ID must be a number'));
          _context16.prev = 2;
          _context16.next = 5;
          return _index.Post.deletePost(newPost.id);
        case 5:
          _context16.next = 11;
          break;
        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](2);
          expect(_context16.t0).to.be.an('error');
          expect(_context16.t0.message).to.equal('Post ID must be a number');
        case 11:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[2, 7]]);
  })));
});
describe('Post Model getAllPosts method test', function () {
  var newPost1, newPost2, newInteraction1, newInteraction2, newUser1, newUser2;
  var findAllStub;
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          newUser1 = {
            id: 1,
            city: 'Paris',
            nickname: 'test1',
            age: 20
          };
          newUser2 = {
            id: 2,
            city: 'London',
            nickname: 'test2',
            age: 22
          };
          newPost1 = {
            id: 1,
            title: 'test1',
            creator_id: newUser1.id,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          newPost2 = {
            id: 2,
            title: 'test2',
            creator_id: newUser2.id,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          newInteraction1 = {
            id: 1,
            type: 'like',
            time_of_interaction: new Date(),
            creator_id: newUser1.id,
            post_id: newPost1.id
          };
          newInteraction2 = {
            id: 2,
            type: 'comment',
            time_of_interaction: new Date(),
            creator_id: newUser2.id,
            post_id: newPost2.id
          };
          findAllStub = _sinon["default"].stub(_index.Post, 'findAll').returns([newPost1, newPost2]);
        case 7:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  })));
  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          // Cleanup: restore the stub
          if (findAllStub) {
            findAllStub.restore();
          }
        case 1:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  })));
  it('gets all posts successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
    var posts;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return _index.Post.getAllPosts();
        case 2:
          posts = _context19.sent;
          expect(posts).to.be.an('array');
          expect(posts).to.deep.equal([newPost1, newPost2]);
        case 5:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  })));
  it('throws error when getting all posts fails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          findAllStub["throws"](new Error('Failed to get posts'));
          _context20.prev = 1;
          _context20.next = 4;
          return _index.Post.getAllPosts();
        case 4:
          _context20.next = 10;
          break;
        case 6:
          _context20.prev = 6;
          _context20.t0 = _context20["catch"](1);
          expect(_context20.t0).to.be.an('error');
          expect(_context20.t0.message).to.equal('Failed to get posts');
        case 10:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[1, 6]]);
  })));
  it('throws error when "from" or "to" parameters have invalid date format', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return _index.Post.getAllPosts('invalid date', '2022-01-01');
        case 3:
          _context21.next = 9;
          break;
        case 5:
          _context21.prev = 5;
          _context21.t0 = _context21["catch"](0);
          expect(_context21.t0).to.be.an('error');
          expect(_context21.t0.message).to.equal('Invalid date format for "from" or "to" parameter');
        case 9:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 5]]);
  })));
  it('throws error when "interaction_date" parameter has invalid date format', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return _index.Post.getAllPosts('2022-01-01', '2022-12-31', 'invalid date');
        case 3:
          _context22.next = 9;
          break;
        case 5:
          _context22.prev = 5;
          _context22.t0 = _context22["catch"](0);
          expect(_context22.t0).to.be.an('error');
          expect(_context22.t0.message).to.equal('Invalid date format for "interaction_date" parameter');
        case 9:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 5]]);
  })));
});
describe('Post Model findAll sequelize method test', function () {
  var user1, user2, interaction1, interaction2, post1, post2;
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return _index.Interaction.destroy({
            where: {}
          });
        case 2:
          _context23.next = 4;
          return _index.Post.destroy({
            where: {}
          });
        case 4:
          _context23.next = 6;
          return _index.User.destroy({
            where: {}
          });
        case 6:
          _context23.next = 8;
          return _index.User.create({
            nickname: 'test1',
            city: 'Paris'
          });
        case 8:
          user1 = _context23.sent;
          _context23.next = 11;
          return _index.User.create({
            nickname: 'test2',
            city: 'London'
          });
        case 11:
          user2 = _context23.sent;
          _context23.next = 14;
          return _index.Post.create({
            title: 'test1',
            creator_id: user1.id
          });
        case 14:
          post1 = _context23.sent;
          _context23.next = 17;
          return _index.Post.create({
            title: 'test2',
            creator_id: user2.id
          });
        case 17:
          post2 = _context23.sent;
          _context23.next = 20;
          return _index.Interaction.create({
            type: 'like',
            time_of_interaction: new Date(),
            creator_id: user1.id,
            post_id: post1.id
          });
        case 20:
          interaction1 = _context23.sent;
          _context23.next = 23;
          return _index.Interaction.create({
            type: 'like',
            time_of_interaction: new Date(),
            creator_id: user2.id,
            post_id: post2.id
          });
        case 23:
          interaction2 = _context23.sent;
        case 24:
        case "end":
          return _context23.stop();
      }
    }, _callee23);
  })));
  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return _index.Interaction.destroy({
            where: {}
          });
        case 2:
          _context24.next = 4;
          return _index.Post.destroy({
            where: {}
          });
        case 4:
          _context24.next = 6;
          return _index.User.destroy({
            where: {}
          });
        case 6:
          _context24.next = 8;
          return _database.sequelize.query('ALTER TABLE Interaction AUTO_INCREMENT = 1');
        case 8:
          _context24.next = 10;
          return _database.sequelize.query('ALTER TABLE Post AUTO_INCREMENT = 1');
        case 10:
          _context24.next = 12;
          return _database.sequelize.query('ALTER TABLE User AUTO_INCREMENT = 1');
        case 12:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  })));
  it('gets all posts successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
    var posts;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return _index.Post.getAllPosts();
        case 2:
          posts = _context25.sent;
          expect(posts).to.be.an('array');
          expect(posts.length).to.equal(2);
        case 5:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  })));
});