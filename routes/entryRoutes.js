const express = require("express")
const router = express.Router()

const {createEntry} = require("../controllers/entryController")

router.post("/",createEntry)



module.exports = router