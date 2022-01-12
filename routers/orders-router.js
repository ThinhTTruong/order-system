const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/orderModel");

router.get('/', auth, (req,res) => res.render('orders'));
router.post('/', auth, addOrder);
router.get('/:orderID', getOrder, sendOrder);

// Check if a user is logged in
function auth(req,res,next){
    if (!req.session.loggedin){
        res.status(401).send("You can't access this without logging in.");
    }
    else{
        next();
    }
}

// Add an order to database
function addOrder(req,res){
    let newOrder = new Order();
    newOrder.user = req.session.userId;
    newOrder.restaurant = req.body.restaurantName;
    newOrder.subtotal = req.body.subtotal;
    newOrder.tax = req.body.tax;
    newOrder.fee = req.body.fee;
    newOrder.total = req.body.total;
    Object.keys(req.body.order).forEach(id => {
        let newItem = {};
        newItem.name = req.body.order[id].name;
        newItem.quantity = req.body.order[id].quantity;
        newOrder.content.push(newItem);
    });
    newOrder.save((err)=>{
        if (err){
            res.status(500).send('Could not create order');
            return;
        }
        res.status(200).json(newOrder);
    })
}

// Query database for an order
function getOrder(req,res,next){
    Order.findById(req.params.orderID)
    .populate('user')
    .exec((err,result) =>{
        if (err) {
            res.status(500).send("Server went kaboom");
            return;
        }
        req.requestedOrder = result;
        next();
    });
}

// Render an order
function sendOrder(req,res){
    console.log()
    if (req.requestedOrder.user.privacy && req.requestedOrder.user._id.toString().localeCompare(req.session.userId)!=0){
        res.status(403).send("You cannot see this order");
        return;
    }
    res.format({
        'text/html': () =>{
            res.set('Content-Type', 'text/html');
            res.render('order', {order: req.requestedOrder});
        }
    });
}

module.exports = router;