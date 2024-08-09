const express = require('express');
const User = require("../models/user");

const router = express.Router();


 router.get('/',(req,res) =>{
    res.render('signUp');
});



router.post("/submit", async(req,res) => {
    const body = req.body;
    console.log(body); 

  const result = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    });

});

module.exports=router;



