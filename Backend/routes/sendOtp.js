const express = require('express');
const router = express.Router();
const {verifyEmail} = require('../controllers/user');

router.get('/auth',async(req,res)=>{
    const otp = await verifyEmail(req.query.id);
    res.status(200).send(otp);
})

module.exports = router;
