const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();
const User = require("../models/userModel");

router.get('/', getUsers, sendUsers);
router.get('/:userID', getUser, getOrder, sendUser);
router.put('/:userID', updateUser)

// Query database for users
function getUsers(req,res,next){
    let search='';
    if (req.query.name){
        search = req.query.name;
    }
    User.find({
        username: {"$regex" : ".*" + search + ".*", "$options": "i"},
        privacy: false
    })
    .exec((err,result)=>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        req.users = result;
        next();
    });
}

// Render users
function sendUsers(req,res){
    res.format({
        'text/html': () =>{
            res.set('Content-Type', 'text/html');
            res.render('users', {users: req.users});
        },
        'application/json': ()=>{
            res.set('Content-Type', 'application/json');
            res.json(req.users);
        },
        'default': ()=>{res.status(406).send('Not acceptable');} 
    });
}

// Query database for a user
function getUser(req,res,next){
    User.findById(req.params.userID)
    .exec((err,result) =>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        req.requestedUser = result;
        next();
    });
}

// Query database for orders of a given user
function getOrder(req,res,next){
    Order.find({user: req.requestedUser._id})
    .exec((err,result) =>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        req.requestedUser.orders = result;
        next();
    });
}

// Render user
function sendUser(req,res){
    if (req.requestedUser.privacy){
        if (!req.session.loggedin || req.session.userId.localeCompare(req.requestedUser._id.toString())!=0){
            res.status(403).send("You cannot see this user");
            return;
        }
    }
    res.format({
        'text/html': () =>{
            res.set('Content-Type', 'text/html');
            res.render('user', {user: req.requestedUser});
        }
    });
}

// Update user privacy
function updateUser(req,res){
    if (!req.session.loggedin || req.session.userId.toString().localeCompare(req.params.userID)!=0){
        res.status(403).send("You cannot change private mode of this user.");
            return;
    }
    User.findByIdAndUpdate(req.params.userID, req.body)
    .exec((err,result) =>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        res.status(201).json(result);
    });
}
module.exports = router;