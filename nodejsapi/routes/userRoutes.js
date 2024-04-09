import express from "express"
import {User} from "../models/userModel.js"
import { getAllUsers,
    createNewUser,
    special,
    getUserId,
    updateUserId,
    deleteUserId
} from "../controllers/user.js"

const router = express.Router()

router.get("/all",getAllUsers)

router.post("/new",createNewUser)

router.get("/special",special)

//chaining of same routes but different methods
router.route("/userid/:id").
get(getUserId).
put(updateUserId).
delete(deleteUserId)

export default router