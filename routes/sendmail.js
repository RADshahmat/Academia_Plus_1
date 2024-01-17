const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const {run}=require ("../db/db")
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'student2345566@gmail.com',
      pass: 'vucd wglw gonv ncub'
  }
});

const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
};

const sendEmail = async (toEmail, subject, text) => {
  try {
      const info = await transporter.sendMail({
          from: 'student2345566@gmail.com', 
          to: toEmail,                  
          subject: subject,             
          text: text                    
      });

      console.log('Email sent: ', info);
  } catch (error) {
      console.error('Error sending email: ', error);
  }
};

router.post("/sendmail", async function(req, res){
  const mail = req.body.email;
  const recipientEmail = mail;
  const emailSubject = 'Your OTP Code';
  const otpCode = generateRandomNumber();
  const emailBody = `Your OTP code is: ${otpCode}`;

  console.log(mail);
  const response1 = await run(`delete from OTP where email=:email`, {
    email: recipientEmail,
  });  
  sendEmail(recipientEmail, emailSubject, emailBody);
  const response = await run(`INSERT INTO OTP (EMAIL, OTP) VALUES (:email, :otp)`, {
    email: recipientEmail,
    otp: otpCode
  });
  
  // You can pass the OTP code to the next page or store it for verification
  
  // For now, I'm redirecting to the forgetpass page without passing the OTP code
  res.redirect(`/otpverify?email=${recipientEmail}`);
});

module.exports = router;
