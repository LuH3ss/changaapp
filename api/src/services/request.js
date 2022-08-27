const { Category, Services, Request, User } = require("../db");

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

  console.log('dasdasd')

  try {
    await Request.create({
      state: "pending",
      day: req.body.day,
      hours: req.body.hours,
      service_id: req.body.service_id,
      requester_id: req.body.requester_id,
    });

    // let service = await Services.findOne({ where: { id: req.body.service } });

    // service.addRequest(request);

    res.status(201).send("created");
  } catch (error) {
    res.status(404).send(error);
  }
};

const putRequest = async (req, res) => {
  const { newState, request_id } = req.body;
  try {
    await Request.update(
      {
        state: newState,
      },
      {
        where: {
          id: request_id,
        },
      }
    );
    res.status(201).send("updated");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getRequest,
  postRequest,
  putRequest,
};
