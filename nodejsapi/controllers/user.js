import {User} from "../models/userModel.js"

export const getAllUsers = async(req,res)=>{

    const users = User.find({})
   res.json({
       success:true,
       users,
   })
}

export const createNewUser = async(req,res)=>{

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
}

export const special = (req,res)=>{
    res.json({
        success:"true",
        message: "Just joking"
    })
}

export const getUserId = async(req,res)=>{
    const {id} = req.params
    const users = await User.findById(id)

    res.json({
        success:"true",
        users,
    })
}

export const updateUserId = async(req,res)=>{
    const {id} = req.params
    const users = await User.findById(id)

    res.json({
        success:"true",
        message:"updated user",
    })
}

export const deleteUserId = async(req,res)=>{
    const {id} = req.params
    const users = await User.findById(id)

    res.json({
        success:"true",
        message:"user deleted",
    })
}



