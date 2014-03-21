module.exports = function (mongoose, config) {

  var Schema = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , bcrypt = require('bcrypt')
    , salt_factor = config.salt || 10
  
  // Define user schema
  var userSchema = new Schema({
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
  	email: { type: String, required: true, index: { unique:true } },
  	password: { type: String, required: true },
  	name: { type: String, required: true },
  }, { versionKey: false });

  function saltPass(user, next) {
  	
  }

  // Intercept save to hash password, profile info
  userSchema.pre('save', function (next) {
    var user = this
    
  	// Ignore if password unaltered
  	if (!user.isModified('password')) return next()

  	// Generate salt
  	bcrypt.genSalt(salt_factor, function (err, salt) {
  		if (err) return next(err)

  		// Hash provided password
  		bcrypt.hash(user.password, salt, function (err, hash) {
  			if (err) return next(err)

  			// Update password
  			user.password = hash
  			next()
  		})
  	})
  });

  /*
   * Methods
   */

  // Provide method to validate password
  userSchema.methods.authenticate = function (pass, next) {
  	// Compare via bcrypt
  	bcrypt.compare(pass, this.password, function (err, valid) {
  		if (err) return next(err)
  		next(null, valid)
  	})
  };


  // userSchema parse
  ['toJSON', 'toObject'].forEach(function (prop) {
  	userSchema.set(prop, {
  		transform: function (doc, ret, options) {
  			delete ret.password
  		}
  	})
  });

  return mongoose.model('user', userSchema)
}