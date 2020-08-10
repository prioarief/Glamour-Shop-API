const { response } = require("../helpers/response");
const {
  AddSizesValidation,
  UpdateSizesValidation,
} = require("../helpers/validation");
const {
  getAllSizesModel,
  getSizeDetailsModel,
  addSizesModel,
  updateSizesModel,
  deleteSizesModel,
  getSizeByNameModel,
} = require("../models/Sizes");

module.exports = {
  /* ============ SHOW ALL Sizes ============ */
  getAllSizes: async (req, res) => {
    try {
      const result = await getAllSizesModel();
      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Size Not Found`, 404);
    } catch (error) {
      console.log(error.message);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ SHOW CATEGORY DETAILS ============ */
  getSizeDetails: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await getSizeDetailsModel(id);
      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Size with ID = ${id} Not Found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ ADD Sizes ============ */
  addSizes: async (req, res) => {
    const data = req.body;
    const oldData = await getSizeByNameModel(data.size);
    const existName = {
      ...oldData[0],
    };
    try {
      if (data.size === existName.size) {
        return response(res, false, "Size name is already exist!", 401);
      } else {
        const validation = AddSizesValidation(data);
        if (validation.error === undefined) {
          const result = await addSizesModel(data);
          return response(res, true, result, 201);
        }
        let errorMsg = validation.error.details[0].message;
        errorMsg = errorMsg.replace(/"/g, "");
        return response(res, false, errorMsg, 400);
      }
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ UPDATE Sizes ============ */
  updateSizes: async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const oldData = await getSizeByNameModel(data.size);
    const existName = {
      ...oldData[0],
    };
    try {
      if (data.size === existName.size) {
        return response(res, false, `Size name is already exist!`, 401);
      } else {
        const validation = UpdateSizesValidation(data);
        if (validation.error === undefined) {
          const result = await updateSizesModel(data, id);
          return response(res, true, result, 200);
        }
        let errorMsg = validation.error.details[0].message;
        errorMsg = errorMsg.replace(/"/g, "");
        return response(res, false, errorMsg, 400);
      }
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  /* ============ DELETE Sizes ============ */
  deleteSizes: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await deleteSizesModel(id);
      if (result.affectedRows === 1) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Sizes with ID = ${id} Not Found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
