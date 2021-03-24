# comment-system
## Description
It is a project where new users can be registered, each of them can create different topics that are of interest to them, and in turn comment on the topics of other users.
## Tech
This is a project is developed with the following technologies
- [NodeJS] - evented I/O for the backend!
- [MongoDB] - non-relational database!
- [Express] - fast node.js network app framework!

## Instalation
Require NodeJS v10+. Perform the following steps
- Clone the repo
- Install npm dependencies: npm install

## Function
### User
#### Register a New User
<img src="./diagrams/icons/POST.svg" alt="drawing" height="17"/> **/api/registerr**

```JAVA
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "leand",
    "surname": "gutierrez",
    "email": "emanleand@gmail.com",
    "password": "******"
}'
```
##### Response
```JSON
    "user": {
        "_id": "605b90cee3b76a5c7d33184d",
        "name": "leand",
        "surname": "gutierrez",
        "email": "emanleand@gmail.com",
        "role": "ROLE_USER",
        "image": null,
        "__v": 0
    }
```
#### Update User
<img src="./diagrams/icons/PUT.svg" alt="drawing" height="17"/> **/api/update**

```JAVA
--header 'Content-Type: application/json' \
--header 'Authorization: <Token>' \
--data-raw '{
    "name": "leand",
    "surname": "gutierrez",
    "email": "emanleand@gmail.com"
}'
```
##### Response
```JSON
{
    "user": {
        "_id": "603d59dde563db5d490c1877",
        "name": "leand modified",
        "surname": "gutierrez modified",
        "email": "emanleand@gmail.com",
        "role": "ROLE_USER",
        "image": "Vx9wlhuTYgHOlUcFVgNME5Jt.png",
        "__v": 0
    }
}
```
#### Upload User Avatar
<img src="./diagrams/icons/POST.svg" alt="drawing" height="17"/> **/api/upload-avatar**
```JAVA
--header 'Authorization: <Token>' \
--form-data '{
    "file": "image.png"
}'
```
##### Response
```JSON
{
    "user": {
        "_id": "603d59dde563db5d490c1877",
        "name": "leand",
        "surname": "gutierrez",
        "email": "emanleand@gmail.com",
        "role": "ROLE_USER",
        "image": "9DmnLMnWeVakSaptZG2QCfCL.png",
        "__v": 0
    }
}    
```
#### Get User Avatar
<img src="./diagrams/icons/GET.svg" alt="drawing" height="17"/> **/api/get-avatar/image.png**
##### Response
```IMAGE
image 
```

#### Get User by Id
<img src="./diagrams/icons/GET.svg" alt="drawing" height="17"/> **/api/user/{id}**
##### Response
```JSON
    {
    "user": {
        "_id": "603d59c1e563db5d490c1875",
        "name": "leand",
        "surname": "gutierrez",
        "email": "emanleand@gmail.com",
        "role": "ROLE_USER",
        "image": null,
        "__v": 0
    }
}
```

#### List all User
<img src="./diagrams/icons/GET.svg" alt="drawing" height="17"/> **/api/user/list**

##### Response
```JSON
   {
        "users": [
            {
                "_id": "603d59c1e563db5d490c1875",
                "name": "leand",
                "surname": "gutierrez",
                "email": "emanleand@gmail.com",
                "role": "ROLE_USER",
                "image": null,
                "__v": 0
            },
            {
                "_id": "603d59c1e563db5d490c1875",
                "name": "Ali",
                "surname": "zeta",
                "email": "soled@gmail.com",
                "role": "ROLE_USER",
                "image": null,
                "__v": 0
            },
        ]
    }
```

### Login User
<img src="./diagrams/icons/GET.svg" alt="drawing" height="17"/> **/api/login**

```JAVA
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "emanleand@gmail.com",
    "password": "******",
    "gettoken": true
}'
```

##### Response
**if not send gettoken**
```JSON
    {
    "data": {
        "_id": "603d59c1e563db5d490c1875",
        "name": "leand",
        "surname": "gutierrez",
        "email": "emanleand@gmail.com",
        "role": "ROLE_USER",
        "image": null,
        "__v": 0
    }
}
```
**if send gettoken**
```JSON
    {
        "token": "eyJ0eXAiOiJ.."
    }
```

## Deploy

**Free Software, Hell Yeah!**
[NodeJS]: <http://nodejs.org>