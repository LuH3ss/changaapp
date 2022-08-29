const Stripe = require("stripe")
const stripe = new Stripe(
  "sk_test_51Lb2ZIKO72YUdcCNms5TiiqU5bIrmzLzFNgZgmQKxdRkc6xw7v039b2peRu9zTnH15bpt4L39cWmFZ9KzoFgCCJT00mF6RRlOa"
);

const paymentMethod = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "ARS",
      payment_method: id,
      confirm: true,
    });
    console.log(payment)
    res.send({ message: "Successful payment" });
  } catch (error) {
    res.json({ message: error.raw.message})
  }
};

module.exports = {
  paymentMethod,
};
