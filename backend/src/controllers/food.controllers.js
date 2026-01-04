const foodmodel = require('../models/food.model');
const service = require('../services/storage.service')
const { v4: uuid } = require('uuid')
const likeModel = require("../models/likes.model")
const saveModel = require("../models/save.model")


async function createfood(req,res) {
    
    const resultnew = await service.dal(req.file.buffer, uuid());
    const fooditem = await foodmodel.create({
        name: req.body.name,
        description: req.body.description,
        video: resultnew.url,
        foodpartners: req.foodpartners._id,
    })
    res.status(201).json({
        message: "fooditem created",
        food: fooditem,
    });
}

async function getfooditems(req, res) {
    const foodItems = await foodmodel.find({});
    res.status(200).json({
        message: "get all food",
        foodItems,
    })
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodmodel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodmodel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodmodel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodmodel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}


module.exports = {
    createfood,
    getfooditems,
    likeFood,
    saveFood,
    getSaveFood
}
