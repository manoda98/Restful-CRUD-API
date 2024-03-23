const express = require('express')
const mongoose = require('mongoose')
const Product =  require('./models/productModel')
const app = express()

app.use(express.json())

//routes

app.get('/' , (req , res) => {
    res.send('Hello NODE API')
})

app.get('/blog' , (req , res) => {
    res.send('Hello Blog my name is manoda')
})
 app.post('/product',async(req,res) => {
    try {
        console.log(req.body)
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
 })


mongoose.set("strictQuery" , false)

mongoose.connect('mongodb+srv://manoda:Imedha2003@cluster0.wqw0c66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000 , ()=> {
        console.log('node API app is running on port 3000')
    })
    
}).catch((error) => {
    console.log(error)
})