"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
if (process.env.NODE_ENV === 'test') {
  _dotenv["default"].config({
    path: '.env.test'
  });
} else {
  _dotenv["default"].config();
}
var host = process.env.DB_HOST;
console.log("Using first host ".concat(host));
if (process.env.NODE_ENV === 'production') {
  console.log('Production environment detected.');
  console.log(process.env.CLOUD_SQL_CONNECTION_NAME);
  host = "/cloudsql/".concat(process.env.CLOUD_SQL_CONNECTION_NAME);
  console.log("Changing host ".concat(host));
}
var sequelize = exports.sequelize = new _sequelize.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: host,
  dialect: 'mysql'
});