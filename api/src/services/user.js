const { Category, Services, Solicitud, User } = require("../db");

const { allUsers } = require("../utils/utils");


const register = async (req, res) => {
  const {
    firstName,

    lastName,
    birthDate,
    email,
    img,
    // offerer,

    // admin,
    // banned,
  } = req.body;


      const newUser = await User.create({
        firstName,
        lastName,
        birthDate,
        email,
        // offerer,
        // admin,
        // banned,
      });
      return res.status(201).send(newUser);

};

const getUsers = async (req, res) => {
  // const { email } = req.body;
  const { id } = req.body;


  const users = await User.findAll({include: {
    model: Category,
    as: 'category'
  }});

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
