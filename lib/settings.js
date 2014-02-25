module.exports = function(config, api, express){
  
  // API's user session store
  var MongoStore = require('connect-mongo')(express)
    , sessions   = new MongoStore({
      url: config.db.url,
      clear_interval: config.db.sess_interval // db session age limit
    })
  
  // Configure API environment
  api.configure(function() {
    api.set('port', config.port)
    api.set('sessions', sessions)
    api.use(express.methodOverride())
    api.use(express.logger('dev')) // use Express' dev logger
    api.use(express.bodyParser())
    api.use(express.cookieParser())
    api.use(express.static(__dirname + '/public')) // serve static dir
    api.use(express.session({
      store:sessions,
      secret:config.db.sess_secret,
      cookie:{ maxAge:config.db.sess_interval } // cookie session age limit
    }))
    api.use(api.router)
  })

  // CORS support
  api.all('*', function(req, res, next){
    if (!req.get('Origin')) return next();
    
    // use "*" here to accept any origin
    // or specifiy ONE origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Credentials', 'true'); // AngularJS support
    if ('OPTIONS' == req.method) return res.send(200);
    next();
  })
}