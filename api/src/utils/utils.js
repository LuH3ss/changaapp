const { User, Category } = require("../db.js");

const allUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log("error");
  }
};

const allCategories = async () => {
  try {
    const allCat = await Category.findAll();
    return allCat;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allUsers,
  allCategories
};