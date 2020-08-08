const connection = require("../config/database");

module.exports = {
  getAllProductsModel: (search, sort, order, limit, page) => {
    let keyword = `%${search}%`;
    let end = limit * page - limit;
    return new Promise((resolve, reject) => {
      let sql = `SELECT products.id, products.products, products.image, products.description, products.stock, products.price, categories.category, products.created_at, products.updated_at FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products LIKE ? OR categories.category LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
      connection.query(sql, [keyword, keyword, limit, end], (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  },
};
