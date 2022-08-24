const { Category, Services, Request, User } = require("../db");

const getRequest = async (req, res) => {

  try {
      return res.status(200).send(
        await Request.findAll({
          include: {
            model: Services,
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
          },
        })
      );
    } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postRequest = async (req, res) => {
  try {
        let request = await Request.create({
            state: 'pending',
            day: req.body.day,
            hours: req.body.hours
        });

        let service = await Services.findOne({where: { id: req.body.service }});

        service.addRequest(request);
        
        res.status(201).send('created')
    } catch (error) {
    res.status(404).send(error);
    }
};

module.exports = {
  getRequest,
  postRequest,
};
