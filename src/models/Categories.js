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
};
