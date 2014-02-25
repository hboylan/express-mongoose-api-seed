module.exports = function(api, db) {
  
  var utils = require('../lib/utils')(api.get('sessions'))
    , users = require('../controllers/users')(db, utils)
    , fin   = function(req, res){ res.send() }
  
  // users
  api.post('/user', [utils.body(['username', 'password', 'name']), utils.validPass, users.create])
  api.post('/:role/login', utils.body(['username', 'password']), utils.deauth, users.login)
  api.post('/user/logout', utils.deauth, fin)
  api.get('/user/auth', utils.auth, fin)
  api.get('/user/:uid([0-9a-f]+)', users.show)
  api.get('/user/:role(admin|client)', utils.admin, users.list) // require admin role
  api.delete('/user', [utils.body(['password']), utils.auth, users.remove]) // require valid session
  
  // catch-all
  api.get('*', function(req, res){ res.status(404).json({ error:'Invalid GET request' }) })
  api.post('*', function(req, res){ res.status(404).json({ error:'Invalid POST request' }) })
  api.delete('*', function(req, res){ res.status(404).json({ error:'Invalid DELETE request' }) })
}