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
  const { state, id } = req.body;
  try {
    const asd = await Request.update(
      {
        state
      },
      {
        where: {
          id
        },
      }
    );
    console.log(asd)
    res.status(201).send('Updated');
  } catch (error) {
    console.log(error)
    res.status(404).send(error);
  }
};

const deleteRequest = async (req,res) => {
  const { id } = req.body
  try {
    await Request.destroy({
      where: {
        id
      }
    })
    res.send('Estado borrado exitosamente')
  } catch (error) {
    console.log(error)
  }
}
 
module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
};
