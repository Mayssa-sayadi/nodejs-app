const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
exports.registerController = async (req, res) => {
    try{
      const { userName, email, password, phone, address,answer } = req.body;
      //validation
      if (!userName || !email || !password || !phone || !address ||!answer) {
        return res.status(500).send({
          success: false,
          message: "please provide all fields",
        });
      }
      //check user
      const existing = await userModel.findOne({ email });
      if(existing){
        return res.status(500).send({
            succes:false,
            message:'email already registred please login'
        })
      }
      //hashing password
      var salt=bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password,salt)
      //create new user
      const user = await userModel.create({userName,email,password:hashedPassword,phone,address,answer})
      res.status(201).send({
        success:true,
        message:"successfly Registered"
      })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'error in register API',
            err
        })
    }
};
exports.loginController = async (req,res) => {
    try {
      const { email, password } = req.body;
      //validation
      if ( !email || !password ) {
        return res.status(400).send({
          success: false,
          message: "please provide email or password",
        });
      }
      //check user 
      const user = await userModel.findOne({ email});
      if (!user) {
        return res.status(404).send({
          succes: false,
          message: "USER NOT FOUND",
        });
      }
    //  check user password |compare password
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).send({
            success:false,
            message:"invalid Credentials"
        })
    }
    //token 
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    user.password = undefined;
    //en cas de succés
      res.status(200).send({
        success: true,
        message: "Login successfully",
        token,
        user,
      });
      
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "error in register API",
        err,
      });
    }
}
