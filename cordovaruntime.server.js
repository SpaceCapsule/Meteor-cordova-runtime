CordovaRuntime = function(client_assets) {
  var self = this;
  
  // Cordova.js rig
  var cordovaFiles = {};

  self.addFile: function(platform, version, filename) {
    // Make sure the platform contains version object
    if (typeof cordovaFiles[platform] === 'undefined') {
      cordovaFiles[platform] = {};
    }
    // Set the filename
    cordovaFiles[platform][version] = filename;
  }


  // Add the cordova.js to the appcache
  Meteor.AppCache.addRuntimeBundle('/before.js');

  // Set the platform `?platform=ios` on the Meteor remote url in cordova
  // and get served platform specific javascript
  Runtime.package(client_assets, function(api) {
    var platform = api.query.platform;
    var version = api.query.cordova;
    // If version and platform found
    if (platform && version) {
      var filename = cordovaFiles[platform][version];
      // If filename found the serve the file
      if (filename) {
        api.addFile(filename, 'before');
      }
    }
  }, ['before']);
  
};
