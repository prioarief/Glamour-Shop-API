const connection = require("../config/database");
const query = require("../helpers/query/categories");

module.exports = {
  getAllCategoriesModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllCategories, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  getCategoryDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.getCategoryDetails, id, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  addCategoriesModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(query.addCategories, data, (error, result) => {
        if (error) {
          reject(error);
        }

        const newResult = {
          id: result.insertId,
          ...data,
        };

        resolve(newResult);
      });
    });
  },

  updateCategoriesModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.updateCategories, [data, id], (error, result) => {
        if (error) {
          reject(error);
        }

        const newResult = {
          id,
          ...data,
        };
        resolve(newResult);
      });
    });
  },

  deleteCategoriesModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.deleteCategories, id, (error, result) => {
        if (error) {
          reject(error);
        }

        const newResult = {
          id,
          ...result,
        };
        resolve(newResult);
      });
    });
  },
};
