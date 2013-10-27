Package.describe({
  summary: "Use Cordova for runtime solution"
});

Package.on_use(function (api) {
  "use strict";
  api.export && api.export('CordovaRuntime');
  api.export && api.export('_CordovaRuntime', ['client', 'server'], {testOnly: true});

  api.use(['runtime', 'runtime-appcache'],
          ['client', 'server']);

  api.use('standard-app-packages', ['client', 'server']);

  api.use(['deps'], 'client');

  api.add_files('cordovaruntime.client.js', 'client');
  api.add_files('cordovaruntime.server.js', 'server');
});

// Package.on_test(function (api) {
//   api.use('cordovaruntime', ['client']);
//   api.use('test-helpers', 'client');
//   api.use(['tinytest', 'underscore', 'ejson', 'ordered-dict',
//            'random', 'deps']);

//   api.add_files('cordovaruntime.client.tests.js', 'client');
//   api.add_files('cordovaruntime.server.tests.js', 'server');
// });
