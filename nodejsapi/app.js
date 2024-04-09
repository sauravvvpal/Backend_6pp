import express from "express";
import mongoose from "mongoose"

const app = express()

mongoose.connect("mongodb://localhost:27017",{
  dbName:"nodejsapi",
}).then(()=>console.log("database connected")).catch((e)=>console.log(e))

const schema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = mongoose.model("User",schema)


//using middlewares

app.use(express.json())



app.get("/users/all",async(req,res)=>{

     const users = User.find({})
    res.json({
        success:true,
        users,
    })
})

app.post("/users/new",async(req,res)=>{

    const {name,email,password} = req.body
  await User.create({
    name,
    email,
    password,
  })
   res.status(201).json({
       success:true,
       message:"Registered Successfully",
   })
})

app.get('/',(req,res)=>{
    res.send("NIce working")
})

app.get("/users/special",(req,res)=>{
    res.json({
        success:"true",
        message: "Just joking"
    })
})

app.get("/userid/:id",async(req,res)=>{
    const {id} = req.params
    const users = await User.findById(id)

    res.json({
        success:"true",
        users,
    })
})

app.listen(4000,()=>{
    console.log("server is working")
})