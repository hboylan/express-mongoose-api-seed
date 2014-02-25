/**
 * lib/mongo-setup.js
 * Sets up mongo connection
 */

var mongoose = require('mongoose')

module.exports = function(config, cb) {

	// Establish connection
	mongoose.connect(config.db, { server: { keepAlive: 1, auto_reconnect: true } });

	/*
	 * log
	 * - Logs to debug && logger
   * - Use for custom db logger
	 */
	function log(msg, err) {
    if(err)
      console.log(msg, err);
		else
      console.log(msg);
	}

	// Handle error
	mongoose.connection.on('error', function (err) {
		log('mongo connection error: ', err);
		mongoose.disconnect();
	});

	// Listen for connection
	mongoose.connection.on('open', function () {
		log('mongo connection opened');
		cb(null, mongoose);
	});
	
};