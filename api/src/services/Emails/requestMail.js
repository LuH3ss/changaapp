const nodemailer = require("nodemailer");
const { PASSWORD, EMAIL } = process.env;

function requestMail(email) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  var mailOptions = {
    from: `${EMAIL}`,
    to: `${email}`,
    subject: "Solicitud de servicio",
    text: "Tiene una nueva solicitud de servicio en ChangaApp",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Mail send" + info.response);
    }
  });
}

module.exports = {
  requestMail,
};
