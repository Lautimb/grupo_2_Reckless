const express = require("express");
const multer = require("multer");
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsAPIController");

const upload = multer();

router.get("/", productsAPIController.list);
router.get("/:id", productsAPIController.detail);
router.post("/create", (req, res) => {
  console.log("body", req.body);
  console.log("headers", req.headers);
});
router.post("/types", productsAPIController.types);

module.exports = router;
