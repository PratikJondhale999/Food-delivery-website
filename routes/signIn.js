const express = require('express');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
//const { setUser } = require('../service/auth');
const auth = require('../service/auth');
//const { setUser } = require('../service/auth');
//const {getUser} = require('../service/auth');
const router = express.Router();
const  SECRET_KEY = "pratik@139eu2";
const {restrictToLoggedinUserOnly} = require('../middlewares/auth');
const jwt = require('jsonwebtoken');


// Render the signIn page
router.get('/', (req, res) => {
    res.render('signIn');
});

// Handle the login form submission
router.post("/submit", async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundRecord = await User.findOne({ 'email': email });

        if (!foundRecord) {
            return res.send('User not exists');
        }

        if (foundRecord.password === password) {
            
            const originalId = foundRecord._id.toHexString();
            const token = await jwt.sign(originalId,SECRET_KEY);
            res.cookie('fooditem', token);
            return res.redirect('/');
        } else {
            return res.send('Invalid password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
