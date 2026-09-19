const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const taskRoutes=require('./routes/taskRoutes');

dotenv.config();
const app=express();
app.use(express.json());
app.use('/api/tasks',taskRoutes);

mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
).catch((error)=>{
    console.error("Error connecting to MongoDB:",error);
})