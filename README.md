# express-mongoose-api-seed


- - - 
###### *Remove this for your project*

## Description

This project provides an organized application directory structure from which you can begin your [NodeJS](http://nodejs.org/) project. Use it to host an [ExpressJS](http://expressjs.com/api.html) API using [MongooseJS](http://mongoosejs.com/).

###### *Remove this for your project*
- - - 

## Routes
>### *Notes*
>* *@session_role*
>* @body   = POST param 
>* @param = URL param /user/:param 
>* (options)

### [User](#user-routes)
 Method        | Endpoint                  | Action 
-------------  | ------------------------- | -----------------------------------------
`POST`         | /user                     | [Create User](#create-user)
`POST`         | /:role/login              | [Login User](#login-user)
`POST`         | /user/logout              | [Logout User](#logout-user)
`PUT`          | /user/password            | [Update Password](#update-password)
`GET`          | /user/auth                | [Auth User](#auth-user)
`GET`          | /:role\s                  | [List Users](#list-users)
`GET`          | /user/:uid                | [Show User](#show-user)
`DELETE`       | /user                     | [Delete User](#delete-user)

- - -

<a name="user-routes">
### User Routes

<a name="create-user">
#### Create User
Create new user

- @body email 
- @body password (8 - 20 chars, 1+ digit) 
- @body name
- *@body role (user|admin)*


<a name="login-user">
#### Login User
Create user session

- @body email  
- @body password

Same as [Show User](#show-user)


<a name="logout-user">
#### Logout User

Destroy user session 

<a name="update-password">
#### Update Password

Update user password

<a name="auth-user">
#### Auth User
Check if session is valid  


<a name="list-users">
#### List Users
List all user with role

- @param role (user|admin)


<a name="show-user">
#### Show User
Show user info

- @param uid


<a name="delete-user">
#### Delete User
Remove user

- @body password 


#### Test Server

```
Mongoose connection opened: mongodb://localhost/db-development
Nomadic Fitness API running at http://192.168.1.106:8000
POST /user 200 207ms - 118b
POST /client/login 200 94ms - 118b
GET /user/auth 200 5ms
PUT /user/password 200 6ms - 118b
DELETE /user 200 3ms - 33b
```

####
```json
Testing http://localhost:8000

POST /user
{
  "email": "bluehugh2@gmail.com",
  "password": "password1",
  "name": "Hugh Boylan"
}
RESPONSE: [200]
{
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "_id": "532bc0a42a185f2438000002",
  "role": "client"
}

POST /client/login
{
  "email": "bluehugh2@gmail.com",
  "password": "password1"
}
RESPONSE: [200]
{
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "_id": "532bc0a42a185f2438000002",
  "role": "client"
}

GET /user/auth
{}
RESPONSE: [200]
null

PUT /user/password
{
  "password": "password2"
}
RESPONSE: [200]
{
  "_id": "532bc0a42a185f2438000002",
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "role": "client"
}

DELETE /user
{
  "password": "password2"
}
RESPONSE: [200]
{
  "error": "Invalid password"
}
```