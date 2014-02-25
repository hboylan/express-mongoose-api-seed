# express-mongoose-api-seed

- - - 
###### *Remove this for your project*

## Description

This project provides an organized application directory structure from which you can begin your [NodeJS](http://nodejs.org/) project. Use it to host an [ExpressJS](http://expressjs.com/api.html) API using [MongooseJS](http://mongoosejs.com/).

## File structure

* **/app.js:** Load and serve API resources

* **/controllers:** Contains API endpoint controllers

* **/lib:** Contains NodeJS helpers
  * **/lib/config.json:** Configuration info for port, DB, session, etc.

  * **/lib/settings.js:** API settings

  * **/lib/database.js:** Mongoose connection helper

  * **/lib/routes.js:** API endpoints

  * **/lib/utils.js:** API helper functions

* **/models:** Contains Mongoose models
  * **/models/index.js:** Declare models to use

  * **/models/user.js:** User model schema declaration

* **/public:** ExpressJS will statically serve this directory, *served from memory*

* **/tests:** Vows test files
  * **/tests/data.json:** Test data

  * **/tests/user-test.js:** Create, login, logout, remove user

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
`POST`         | /user/login               | [Login User](#login-user)
`POST`         | /user/logout              | [Logout User](#logout-user)
`GET`          | /user/auth                | [Auth User](#auth-user)
`GET`          | /user/:role               | [List Users](#list-users)
`GET`          | /user/:uid                | [Show User](#show-user)
`DELETE`       | /user/:uid                | [Delete User](#delete-user)

- - -

<a name="user-routes">
### User Routes

<a name="create-user">
#### Create User
Create new user

- @body email 
- @body password (8 - 20 chars, 1+ digit) 
- @body first 
- @body last 
- *@body role (user|admin)*
```json
{
    "_id": "5307a99ed5539300005a665d",
    "username": "hjboylan",
    "name": "Hugh Boylan",
    "role": "user"
}
```


<a name="login-user">
#### Login User
Create user session

- @body email  
- @body password

Same as [Show User](#show-user)


<a name="logout-user">
#### Logout User

Destroy user session 

<a name="auth-user">
#### Auth User
Check if session is valid  


<a name="list-users">
#### List Users
List all user with role

- @param role (user|admin)
```json
[
    {
        "_id": "5307a99ed5539300005a676e",
        "username": "thinkerton",
        "name": "John Barnack",
        "role": "admin"
    }
]
```


<a name="show-user">
#### Show User
Show user info

- @param uid
```json
{
    "_id": "5307a99ed5539300005a665d",
    "username": "hjboylan",
    "name": "Hugh Boylan",
    "role": "user"
}
```


<a name="delete-user">
#### Delete User
Remove user

- @body password 

