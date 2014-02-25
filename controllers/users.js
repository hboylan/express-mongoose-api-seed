function UserAPI(db, utils)
{
  
  this.create = function(req, res) {    
    // check full name
    if(req.body.name.indexOf(' ') == -1)
      return utils.error(res, 403, 'Requires first and last name')
    
    // Persist user
    new db.User(req.body).save(function(err, success){
      if(err) return utils.error(res, 403, 'Username already in use')
      if(!success) return utils.error(res, 403, 'Invalid parameters passed')
      req.session.user = user
      res.json(user)
    })
  }
  
  
  this.list = function(req, res){
    db.User.find().where('role').equals(req.params.role).sort('username').exec(function(err, users){
      res.json(users)
    })
  }
  

  this.login = function(req, res) {  
  	db.User.findOne({ username: req.body.username }, function(err, user) {
      if(err || !user) return utils.error(res, 403, 'Invalid username');
      if(user.role != req.params.role) return utils.error(res, 403, 'Invalid '+req.params.role+' role')

      user.authenticate(req.body.password, function(err, isValid) {
      	if(err || !isValid) return utils.error(res, 403, 'Invalid password');
        req.session.user = user
        res.json(user)
      })
  	})
  }
  
  this.logout = function(req, res){
    res.send()
  }
  
  this.show = function(req, res){    
    db.User.findOne(utils.id(req.params.uid), function(err, user){
      if(err || !user) return utils.error(res, 403, 'Invalid user')
      res.json(user)
    })
  }
  
  this.remove = function(req, res, next){    
    db.User.findOne({ username:req.session.user.username }, function(err, user){
      if(err || !user) return utils.error(res, 404, 'Invalid user')
      
      user.authenticate(req.body.password, function(err, valid){
        if(err || !valid) return utils.error(res, 200, 'Invalid password')
        user.remove()
        res.send()
      })
    })
  }
}
module.exports = function(d, u){ return new UserAPI(d, u) }