'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = exports.findByCriteria = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataDirectory = _path2.default.join(__dirname, '../../../server/storage/data.json');
var data = require(dataDirectory);

var findByCriteria = exports.findByCriteria = function findByCriteria(criteria) {
  var ciudad = criteria.ciudad;
  var tipo = criteria.tipo;
  var precio = criteria.precio;

  var allResult = [];

  allResult = data.filter(function (property) {
    if (ciudad !== "" && tipo !== "" && precio !== "") {
      // Ciudad, Tipo y Precio
      if (property.Ciudad == ciudad && property.Tipo == tipo && property.Precio == precio) return property;
    } else if (ciudad !== "" && tipo !== "" && precio == "") {
      // Ciudad y Tipo
      console.log('Ciudad y tipo');
      if (property.Ciudad == ciudad && property.Tipo == tipo) return property;
    } else if (ciudad !== "" && tipo == "" && precio !== "") {
      // Ciudad y Precio
      if (property.Ciudad == ciudad && property.Precio == precio) return property;
    } else if (ciudad == "" && tipo !== "" && precio == "") {
      // Tipo y Precio
      if (property.Tipo == tipo && property.Precio) return property;
    } else if (ciudad !== "" && tipo == "" && precio == "") {
      // Ciudad
      if (property.Ciudad == ciudad) return property;
    } else if (ciudad == "" && tipo !== "" && precio == "") {
      // Tipo
      if (property.Tipo == tipo) return property;
    } else if (ciudad == "" && tipo == "" && precio !== "") {
      // Precio
      if (property.Precio == precio) return property;
    }
  });

  return allResult;
};

var findAll = exports.findAll = function findAll() {
  return data;
};