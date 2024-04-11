import express from "express";
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRoutes.js"
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express()

config({
    path:"./data/config.env"
})

connectDB()

//using middlewares
app.use(express.json())
app.use(cookieParser)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)

//using error middleware
app.use(errorMiddleware)
