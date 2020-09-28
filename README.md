API Documentation

baseURL: https://mern-stack-shop-app.herokuapp.com/api

(post) /user/register
Media type: application/json
Example json:
{
	"name": "Andrew",
	"lastName": "qwerty",
	"email": "drew24n@gmail.com",
	"password": "12345"
}

(post) /user/login
Media type: application/json
Example json:
{
    "email": "drew24n@gmail.com",
    "password": "12345"
}

(get) /user/auth
Response example:
{
    "isAuth": true,
    "email": "drew24n@gmail.com",
    "name": "Andrew",
    "lastName": "qwerty",
    "role": 0
}

(get) /user/logout