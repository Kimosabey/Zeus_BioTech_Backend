"use strict";

var forever = require('forever-monitor');

var child = new forever.Monitor('api.js', {
  max: 3,
  silent: false,
  uid: 'api'
});
child.on('exit', function () {
  console.log('api.js has exited after 3 restarts');
});
child.start();