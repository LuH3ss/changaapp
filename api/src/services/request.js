const { Category, Services, Request, User } = require("../db");
const sendEmail = require("./Emails/requestMail");

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
            as: "userRequest",
          },
        ],
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postRequest = async (req, res) => {
  try {
    await Request.create({
      state: "pendiente",
      day: req.body.day,
      hours: req.body.hours,
      service_id: req.body.service_id,
      requester_id: req.body.requester_id,
    });
    res.status(201).send("created");
  } catch (error) {
    res.status(404).send(error);
  }
  sendEmail.requestMail();
};

const putRequest = async (req, res) => {
  const { state, id } = req.body;
  try {
    const asd = await Request.update(
      {
        state,
      },
      {
        where: {
          id,
        },
      }
    );
    // console.log(asd);
    res.status(201).send("Updated");
  } catch (error) {
    // console.log(error);
    res.status(404).send(error);
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await Request.destroy({
      where: {
        id,
      },
    });
    res.send("Estado borrado exitosamente");
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
