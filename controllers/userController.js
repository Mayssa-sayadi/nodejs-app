const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
exports.getUserController = async (req,res) =>{
try{
//find user
const user = await userModel.find({_id:req.body.id})

//validation
if(!user){
    return res.status(404).send({
        success:false,
        message:'user not found'
    })
}
//hiden password
user.password= undefined;
//res
res.status(200).json({ data: user });
}catch(err){
    console.log(err)
    res.status(500).send({
        success:false,
        message:"error in get user API"
    })
}
}
exports.updateUserController = async (req,res) =>{
    try{
      // Vérifier si l'ID est bien fourni
      if (!req.params.id) {
        return res.status(400).send({
          success: false,
          message: "User ID is required",
        });
      }
      //find user and update
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          userName: req.body.userName,
          phone: req.body.phone,
          address: req.body.address,
        },
        {
          new: true, // Retourner le user mis à jour
        }
      );
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "there is no user for this id",
        });
      }
      //response
      res.status(200).json({ data: user });
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'error in update user api',
        })
    }
}
exports.updatePasswordController = async (req, res) => {
  try {
    // Trouver l'utilisateur
    const user = await userModel.findById(req.body.id);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    // Récupérer les données envoyées par l'utilisateur
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Vérifier si le mot de passe actuel est correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid current password",
      });
    }

    // Hachage du nouveau mot de passe
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe
    user.password = hashedPassword;
    await user.save();

    // Réponse réussie
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
      error: err.message,
    });
  }
};


exports.resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    // Vérification des champs requis
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "All fields are required (email, newPassword, answer).",
      });
    }

    // Recherche de l'utilisateur par email
    const user = await userModel.findOne({ email });

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // Vérification de la réponse secrète (ex: réponse à une question de récupération)
    if (user.answer !== answer) {
      return res.status(400).send({
        success: false,
        message: "Invalid security answer.",
      });
    }

    // Hachage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mise à jour du mot de passe
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in password reset API.",
      error: err.message,
    });
  }
};
exports.deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Your account has been deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in delete user API.",
      error: err.message,
    });
  }
};