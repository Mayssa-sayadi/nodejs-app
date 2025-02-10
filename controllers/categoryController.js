const Category = require('../models/categoryModel')
exports.createCategoryController = async(req,res)=>{
    try {
    const { title, imageUrl } = req.body;
//validation
if(!title){
    return  res.status(500).json({
            success: false,
            message: `please proviade title`,
          }); 
}
//create
const category = await Category.create({
    title,imageUrl
})
//affiche de resultat
res.status(201).json({ data: category });

        
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in creating category",
        error,
      });
    }
}
exports.getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({});

    // Vérifier si des categories existent
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun categorie trouvé",
      });
    }
    res.status(200).json({ results: categories.length, data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category api",
      error,
    });
  }
};
exports.getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Aucun category trouvé pour ce ID : ${id}`,
      });
    }
    res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category api",
      error,
    });
  }
};
exports.deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Aucun category trouvé pour ce ID : ${id}`,
      });
    }
    return res.status(204).json({
      success: true,
      message: "category delete ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category api",
      error,
    });
  }
};
exports.updateCategoryController = async(req,res)=>{
  try {
    const document = await Category.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
      },
      {
        new: true, // Retourner le document mis à jour
      }
    );
    if (!document) {
      return res.status(404).json({
        success: false,
        message: `Aucun category trouvé pour ce ID : ${id}`,
      });
    }

    res.status(200).json({ data: document });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category api",
      error,
    });
  }




}