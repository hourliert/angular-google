# angular-google
A tiny wrapper around google api for angular.js

#Install
bower install hourliert/angular-google

#Use
Bootstrap:

```
var app = angular.module('myApp', ['google']);

app..config(['GoogleProvider', function (GoogleProvider) {
    GoogleProvider.setApiKey('xxxxxxxxxxx.apps.googleusercontent.com');
    GoogleProvider.setScopes(['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/contacts.readonly', 'https://www.googleapis.com/auth/plus.login']);
}])
```

Runtime:
```
module.service('GoogleService', ['Google', function(Google) {
  //open a new windows asking for user credentials and return a promise with some user info + the api token
  Google.login().then(function (authResponse) {
      
  });
  
  //logout the current user
  Google.logout().then(function () {
      
  });

  //return a promise. it will be resolved with the user session when the google sdk will be loaded
  Google.handleClientLoad().then(function (authResponse) {
      
  });

  //get the user main informations
  Google.me().then(function (selfInfo) {
      
  });
}]);
```
