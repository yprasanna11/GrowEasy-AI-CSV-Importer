const path = require("path");

const parseCSV = require("../utils/csvParser");
const extractCRM = require("../services/aiService");

exports.uploadCSV = async (req, res) => {
  console.log("======================================");
  console.log("🚀 API HIT");

  console.log("📂 req.file:");
  console.log(req.file);

  try {
    // Check if file exists
    if (!req.file) {
      console.log("❌ No CSV file received");

      return res.status(400).json({
        success: false,
        message: "No CSV file uploaded",
      });
    }

    // Build file path
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.file.filename
    );

    console.log("📄 File Path:");
    console.log(filePath);

    // Parse CSV
    console.log("📖 Parsing CSV...");

    const csvData = await parseCSV(filePath);

    console.log("✅ CSV Parsed Successfully");
    console.log("Rows:", csvData.length);

    // Call Gemini
    console.log("🤖 Calling Gemini AI...");

    const aiResult = await extractCRM(csvData);

    console.log("✅ Gemini Response Received");

    return res.status(200).json({
      success: true,
      totalRows: csvData.length,
      preview: csvData.slice(0, 5),
      aiResult,
    });

  } catch (err) {
    console.log("======================================");
    console.log("❌ UPLOAD ERROR");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};