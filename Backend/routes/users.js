const express = require('express');
const {signin,signup} = require('../controllers/user');

const router = express.Router();
router.post('/signin',signin);
router.post('/signup',signup);
// router.post('/verifyotp',verifyOtp);
module.exports = router;
