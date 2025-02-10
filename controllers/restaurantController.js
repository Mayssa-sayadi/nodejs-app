const Restaurant = require('../models/restaurantModel')
exports.createRestaurantController = async(req,res) => {
    try{

//recuperer les donnees de body
        const {
            restaurantName,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        }= req.body;
//validation
        if(!restaurantName || !foods || !coords ){
            res.status(500).send({
             success: false,
             message: "please provide restaurant name, foods and coords",
            });
        }
// create restaurant 
const restaurant =await Restaurant.create({
  restaurantName,
  imageUrl,
  foods,
  time,
  pickup,
  delivery,
  isOpen,
  logoUrl,
  rating,
  ratingCount,
  code,
  coords,
});

res.status(201).json({ data: restaurant });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in create restaurant api',
            error
        })

    }
}


exports.getAllRestaurantController = async(req,res)=>{
    try {
      const restaurants = await Restaurant.find({});

      // Vérifier si des restaurants existent
      if (restaurants.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Aucun restaurant trouvé",
        });
      }
      res.status(200).json({ results: restaurants.length, data: restaurants });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in get all restaurant api",
        error,
      });
    }
}
exports.getRestaurantByIdController = async (req,res) =>{
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
          return res.status(404).json({
            success: false,
            message: `Aucun restaurant trouvé pour ce ID : ${id}`,
          }); 
        }
        res.status(200).json({ data: restaurant }); 
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in get all restaurant api",
        error,
      });
    }
}
exports.deleteRestaurantController = async (req,res)=>{
    try {
    const {id}=req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `Aucun restaurant trouvé pour ce ID : ${id}`,
      }); 
    } 
    res.status(204).send({
        success: true,
        message: 'restaurant delete '
    });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in get all restaurant api",
        error,
      });
    }
}