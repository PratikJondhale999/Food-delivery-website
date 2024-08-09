const express = require('express');
const router = express.Router();

// Logout route
router.post('/', (req, res)=>{
    res.clearCookie("BlogApplication");
    const userName = req.userName;
    res.redirect('signin');
});
module.exports = router;
