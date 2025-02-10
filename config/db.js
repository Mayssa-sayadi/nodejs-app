// connect to mongoose database 
const mongoose = require('mongoose')
const colors = require('colors')
const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log(`Database connected: ${mongoose.connection.host}`.cyan),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 secondes pour la sélection du serveur
        socketTimeoutMS: 45000,} // 45 secondes pour l'attente d'une réponse
    }catch(err){
        console.log("DB Error",err);
        process.exit(1);
    }
};
module.exports = connectDb; 