const { Category, Services, Solicitud, User } = require("../db");

const getServices = async (req, res) => {
  const { category } = req.query;
  try {
    // let servicios = await Servicios.findAll();
    // if (category) {
    //   servicios = servicios.filter((el) => el.category === category);
    // }
    // res.status(200).send(servicios);
    if (category) {
      const services = await Services.findAll({
        include: [Category],
        where: {
          attributes: ["name"],
        },
      });
      return res.status(200).send(services);
    } else {
      const services = await Services.findAll({
        include: [Category],
      });
      return res.status(200).send(services);
    }
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
      include: Category,
    });

    return res.status(200).send(services);
  } catch (e) {
    return console.log(e);
  }
};

const postService = async (req, res) => {

  let { name, img, description, price, category } = req.body;
  let serviceCreated = await Services.create({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    img,
    description,
    price,
  });
  let categorys = await Category.findAll({
    where: { name: category },
  });
  serviceCreated.addCategories(categorys);

  res.send("Service Created");
};

module.exports = {
  getServices,
  getServicebyId,
  postService,
}
