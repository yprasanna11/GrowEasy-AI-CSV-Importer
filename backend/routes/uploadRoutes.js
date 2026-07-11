const express = require("express");

const router = express.Router();

const upload = require("../utils/upload");

const { uploadCSV } = require("../controllers/uploadController");

router.post("/", upload.single("csv"), uploadCSV);

module.exports = router;