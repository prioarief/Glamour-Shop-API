const { response } = require("../helpers/response");
const {
  AddCategoriesValidation,
  UpdateCategoriesValidation,
} = require("../helpers/validation");
const {
  getAllCategoriesModel,
  getCategoryDetailsModel,
  addCategoriesModel,
  updateCategoriesModel,
  deleteCategoriesModel,
} = require("../models/Categories");

module.exports = {
  /* ============ SHOW ALL CATEGORIES ============ */
  getAllCategories: async (req, res) => {
    try {
      const result = await getAllCategoriesModel();
      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Categories Not Found`, 404);
    } catch (error) {
      console.log(error.message);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ SHOW CATEGORY DETAILS ============ */
  getCategoryDetails: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await getCategoryDetailsModel(id);
      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Category with ID = ${id} Not Found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ ADD CATEGORIES ============ */
  addCategories: async (req, res) => {
    const data = req.body;
    try {
      const validation = AddCategoriesValidation(data);
      if (validation.error === undefined) {
        const result = await addCategoriesModel(data);
        return response(res, true, result, 201);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ UPDATE CATEGORIES ============ */
  updateCategories: async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
      const validation = UpdateCategoriesValidation(data);
      if (validation.error === undefined) {
        const result = await updateCategoriesModel(data, id);
        return response(res, true, result, 200);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ DELETE CATEGORIES ============ */
  deleteCategories: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await deleteCategoriesModel(id);
      if (result.affectedRows === 1) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Categories with ID = ${id} Not Found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
