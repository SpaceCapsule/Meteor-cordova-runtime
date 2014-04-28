CordovaRuntime = function(client_assets) {
  var self = this;

  // Cordova.js rig
  var cordovaFiles = {};

  self.addFile = function(platform, version, filename) {
    // Make sure the platform contains version object
    if (typeof cordovaFiles[platform] === 'undefined') {
      cordovaFiles[platform] = {};
    }
    // Check that we have an array of files
    if (typeof cordovaFiles[platform][version] === 'undefined') {
      cordovaFiles[platform][version] = [];
    }
    // Add the filename to file list
    cordovaFiles[platform][version].push(filename);
  }


  // Add the cordova.js to the appcache
  Meteor.AppCache.addRuntimeBundle('/before.js');

  // Set the platform `?platform=ios` on the Meteor remote url in cordova
  // and get served platform specific javascript
  Runtime.package(client_assets, function(api) {
    var platform = api.query.platform;
    var version = api.query.cordova.replace(/\/$/, "");

    // If version and platform found
    if (platform && version) {
      var filelist = cordovaFiles[platform][version];
      // If filename found the serve the file
      if (filelist && filelist.length) {
        for (var i = 0; i < filelist.length; i++) {
          var filename = filelist[i];
          // Add the file to the before bundle
          api.addFile(filename, 'before');
        }
      }
    }
  }, ['before']);
  
};
