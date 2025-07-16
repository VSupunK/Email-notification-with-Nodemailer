const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // Create a Ethereal email account
    let testAccount = await nodemailer.createTestAccount();

    // Create a transporter with Ethereal
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.ETHEREAL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: '"MERN Test App" <no-reply@merntest.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      message: "Email sent successfully",
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
