import express from "express"
import {User} from "../models/userModel.js"
import {
    getMyProfile,
    login,register,logout,
} from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.get("/me",isAuthenticated,getMyProfile)

router.post("/register",register)

router.post("/login",login)

router.get("/logout",logout)

//chaining of same routes but different methods
//router.route("/userid/:id").get(getUserId)

export default router