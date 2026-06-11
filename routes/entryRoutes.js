const express = require("express")
const router = express.Router()

const {createEntry} = require("../controllers/entryController")

router.post("/creteEntry",createEntry)



module.exports = router