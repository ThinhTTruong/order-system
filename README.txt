Installation instructrions

1. You should have MongoDb installed on your computer.
2. Start a first terminal, navigate to the project directory, run "mongod --dbpath='database'" to run MongoDB daemon.
3. Start a second terminal, navigate to the project directory, run "npm install" to install all dependencies for the app.
4. On the second terminal, in the same directory, run "node database-initializer.js" to initialize database.
2. On the second terminal, in the same directory, run "npm start" to start the project's Node.js server on localhost:3000.
3. Go to localhost:3000 on any browser to test the application (recommend Chrome).


Design Choices

1. I modify the given "database-initializer.js" file to use Mongoose instead of MongoDb.
2. I create and use "orderform.pug" file instead of the given "orderform.html" file.
3. The data for the three restaurants is only stored in the client-side Javascript.
4. I use Pug as template engine for all the pages, with a partials header file to handle navigation header.
5. I have 4 client-side Javascript files to handles on-click events for registration, logging in, orderform and user's private mode change.
6. I have 2 additional routers to handle routes for /users and /orders, and the remaining routes are handled in server.js.
7. I create models for user and order, and store users, orders and sessions in database.

