const ShareModel = require("../models/ShareModel");
const mailUtil = require("../utils/MailUtil");
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const shareSurvey = async (req, res) => {
  const { surveyId, recipient, method } = req.body;

  if (!surveyId || !recipient || !method) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const shareLink = `https://surveysnap.com/survey/${surveyId}`;

    if (method === "email") {
      await mailUtil.sendingMail(
        recipient,
        "You're invited to take a survey!",
        `<p>Please participate in the survey by clicking the link below:</p><a href="${shareLink}">${shareLink}</a>`
      );
    } else if (method === "sms") {
      await client.messages.create({
        body: `Its me "DP👑", Take this survey: ${shareLink}`,
        from: fromPhone,
        to: recipient,
      });
    } else if (method === "whatsapp") {
      await client.messages.create({
        body: `Take this survey: ${shareLink}`,
        from: `whatsapp:${fromPhone}`,
        to: `whatsapp:${recipient}`,
      });
    }

    const shared = await ShareModel.create({ surveyId, recipient, method });
    res
      .status(200)
      .json({ message: "Survey shared successfully!", data: shared });
  } catch (error) {
    console.error("Share error:", error.message);
    res.status(500).json({ message: "Failed to share survey" });
  }
};

module.exports = { shareSurvey };
