const express = require("express");
const router = express.Router();
const { sendContactMessage } = require("../controllers/contactController");

// Public — no token required. Visitor on someone's /:username portfolio
// page submits this to message the portfolio owner.
router.post("/:username", sendContactMessage);

module.exports = router;
