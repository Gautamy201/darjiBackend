const ExcelJS = require("exceljs");
const Entry = require("../models/Entry");

const createEntry = async (req, res) => {
  console.log("working");
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
  });

  res.status(201).json({
    success: true,
    message: "Entry Created Successfully",
    data: entry,
  });
  console.log(req.body);
};

// gate entries api -------------

const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find();

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get letest 5 entries router

const getLatestEntries = async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get data by id

const getEntryDataById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({
        message: "entry not avillable",
      });
    }
    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delet entry

const deletEntry = async (req, res) => {
  try {
    const data = await Entry.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Entry deleted successfuly",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and Year required",
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const entries = await Entry.find({
      entryDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    if (entries.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No data availabe for ${month}-${year}`,
      });
    }

    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Report download Failed",
      err: error.message,
      stack: error.stack,
    });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateEntry = await Entry.findByIdAndUpdate(id, req.body);

    if (!updateEntry) {
      return res.status(404).json({
        status: false,
        message: "Entry not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Entry updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  //     entry.entryDate = req.body.entryDate
  //     entry.partyName = req.body.partyName
  //     entry.vehicleNo = req.body.vehicleNo
  //     entry.driverName = req.body.driverName
  //     entry.driverContactNo = req.body.driverContactNo
  //     entry.cameraForTsl = req.body.cameraForTsl
  //     entry.poNumber = req.body.poNumber
  //     entry.invoiceNumber = req.body.invoiceNumber
  //     entry.plantName = req.body.plantName
  //     entry.engineerName = req.body.engineerName
};

module.exports = {
  createEntry,
  getEntries,
  getLatestEntries,
  getEntryDataById,
  deletEntry,
  getReport,
  updateEntry,
};
