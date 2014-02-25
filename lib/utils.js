module.exports = function(sessions){
  
  var ObjectId = require('mongoose').Types.ObjectId
  
  // Wraps error message and delivers it to response
  function sendError (res, code, msg) {
  	res.send(code, { error:msg })
  }

  // Require items for request body
  function reqBody (params){
    return function(req, res, next){
      var err = false, body = req.method == 'GET'? req.query:req.body;
      params.forEach(function(p){ if(body[p] == undefined) err = true })
      return err? res.status(403).json({ error:'Requires params: '+params.join(', ') }) : next()
    }
  }

  // Require valid user session
  function reqAuth(req, res, next){
    return req.session.user? next() : sendError(res, 403, 'Requires login')
  }
  
  // Require valid admin session
  function reqAdmin(req, res, next){
    var is_admin = req.session.user && req.session.user.role != 'client'
    return is_admin? next() : res.status(403).json({ error:'Requires admin privileges' })
  }
  
  // Invalidate user session
  function destroySession(req, res, next){
    req.session.user = null
    next()
  }

  // Check password requirements
  function validPass (req, res, next){
    var len = req.body.password.length
    if(len < 8 || len > 20)                     sendError(res, 403, 'Password must contain 8-20 characters')
    else if(!req.body.password.match('[0-9]+')) sendError(res, 403, 'Password must contain at least 1 digit')
    else next()
  }
  
  // Mongoose ObjectId
  function objectId(id){
    return ObjectId(id)
  }
  
  return {
    error:sendError,
    body:reqBody,
    auth:reqAuth,
    admin:reqAdmin,
    deauth:destroySession,
    validPass:validPass,
    id:objectId,
  }
}