const nodemailer = require('nodemailer');

const sendEmail = async (email,message,subject) => {
const transporter = nodemailer.createTransport({
  host: 'mail.bluesurge.com.pk', // Change this to your cPanel SMTP server
  port: 465, // Change if necessary, usually 465 for SSL
  secure: true, // Use SSL/TLS
  auth: {
    user: 'info@bluesurge.com.pk', // Your cPanel email address
    pass: 'pakistan@786%' // Your cPanel email password
  }
});
// Compose email
const mailOptions = {
    from: "info@bluesurge.com.pk",
    to: email,
    subject: subject,
    text: message
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
module.exports=sendEmail;