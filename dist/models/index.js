"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Interaction", {
  enumerable: true,
  get: function get() {
    return _InteractionModel["default"];
  }
});
Object.defineProperty(exports, "Post", {
  enumerable: true,
  get: function get() {
    return _PostModel["default"];
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _UserModel["default"];
  }
});
var _UserModel = _interopRequireDefault(require("./UserModel.js"));
var _InteractionModel = _interopRequireDefault(require("./InteractionModel.js"));
var _PostModel = _interopRequireDefault(require("./PostModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Set up associations
_UserModel["default"].hasMany(_InteractionModel["default"], {
  foreignKey: 'creator_id',
  as: 'interactions'
});
_UserModel["default"].hasMany(_PostModel["default"], {
  foreignKey: 'creator_id',
  as: 'posts'
});
_PostModel["default"].belongsTo(_UserModel["default"], {
  foreignKey: 'creator_id',
  as: 'user'
});
_PostModel["default"].hasMany(_InteractionModel["default"], {
  foreignKey: 'post_id',
  as: 'interactions'
});
_InteractionModel["default"].belongsTo(_PostModel["default"], {
  foreignKey: 'post_id',
  as: 'post'
});
_InteractionModel["default"].belongsTo(_UserModel["default"], {
  foreignKey: 'creator_id',
  as: 'user'
});