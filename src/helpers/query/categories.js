module.exports = {
  getAllCategories: `SELECT * FROM categories`,
  getCategoryDetails: `SELECT * FROM categories WHERE id=?`,
  addCategories: `INSERT INTO categories SET ?`,
  updateCategories: `UPDATE categories SET ? WHERE id= ?`,
  deleteCategories: `DELETE FROM categories WHERE id=?`,
};
