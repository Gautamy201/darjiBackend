const express = require("express")
const router = express.Router()

const {createEntry, getEntries, getLatestEntries, getEntryDataById,deletEntry, getReport, updateEntry} = require("../controllers/entryController")

router.post("/createEntry",createEntry)

router.get("/getEntries",getEntries)

router.get("/getLatesEntries",getLatestEntries)

router.get("/getEntry/:id",getEntryDataById)

router.delete("/deleteEntry/:id",deletEntry)

router.get("/getReport",getReport)

router.put("/updateEntry/:id",updateEntry)



module.exports = router