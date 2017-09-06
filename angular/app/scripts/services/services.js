'use strict';

angular.module('dgcApp')
        //.constant("baseurl","http://localhost:3000/")
        .constant("apiurl","http://localhost:3002/")
        .service('quoteFactory', ['$http','$resource', 'apiurl', function($http,$resource,apiurl) {
            
            this.getAllQuotes = function()
            {
                console.log('getAllQuotes');
                return $http.get(apiurl + 'quotes');
            };

            this.getQuotesById = function(id)
            {
                console.log('QuoteId: ' + id);
                return $http.get(apiurl + 'quotes/' + id );
                //return $http.get(apiurl + 'quotes', { quoteId: id } );
            };
        }])
        .service('feedbackService', ['$resource', function($resource) {
            this.getFeedback = function(){                    
                //return $resource(baseurl+"feedback/:id",null,{'save':{method:'POST'}});
                return $resource('data/feedback.json',{},{'save':{method:'POST'}});
            };                                 
        }])

        .service('menuFactory', ['$http','$resource', function($http,$resource) {

                this.getFavouriteDish = function()
                {
                    return $http.get('data/dishes.json');
                };

                this.getDishes = function(){                    
                    //return $resource(baseurl+"dishes/:id",null,{'update':{method:'PUT'}});
                    return $resource('data/dishes.json',null,{'update':{method:'PUT'}});
                };

                this.getPromo = function()
                {
                    return $http.get('data/promotions.json');
                };
                           
                this.getPromotion = function () {
                    //return $resource(baseurl+"promotions/:id",null,{'update':{method:'PUT'}});
                    return $resource('data/promotions.json',null,{'update':{method:'PUT'}});
                };
                        
        }])

        .factory('corporateFactory', ['$http','$resource', function($http,$resource) {
    
            var corpfac = {};
            
            corpfac.getAllLeaders = function() {
                return $http.get('data/leadership.json');
            };
            
            corpfac.getLeaders = function() {
                //return $resource(baseurl+"leadership/:id",null,{'update':{method:'PUT'}});
                return $resource('data/leadership.json',{},{'update':{method:'PUT'}});
            };
        
            return corpfac;
        }])

;
