const nodemailer = require("nodemailer");

const dotenv=require('dotenv').config();
async function mail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASS
    }
  });

  const message = {
    from: process.env.GMAILUSER,
    to:email,
    subject: "Hello",
    text: "i am Subhrajeet Jena",
    html: "<b>How are You?</b>"
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent:");
  
}

module.exports = mail;
