/**
 * models/index.js
 * Index of models.  Exports all models.
 */

module.exports = function (mongoose, config) {

  // require wrapper for mongoose models
  function req(model){
    return require('./'+model)(mongoose, config)
  }
  
  // export models
  return {
      User: req('user'),
  };
};