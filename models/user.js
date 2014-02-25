/**
 * models/user.js
 * User models
 *
 */

var bcrypt = require('bcrypt');

module.exports = function (mongoose, config) {

	// Setup salt
	var salt_factor = config.salt || 10;

	// Pull out mongoose types
	var Schema = mongoose.Schema,
		ObjectId = Schema.Types.ObjectId;

	// Define user schema
	var userSchema = new Schema({
    role: { type: String, enum:['user', 'admin'], default: 'user' },
		username: { type: String, required: true, index: { unique:true } },
		password: { type: String, required: true },
		name: { type: String, required: true }
	}, { versionKey: false });

	// Intercept save to hash password, profile info
	userSchema.pre('save', function (next) {
		// Get reference to self
		var user = this;
		
		// Ignore if password unaltered
		if (!user.isModified('password')) return next();

		// Generate salt
		bcrypt.genSalt(salt_factor, function (err, salt) {
			if (err) return next(err);

			// Hash provided password
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);

				// Update password
				user.password = hash;
				next();
			});
		});
	});

	// Provide method to validate password
	userSchema.methods.authenticate = function(pass, cb) {
		// Compare via bcrypt
		bcrypt.compare(pass, this.password, function (err, valid) {
			if (err) return cb(err);
			cb(null, valid);
		});
	};

	// userSchema parse
	['toJSON', 'toObject'].forEach(function (prop) {
		userSchema.set(prop, {
			transform: function (doc, ret, options) {
				delete ret.password;
			}
		});
	});

	return mongoose.model('user', userSchema);

};