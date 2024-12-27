const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ac421b840ce9b7",
    pass: "fe17d562e53c68",
  },
});

module.exports = transporter;
