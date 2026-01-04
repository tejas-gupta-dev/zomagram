const express = require('express');
const authcontroller = require('../controllers/auth.controllers');

const router = express.Router();



router.get("/me", authcontroller.authMe);

router.post('/user/register', authcontroller.registeruser);
router.post('/user/login', authcontroller.loginuser);
router.get('/user/logout', authcontroller.logoutuser);

router.post('/food-partner/register', authcontroller.registerfoodpartner);
router.post('/food-partner/login', authcontroller.loginfoodpartner);
router.get('/food-partner/logout', authcontroller.logoutfoodpartner);


module.exports = router;
