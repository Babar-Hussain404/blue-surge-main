const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// function to send email
const sendMail = async (email,message,subject) => {
    console.log(email,message,subject)
  try {
    const msg = {
      to: process.env.SENDGRID_SENDER_EMAIL,
      from: email,
      subject: subject,
      html:message
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
        return true;
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        return false;
      });
  } catch (error) {
    return false;
  }
};

module.exports = { sendMail };
