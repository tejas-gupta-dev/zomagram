const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

const routerr = express.Router();



routerr.get("/:id",
    authMiddleware.authusermiddleware,
    foodPartnerController.getFoodPartnerById)

module.exports = routerr;