import express, { urlencoded } from "express";
import path from "path";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

mongoose.connect("mongodb://localhost:27017",{
  dbName:"Baccckend",
}).then(()=>console.log("database connected")).catch((e)=>console.log(e))

const userSchema = new mongoose.Schema({
  name:String,
  email: String,
  password: String,
})

const User = mongoose.model("Users",userSchema)

const app = express();

//const users = [];

//using middlewares

// statically serve data (basically frontend ke liye use krte hai)
app.use(express.static(path.join(path.resolve(), "views")));
app.use(urlencoded({ extended: true })); //form me se data access kar paenge
app.use(cookieParser())

// setting up view engine
app.set("view engine", "ejs");

const isAuthenticated = async (req,res,next)=>{
  const {token} = req.cookies

  if(token) {
    const decoded = jwt.verify(token,"sauravpal")
    req.user = await User.findById(decoded._id)
    next()
  }
  else res.redirect("/login")
}

app.get("/",isAuthenticated, (req, res) => {
  console.log(req.user)
  res.render("logout",{name:req.user.name})
}); 

app.get("/register", (req, res) => {
  res.render("register")
}); 

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/register",async(req,res)=>{
   
  const {name,email,password} = req.body
  console.log(password)


  let userr = await User.findOne({email})
  if(userr){
  return res.redirect("/login")
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const user = await User.create({
    name,email,password:hashedPassword
  })

  const token = jwt.sign({_id:user._id},"sauravpal")
  // console.log(token)

  res.cookie("token",token,{
    httpOnly:true,
    expires:new Date(Date.now()+60*1000)
  })
  res.redirect("/")
})

app.post("/login",async(req,res)=>{
   
  const {email,password} = req.body
  let user = await User.findOne({email})

  if(!user) return res.redirect("/register")

  const isMatch =  bcrypt.compare(password,user.password)
  if(!isMatch) return res.render("login",{email,message:"incorrect password"})

  const token = jwt.sign({_id:user._id},"sauravpal")
  res.cookie("token",token,{
    httpOnly:true,
    expires:new Date(Date.now()+60*1000)
  })
  res.redirect("/")
  
})

app.get("/logout",(req,res)=>{
  res.cookie("token",null,{
    httpOnly:true,
    expires:new Date(Date.now())
  })
  res.redirect("/")
})

// app.get("/add",async(req,res)=>{
//  await Messge.create({name:"Saurav",email:"saurav@gmail.com"}).catch((e)=>console.log(e))
//   res.send("nice")
// })

// app.get("/success",(req,res)=>{
//     res.render("success")
// })

// app.post("/contact", async(req, res) => {
//   const {name,email} = req.body
//   await Messge.create({name, email}).catch((e)=>console.log(e))
//   res.redirect("/success")
// });

// app.get("/users",(req,res)=>{
//     res.json({users,})
// })

app.listen(5000, () => {
  console.log("server started");
});
