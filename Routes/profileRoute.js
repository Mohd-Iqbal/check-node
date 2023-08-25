import { User,validateUser } from "../Models/registerationModel.js";
import bcrypt from "bcrypt"
import express from "express";
import Joi from "joi"
import Authenticate from "../Middlewares/Authenticate.js";
const router = express.Router();

router.post("/", Authenticate ,async (req,res)=>{
    const schema = validateUser();
    const {error} =  schema.validate(req.body);
     if(error) return res.status(400).json({message:error.details[0].message})   
     
     const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password,salt);
     
     try{
         const updateUser = await User.findByIdAndUpdate(req.id,{...req.body});
         if(!updateUser) return res.status(400).json({message:"User Not Found."})
         const user = await User.findById(updateUser._id)
        const token =  user.generateToken();
        res.cookie("jwtToken",token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly:false
        }).json({data:user});
    }
    catch(err){
        res.json({message:err.message})
    }
}
)

router.post("/options", Authenticate ,async (req,res)=>{
    const schema = validateOption();
    const {error} =  schema.validate(req.body);
     if(error) return res.status(400).json({message:error.details[0].message})   
     
     try{
     const userPre = await User.findById(req.id)
     if(!userPre) return res.status(400).json({message:"User Not Found."})
     const options = [...userPre.options,req.body.newOption]
     
     const updateUser = await User.findByIdAndUpdate(userPre._id,{options: options});
     const user = await User.findById(updateUser._id)

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

let schema
function validateOption () {
    return schema = Joi.object({
        newOption: Joi.string()
    });
}

export default router;
