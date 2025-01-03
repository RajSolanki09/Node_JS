const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "solankiraj9642@gmail.com",
    pass: process.env.password,
  },
});

const sendingMail = async (to, subject, content) => {
  try {
    const mailOptions = {
      from: "solankiraj9642@gmail.com",
      to: to,
      subject: subject,
      html: content,
    };
    let res = await transport.sendMail(mailOptions);
    // console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendingMail;