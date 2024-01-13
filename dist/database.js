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
var dbConfig = {
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
var host = process.env.DB_HOST;
var port = process.env.DB_PORT;
console.log("Using first host ".concat(host));
if (process.env.NODE_ENV === 'production') {
  dbConfig.dialectOptions = {
    socketPath: '/cloudsql/' + process.env.CLOUD_SQL_CONNECTION_NAME
  };
} else {
  dbConfig.host = process.env.DB_HOST;
  dbConfig.port = process.env.DB_PORT;
}
var sequelize = exports.sequelize = new _sequelize.Sequelize(dbConfig);