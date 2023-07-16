const express = require("express");
const router = express.Router();
const { isAuthUser } = require("../middleware/auth");
const { processPayment, sendStripeKey } = require("../controllers/paymentControllers");

router.route("/process/payment").post(isAuthUser , processPayment);
router.route("/stripeKey").get(sendStripeKey);


module.exports = router;