const { Category, Services, Solicitud, User } = require("../db");

const register = async (req, res) => {
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
    const newUser = await Usuario.create({
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
    return res.status(400).send(console.log(error.message));
  }
};

const getUsers = async (req, res) => {
  // const { email } = req.body;
  const { id } = req.body;

  const users = await Usuario.findAll();
  return res.status(200).send(users);

  // try {
  //   // const user = users.find((el) => el.email === email);
  //   const user = users.find((el) => el.id === id);
  //   user
  //     ? res.status(200).send(user)
  //     : res.status(404).send("user not found");
  // } catch (e) {
  //   console.log(e);
  // }
};

module.exports = {
  register,
  getUsers,
};
