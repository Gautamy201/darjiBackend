require("dotenv").config();

const express = require("express");
const cors = require("cors");
const entryRouter = require("./routes/entryRoutes")

// fix dns problem for mongoose db 
const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const connectDB = require("./config/db")

const app = express();

connectDB()

app.use(cors());
app.use(express.json());

// app.use("/api/entries",entryRouter)

app.get("/", (req,res) => {
    res.send ("darji backend running")
} )

app.listen(5000,"0.0.0.0",() => {
    console.log("server running")
    
})