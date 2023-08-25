import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
// import cors from "cors"
import mongoose from "mongoose"
import users from "./Routes/signUpRoutes.js"
import login from "./Routes/loginRoute.js"
import profile from "./Routes/profileRoute.js"
import todo from "./Routes/todoRoutes.js"
import * as dotenv from "dotenv"


dotenv.config()

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://64e8b79008d2d8259c6633ba--starlit-puffpuff-146583.netlify.app');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
app.use(cookieParser())
app.use(morgan("tiny"))
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials:true, 
//     methods: 'GET,POST,PUT,DELETE,OPTIONS',
//     allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
// }))
app.use(express.json())

app.get("/",(req,res) => {
    res.send("hello from the server")
})

app.use("/api/signup",users)
app.use("/api/login",login)
app.use("/api/profile",profile)
app.use("/api/todo",todo)

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://iqbal:123ithinkso123@cluster0.vzl69kn.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log(`Connected to mongodb...`)})


app.listen(process.env.PORT,()=>{
    console.log("Server connected to http://localhost:8080")
})