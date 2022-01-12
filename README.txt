An order system that lets user login and place orders at some selected restaurants.

#################### Installation instructrions ####################

1. You should have MongoDb installed on your computer.
2. Start a first terminal, navigate to the project directory, run "mongod --dbpath='database'" to run MongoDB daemon.
3. Start a second terminal, navigate to the project directory, run "npm install" to install all dependencies for the app.
4. On the second terminal, in the same directory, run "node database-initializer.js" to initialize database.
2. On the second terminal, in the same directory, run "npm start" to start the project's Node.js server on localhost:3000.
3. Go to localhost:3000 on any browser to test the application (recommend Chrome).

#################### Supported Routes ####################

GET/, GET/home: get the homepage

GET/login: get the login page

POST/login: login the user to the server and get a session

GET/logout: logout the user and destroy the session

GET/register: get the sign-up page

POST/register: sign up for new user, login to the server and get a session

GET/users: get the page with all accessible users

GET/users?name=userName: get the page with all the users that match the query

GET/users/:userID: get the specified user information with the given user ID

PUT/users/:userID: update the user information

GET/orders: get the order form page

POST/orders: submit order to server

GET/orders/:orderID: get the specified order information with the given order ID





