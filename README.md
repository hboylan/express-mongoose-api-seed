# express-mongoose-api-seed

## File structure

* **/config.js** Configuration info for port, DB, session, etc.
* **/app.js** Load and serve API resources
* **/controllers** Contains API endpoint controllers
* **/lib** Contains NodeJS helpers
  * **/lib/settings.js** API settings

  * **/lib/database.js** Mongoose connection helper

  * **/lib/routes.js** API endpoints

  * **/lib/utils.js** API helper functions

* **/models** Contains Mongoose models
  * **/models/index.js** Declare models to use

  * **/models/user.js** User model schema declaration

* **/public** ExpressJS will statically serve this directory, *served from memory*

* **/tests** Vows test files
  * **/tests/data.json** Test data

  * **/tests/user-test.js** Create, login, logout, remove user

## Routes
## *Notes*
>* ###### *@session_role*
>* @body   = POST param 
>* @param = URL param /user/:param 
>* (options)

### [User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-user-routes)
 |                       |  
-------------  | ------------------------- | ----------------------------------------------------------------------------------------------------------------
`POST`         | /user                     | [Create User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-create-user)
`POST`         | /user/login               | [Login User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-login-user)
`POST`         | /user/logout              | [Logout User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-logout-ue-profile)
`GET`          | /user/auth                | [Auth User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-auth-user)
`GET`          | /user/:role               | [List Users](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-list-users)
`GET`          | /user/:uid                | [Show User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-show-user)
`DELETE`       | /user/:uid                | [Delete User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-delete-user)

- - -

# User Routes

## Create User
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


## Login User
Create user session

- @body email  
- @body password
Same as [Show User](https://bitbucket.org/hboylan/nomadicfitness-api/overview#markdown-header-show-user)


## Logout User

Destroy user session 

## Auth User
Check if session is valid  


## List Users
List all user with role

- @param role (user|admin)
```json
[
    {
        "_id": "5307a99ed5539300005a665d",
        "username": "hjboylan",
        "name": "Hugh Boylan",
        "role": "user"
    },
    {
        "_id": "5307a99ed5539300005a676e",
        "username": "thinkerton",
        "name": "John Barnack",
        "role": "admin"
    }
]
```


## List User Workouts
List user workouts

- @param uid
```json
[
    {
        "_id": "5307a99ed5539300005a665d",
        "username": "hjboylan",
        "name": "Hugh Boylan",
        "role": "user"
    }
]
```


## Show User
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


## Delete User
Remove user

- @body password 

