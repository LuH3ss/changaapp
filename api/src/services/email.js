const nodemailer = require('nodemailer')
const {
    EMAIL, PASSWORD
} = process.env

const sendEmail = async (req, res) => {
    try {
        const {emailCurrentUser, emailToSend, mensaje, asunto} = req.body
        //Creamos el objeto con los datos de quien envia el mensaje
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:`${emailCurrentUser}`,
                pass: PASSWORD
            }
        })
    
        //objeto con la info de quien recibe el correo y en from de quien lo envia
        var mailOptions = {
            from: `${emailCurrentUser}`,
            to: `${emailToSend}`,
            subject: `${asunto}`,
            text: `${mensaje}`
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
        res.send('lito')
      } catch (error) {
      res.status(404).send(error);
    }
  };

module.exports = {
    sendEmail
};