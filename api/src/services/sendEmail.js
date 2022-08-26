const nodemailer = require("nodemailer");
const { PASSWORD, EMAIL } = process.env;

const sendEmail = async (req, res) => {
  const { email, mensaje, asunto } = req.body;

  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL, // generated ethereal user
      pass: PASSWORD, // generated ethereal password
    },
  });

  var mailOptions = {
    from: `${EMAIL}`,
    to: `${email}`,
    subject: asunto,
    text: mensaje,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(400).send(console.log(error.message));
    } else {
      res.status(200).send("Mail send");
    }
  });
};

module.exports = {
  sendEmail,
};
