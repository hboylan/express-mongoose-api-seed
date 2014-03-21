module.exports = function (config, db) {
  
  // init admin
  new db.User(config.admin).save(function (err, a) {
    // lookup existing admin to set config
    if(err || !a)
      db.User.findOne({ email:config.admin.email }, function (err, a) {
        if(err || !a) return
        config.admin = a
      })
    // set config
    else
      config.admin = a
  })
  
}