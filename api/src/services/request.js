const { Category, Services, Request, User } = require("../db");

const getRequest = async (req, res) => {
  try {
    return res.status(200).send(
      await Request.findAll({
        include: {
          model: Services,
          as: "services",
        },
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postRequest = async (req, res) => {
  try {
    await Request.create({
      state: "pending",
      day: req.body.day,
      hours: req.body.hours,
      service_id: req.body.service_id,
      requested_uid: req.body.requested_uid,
    });

    // let service = await Services.findOne({ where: { id: req.body.service } });

    // service.addRequest(request);

    res.status(201).send("created");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getRequest,
  postRequest,
};
