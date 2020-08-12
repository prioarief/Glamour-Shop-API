module.exports = {
    insertTransaction: 'INSERT INTO transactions SET ?',
    insertTransactionDetail: 'INSERT INTO transaction_detail SET ?',
    getAllTransaction: 'SELECT tr.*, a.name as receiver, a.address, a.city, a.province, a.zipcode, a.telp, a.country, u.name FROM transactions tr JOIN users u ON u.id = tr.user_id JOIN address a ON a.id = tr.shipping_address',
    getDetailTransaction: 'SELECT tr.*, p.products as productName, p.price as productPrice, s.size, c.color, p.image as productImage FROM transaction_detail tr JOIN products p ON p.id = tr.product_id JOIN sizes s ON s.id = p.size_id JOIN colors c ON c.id = p.color_id WHERE tr.transaction_id = ? ',
    getMyTransaction: 'SELECT tr.*, u.name, a.name as receiver, a.address, a.city, a.province, a.zipcode, a.telp, a.country FROM transactions tr JOIN users u ON u.id = tr.user_id JOIN address a ON a.id = tr.shipping_address WHERE tr.user_id = ? ',
    checkItems: 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    insertCart: 'INSERT INTO cart SET ?',
    updateCart: 'UPDATE cart SET ? WHERE id = ?',
    deleteCart: 'DELETE FROM cart WHERE id = ?',
    checkAvailable: 'SELECT * FROM cart WHERE id = ?',
}