const connection = require("../config/database");
const query = require("../helpers/query/sizes");

module.exports = {
  getAllSizesModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllSizes, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  getSizeDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.getSizeDetails, id, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  getSizeByNameModel: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(query.getSizeByName, name, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  addSizesModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(query.addSizes, data, (error, result) => {
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

  updateSizesModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.updateSizes, [data, id], (error, result) => {
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

  deleteSizesModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.deleteSizes, id, (error, result) => {
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
