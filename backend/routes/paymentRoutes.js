const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createCheckoutSession,
  getBillingStatus,
} = require("../controllers/paymentController");

router.post("/create-checkout-session", protect, createCheckoutSession);
router.get("/status", protect, getBillingStatus);

module.exports = router;
