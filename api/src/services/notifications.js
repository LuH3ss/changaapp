const { User, Notifications } = require("../db");

const getNotifications = async (req, res) => {
  try {
    return res.status(200).send(
      await Notifications.findAll({
        include: [
          {
            model: User,
            as: "userNotification",
          },
          {
            model: User,
            as: "userNotificated",
          },
        ],
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postNotifications = async (req, res) => {
  try {
    await Notifications.create({
      message: req.body.message,
      userNotification_id: req.body.userNotification_id,
      userNotificated_id: req.body.userNotificated_id,
    });

    res.status(201).send("Notification created");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getNotifications,
  postNotifications,
};
