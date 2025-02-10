const express = require('express')
const {registerController,
        loginController
} = require('../controllers/authController');

//router object
const router = express.Router()

//routes 


router.post('/register',registerController);
router.post("/login",loginController);

//export
module.exports = router;