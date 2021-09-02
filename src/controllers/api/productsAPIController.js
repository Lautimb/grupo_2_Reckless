const { Color, Product, Size, Type } = require("../../database/models");
const parser = require("../../helpers/parser");
module.exports = {
  async create(req, res) {
    try {
      // const {
      //   file,
      //   art,
      //   color,
      //   description,
      //   discount,
      //   name,
      //   price,
      //   qty,
      //   size,
      //   type,
      //   wholesaleprice,
      // } = req.body;
      console.log(req.body);
      // console.log("FILE", file);
      // console.log("REQ.FILE", req.file);
      // const product = await Product.create({
      //   name,
      //   description,
      //   price,
      //   wholesale_price: wholesaleprice,
      //   discount: discount == "" ? 0 : discount,
      //   art,
      // });
      // // Sizes
      // const eachSize = parser(size);
      // await product.addSizes(eachSize, product.id);

      // // Types
      // const eachType = parser(type);
      // await product.addTypes(eachType, product.id);

      // //Colors
      // const eachColor = parser(color);
      // await product.addColors(eachColor, product.id);

      // // Qty
      // const eachQty = parser(qty);

      // await eachQty.forEach((qty, i) => {
      //   db.Stock.create({
      //     qty: qty,
      //     product_id: product.id,
      //     color_id: eachColor[i],
      //     size_id: eachSize[i],
      //   });
      // });
      res.json({
        message: "Product Created",
      });
    } catch (err) {
      console.log(err);
    }
  },
  async list(req, res) {
    try {
      // PAGINATION
      const page = Number(req.query.page) || 1;

      const paginatedProducts = await Product.findAndCountAll({
        include: ["images"],
        order: ["id"],
        limit: 4,
        offset: 4 * (page - 1),
      });
      const totalPages = Math.ceil(paginatedProducts.count / 4);
      // SETTING IMGS
      paginatedProducts.rows.forEach((product) => {
        product.dataValues.detail = `http://localhost:3300/api/products/${product.id}`;
        const images = JSON.parse(product.images[0].filename);
        product.dataValues.images_url = images.map(
          (image) => (image = `http://localhost:3300/imgs/products/${image}`)
        );
        product.dataValues.images = undefined;
      });
      paginatedProducts.page = page;

      // ALL PRODUCTS NO LIMIT
      const allProducts = await Product.findAll({
        include: ["images"],
      });

      // LAST PRODUCT
      // const lastProduct = allProducts[allProducts.length - 1];
      // lastProduct.dataValues.images_url = `http://localhost:3300/imgs/products/${JSON.parse(
      //   lastProduct.images[0].filename
      // )}`;
      // lastProduct.dataValues.detail = `http://localhost:3300/products/detail/${lastProduct.id}`;

      // TOTAL AMOUNT IN DATA BASE
      const prices = await allProducts.map((product) =>
        parseInt(product.price)
      );
      const totalAmount = prices.reduce(
        (totalAmount, price) => totalAmount + price
      );

      // COUNT BY CATEGORIES

      const types = await Type.findAll({
        include: ["products"],
      });

      const type = types.map((cat) => {
        const eachType = [];
        eachType.push(cat.title);
        eachType.push(cat.products.length);
        return eachType;
      });

      const typeObject = Object.fromEntries(type);

      res.json({
        meta: {
          status: "success",
          // count: allProducts.length,
          countByCategory: typeObject,
          totalAmount,
          totalCategories: types.length,
          // lastProduct,
          // totalPages,
          previousPage:
            page > 1
              ? `http://localhost:3300/api/products?page=${page - 1}`
              : null,
          currentPage: `http://localhost:3300/api/products?page=${page}`,
          nextPage:
            page < totalPages
              ? `http://localhost:3300/api/products?page=${page + 1}`
              : null,
        },
        paginatedProducts,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "Products not found",
      });
    }
  },
  async types(req, res) {
    try {
      const types = await Type.findAll();
      console.log(types);
      res.json({
        types,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async colors(req, res) {},
  async sizes(req, res) {},

  async detail(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: ["images", "types", "sizes", "colors"],
      });

      const images = JSON.parse(product.images[0].filename);
      product.dataValues.images_url = images.map(
        (image) => `http://localhost:3300/imgs/products/${image}`
      );
      product.dataValues.images = undefined;

      res.json({
        meta: {
          status: "success",
        },
        data: {
          product,
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "Product not found",
      });
    }
  },
};
