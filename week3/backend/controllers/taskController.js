const Task=require("../models/Tasks")
const getTask=async(req,res)=>{
    try{
        const tasks=await Task.find({user:req.user})
        res.json(tasks)
    }
    catch(error){
        res.status(500).json({message:"Server error"})
    }
}
const createTask=async (req,res)=>{
    try{
        const { title, description } = req.body;
        const task=await Task.create({
            title,
            description,
            user:req.user
        })
        res.status(201).json(task)
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}
const updateTask=async(req,res)=>{
    try{
        const {title,description,completed}=req.body
        const task=await Task.findOne({_id:req.params.id,user:req.user})
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        task.title=title??task.title;
        task.description=description??task.description;
        task.completed=completed??task.completed;
        await task.save();
        res.json(task)
    }
    catch(error){
        return res.status(500).json({message:"server error"})
    }
}
const deleteTask=async(req,res)=>{
    try{
        const task=await Task.findOne({_id:req.params.id,user:req.user})
        if(!task){
            return res.status(404).json({message:"Task not found!"})
        }
        await task.deleteOne();
        res.json({message:"Task deleted Successfully!"})
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}
module.exports={
    getTask,
    createTask,
    updateTask,
    deleteTask
}