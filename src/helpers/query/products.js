module.exports = {
  queryGetAllProducts: (sort, order) => {
    return `SELECT products.id, products.products, products.image, products.description, products.stock, products.price, categories.category, sizes.size, colors.color, products.created_at, products.updated_at FROM products INNER JOIN categories ON products.category_id = categories.id INNER JOIN sizes ON products.size_id = sizes.id INNER JOIN colors ON products.color_id = colors.id WHERE products LIKE ? OR categories.category LIKE ? OR sizes.size LIKE ? OR colors.color LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
  },

  queryGetProductDetails: () => {
    return `SELECT products.id, products.products, products.image, products.description, products.stock, products.price, categories.category, products.created_at, products.updated_at FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.id = ?`;
  },

  queryAddProducts: () => {
    return `INSERT INTO products SET ?`;
  },

  queryUpdateProducts: () => {
    return `UPDATE products SET ? WHERE id=?`;
  },

  queryDeleteProducts: () => {
    return `DELETE FROM products WHERE id=?`;
  },
};
