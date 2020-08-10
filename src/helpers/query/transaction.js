module.exports = {
    insertTransaction: 'INSERT INTO transactions SET ?',
    insertTransactionDetail: 'INSERT INTO transaction_detail SET ?',
    getAllTransaction: 'SELECT tr.*, u.name FROM transactions tr JOIN users u ON u.id = tr.user_id ',
    getDetailTransaction: 'SELECT tr.*, p.products as productName, p.price as productPrice, p.image as productImage FROM transaction_detail tr JOIN products p ON p.id = tr.product_id WHERE tr.id = ? ',
    getMyTransaction: 'SELECT tr.*, u.name FROM transactions tr JOIN users u ON u.id = tr.user_id WHERE tr.user_id = ? ',
}