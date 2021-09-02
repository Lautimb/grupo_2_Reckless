const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");

router.post("/", usersAPIController.list);
router.post("/detail/:id", usersAPIController.detail);
router.post("/addWishlist", usersAPIController.addWishlist);
router.post("/removeWishlist", usersAPIController.removeWishlist);
router.post("/login", usersAPIController.login);
router.post("/logged", usersAPIController.logged);
router.post("/logout", usersAPIController.logout);
router.post("/createUser", usersAPIController.createUser);

module.exports = router;
