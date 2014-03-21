module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var mediaSchema = new Schema({
    url: { type: String, required: true },
    path: { type: String, default:'/media' },
    type: { type: String, required: true, enum:['image/png', 'video/mp4'] },
    created: { type: Date, default:Date.now },
  }, { versionKey:false })

  mediaSchema.pre('save', function (next) {
    var media = this
    next()
  });

  mediaSchema.pre('validate', function (next) {
    if(this.path.indexOf('/media') == -1)
      this.invalidate('path', 'Invalid media path')
    else
      this.url = 'http://'+config.host+':'+config.port+this.path.toString().replace('/media', '')
    console.log('http://'+config.host+':'+config.port+this.path.toString().replace('/media', ''))
    next()
  });

  // mediaSchema.methods.writeData(function (next) {
  //   
  //   require("fs").writeFile('./media'+media.path, new Buffer(media.data, 'base64'), function (err) {
  //     next(err)
  //   })
  // });

  ['toJSON', 'toObject'].forEach(function (prop) {
  	mediaSchema.set(prop, {
  		transform: function (doc, ret, options) {
  			delete ret._id;
  		}
  	});
  });
  
  return mongoose.model('media', mediaSchema)
}
