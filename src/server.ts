import express from "express";
import cors from "cors"
import api from "./api/routes"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", api)
const port = +process.env.SERVER_PORT!

app.listen(port, () => {
    console.log("Server is running");
})