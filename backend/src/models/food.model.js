const mongoose = require('mongoose');

const foodschema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
     },
     video: {
        type: String,
        required: true,
     },
     description: {
        type:String,
     },
     foodpartners: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartners"
     },
     likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})

const foodmodel = mongoose.model("food", foodschema);

module.exports = foodmodel;