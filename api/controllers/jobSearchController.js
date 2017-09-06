'use strict';

var cheerio = require('cheerio');
var request = require('request-promise');


var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dgc_api',
  password : 'x,2CUM[Y2}wJW/m~',
  database : 'DigitalGuidanceCounsellor'
});


exports.query_stats = function(req, res) {
        console.log('Query Stats');
        console.log(req.query.postcode);

        //var jobType = req.params.jobType;
        //var jobLocation = req.params.jobLocation;

        var jobType = req.query.keywords;
        var jobLocation = req.query.location;
        var jobPostCode = req.query.postcode;
        var jobQuery = jobType.split(" ").join('-') + '-jobs/';
        var locationQuery = 'in-' + jobLocation.split(" ").join('-');

        //var result = { Seek: 0, Indeed: 0, Local: { Site: '', Result: '' } };
        var result = { Seek: { name: 'Seek', jobs: ''}, Indeed: { name: 'Indeed', jobs: ''}, Other: { name: 'Other', jobs: ''} };

        function seekResponse(err, resp, body){
            var $ = cheerio.load(body);
            var searchSummary = $('#SearchSummary');
            var searchSummaryText = searchSummary.text();
            result.Seek.jobs = searchSummaryText.split(" ")[0] + " jobs found on Seek";
            console.log('seek finished')
        };
        
        function indeedResponse(err, resp, body){
            var $ = cheerio.load(body);
            var searchSummary = $('#searchCount');
            var searchSummaryText = searchSummary.text();
            result.Indeed.jobs = searchSummaryText.split(" ")[5] + " jobs found on Indeed";
            console.log('indeed finished')
        };
    
        const sites = [
            {
                url: 'https://www.seek.com.au/' + jobQuery + locationQuery,
                callback: seekResponse
            },
            {
                //https://au.indeed.com/jobs?q=mechanic&l=Queensland
                url: 'https://au.indeed.com/jobs?q=' + encodeURIComponent(jobType) + '&l=' + encodeURIComponent(jobLocation),
                callback: indeedResponse
            }
        ];
        
        var promise = new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM PostCode WHERE PostCodeValue = ? LIMIT 1', jobPostCode, function (err, res) {
                if (err) throw err;

                if(res.length > 0) {
                    var siteUrl = res[0].SiteUrl;
                    result.Other.name = siteUrl     
    
                    var searchUrl = siteUrl +'search-results?keywords=' + encodeURIComponent(jobType) + '&postCode=' + encodeURIComponent(jobPostCode); //postCode=4207
                    //result.Local.Site = siteUrl;    
                    
    
                    request(searchUrl , function (err1, resp, body) {
                        var $ = cheerio.load(body);
                        var searchSummary = $('.resultsHeader');
                        var searchSummaryText = searchSummary.text();
                        //result.Local.Result = searchSummaryText.split("\n")[3].trim().split(" ")[1] + " jobs found on " + resp.client._host;
                        result.Other.jobs = searchSummaryText.split("\n")[3].trim().split(" ")[1] + " jobs found on " + resp.client._host;
            
                        if (true) {
                            resolve("Stuff worked!");
                        }
                        else {
                            reject(Error("It broke"));
                        } 
                    });
                }
                else {
                    result.Other.name = 'None';     
                    result.Other.jobs = '';     
                    resolve("Stuff worked!");
                }
            });
        });

        const promises = sites.map(site => request(site.url, site.callback));
        promises.push(promise);

        console.log('Promises Starting');
        Promise.all(promises).then((data) => {
            res.json(result);    
        });
    
    };

