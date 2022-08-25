const { Category, Services, Request, User, Reviews } = require("../db");

const getReviews = async (req, res) => {
  try {
    return res.status(200).send(await Reviews.findAll());
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
      author_uid: req.body.author_uid,
    });

    // let service = await Services.findOne({ where: { id: req.body.service } });

    // service.addRequest(request);

    res.status(201).send("created");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getReviews,
  postReviews,
};
