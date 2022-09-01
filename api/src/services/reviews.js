const { Category, Services, Request, User, Reviews } = require("../db");

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
  let {message, rate, user_id, author_id} = req.body
  try {
    let reviewCreated = await Reviews.create({
      message,
      rate,
      user_id: user_id,
      author_id: author_id,
    });
    console.log(reviewCreated)

    res.status(201).send("created");
  } catch (error) {
    res.status(404).send(error);
    console.log(error)
  }
};

const getUserReview = async (req,res) =>{
  const {user_id} = req.params
  try {
    const userReview =  await Reviews.findAll({
      where: {user_id : user_id}
    })
    res.status(200).send(userReview)
  } catch (error) {
    console.log(error)
  }
} 

module.exports = {
  getReviews,
  postReviews,
  getUserReview
};
