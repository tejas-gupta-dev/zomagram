const foodpartners = require('../models/foodpartner.model');
const foodmodel = require('../models/food.model');

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodpartners.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodmodel.find({ foodpartners: foodPartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodpartners: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

module.exports = {
    getFoodPartnerById
};