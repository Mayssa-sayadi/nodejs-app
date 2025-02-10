const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, 'category title is required']
    },
    imageUrl:{
        type:String,
        default:'https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg'
    }

},{timestamps:true})


const category= mongoose.model('Category',categorySchema);
module.exports = category;