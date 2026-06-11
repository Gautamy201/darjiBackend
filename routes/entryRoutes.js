const express = require("express")
const router = express.Router()

const {createEntry, getEntries, getLatestEntries} = require("../controllers/entryController")

router.post("/createEntry",createEntry)

router.get("/getEntries",getEntries)

router.get("/getLatesEntries",getLatestEntries)



module.exports = router