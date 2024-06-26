const express = require('express')
const mongoose = require('mongoose')
const Product =  require('./models/productModel')
const e = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/' , (req , res) => {
    res.send('Hello NODE API')
})

app.get('/blog' , (req , res) => {
    res.send('Hello Blog my name is manoda')
})

 app.post('/products',async(req,res) => {
    try {
        console.log(req.body)
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
 })

 app.get('/products', async(req , res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: ErrorEvent.message})
    }
})

 app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        console.log(id)
        const products = await Product.findById(id);
        //const products = await Product.findById(new mongoose.Types.ObjectId(id));
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a product

app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //cannot find any product in database
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
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