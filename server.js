require("dotenv").config();

const express = require("express");
const cors = require("cors");
const entryRouter = require("./routes/entryRoutes")
const os = require("os");


const PORT = 5000;

// fix dns problem for mongoose db 
const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const connectDB = require("./config/db")

const app = express();

connectDB()

app.use(cors());
app.use(express.json());

// app.use("/api/entries",entryRouter)

app.use("/api",entryRouter)

app.get("/", (req,res) => {
    res.send ("darji backend running")
} )

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];

    for (const iface of interfaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(`Local URL: http://${iface.address}:${PORT}`);
      }
    }
  }
});