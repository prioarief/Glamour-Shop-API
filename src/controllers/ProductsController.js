const { response } = require("../helpers/response");
const {
  getAllProductsModel,
  getProductDetailsModel,
  addProductsModel,
  updateProductsModel,
} = require("../models/Products");
const {
  AddProductsValidation,
  UpdateProductsValidation,
} = require("../helpers/validation");
const fs = require("fs");

module.exports = {
  /* ====== SHOW ALL PRODUCTS ====== */
  getAllProducts: async (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "created_at";
    let order = req.query.order || "DESC";
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    try {
      const result = await getAllProductsModel(
        search,
        sort,
        order,
        limit,
        page
      );
      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, "Sorry... Products Not Found", 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ====== SHOW PRODUCT DETAILS ====== */
  getProductDetails: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await getProductDetailsModel(id);
      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Product with ID = ${id} not found.`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ====== ADD PRODUCTS ====== */
  addProducts: async (req, res) => {
    try {
      const data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, 400);
      }
      const validation = AddProductsValidation(data);
      if (validation.error === undefined) {
        const result = await addProductsModel(data);
        return response(res, true, result, 201);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 401);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ====== UPDATE PRODUCTS ====== */
  updateProducts: async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    let existImage = null;
    if (req.file) {
      const newImage = req.file.filename;
      data.image = newImage;
      let existData = await getProductDetailsModel(id);
      existImage = existData[0].image;
    }
    try {
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, 400);
      }
      const validation = UpdateProductsValidation(data);
      if (validation.error === undefined) {
        const result = await updateProductsModel(data, id);
        if (result.id === id) {
          if (existImage !== null) {
            fs.unlinkSync(`./src/images/products/${existImage}`);
          }
          const newData = await getProductDetailsModel(id);
          return response(res, true, newData, 200);
        }
        return response(res, false, `Product with ID = ${id} Not Found`, 404);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
    }
  },
};
