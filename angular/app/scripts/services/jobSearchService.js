'use strict';

angular.module('dgcApp')
        .constant("apiurl","http://localhost:3002/")
        .constant('awsurl','http://dgc-api.ap-southeast-2.elasticbeanstalk.com/')
        .service('jobSearchService', ['$http', '$resource', 'awsurl', function($http, $resource, awsurl) {
            this.getSeekJobCount = function(jobType, jobLocation)
            {
                return $http.get(awsurl + 'jobsearch/stats/' + jobType + '/' + jobLocation);
            };            

            this.getJobCountByPostCode = function(jobType, jobLocation)
            {
                return $http.get(awsurl + 'jobsearch/querystats?postcode=' + jobLocation + '&keywords=' + jobType + '&location=Bulimba');
            };
        }]);
