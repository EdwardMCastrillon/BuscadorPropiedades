'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Check if exist a env vble named port
var port = process.env.PORT || 8080; /*
                                     * Module dependencies
                                     */

var app = (0, _express2.default)();
var Server = _http2.default.createServer(app);

// Api Version
var apiVersion = 'v1';

app.use(_express2.default.static('public'));
app.use('/api/' + apiVersion + '/properties', _api2.default);

Server.listen(port, function () {
  return console.log('Server is running on port: ' + port);
});