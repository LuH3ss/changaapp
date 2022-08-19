const { Categoria, Servicios, Solicitud, Usuario } = require("../db");

const getServices = async (req, res) => {
  const { category } = req.query;
  try {
    // let servicios = await Servicios.findAll();
    // if (category) {
    //   servicios = servicios.filter((el) => el.category === category);
    // }
    // res.status(200).send(servicios);
    if (category) {
      const servicios = await Servicios.findAll({
        include: Categoria,
        where: {
          categorium: category,
        },
      });
      return res.status(200).send(servicios);
    } else {
      const servicios = await Servicios.findAll({
        include: Categoria,
      });
      return res.status(200).send(servicios);
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

    const servicio = await Servicios.findOne({
      where: {
        id: id,
      },
      include: Categoria,
    }); //dudoso

    return res.status(200).send(servicio);
  } catch (e) {
    return console.log(e);
  }
};

const postService = async (req, res) => {
  const { name, img, description, price, idCategory, idUser } = req.body;
  try {
    const newService = await Servicios.create({
      // img,
      name,
      description,
      price,
      // user_id:idUser
    });

    // const user = await Usuario.findOne({
    //   where: {
    //     firstName: idUser
    //   }
    // });

    // const categoria = await Categoria.findOne({
    //   attributes:["name"],
    //   where:{name:idCategory}
    // })

    // newService.addCategoria(categoria);
    // user.addServicios(newService)

    return res.status(201).send(newService);
  } catch (error) {
    return res.status(400).send(console.log(error.message));
  }
};

module.exports = {
  getServices,
  getServicebyId,
  postService,
};
