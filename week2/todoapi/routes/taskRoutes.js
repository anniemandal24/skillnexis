const express= require('express');
const router=express.Router();
const Task=require('../models/Task');

router.post("/",async(req,res)=>{
    try{
        const task=new Task(req.body);
        const savedTask=await task.save();
        res.status(201).json(savedTask);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get("/",async(req,res)=>{
    try{
        const task=await Task.find();
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
router.put("/:id",async(req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
router.delete("/:id",async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
module.exports=router;