'use strict';
module.exports = function(app) {
  var quoteController = require('../controllers/quoteController');
  var jobSearchController = require('../controllers/jobSearchController');

  // todoList Routes
  app.route('/quotes')
    .get(quoteController.list_all_quotes)
    .post(quoteController.create_a_quote);


  app.route('/quotes/:quoteId')
    .get(quoteController.read_a_quote)
    .put(quoteController.update_a_quote)
    .delete(quoteController.delete_a_quote);

  app.route('/jobsearch/querystats')
    .get(jobSearchController.query_stats)

  app.route('/jobsearch/stats/:jobType/:jobLocation')
    .get(jobSearchController.get_stats)

  app.route('/jobsearch/getpostcodes')
    .get(jobSearchController.get_post_codes)
};