import { Todo , validateTodo } from "../Models/todoModel.js"
import { User } from "../Models/registerationModel.js"
import Authenticate from "../Middlewares/Authenticate.js";
import express from "express";
const router = express.Router();

router.get("/", Authenticate ,async(req,res)=>{
   try {
      let user = await User.findById(req.id);
      if(!user) return res.status(400).json({message:"User Not Found."})
   
      let todos = await Todo.find({userId:req.id})
      if(!todos) return res.status(400).json({message:"Todos Not Found."})
      
      res.json({todoItems:todos})
      
   } catch (err) {
      res.json({message:err.message})
   }
})

router.post("/", Authenticate ,async(req,res)=>{
    const schema = validateTodo();
    const {error} =  schema.validate(req.body);
     if(error) return res.status(400).json({message:error.details[0].message})  

     const obj = {
        userId:req.id,
        ...req.body
     }
     try {
         const todo = await new Todo({...obj})
        await todo.save()
        res.json({todoCreate:todo})
     } catch (err) {
        res.json({message:err.message})
     }
})

router.put("/:id", Authenticate , async(req,res) =>{
   const schema = validateTodo();
   const {error} =  schema.validate(req.body);
    if(error) return res.status(400).json({message:error.details[0].message})  

    const obj = {
      userId:req.id,
      ...req.body
   }
   try {
      const updateTodo = await Todo.findByIdAndUpdate(req.params.id,{...obj})
      if(!updateTodo) return res.status(400).json({message:"Todo Not Found."})
      if(updateTodo) return res.json({message:"Successful."})
   } catch (err) {
      res.json({message:err.message})  
   }
})

router.delete("/:id", Authenticate ,async(req,res) =>{
   try {
      const updateTodo = await Todo.findByIdAndDelete(req.params.id)
      if(!updateTodo) return res.status(400).json({message:"Todo Not Found."})
      if(updateTodo) return res.json({message:"Successful."})
   } catch (err) {
      res.json({message:err.message})  
   }
})

export default router;