exports.get_stats = function(req, res) {

    var jobType = req.params.jobType;
    var jobLocation = req.params.jobLocation;
    var jobQuery = jobType.split(" ").join('-') + '-jobs/';
    var locationQuery = 'in-' + jobLocation.split(" ").join('-');

    var result = { Seek: 0, Indeed: 0, Logan: 0
    }

    function seekResponse(err, resp, body){
        var $ = cheerio.load(body);
        var searchSummary = $('#SearchSummary');
        var searchSummaryText = searchSummary.text();
        result.Seek = searchSummaryText.split(" ")[0] + " jobs found on Seek";
    };
    
    function indeedResponse(err, resp, body){
        var $ = cheerio.load(body);
        var searchSummary = $('#searchCount');
        var searchSummaryText = searchSummary.text();
        result.Indeed = searchSummaryText.split(" ")[5] + " jobs found on Indeed";
    };

    function loganResponse(err, resp, body){
        var $ = cheerio.load(body);
        var searchSummary = $('.resultsHeader');
        var searchSummaryText = searchSummary.text();
        console.log(searchSummaryText.split("\n")[3].trim().split(" ")[1]);
        result.Logan = searchSummaryText.split("\n")[3].trim().split(" ")[1] + " jobs found on Logan Jobs";
    };
    
    const sites = [
        {
            url: 'https://www.seek.com.au/' + jobQuery + locationQuery,
            callback: seekResponse
        },
        {
            //https://au.indeed.com/jobs?q=mechanic&l=Queensland

            url: 'https://au.indeed.com/jobs?q=' + encodeURIComponent(jobType) + '&l=' + encodeURIComponent(jobLocation),
            callback: indeedResponse
        },        
        {
            //http://www.loganjobs.com.au/search-results?keywords=group%20fitness&suburb=Bannockburn
            url: 'http://www.loganjobs.com.au/search-results?keywords=' + encodeURIComponent(jobType) + '&suburb=' + encodeURIComponent(jobLocation),
            callback: loganResponse
        }
    ];

    const promises = sites.map(site => request(site.url, site.callback));
    Promise.all(promises).then((data) => {
        res.json(result);    
    });

};


exports.get_post_codes = function(req, res) {
    var result = { 
        result: 'Success' ,
        data: []
    };

    /*
    var url = 'http://www.kingstonjobs.com.au/';
    request(url, function(err, resp, body){
        var $ = cheerio.load(body);

        var postCodes = $('option[postcode]');
        console.log(postCodes[1]);
        var postCodeText = postCodes.text();

        for( var idx = 0; idx < postCodes.length; idx++ )
        {
            var pc = postCodes[idx].attribs.postcode + ',' + postCodes[idx].attribs.state + ',' + postCodes[idx].attribs.suburb +',' + url;
            result.data.push(pc);
        }

        res.json(result);    
    });
    */

    var process = function(err, resp, body){
        //console.log('**********');
        console.log(resp.client._host);
        var $ = cheerio.load(body);
        var postCodes = $('option[postcode]');
        for( var idx = 0; idx < postCodes.length; idx++ )
        {
            var pc = postCodes[idx].attribs.postcode + ',' + postCodes[idx].attribs.state + ',' + postCodes[idx].attribs.suburb +',' + resp.client._host;
            result.data.push(pc);
        }
    }

    const sites = [
        /*
        { url: 'http://www.kingstonjobs.com.au/' },
        { url: 'https://jobsportal.adaniaustralia.com/' },
        { url: 'http://www.merrifieldjobs.com.au/' },
        { url: 'http://www.loganjobs.com.au/' },
        { url: 'http://www.capricorncoastjoblink.com.au/' },
        
        { url: 'http://www.iwmjobs.com.au/' },
        { url: 'http://www.eastvicjobs.com.au/' },
        { url: 'http://www.wyndhamjoblink.com.au/' },
        { url: 'http://www.northernadelaidejobs.com.au/' },
        { url: 'http://www.moirajobslink.com.au/' },

        { url: 'http://www.brimbankjoblink.com.au/community/92/' },
        { url: 'http://www.jobsinthenorth.com.au/' },
        { url: 'http://www.yarrajoblink.com.au/' },
        { url: 'http://www.mackayregionjoblink.com.au/' },
        { url: 'http://www.northeastvictorianjobs.com.au/' },
       
        { url: 'http://www.barossaplainsjobs.org.au/' },
        { url: 'http://www.morelandjoblink.com.au/' },
        { url: 'http://www.melbswestjobs.com.au/' },
        { url: 'http://www.craigieburncentraljoblink.com/' },
        { url: 'http://www.geelongcareers.org.au/' }*/,
        
        { url: 'http://www.caseycardiniajobs.com.au/' },
        { url: 'http://www.worklocalgreaterdandenong.com.au/' },
        { url: 'http://www.darebinjobslink.com.au/' },
        { url: 'http://www.cyba.com.au/' }
    ];

    const promises = sites.map(site => request(site.url, process));
    Promise.all(promises).then((data) => {
        res.json(result);    
    });
}