'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _storage = require('../storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

// GET /
Router.get('/', function (req, res) {
  res.json((0, _storage.findAll)());
});

// GET /search?params...
Router.get('/search', function (req, res) {
  var querystring = req.query;
  var result = (0, _storage.findByCriteria)(querystring);
  res.json(result);
});

exports.default = Router;