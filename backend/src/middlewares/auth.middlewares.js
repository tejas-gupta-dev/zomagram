const foodpartners = require('../models/foodpartner.model');
const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken');

async function authfoodpartnermiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "login first"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const foodpartner = await foodpartners.findById(decoded.id);
        req.foodpartners = foodpartner;
        next()
        

    } catch (err) {
        res.status(401).json({
            message: "invalid token"
        });
    }
}

async function authusermiddleware(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "login first"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await usermodel.findById(decoded.id);
        req.user = user;
        next()
        

    } catch (err) {
        res.status(401).json({
            message: "invalid token"
        });
    }
}

module.exports = {
    authfoodpartnermiddleware,
    authusermiddleware,
}
