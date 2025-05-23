const express = require("express");
const router = express.Router();
const adminReportController = require("../controllers/AdminReportController");

router.get("/full-report", adminReportController.getFullReport);

module.exports = router;
