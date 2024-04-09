import express from "express";
import userRouter from "./routes/userRoutes.js"
import { connectDB } from "./data/database.js";
import { config } from "dotenv";

export const app = express()

config({
    path:"./data/config.env"
})

connectDB()

//using middlewares
app.use(express.json())
app.use("/users",userRouter)

