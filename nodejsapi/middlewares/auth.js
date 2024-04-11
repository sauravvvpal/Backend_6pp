import {User} from "../models/userModel.js"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

export const isAuthenticated  = async(req,res,next)=>{
   const {token} = res.cookie

   if(!token) return res.status(404).json({
    success:false,
    message:"Login First"
   })

   const decoded = jwt.verify(token,process.env.JWT_SECRET)

   req.user = await User.findById(decoded._id)
   next()
  
}