const JWT = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
      //  Vérifier si le token est fourni
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
      ) {
        return res.status(401).send({
          success: false,
          message: "No token provided, unauthorized access",
        });
      }
      ///  Extraire le token
      const token = req.headers.authorization.split(" ")[1];
      // Vérifier le token
      JWT.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
          return res.status(401).send({
            succees: "false",
            message: "No token provided, un-authorized user",
          });
        } else {
          // Ajouter l'ID de l'utilisateur à la requête
          req.body.id = decode.id;
          next();
        }
      });
    }catch(err){
        console.log(err)
        res.status(500).send({
            succees:'false',
            message:'error in auth API',
            err
        })

    }
};