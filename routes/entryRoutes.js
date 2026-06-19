const express = require("express")
const router = express.Router()

const {createEntry, getEntries, getLatestEntries, getEntryDataById,deletEntry, getReport} = require("../controllers/entryController")

router.post("/createEntry",createEntry)

router.get("/getEntries",getEntries)

router.get("/getLatesEntries",getLatestEntries)

router.get("/getEntry/:id",getEntryDataById)

router.delete("/deleteEntry/:id",deletEntry)

router.get("/getReport",getReport)



module.exports = router