const express = require('express');
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController
} = require("../controllers/userController");
const authmiddlewares = require('../middlewares/authmiddlewares');

//router object
const router = express.Router()

//routes GET /POST/UPDATE/DELETE


router.get('/getUser',authmiddlewares,getUserController)
router.put('/updateUser',authmiddlewares,updateUserController)
router.post("/updatePassword",authmiddlewares,updatePasswordController)
router.post("/resetPassword", authmiddlewares,resetPasswordController);
router.delete("/deleteUser/:id", authmiddlewares, deleteUserController);

//export
module.exports = router;