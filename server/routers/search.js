app.get('/webSearch', function(req, res) {
  queryController.findOne({where: {query: req.query.q}}, function(query) {
    if (!query) {
      var options = {
        url: 'https://api.cognitive.microsoft.com/bing/v5.0/search?q=' + req.query.q,
        headers: {
          'Ocp-Apim-Subscription-Key': bingApiKey
        }
      }
      request(options, function(err, response, body) {
        var results = JSON.parse(body).webPages.value;
        queryController.create({query: req.query.q}, function(query) {

          var addResults = function (resultIndex) {
            console.log(resultIndex);
            if (resultIndex === results.length) {
              query.getResults().then(function(results) {
                appController.findAll({where: {name: req.query.q}}, function(apps) {
                  res.send({results: results, apps: apps});
                  return;
                });
              });
            } else {
              resultController.create({
                name: results[resultIndex].name,
                displayUrl: results[resultIndex].displayUrl,
                snippet: results[resultIndex].snippet
              }, function(result) {
                query.addResult(result).then(function() {
                  addResults(resultIndex+1);                
                });
              });
            }
          }

          addResults(0);
        });
      });
    } else {
      query.getResults().then(function(results) {
        appController.findAll({where: {name: req.query.q}}, function(apps) {
          res.send({results: results, apps: apps});
        });
      });
    }
  });
});