'use strict';

angular.module('dgcApp')
        .controller('MainController', ['$scope', 'searchFactory', 'jobSearchService', function($scope, searchFactory, jobSearchService) {

            $scope.searchResults = [];
            $scope.jobStats = {
                seekCount: undefined,
                indeedCount: undefined,
                loganCount: undefined,
            };

            $scope.selectedIndex = -1;

            $scope.doSearch = function() {
                $scope.searchResults.length = 0;

                var results = searchFactory.search($scope.query);

                for(var idx = 0; idx < results.length; idx++) {
                    $scope.searchResults.push(
                        { text: results[idx] }
                    );

                }
            };

            $scope.isActive = function(idx) {
                if(idx === $scope.selectedIndex) {
                    return "searchActive";
                }
                else {
                    return "";
                }
            };

            $scope.onKeyPress = function(keyevent) {
                switch(keyevent.key) {
                    case 'Enter':
                        $scope.getJobCount();
                        break;
                    case 'ArrowDown':
                        if($scope.searchResults.length>0) {
                            $scope.selectedIndex = ($scope.selectedIndex + 1) % $scope.searchResults.length;
                            $scope.query = $scope.searchResults[$scope.selectedIndex].text;
                        }
                        else{
                            $scope.selectedIndex = -1;
                        }
                    break;
                    case 'ArrowUp': 
                        if($scope.searchResults.length>0) {
                            $scope.selectedIndex = ($scope.selectedIndex + $scope.searchResults.length - 1) % $scope.searchResults.length;
                            $scope.query = $scope.searchResults[$scope.selectedIndex].text;
                        }
                        else {
                            $scope.selectedIndex = -1;
                        }
                    break;
                }
            };

            $scope.jobStatsByPostCode = {
                seek: { service: "Seek", serviceCount: undefined },
                indeed:  { service: "Indeed", serviceCount: undefined },
                other:  { service: "Local", serviceCount: undefined },
            };

            $scope.onKeyPressByPostCode = function(keyevent) {
                switch(keyevent.key) {
                    case 'Enter':
                        $scope.doSearchByPostCode();
                        break;
                }
            };

            $scope.doSearchByPostCode = function() {
                console.log('doSearchByPostCode');
                if($scope.queryByPostCode===undefined){
                    $scope.jobStatsByPostCode.seek.serviceCount = undefined;
                    $scope.jobStatsByPostCode.indeed.serviceCount = undefined;
                    $scope.jobStatsByPostCode.other.serviceCount = undefined;
                    return;
                }

                $scope.jobStatsByPostCode.seek.serviceCount = 'Searching...';
                $scope.jobStatsByPostCode.indeed.serviceCount = 'Searching...';
                $scope.jobStatsByPostCode.other.serviceCount = 'Searching...';
                $scope.jobStatsByPostCode.seek.service = 'Searching...';
                $scope.jobStatsByPostCode.indeed.service = 'Searching...';
                $scope.jobStatsByPostCode.other.service = 'Searching...';

                var fields = $scope.queryByPostCode.split (" in ");
                console.log(fields);

                jobSearchService.getJobCountByPostCode(fields[0], fields[1])
                .then(function(response){
 
                    $scope.jobStatsByPostCode.seek.service = response.data.Seek.name;
                    $scope.jobStatsByPostCode.indeed.service = response.data.Indeed.name;
                    $scope.jobStatsByPostCode.other.service = response.data.Other.name;
                    
                    $scope.jobStatsByPostCode.seek.serviceCount = response.data.Seek.jobs;
                    $scope.jobStatsByPostCode.indeed.serviceCount = response.data.Indeed.jobs;
                    $scope.jobStatsByPostCode.other.serviceCount = response.data.Other.jobs;
                });
                        
            };

            $scope.getJobCount = function() {
                if($scope.query===undefined){
                    $scope.jobStats.seekCount = undefined;
                    $scope.jobStats.indeedCount = undefined;
                    $scope.jobStats.loganCount = undefined;
                    return;
                }

                $scope.jobStats.seekCount = 'Searching...';
                $scope.jobStats.indeedCount = 'Searching...';
                $scope.jobStats.loganCount = 'Searching...';

                var fields = $scope.query.split (" in ");
                console.log(fields);

                jobSearchService.getSeekJobCount(fields[0], fields[1])
                .then(function(response){
                    $scope.jobStats.seekCount = response.data.Seek;
                    $scope.jobStats.indeedCount = response.data.Indeed;
                    $scope.jobStats.loganCount = response.data.Logan;
                });
            };
        }])
        .controller('QuoteDetailsController', ['$scope', 'quoteFactory', function($scope, quoteFactory) {
            console.log('QuoteDetailsController');
            
            $scope.quote = quoteFactory.getQuotesById(2)
                .then(function(response){
                    console.log(response.data);
                    $scope.quote = response.data[0]; 
                });
            
        }])
        .controller('QuoteController', ['$scope', 'quoteFactory', function($scope, quoteFactory) {
            
            $scope.quotes = quoteFactory.getAllQuotes()
                .then(function(response){
                    console.log(response.data);
                    $scope.quotes = response.data; 
                });
            
        }]);
