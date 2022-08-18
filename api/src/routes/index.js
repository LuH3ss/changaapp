const axios = require("axios");
const { Router } = require("express");
const { register, getUsers } = require("../services/user")
const { getServices, getServicebyId, postService } = require("../services/service")
const { getCategories } = require("../services/category")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


//user routes
router.post("/user", register);
router.get("/user", getUsers);

//services routes
router.post("/services", postService);
router.get("/services", getServices);
router.get("/services/:id", getServicebyId);

//category routes
router.get("/category", getCategories);


module.exports = router;