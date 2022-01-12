const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongo');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./models/userModel");

// Routers
const usersRouter = require('./routers/users-router');
const ordersRouter = require('./routers/orders-router');

// Global variables
app.locals.restaurants = {};
app.locals.resIDs = []
app.locals.resID = 0;

// Setting session store
const store = new MongoDBStore({
    mongoUrl: 'mongodb://localhost/a4',
    collection: 'sessions'
});
store.on('error', (error) => { console.log(error)});

// Middleware
app.set(path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    name: 'a4-session',
    secret: 'this secret',
    cookie:{
        maxAge: 1000*60*60*24*7
    },
    store: store,
    resave: true,
    saveUninitialized: false, 
}));
// Log requests received
app.use((req,res,next)=>{
    console.log(`${req.method}:${req.url}`);
    if (Object.keys(req.body).length >0){
        console.log('Body:');
        console.log(req.body);
    } 
    next();
});

// Server routes
app.use(exposeSession);
app.get(['/', '/home'], (req,res) => res.render('home'));
app.get('/login', checkLoggedin, (req,res) => res.render('login'));
app.post('/login', login);
app.get('/logout', logout);
app.get('/register', checkLoggedin, (req,res) => res.render('register'));
app.post('/register', register);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

// Functions

// Expose session to template engine
function exposeSession(req,res,next){
    if (req.session){
        res.locals.session = req.session;
    }
    next();
}

// Check logged in status of user before let them access login page
function checkLoggedin(req,res,next){
    if (req.session.loggedin){
        res.status(200).send('Already logged in.');
        return;
    }
    next();
}
// Login the user
function login(req,res){
    if (req.session.loggedin){
        res.status(205).send('Already logged in.');
        return;
    }
    const {username, password} = req.body;
    const loginUser = {
        'username': username,
        'password': password,
    };
    User.findOne(loginUser)
    .exec((err,result)=>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        if (result){
            req.session.loggedin = true;
            req.session.username = result.username;
            req.session.userId = result._id;
            res.locals.session = req.session;
            res.status(200).json(result);
        } else{
            res.status(400).send('Wrong username or password');
        }
    });
}

// Logout the user
function logout(req,res){
    if(req.session.loggedin){
		req.session.destroy();
        delete res.locals.session;
        res.redirect('/home');
	}else{
		res.status(200).send("You cannot log out because you aren't logged in.");
	}
}

// Register new user
function register(req,res){
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.privacy = false;
    User.findOne({username: newUser.username})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        if (result){
            res.status(400).send('Duplicate username');
        } else{
            newUser.save((err)=>{
                if (err){
                    res.status(500).send('Server went kaboom');
                    return;
                }
                req.session.loggedin = true;
                req.session.username = newUser.username;
                req.session.userId = newUser._id;
                res.locals.session = req.session;
                res.status(201).json(newUser);
                return;
            })
        }
    })
}

// Connect to database and start server
mongoose.connect('mongodb://localhost/a4', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
    User.init(()=>{
        app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
    })
});