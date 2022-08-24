const { Category, Services, Solicitud, User } = require("../db");

const { allUsers } = require("../utils/utils");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
  } = req.body;

<<<<<<< HEAD
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
=======

  const newUser = await User.create({
    firstName,
    lastName,
    birthDate,
    email,
  });
  return res.status(201).send(newUser);

>>>>>>> origin/rama-fix
};

const getUsers = async (req, res) => {
  // const { email } = req.body;
  const { id } = req.body;

<<<<<<< HEAD
  const users = await User.findAll();
=======

  const users = await User.findAll({include: {
    model: Services,
    as: 'services'
  }});
>>>>>>> origin/rama-fix

  return res.status(200).send(users);
};


module.exports = {
  register,
  getUsers,
};
