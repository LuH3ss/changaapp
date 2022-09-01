const axios = require("axios");
const { Router } = require("express");

const {
  register,
  getUsers,
  updateUser,
  filterUser,
  userById,
} = require("../services/user");
const {
  getServices,
  getServicebyId,
  postService,
  getByName,
  updateService,
  deleteService,
} = require("../services/service");
const { registerMail } = require("../services/Emails/registerMail");
const { requestMail } = require("../services/Emails/requestMail");
const { getCategories, postCategorie } = require("../services/category");
const { paymentMethod } = require("../services/payment");
const {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require("../services/request");
const { getReviews, postReviews } = require("../services/reviews");
const { getNotifications, postNotifications, deleteNotification } = require("../services/notifications");

// Importar todos los routers;

const router = Router();

//user routes
router.post("/user", register);
router.get("/user", getUsers);
router.put("/user/:email", updateUser);
router.get("/user/:email", filterUser);
router.get("/users/:id", userById)

//services routes
router.post("/services", postService);
router.get("/services", getServices);
router.get("/services/search", getByName);
router.get("/services/:id", getServicebyId);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

//category routes
router.get("/category", getCategories);
router.post("/category", postCategorie);

//request routes
router.get("/request", getRequest);
router.post("/request", postRequest);
router.put("/request", putRequest);
router.delete("/request/:id", deleteRequest);

//payment routes
router.post("/payment", paymentMethod);

//review routes
router.get("/reviews", getReviews);
router.post("/reviews", postReviews);


//sendEmail routes
router.post("/sendemail", registerMail);
router.post("/sendemail", requestMail);

//notifications routes
router.get("/notifications", getNotifications);
router.post("/notifications", postNotifications);
router.delete('/notifications/:id', deleteNotification)


module.exports = router;
