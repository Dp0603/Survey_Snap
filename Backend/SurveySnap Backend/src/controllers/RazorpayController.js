const Razorpay = require("razorpay");
const crypto = require("crypto");
const { sendingMail } = require("../utils/MailUtil"); // ✅ your mail util
require("dotenv").config(); // make sure this is at the top

// Razorpay instance with env variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const create_order = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Verify Signature

const verify_order = async (req, res) => {
  const crypto = require("crypto");
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    customer_email,
    amount,
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const hash = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hash === razorpay_signature) {
    // ✅ Send email here
    const receiptHTML = `
      <h2>🎉 Payment Successful</h2>
      <p>Thank you for your payment.</p>
      <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
      <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      <p><strong>Amount:</strong> ₹${amount / 100}</p>
    `;

    await sendingMail(
      customer_email,
      "Your SurveySnap Payment Receipt 🎟️",
      receiptHTML
      
    );

    return res.json({ status: "success" });
  } else {
    return res.status(400).json({ status: "failure" });
  }
};

module.exports = {
  create_order,
  verify_order,
};
