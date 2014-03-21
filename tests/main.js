var assert  = require('assert')
  , Test    = require('teqlabs-testify')
  , data    = require('./data.json')

var api = new Test('localhost', 8000)

function client (next) {
  api.post('/user', data.user, function (res, body) {

    api.post('/client/login', { email:data.user.email, password:data.user.password }, function (res, body) {
      api.cookie('connect.sid', res)
      data.client_id = body._id
  
      api.get('/user/auth', function (res, body) {
        assert.equal(res.statusCode, 200)
    
        api.put('/user/password', { password:'password2' }, function (res, body) {
          assert.equal(res.statusCode, 200)

          api.del('/user', { password:'password2' }, function (res, body) {
    
          })
        })
      })
    })
  })
}

client(function () {

})