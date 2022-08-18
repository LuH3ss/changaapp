const { Router } = require("express");
const { Categoria, Servicios, Solicitud, Usuario } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

const router = Router();



router.post("/user", async (req, res) => {
  const {
    firstName,
    // lastName,
    // birthDate,
    // email,
    // phone,
    // img,
    offerer,
    // admin,
    // banned,
  } = req.body;

  try {    
    const newUser= await Usuario.create({
      firstName,
      // lastName,
      // birthDate,
      // email,
      // phone,
      // img,
      offerer,
      // admin,
      // banned,
    });
  
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).send(console.log(error.message))
  }
});

router.get("/user", async (req, res) => {
  // const { email } = req.body;
  const { id } = req.body;

  const users = await Usuario.findAll();
  return res.status(200).send(users)

  // try {
  //   // const user = users.find((el) => el.email === email);
  //   const user = users.find((el) => el.id === id);
  //   user
  //     ? res.status(200).send(user)
  //     : res.status(404).send("user not found");
  // } catch (e) {
  //   console.log(e);
  // }
});

router.get("/services", async (req, res) => {
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
          categorium: category
        }
      });
      return res.status(200).send(servicios);
    } else {
      const servicios = await Servicios.findAll({
        include: Categoria
      });
      return res.status(200).send(servicios);
    }
  } catch (e) {
    return res.status(400).send(console.log(e.message));
  }
});

router.get("/services/:id", async (req, res) => {
  const { id } = req.params
  try {
    // let servicios = await Servicios.findAll();
    // res.status(200).send(servicios.find((el) => el.id === id));

    const servicio = await Servicios.findOne({
      where: {
        id: id
      },
      include: Categoria
    });//dudoso

    return res.status(200).send(servicio);

  } catch (e) {
    return console.log(e);
  }
});

router.get("/category", async (req, res) => {
  try {
    // const categories = await Categoria.findAll();
    // if (category.length) return res.json(category);

    const categories = await Categoria.findAll({
      include:  {
        model: Servicios,
        attributes: ['id','description'],
        through: {
        attributes: []
        }
    }
    });
    if (!categories.length) {
      const categoriesArr = [
        { name: 'electricidad' },
        { name: 'gas' },
        { name: 'agua' },
        { name: 'jardineria' }
      ];

      await Categoria.bulkCreate(categoriesArr);

      return res.status(200).send(await Categoria.findAll({
        include:  {
          model: Servicios,
          attributes: ['id','description'],
          through: {
          attributes: []
          }
      }
      }));
    }

    return res.status(200).send(categories);

  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
});

router.post("/services", async (req, res) => {
  const { img, description, price, idCategory, idUser } = req.body;
  try {

    const newService = await Servicios.create({
      // img,
      description,
      price,
      user_id:idUser
    });

    const user = await Usuario.findOne({
      where: {
        firstName: idUser
      }
    });

    const categoria = await Categoria.findOne({
      attributes:["name"],
      where:{name:idCategory}
    })
    
    newService.addCategoria(categoria);
    user.addServicios(newService)

    return res.status(201).send(newService);
  } catch (error) {
    return res.status(400).send(console.log(error.message))
  }
});

module.exports = router;