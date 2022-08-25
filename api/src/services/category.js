const { Category, Services, Solicitud, User } = require("../db");
const { allCategories } = require("../utils/utils");

const getCategories = async (req, res) => {
  try{
    let categories = await Category.findAll()
    return res.status(200).send(categories);
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postCategorie = async (req, res) => {
  try {
    const { name } = req.body;
      Category.create({
        name
      })
    
      res.status(201).send("Category created");
    } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getCategories,
  postCategorie,
};
