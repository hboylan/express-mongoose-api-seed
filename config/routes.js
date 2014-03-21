module.exports = function (app, http, db) {
  
  var utils = require('../app/lib/utils')(db)
  
  function route(name, other) {
    return require('../app/controllers/'+name)(db, utils, other)
  }
  
  var u = route('users')
  
  // users
  app.post('/user', utils.body('email password name'), utils.validPass, u.create)
  app.post('/:role(client|admin)/login', utils.body('email password'), utils.deauth, u.login)
  app.post('/user/logout', utils.deauth, u.logout)
  app.put('/user/password', utils.auth, utils.validPass, u.password)
  app.get('/user/auth', u.auth)
  app.get('/:role(client|trainer|admin)s', utils.admin, u.list)
  app.get('/user/:uid([0-9a-f]+)', utils.admin, u.show)
  app.delete('/user', utils.body('password'), utils.auth, u.delete)
  
  // catch-all
  app.get('*', function (req, res) { res.status(404).json({ error:'Invalid GET request' }) })
  app.post('*', function (req, res) { res.status(404).json({ error:'Invalid POST request' }) })
  app.delete('*', function (req, res) { res.status(404).json({ error:'Invalid DELETE request' }) })
}