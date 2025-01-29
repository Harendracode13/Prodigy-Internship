import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
	origin: process.env.CORS_ORIGIN,
	Credential: true
}))
app.use(express.json({limit:"5kb"}))
app.use(express.urlencoded({extended:true,limit:"5kb"}))
app.use(express.static("public"))

app.use(cookieParser()) 

//router import
import userRouter from "./route/user.route.js"

//outer declaration

app.use("/api/v1/users",userRouter)

export { app };