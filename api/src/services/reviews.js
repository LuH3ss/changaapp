const { User, Reviews } = require("../db");

const getReviews = async (req, res) => {
  try {
    return res.status(200).send(
      await Reviews.findAll({
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: User,
            as: "author",
          },
        ],
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postReviews = async (req, res) => {
  try {
    await Reviews.create({
      message: req.body.message,
      rate: req.body.rate,
      user_id: req.body.user_id,
      author_id: req.body.author_id,
    });

    res.status(201).send("Review created");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getReviews,
  postReviews,
};
