import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from 'url';
import mongoose from "mongoose"
import users from "./Routes/signUpRoutes.js"
import login from "./Routes/loginRoute.js"
import profile from "./Routes/profileRoute.js"
import todo from "./Routes/todoRoutes.js"
import * as dotenv from "dotenv"


dotenv.config()

const app = express()

  
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(express.json())


app.use("/api/signup",users)
app.use("/api/login",login)
app.use("/api/profile",profile)
app.use("/api/todo",todo)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/dist")))

app.get("*",(req,res) => {
  const file = path.join(__dirname, "/dist/html.index")
  if(file) {
    res.sendFile(file)
  } else {
    res.status(500).send("something wrong happen")
  }
})

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://iqbal:123ithinkso123@cluster0.vzl69kn.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log(`Connected to mongodb...`)})

app.listen(process.env.PORT,()=>{
    console.log("Server connected...")
})