const { Category, Services, Solicitud, User, Reviews } = require("../db");

const { allUsers } = require("../utils/utils");

const register = async (req, res) => {

  const { firstName, lastName, birthDate, email, phone, img } = req.body;

  try {
    const allUser = await allUsers();
    if (!firstName || !lastName || !birthDate || !email)
      return res.send("Los datos ingresados estan incompletos");
    const filterEmail = allUser.filter((e) => e.email === email);
    if (filterEmail[0]) {
      return res.send("El email ya se encuentra registrado");
    } else {
      const newUser = await User.create({
        firstName,
        lastName,
        birthDate,
        email,
        phone,
        img,
        // offerer,
        // admin,
        // banned,
      });
      return res.status(201).send(newUser);
    }
  } catch (error) {
    return res.status(400).send(console.log(error.message));
  }
};

const getUsers = async (req, res) => {
  // const { email } = req.body;
  const { id } = req.body;

  const users = await User.findAll({
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
        model: Reviews,
        as: "reviews",
      },
    ],
  });

  return res.status(200).send(users);
};

const updateUser = async (req, res) => {
  const { firstName, lastName, birthDate, phone, img } = req.body;
  const { email } = req.params;

  await User.update(
    {
      firstName,
      lastName,
      birthDate,
      phone,
      img,
    },
    {
      where: {
        email,
      },
    }
  );

  return res.status(201).send("Usuario actualizado");
};

const filterUser = async (req, res) => {
  const { email } = req.params;
  if (email) {
    const alluser = await allUsers();
    const filterEmail = alluser.filter((e) => e.email === email);
    if (filterEmail) {
      return res.send(filterEmail);
    } else {
      return res.send("No se encontro el email solicitado");
    }
  }
};

module.exports = {
  register,
  getUsers,

  updateUser,
  filterUser,
};
