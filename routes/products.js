const express = require("express");
const router = express.Router();

const {
  getAllPrdouctsStatic,
  getAllProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllPrdouctsStatic);

module.exports = { router };
