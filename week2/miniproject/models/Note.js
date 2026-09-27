const mongoose=require('mongoose')
const notSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
},{
        timestamps:true
    }
)