const express = require('express');
const User = require('../models/user');

const auth = require('../middlewares/auth');
const CartModel = require('../models/CartModel');
const fooditem = require('../models/fooditem');
const addfood = require('./addfood');
const cart = require('../models/CartModel');


const router = express.Router();
//const auth = require('./middlewares/auth');

// router.get('/',restrictToLoggedinUserOnly,async(req,res) => {
//     var allfood = [];
//     var totalPrice = 0;
//     var totalAmount = 0;

//     try{
//         const userId = req.payload;
//         const cartAllData = await CartModel.find({userId: userId});

//         const
//     }

// } );


// router.get('/',async(req,res)=>{
//     const allfood = await fooditem.find({});
//     const totalPrice = allfood.reduce((total, item)=>total + item.price,0);
    //console.log(allfood);
  //console.log(allfood);
  //res.status(200).render('cart', { allfood});
  router.get('/', async (req, res) => {
    let allfood = [];
    let totalPrice = 0;
    let discount = 0;
    let totalAmount = 0;

    try {
        const userId = req.payload; // Replace this with how you actually get the user ID from the request
        const cartAllData = await cart.find({  userId: userId });
        //console.log(cartAllData);
        //console.log("fjaoj");
        //console.log(cartAllData);

        const promises = cartAllData.map(async (cart) => {
            const foodItem = await fooditem.findById(cart.fooditemId);
            allfood.push(foodItem);
        });
        await Promise.all(promises);
        //console.log(allfood);
        allfood.forEach((food)=>{
            totalPrice = totalPrice + food.price;
        });

        //console.log(allfood);

        

    } catch (error) {
        console.error('Error fetching cart data:', error);
        return res.render('cart', { allfood, totalPrice, discount, totalAmount });
    }
    res.render('cart', { allfood, totalPrice, discount, totalAmount });
});


router.post('/AddToCart',async (req,res)=>{
    const result = await CartModel.create({
        userId: req.payload,
        fooditemId: req.body.productId,
        paymentStatus: false,
        timestamp: new Date(),
    });
});




router.post('/remove',async (req, res)=>{
    //const fooditemId = req.body.fooditemId;
    //console.log(fooditemId);
    try
    {
        await cart.deleteOne({fooditemId: req.body.fooditemId, userId: req.payload});
    }
    catch(e)
    {
        return res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
    res.status(200).redirect('/cart');
 });
  

module.exports = router;




