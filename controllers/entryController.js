const Entry = require("../models/Entry")

const createEntry = async (req,res)=>{
    console.log("working")
    // const {
    //     date,
    //     partyName,
    //     vehicleNo,
    //     driverName,
    //     driverContactNo,
    //     cameraForTsl,
    //     poNumber,
    //     invoiceNumber,
    //     plantName,
    //     engineerName,
    // } = req.body;

    // const entry = await entry.create({
    //     date,
    //     partyName,
    //     vehicleNo,
    //     driverName,
    //     driverContactNo,
    //     cameraForTsl,
    //     poNumber,
    //     invoiceNumber,
    //     plantName,
    //     engineerName,
    // })

    res.status(201).json("entry")
}

module.exports = {createEntry}