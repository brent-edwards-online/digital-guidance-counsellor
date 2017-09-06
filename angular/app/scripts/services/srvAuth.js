'use strict';

angular.module('dgcApp')
.service('srvAuth', [function() {
    this.watchLoginChange = function() {
        var _self = this;
        FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
              _self.getUserInfo();
              // This is also the point where you should create a session for the current user. For this purpose you can use the data inside the res.authResponse object.
            }
            else {
                // The user is not logged to the app, or into Facebook: destroy the session on the server.
            }
        });
    };

    this.getUserInfo = function() {
        var _self = this;
        FB.api('/me', function(res) {
            $rootScope.$apply(function() {
                $rootScope.user = _self.user = res;
            });
        });
    };

    this.logout = function() {
        var _self = this;
        FB.logout(function(response) {
            $rootScope.$apply(function() {
                $rootScope.user = _self.user = {};
            });
        });    
    };
}]);
