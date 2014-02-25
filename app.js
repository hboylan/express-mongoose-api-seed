var express    = require('express')
  , config     = require('./config.json')
  , api        = express()

// Config API settings
require('./lib/settings')(config, api, express)

// Setup mongo database
require('./lib/database')(config, function (err, mongoose) {

	// Connection err
	if (err) {
		console.log('Mongo connection error:', err);
		process.exit(1);
	}

  // Build models
  var db = require('./models')(mongoose, config);
  
  // Create admin
  new db.User(config.admin).save(function(err, admin){
    
    // Setup API routes
    require('./lib/routes')(api, db)
    
    // Create API server
    require('http').createServer(api).listen(api.get('port'), function(){
      console.log("Express/Mongoose API running at localhost:" + api.get('port'))
    })
  })
})