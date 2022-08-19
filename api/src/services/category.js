const { Category, Services, Solicitud, User } = require("../db");

const getCategories = async (req, res) => {
  // try {
  //   const category = await Category.findAll();
  //   if (category.length > 0) return res.json(category);

  //   category.forEach((e) => {
  //     Category.findOrCreate({
  //       where: {
  //         name: e.name,
  //       },
  //     });
  //   });
  // } catch (err) {
  //   return console.log(err);
  // }

  try {
    // const categories = await Categoria.findAll();
    // if (category.length) return res.json(category);

    const categories = await Category.findAll({
      include: {
        model: Services,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    if (!categories.length) {
      const categoriesArr = [
        { name: "electricidad" },
        { name: "gas" },
        { name: "agua" },
        { name: "jardineria" },
      ];

      await Category.bulkCreate(categoriesArr);

      return res.status(200).send(
        await Category.findAll({
          include: {
            model: Services,
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
          },
        })
      );
    }

    return res.status(200).send(categories);
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};
module.exports = {
  getCategories,
};
