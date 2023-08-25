import { User } from "../Models/registerationModel.js";
import Joi from "joi";
import bcrypt from "bcrypt"
import express from "express";
const router = express.Router();

router.post("/", async (req,res)=>{
    const schema = validateUser();
    const {error} =  schema.validate(req.body);
     if(error) return res.status(400).json({message:error.details[0].message})   
     try{
         let user = await User.findOne({email: req.body.email});
         if(!user) return res.status(400).json({message:"Invalid Email or Password."})
         
         await bcrypt.compare(req.body.password, user.password,function(err, result) {
             if (err) {throw (err)}
             if(result){
                 const token =  user.generateToken();
                 return res.cookie("jwtToken",token, {
                     expires: new Date(Date.now() + 25892000000),
                     httpOnly:false
                 }).json({id:user._id.valueOf()});
             }else{
              return res.status(400).json({message:"Invalid Email or Password."})
             }
            });
    }
    catch(err){
        res.json({message:err.message})
    }
})

let schema;
function validateUser () {
    return schema = Joi.object({
        email:Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),

        password: Joi.string()
        .min(5)
        .max(255)
        .required(),
    });
}

export default router;
