const connection = require("../config/database");
const {
  queryGetAllProducts,
  queryGetProductDetails,
  queryAddProducts,
  queryUpdateProducts,
  queryDeleteProducts,
} = require("../helpers/query/products");

module.exports = {
  getAllProductsModel: (search, sort, order, limit, page) => {
    let keyword = `%${search}%`;
    let end = limit * page - limit;
    return new Promise((resolve, reject) => {
      const sql = queryGetAllProducts(sort, order);
      connection.query(
        sql,
        [keyword, keyword, keyword, keyword, limit, end],
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }
      );
    });
  },

  getProductDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = queryGetProductDetails();
      connection.query(sql, id, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },

  addProductsModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = queryAddProducts();
      connection.query(sql, data, (error, result) => {
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

  updateProductsModel: (data, id) => {
    return new Promise((resolve, reject) => {
      let sql = queryUpdateProducts();
      connection.query(sql, [data, id], (error, result) => {
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

  deleteProductsModel: (id) => {
    return new Promise((resolve, reject) => {
      let sql = queryDeleteProducts();
      connection.query(sql, id, (error, result) => {
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
