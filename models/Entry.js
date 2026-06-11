const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema(
    {
        partyName:String,
        vehicleNo:String,
        driverName:String,
        driverContactNo:Number,
        cameraForTsl:String,
        poNumber:String,
        invoiceNumber:String,
        plantName:String,
        engineerName:String,
    }
)

module.exports = mongoose.model("Entry",entrySchema)