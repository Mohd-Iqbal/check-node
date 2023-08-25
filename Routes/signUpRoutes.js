import { User,validateUser } from "../Models/registerationModel.js";
import bcrypt from "bcrypt"
import express from "express";
import Authenticate from "../Middlewares/Authenticate.js";
const router = express.Router();

router.get("/", Authenticate,async (req,res)=>{
    try{
     let user = await User.findOne({_id: req.id});
     if(!user) return res.status(400).json({message:"No User Found with given ID."})
     res.json({user:user})
    }
    catch(err){
        res.json({message:err.message})
    }
})

router.post("/", async (req,res)=>{
    const schema = validateUser();
    const {error} =  schema.validate(req.body);
     if(error) return res.status(400).json({message:error.details[0].message})   

     let user = await User.findOne({email: req.body.email});
     if(user) return res.status(400).json({message:"User already registered."})

    user = await new User({...req.body});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    try{
        await user.save();
        const token =  user.generateToken();
        res.cookie("jwtToken",token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly:false
        }).json({data:user});
    }
    catch(err){
        res.json({message:err.message})
    }
})

export default router;


