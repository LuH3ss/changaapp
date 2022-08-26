const axios = require("axios");
const { Router } = require("express");
const { register, getUsers, updateUser, filterUser } = require("../services/user");
const {
  getServices,
  getServicebyId,
  postService,
  getByName,
} = require("../services/service");
const { getCategories, postCategorie } = require("../services/category");
const { getRequest, postRequest } = require("../services/request");
const {paymentMethod} = require("../services/payment")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//user routes
router.post("/user", register);
router.get("/user", getUsers);
router.put('/user/:email', updateUser)
router.get('/user/:email', filterUser)
//services routes
router.post("/services", postService);
router.get("/services", getServices);
router.get("/services/search", getByName);
router.get("/services/:id", getServicebyId);

//category routes
router.get("/category", getCategories);
router.post("/category", postCategorie);

//request routes
router.get("/request", getRequest);
router.post("/request", postRequest);

//payment routes
router.post("/payment", paymentMethod);

module.exports = router;