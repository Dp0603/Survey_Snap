const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
  return await twilioClient.messages.create({
    body,
    from: fromNumber,
    to,
  });
};

const sendWhatsApp = async (to, body) => {
  return await twilioClient.messages.create({
    body,
    from: `whatsapp:${fromNumber}`,
    to: `whatsapp:${to}`,
  });
};

module.exports = {
  sendSMS,
  sendWhatsApp,
};

