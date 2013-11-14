Cordova Runtime
==============

This package is for serving device specific cordova.js files to a Cordova app using Meteor on remote url.

##Features:
* Ligth footprint
* Only serves one cordova.js but contents depends on the device
* Appcache in automaticly enabled
* The cordova.js is cached in appcache

##Concept
We use Meteor on a remote url and use appcache to make it work offline. This way we have all the goodness of Meteor and the connectivity of Cordova + fast load due to appcache.
For faster Meteor subscriptions consider [GroundDB](https://github.com/GroundMeteor/Meteor-GroundDB) or [Offline data](https://github.com/awwx/meteor-offline-data)

##Howto use
Simply add this package and load your remote app in cordova by using `http://myApp.com?platform=android&cordova=3.0.0`

Add the cordova files to your app private folder and add them to the `CordovaRuntime`:

```js
  var cordovaRuntime = new CordovaRundtime(Assets);

  // Add the specific cordova file for android on cordova version 3.0.0
  cordovaRuntime.addFile('android', '3.0.0', 'cordova-3.0.0-android.js');
  // cordovaRuntime.addFile('android', '3.0.0', 'plugin-3.0.0-android.js');

```
*As the example shows its possible to add multiple files pr. platform and version - eg. adding plugin code pr. platform if needed*

##Fallback
We have to have a native fallback on initial load or if something goes wrong loading. Try using the following code:
[Stackoverflow ref](http://stackoverflow.com/questions/17294338/phonegap-cordova-ios-load-remote-url-how-to-fallback-to-local-index-html-on-er)

###iOS
```objc
  - (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
  {
     // here you can either check for the error type or for the url that has failed to load
     NSString *failingURL = [error.userInfo objectForKey:@"NSErrorFailingURLStringKey"];
     // This should be the local HTML file that you want to load when failing, by default we use www/index.html
     NSString *localPath = [[NSBundle mainBundle] pathForResource:@"index.html" ofType:nil inDirectory:@"www"];
     if([failingURL isEqualToString:@"your_remote_url"])
     {
        NSURL *url = [NSURL fileURLWithPath:localPath];
        NSURLRequest *request = [NSURLRequest requestWithURL:url];
        [webView loadRequest:request];
     }
  }
```
[Using and Creating Error Objects](https://developer.apple.com/library/Mac/documentation/Cocoa/Conceptual/ErrorHandlingCocoa/CreateCustomizeNSError/CreateCustomizeNSError.html)
[SO Connection check webview](http://stackoverflow.com/questions/8493082/simple-alert-view-for-connection-check-in-a-web-view)
[SO didLoadWithError](http://stackoverflow.com/questions/7028383/didfailloadwitherror-is-called-with-uiwebview-even-though-page-later-loads)

###Android
```java
  // On error show default message page...
  public void onReceivedError( int errorCode, String description, String failingUrl)
  {
      super.loadUrl("file:///android_asset/www/index.html");
      return;
  }
```

##Contributions
Feel free to send issues, pull requests all is wellcome,

Kind regards Morten
