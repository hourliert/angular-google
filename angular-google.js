(function(){
    'use strict';

    var loadDeferred;

    angular.module('google', [])
    .provider('Google', function() {
        this.setApiKey = function(key){
            this.apiKey = key;
        };

        this.setScopes = function(scopes){
            this.scopes = scopes;
        };

        this.$get = ['$q',function($q) {
            var scopes = this.scopes,
                apiKey = this.apiKey;

            return {
                login: function () {
                    var deferred = $q.defer();

                    loadDeferred.promise.then(function(){
                        gapi.auth.authorize({
                            'client_id': apiKey,
                            scope: scopes,
                            immediate: false
                        }, function(authResult){
                            if (authResult && !authResult.error) {
                                deferred.resolve(authResult);
                            } else {
                                deferred.reject(authResult.error);
                            }
                        });
                    });

                    return deferred.promise;
                },

                logout: function(){
                    var deferred = $q.defer();

                    loadDeferred.promise.then(function(){
                        gapi.auth.signOut();
                        deferred.resolve();
                    });

                    return deferred.promise;
                },

                me: function(){
                    var deferred = $q.defer();

                    loadDeferred.promise.then(function(){
                        gapi.client.load('plus', 'v1').then(function() {
                            // Step 5: Assemble the API request
                            var request = gapi.client.plus.people.get({
                                'userId': 'me'
                            });
                            // Step 6: Execute the API request
                            request.then(function(resp) {
                                deferred.resolve(resp.result);
                            }, function(reason) {
                                deferred.reject();
                            });
                        });
                    });

                    return deferred.promise;
                },

                handleClientLoad: function () {
                    var deferred = $q.defer();

                    loadDeferred.promise.then(function(){
                        gapi.auth.authorize({
                            'client_id': apiKey,
                            scope: scopes,
                            immediate: true
                        }, function(authResult){
                            if (authResult && !authResult.error) {
                                deferred.resolve(authResult);
                            } else {
                                deferred.reject(authResult.error);
                            }
                        });
                    });

                    return deferred.promise;
                }
            };
        }];
    })
    .run(['$q', '$window', '$timeout', function($q, $window, $timeout){
        loadDeferred = $q.defer();

        (function injectScript(){
            var src = '//apis.google.com/js/client.js',
                script = document.createElement('script');

            if ($window.location.protocol.indexOf('file:') !== -1){
                src = 'https:' + src;
            }

            script.src = src;
            script.onload = function(){
                $timeout(function(){
                    loadDeferred.resolve();
                }, 1000);
            };

            document.getElementsByTagName('head')[0].appendChild(script);
        })();
    }]);
})();
