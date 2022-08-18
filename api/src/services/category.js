const { Categoria, Servicios, Solicitud, Usuario } = require("../db");

const getCategories = async (req, res) => {
    try {
      // const categories = await Categoria.findAll();
      // if (category.length) return res.json(category);
  
      const categories = await Categoria.findAll({
        include: {
          model: Servicios,
          attributes: ['id', 'description'],
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
          include: {
            model: Servicios,
            attributes: ['id', 'description'],
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
  };

  module.exports={
    getCategories,
  }