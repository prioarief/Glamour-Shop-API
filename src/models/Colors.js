const connection = require("../config/database");
const query = require("../helpers/query/colors");

module.exports = {
  getAllColorsModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllColors, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  getColorDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.getColorDetails, id, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  addColorsModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(query.addColors, data, (error, result) => {
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

  updateColorsModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.updateColors, [data, id], (error, result) => {
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

  deleteColorsModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(query.deleteColors, id, (error, result) => {
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
