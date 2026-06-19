const ExcelJS = require("exceljs")
const Entry = require("../models/Entry")

const createEntry = async (req,res)=>{
    console.log("working")
    const {
        entryDate,
        partyName,
        vehicleNo,
        driverName,
        driverContactNo,
        cameraForTsl,
        poNumber,
        invoiceNumber,
        plantName,
        engineerName,
    } = req.body;

    const entry = await Entry.create({
        entryDate,
        partyName,
        vehicleNo,
        driverName,
        driverContactNo,
        cameraForTsl,
        poNumber,
        invoiceNumber,
        plantName,
        engineerName,
    })

    res.status(201).json({
        success:true,
        message:"Entry Created Successfully",
        data:entry
    })
    console.log(req.body)
}

// gate entries api -------------

    const getEntries = async (req,res)=>{
        try{
            const entries = await Entry.find();

            res.status(200).json({
                success:true,
                count:entries.length,
                data:entries
            })
        } catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

// get letest 5 entries router

const getLatestEntries = async(req,res)=>{
    try{
        const entries = await Entry.find().sort({createdAt:-1}).limit(5);

        res.status(200).json({
            success:true,
            data:entries
        })
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}


// get data by id

const getEntryDataById = async (req,res) =>{
    try{
        const entry = await Entry.findById(req.params.id)
        if(!entry){
            return res.status(404).json({
                message:"entry not avillable"
            })
        }
        res.status(200).json({
            success:true,
            data:entry
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// delet entry 

const deletEntry = async(req,res)=>{
    try{
        const data = await Entry.findByIdAndDelete(req.params.id)
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }
        res.status(200).json({
            success:true,
            message :"Entry deleted successfuly",
            data
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const getReport = async(req,res)=>{
    try{

        const {month,year} = req.query;

        if(!month || !year) {
            return res.status(400).json({
                message:"Month and Year required"
            })
        }

        const startDate = new Date(year,month - 1,1);
        const endDate = new Date(year,month,1)

        const entries = await Entry.find({
            entryDate : {
                $get: startDate,
                $lt: endDate,
            }
        })

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Entries")

        worksheet.columns = [
            { header:"Date",key:"entryDate",width:15},
            { header:"Party Name",key:"partyName",width:30},
            { header:"Vehicle No",key:"vehicleNo",width:20},
            { header:"Driver Name",key:"driverName",width:25},
            { header:"Driver Contact No",key:"driverContactNo",width:25},
            { header:"Camera For TSL",key:"cameraForTsl",width:20},
            { header:"PO Number",key:"poNumber",width:25},
            { header:"Invoice Number",key:"invoiceNumber",width:25},
            { header:"Plant Name",key:"plantName",width:20},
            { header:"Engineer Name",key:"engineerName",width:25},
        ]

        worksheet.getRow(1).font = {
            bold:true,
            color: {argb:"000000"},
            size:12,
        };

        worksheet.getRow(1).fill = {
            type:"pattern",
            pattern:"solid",
            fgColor: {argb:"FFFF00"},
        };
        worksheet.getRow(1).alignment = {
            vertical:"middle",
            horizontal:"center",
        };

        entries.forEach((item)=>{
            worksheet.addRow({
                entryDate:item.entryDate ? item.entryDate.toLocaleDateString("en-IN") : "",
                partyName:item.partyName,
                driverName:item.driverName,
                driverContactNo:item.driverContactNo,
                cameraForTsl:item.cameraForTsl,
                poNumber:item.poNumber,
                invoiceNumber:item.invoiceNumber,
                plantName:item.plantName,
                engineerName:item.engineerName,
            })
        })

        worksheet.eachRow((row)=>{
            row.eachCell((cell)=>{
                cell.border = {
                top: {style: "thin"},
                left: {style: "thin"},
                right: {style: "thin"},
                bottom: {style: "thin"},
            }
            })
        })

        res.setHeader(
            "Content-Disposition",
            `attachment; fileName=Entries-${month}-${year}.xlsx`
        )

        await workbook.xlsx.write(res);
        res.end()

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Report download Failed",
            err:error
        })
    }
}




module.exports = {createEntry,getEntries,getLatestEntries,getEntryDataById,deletEntry,getReport}