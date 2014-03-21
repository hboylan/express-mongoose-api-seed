module.exports = function (db) {
  
  var ObjectId = require('mongoose').Types.ObjectId
  
  function error (res, code, msg) {
  	res.send(code, {
  		error: msg
  	})
  }
  
  return {

  /*
   * config()
   * - Return config object
   */
  // config: function (key) {
  //   return key? config[key] : config
  // },

  /*
   * id()
   * - MongooseJS ObjectId
   */
  id: function (id) { return ObjectId(id) },
  
  /*
   * error()
   * - Wraps error message and delivers it to response
   */
  error: error,
  
  /*
   * body()
   * - Requires request body elements
   */
  body: function (params) {
    params = params.split(' ')
    return function (req, res, next) {
      var err = false, body = req.method == 'GET'? req.query:req.body;
      params.forEach(function (p) { if(body[p] == undefined) err = true })
      return err? error(res, 403, 'Requires params: '+params.join(', ')) : next()
    }
  },

  /*
   * auth()
   * - Require active user session
   */
  auth: function (req, res, next) {
    return req.session.user? next() : error(res, 403, 'Requires login')
  },
  
  
  /*
   * client()
   * - Require active client session
   */
  client: function (req, res, next) {
    var is_client = req.session.user && req.session.user.role == 'client'
    return is_client? next() : error(res, 403, 'Requires client privileges')
  },
  
  /*
   * trainer()
   * - Require active trainer session
   */
  trainer: function (req, res, next) {
    var is_trainer = req.session.user && req.session.user.role != 'client'
    return is_trainer? next() : error(res, 403, 'Requires trainer/admin privileges')
  },
  
  /*
   * admin()
   * - Require active admin session
   */
  admin: function (req, res, next) {
    var is_admin = req.session.user && req.session.user.role == 'admin'
    return is_admin? next() : error(res, 403, 'Requires admin privileges')
  },
  
 
  /*
   * deauth()
   * - Destroy current user session
   */ 
  deauth: function (req, res, next) {
    req.session.user = null
    next()
  },
  
  /*
   * validPass()
   * - Ensure req.body.password is valid
   */
  validPass: function (req, res, next) {
    var len = req.body.password.length
    if(len < 8 || len > 20)                return error(res, 403, 'Password must contain 8-20 characters')
    if(!req.body.password.match('[0-9]+')) return error(res, 403, 'Password must contain at least 1 digit')
    next()
  },
}
}