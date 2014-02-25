var APIeasy = require('api-easy')
  , assert  = require('assert')
  , data    = require('./data.json')

var suite = APIeasy.describe('express-mongoose-api-seed');

function localSession(suite, res){
  suite.before('setAuth', function (outgoing) {
    res.headers['set-cookie'].filter(function(cookie) {
      if (!!~cookie.indexOf('connect.sid')) {
        suite.setHeader('Cookie', cookie)
        outgoing.headers['Cookie'] = cookie;
      }
    })
    return outgoing;
  })
}

suite.use('localhost', require('../config.json').port)
  .setHeader('Content-Type', 'application/json')
  .discuss('User: ')
    
  .post('/user', data.user)
    .expect('should respond with new user model', function(err, res, body) {
      var result = JSON.parse(body)
      assert.equal(result.error, undefined)
      assert.equal(result.email, data.user.email)
    })
    .next()
    
  .post('/user/login', { username:data.user.username, password:data.user.password })
    .expect('should activate user session', function (err, res, body) {
      var result = JSON.parse(body);
      assert.equal(result.error, undefined)
      
      //update local session
      localSession(suite, res)
    })
    .next()
    
  .get('/user/auth')
    .expect(200)
    .next()
    
  .del('/user', { password:data.user.password })
    .expect(200)
    .next()
    
  .export(module);