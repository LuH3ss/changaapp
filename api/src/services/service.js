const { Category, Services, Request, User } = require("../db");
const { Op } = require("sequelize");

const getServices = async (req, res) => {
  const { category } = req.query;
  try {
    const services = await Services.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: User,
          as: "user",
        },
        {
          model: Request,
          as: "request",
        },
      ],
    });
    category
      ? res
          .status(200)
          .send(services.filter((el) => el.categories[0].name === category))
      : res.status(200).send(services);
  } catch (e) {
    return res.status(400).send(console.log(e.message));
  }
};

const getServicebyId = async (req, res) => {
  const { id } = req.params;
  try {
    // let servicios = await Servicios.findAll();
    // res.status(200).send(servicios.find((el) => el.id === id));

    const services = await Services.findOne({
      where: {
        id: id,
      },
      include: {
        model: Category,
        as: "category",
      },
    });

    return res.status(200).send(services);
  } catch (e) {
    return console.log(e);
  }
};

const postService = async (req, res) => {
  let { name, description, review, price, day, hours, category_id, user_id } =
    req.body;

  let serviceCreated = await Services.create({
    // name: name.charAt(0).toUpperCase() + name.slice(1),
    name,
    description,
    review,
    price,
    day,
    hours,
    user_id: user_id,
    category_id: category_id,
  });
  console.log(serviceCreated);
  res.send("Service Created");
};

const getByName = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await Services.findAll({
      where: { name: { [Op.startsWith]: name } },
      include: Category,
    });
    res.send(response);
  } catch (error) {
    res.status(500).end();
  }
};
module.exports = {
  getServices,
  getServicebyId,
  getByName,
  postService,
};
