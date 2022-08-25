const { Category, Services, Solicitud, User } = require("../db");

const { allUsers } = require("../utils/utils");

const register = async (req, res) => {
  const { firstName, lastName, age, email } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    age,
    email,
  });
  return res.status(201).send(newUser);
};

const getUsers = async (req, res) => {
  // const { email } = req.body;
  const { id } = req.body;

  const users = await User.findAll({
    include: {
      model: Services,
      as: "services",
    },
  });

  return res.status(200).send(users);
};

module.exports = {
  register,
  getUsers,
};
