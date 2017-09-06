'use strict';

angular.module('dgcApp')
        .constant("apiurl","http://localhost:3002/")
        .service('jobSearchService', ['$http', '$resource', 'apiurl', function($http, $resource, apiurl) {
            this.getSeekJobCount = function(jobType, jobLocation)
            {
                return $http.get(apiurl + 'jobsearch/stats/' + jobType + '/' + jobLocation);
            };            

            this.getJobCountByPostCode = function(jobType, jobLocation)
            {
                return $http.get(apiurl + 'jobsearch/querystats?postcode=' + jobLocation + '&keywords=' + jobType + '&location=Bulimba');
            };
        }]);
