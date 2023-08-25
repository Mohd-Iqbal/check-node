import jwt from "jsonwebtoken"

export default function Authenticate(req,res,next){
    try {
    if(req.cookies){
        const token = req.cookies.jwtToken
        if(!token) return res.status(401).json({message:"Access denied. No token provided."})
        const verifyToken = jwt.verify(token,"jwtPrivateKey")
        req.id = verifyToken.id;
        req.body = req?.body
        next()
    }
} catch (err) {
    res.send({message:err.message})
}}