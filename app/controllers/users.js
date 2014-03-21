module.exports = function (db, utils) {
    
  /********
   * User *
   ********/
  return {
  
  /*
   * Create User
   */
  create: function (req, res) {
    if(req.body.email.indexOf('@') == -1 && req.body.email.indexOf('.') == -1) // validate email
      return utils.error(res, 403, 'Requires valid email address')
    
    if(req.body.name.indexOf(' ') == -1) // validate name
      return utils.error(res, 403, 'Requires first and last name')
    
    new db.User(req.body).save(function (err, user) {
      if(err) return utils.error(res, 403, 'Email address already in use')
      if(!user) return utils.error(res, 403, 'Invalid parameters passed')
      req.session.user = user
      res.json(user)
    })
  },

  /*
   * List Users
   */
  list: function (req, res) {
    db.User.find({ role:req.params.role }, function (err, users) {
      res.json(users || [])
    })
  },
  
  /*
   * Show User
   */
  show: function (req, res) {
    db.User.findById(utils.id(req.params.uid)).populate('trainer').exec(function (err, user) {
      if(err || !user) return utils.error(res, 403, 'Invalid user')
      res.json(user)
    })
  },
  
  /*
   * Login User with req.params.role
   */
  login: function (req, res) {
  	db.User.findOne({ email: req.body.email }).exec(function (err, user) {
      if(err || !user) return utils.error(res, 403, 'Invalid email');
      if(user.role != req.params.role) return utils.error(res, 403, 'Invalid user privileges')

      user.authenticate(req.body.password, function (err, isValid) {
      	if (err || !isValid) return utils.error(res, 403, 'Invalid password');
        req.session.user = user
        res.json(user)
      })
  	})
  },
  
  /*
   * Logout User
   */
  logout: function (req, res) {
    res.send()
  },
  
  /*
   *
   */
  password: function (req, res) {
    db.User.findByIdAndUpdate(req.session.user._id, req.body, function (err, user) {
      if(err) return utils.error(res, 403, err)
      res.json(user)
    })
  },
  
  /*
   * Auth User
   */
  auth: function (req, res) {
    if(req.session.user == undefined) res.status(403).end()
    else res.send()
  },
  
  /*
   * Delete User
   */
  delete: function (req, res, next) {    
    db.User.findOne({ email:req.session.user.email }, function (err, user) {
      if(err || !user) return utils.error(res, 404, 'Invalid user')
      
      user.authenticate(req.body.password, function (err, valid) {
        if(err || !valid) return utils.error(res, 200, 'Invalid password')
        user.remove()
        res.send()
      })
    })
  },
  }
}
