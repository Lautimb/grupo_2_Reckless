const { User } = require("../../database/models");
const bcrypt = require("bcryptjs");
const { compare } = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const { email, password, remember } = req.body;

      const user = await User.findOne({ email });
      // Extraer validaciones
      if (email.length == 0) {
        return res.status(401).json({
          message: "Field email is empty",
        });
      }
      if (password.length == 0) {
        return res.status(401).json({
          message: "Field password is empty",
        });
      }

      compare(password, user.password, function (err, result) {
        if (!err && result) {
          const userForToken = {
            id: user.id,
            username: `${user.first_name}`,
          };
          const token = jwt.sign(
            userForToken,
            "918e8fbd-fc20-41a0-863b-534a53762aed" /*key*/,
            { expiresIn: "1h" }
          );

          return res.json({
            message: "¡Login successful!",
            user: {
              name: user.first_name,
              lastname: user.last_name,
              email: user.email,
              token,
            },
          });
        } else {
          return res
            .status(401)
            .json({ message: "¡Ups, something went wrong!" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  async list(req, res) {
    try {
      const users = await User.findAll();

      users.forEach((user) => {
        return user.setDataValue(
          "detail",
          `http://localhost:3300/api/users/${user.id}`
        );
      });

      res.json({
        meta: {
          state: "success",
          count: users.length,
        },
        users,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "Users not found",
      });
    }
  },

  async detail(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "user_type_id"] },
      });
      res.json({
        meta: {
          state: "success",
          count: user.length,
        },
        user,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "User not found",
      });
    }
  },

  async addWishlist(req, res) {
    try {
      const idUser = req.session.user.id;
      const idProduct = parseInt(req.body.productId);
      const user = await User.findByPk(idUser);
      await user.addProducts(idProduct);

      res.json({
        meta: {
          state: "success",
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "Error, the product cannot be added",
      });
    }
  },
  async removeWishlist(req, res) {
    try {
      const idUser = req.session.user.id;
      const idProduct = parseInt(req.body.productId);
      const user = await User.findByPk(idUser);
      await user.removeProducts(idProduct);

      res.json({
        meta: {
          state: "remove success",
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "Error, the product cannot be deleted",
      });
    }
  },
  async logged(req, res) {
    try {
      const userLog = req.session.user ? true : false;

      res.json({
        meta: {
          state: "response success",
        },
        userLog,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: `Error, the product cannot be deleted`,
      });
    }
  },
  async createUser(req, res) {
    try {
      let { firstName, lastName, email, password, year, month, day, userType } =
        req.body;
      password = bcrypt.hashSync(req.body.password, 10);
      const user_type = userType ? (userType = 4) : (userType = 3);

      await User.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        birthday: moment(year + "-" + month + "-" + day).format("l"),

        user_type_id: user_type,
        // Agregar que solamente el super admin logueado pueda guardar dentro
        // user_type el tipo de usuario 1 o 2. Para evitar posibles vulnerabilidades
      });
      res.json({
        meta: {
          state: "response success",
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: `${error.name}, the user cannot be create`,
      });
    }
  },
  async logout(req, res) {},
};
