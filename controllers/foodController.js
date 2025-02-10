const Food = require("../models/foodModel");
const Order = require("../models/orderModel")
exports.createFoodController = async (req, res) => {
  try {
    const { 
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
       isAvailable,
        restaurant,
        rating,
        ratingCount    
    } = req.body;
    //validation
    if (!title||!description||!price||!restaurant||!category) {
      return res.status(500).json({
        success: false,
        message: `please proviade title, description, restaurant, category and price`,
      });
    }
    //create
    const food = await Food.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    //affiche de resultat
    res.status(201).json({ data: food });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create food api",
      error,
    });
  }
};



exports.getAllFoodController = async (req, res) => {
  try {
    const foods = await Food.find({});

    // Vérifier si des foods existent
    if (foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun categorie trouvé",
      });
    }
    res.status(200).json({ results: foods.length, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category api",
      error,
    });
  }
};


exports.getFoodByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: `Aucun food trouvé pour ce ID : ${id}`,
      });
    }
    res.status(200).json({ data: food });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get  food api",
      error,
    });
  }
};
exports.deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: `Aucun food trouvé pour ce ID : ${id}`,
      });
    }
    return res.status(204).json({
      success: true,
      message: "food delete ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all food api",
      error,
    });
  }
};
exports.updateFoodController = async (req, res) => {
  try {
    const document = await Food.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        foodTags: req.body.foodTags,
        category: req.body.category,
        code: req.body.code,
        isAvailable: req.body.isAvailable,
        restaurant: req.body.restaurant,
        rating: req.body.rating,
        ratingCount: req.body.ratingCount,
      },
      {
        new: true, 
      }
    );
    if (!document) {
      return res.status(404).json({
        success: false,
        message: `Aucun food trouvé pour ce ID : ${id}`,
      });
    }

    res.status(200).json({ data: document });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all food api",
      error,
    });
  }
};


exports.placeOrderController = async (req, res) => {
  try {
    const { foodsOrder, payment, buyer } = req.body;

    //  Vérification des champs requis
    if (
      !foodsOrder ||
      !Array.isArray(foodsOrder) ||
      foodsOrder.length === 0 ||
      !payment ||
      !buyer
    ) {
      return res.status(400).json({
        success: false,
        message: "PLEASE PROVIDE PAYMENT, FOODS ORDER, AND BUYER ID",
      });
    }

    //  Vérification des IDs de foods
    const foodItems = await Food.find({ _id: { $in: foodsOrder } });

    if (foodItems.length !== foodsOrder.length) {
      return res.status(404).json({
        success: false,
        message: "Some food items were not found",
      });
    }

    //  Calcul du total
    let total = foodItems.reduce((acc, item) => acc + (item.price || 0), 0);

    //  Création de la commande
    const order = await Order.create({
      foods: foodItems.map((item) => item._id),
      payment,
      buyer,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
      total,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};
//change order status
exports.orderStatusController = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    // Vérifie si l'ID de la commande est fourni
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide a valid order ID",
      });
    }

    const { status } = req.body;

    // Mise à jour de l'état de la commande
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    // Si la commande n'est pas trouvée
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    // Réponse avec les informations de la commande mise à jour
    res.status(200).send({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};
