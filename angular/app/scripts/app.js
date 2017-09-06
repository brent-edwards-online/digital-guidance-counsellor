'use strict';

angular.module('dgcApp', ['ui.router','ngResource'])
.run(['$rootScope', '$window', function($rootScope, $window) {
    console.log("app run");
    
    /*
    try {
        $rootScope.user = {};

        $window.fbAsyncInit = function() {  // Executed when the SDK is loaded
            FB.init({
                appId: '130627397562267',
                channelUrl: 'app/channel.html',
                status: true,
                cookie: true,
                xfbml: true
            });

            sAuth.watchLoginChange();
        };

        (function(d){
        // load the Facebook javascript SDK

        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

        }(document));
    }
    catch(err) {
        console.log(err);
    }
    */
}])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/main.html',
                        controller  : 'MainController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    },
                    'breadcrumbs': {
                        templateUrl : 'views/breadcrumbs.html',
                    }
                }
            })
            .state('app.facebook', {
                url:'facebook',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/facebook/main.html',
                        controller  : 'FacebookController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    },
                    'breadcrumbs': {
                        templateUrl : 'views/breadcrumbs.html',
                    }
                }
            })
            .state('app.quote', {
                url: 'quote',
                views: {
                    'content@': {
                        templateUrl : 'views/quote.html',
                        controller  : 'QuoteController'
                    }
                }
            })
            .state('app.quotedetail', {
                url: 'quote/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/quotedetail.html',
                        controller  : 'QuoteDetailsController'
                    }
                }
            });
            
    
        $urlRouterProvider.otherwise('/');
    })
;
