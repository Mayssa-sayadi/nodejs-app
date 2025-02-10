const express = require('express');
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDb = require('./config/db');
//dotenv configuration
dotenv.config()
//DB connection
connectDb();
//reset object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
// app.get('/',(req,res)=>{
//     return res.status(200).send('<h1>Welcom to food server</h1>')
// })
//route
app.use('/api/v1/auth',require('./routes/authRoute'));
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/restaurants", require("./routes/restaurantRoute"));
app.use("/api/v1/categories", require("./routes/categoryRoute"));
app.use("/api/v1/foods", require("./routes/foodRoute"));


const PORT =process.env.PORT || 8080;   

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.white.bgMagenta);
})