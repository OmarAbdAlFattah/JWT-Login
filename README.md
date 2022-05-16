# JWT-Login
Make sure to have nodejs, express, bcrypt, jwt, pgtools and Pool installed and included to your project and make sure that you have PostgresQL Database on your PC.

# How to run?
The file index.js is the starting point, so "node index.js" or " nodemon index.js" if you have nodemon installed.

#What Does this project has to offer?
This project is using nodejs, expresss and Postgresql Database, it is a simple project that has Three endpoints: 

1- http://localhost:[PORT_NUMBER]/signup
  This endpoint takes two arguments:
{
    "username": ...,
    "userpassword": ...
}
 Adds a row in a Table in the DB, hashes the password using bcrypt. Username doesn't have to be unqie.

2- http://localhost:[PORT_NUMBER]/login
Acts as a login where it searchs for the username and password in the database and authenticates them and generates the JW Token and adds it to the DB. 
Responds with the Token.
{
    "username": ...,
    "userpassword": ...
}

3- http://localhost:[PORT_NUMBER]/welcome
This endpoint takes the JWT and if it maches the token in the DB it responds with dummy static data meaning that it is a match. the file auth.js contains the logic for such verification
{
    "token": ...
}

# JWT Key Generation
As you can see in index.js, both the ruets Login and Signup generate JWT using a Key. As a practise I put the key in a .env file and hid it using the gitignore, so make sure to create a .env file in the root directory.

