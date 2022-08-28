const axios = require("axios");
const { Router } = require("express");
const {
  register,
  getUsers,
  updateUser,
  filterUser,
} = require("../services/user");
const {
  getServices,
  getServicebyId,
  postService,
  getByName,
  updateService,
} = require("../services/service");
const { sendEmail } = require("../services/sendEmail");
const { getCategories, postCategorie } = require("../services/category");
const { paymentMethod } = require("../services/payment");
const { getRequest, postRequest, putRequest } = require("../services/request");
const { getReviews, postReviews } = require("../services/reviews");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//user routes
router.post("/user", register);
router.get("/user", getUsers);
router.put("/user/:email", updateUser);
router.get("/user/:email", filterUser);

//services routes
router.post("/services", postService);
router.get("/services", getServices);
router.get("/services/search", getByName);
router.get("/services/:id", getServicebyId);
router.put("/services/:id", updateService);

//category routes
router.get("/category", getCategories);
router.post("/category", postCategorie);

//request routes
router.get("/request", getRequest);
router.post("/request", postRequest);
router.put("/request", putRequest);

//payment routes
router.post("/payment", paymentMethod);

//review routes
router.get("/reviews", getReviews);
router.post("/reviews", postReviews);

//sendEmail routes
router.put("/sendemail", sendEmail);

module.exports = router;
