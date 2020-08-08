const { response } = require("../helpers/response");
const {
  getAllProductsModel,
  getProductDetailsModel,
} = require("../models/Products");

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
};
