const express = require('express');
const foodcontroller = require('../controllers/food.controllers');
const middlewareauth = require('../middlewares/auth.middlewares');
const multer = require('multer');


const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/', middlewareauth.authfoodpartnermiddleware,upload.single("video"), foodcontroller.createfood);
router.get('/',middlewareauth.authusermiddleware, foodcontroller.getfooditems);

router.post('/like',
    middlewareauth.authusermiddleware,
    foodcontroller.likeFood)


router.post('/save',
    middlewareauth.authusermiddleware,
    foodcontroller.saveFood
)


router.get('/save',
    middlewareauth.authusermiddleware,
    foodcontroller.getSaveFood
)



module.exports = router

module.exports = router;