const { Category, Services, Request, User } = require("../db");
const requestMail = require("./Emails/sendEmails");

const getRequest = async (req, res) => {
  try {
    return res.status(200).send(
      await Request.findAll({
        include: [
          {
            model: Services,
            as: "services",
            include: {
              model: Category,
              as: "category",
            },
          },
          {
            model: Services,
            as: "services",
            include: {
              model: User,
              as: "user",
            },
          },
          {
            model: User,
            as: "userRequester",
          },
        ],
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postRequest = async (req, res) => {
  const { day, hours, service_id, requester_id, email } = req.body;
  try {
    await Request.create({
      state: "pendiente",
      day,
      hours,
      service_id,
      requester_id,
      email,
    });
    res.status(201).send("Request created");
  } catch (error) {
    res.status(404).send(error);
  }
  const asunto = "Solicitud de Servicio";
  const mensaje = "Tiene una nueva solicitud de servicio en ChangaApp";
  requestMail.email(email, asunto, mensaje);
};

const putRequest = async (req, res) => {
  const { state, id, email } = req.body;
  try {
    const asd = await Request.update(
      {
        state,
      },
      {
        where: {
          id,
        },
      },
      {
        email,
      }
    );
    console.log(asd);
    res.status(201).send("Request updated");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
  const asunto = "Novedades en su solicitud de Servicio";
  const mensaje =
    "Su solicitud de servicio de ChangaApp ha sido aceptada/rechazada";
  requestMail.email(email, asunto, mensaje);
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await Request.destroy({
      where: {
        id,
      },
    });
    res.send("Request deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
