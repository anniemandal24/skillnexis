const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const authRoutes=require('./routes/authRoutes')
dotenv.config();
const app=express()
app.use(express.json())
app.use('/api/auth',authRoutes)
mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on ${process.env.PORT}`)
        })
        
    })
    .catch(
        (error)=>{
            console.log("Error connectiong to MOngoDB",error)
        }
    )