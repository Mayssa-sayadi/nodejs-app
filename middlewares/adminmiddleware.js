const User = require("../models/userModel");



module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      // Vérifier si l'utilisateur existe
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only admin access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized access",
      error,
    });
  }
};
