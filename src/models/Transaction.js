const query = require("../helpers/query/transaction")
const connection = require("../config/database")

module.exports = {
    insertTransaction: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(query.insertTransaction, data, (error, result) => {
                if(error){
                    return reject(error)
                }

                const response = {
                    id: result.insertId,
                    ...data
                }
                resolve(response)
            })
        })
    },
    insertTransactionDetail: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(query.insertTransactionDetail, data, (error, result) => {
                if(error){
                    return reject(error)
                }

                const response = {
                    id: result.insertId,
                    ...data
                }
                resolve(response)
            })
        })
    },
    getAllTransactions: () => {
        return new Promise((resolve, reject) => {
            connection.query(query.getAllTransaction, (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    getMyTransactions: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(query.getMyTransaction, id, (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    getDetailTransactions: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(query.getDetailTransaction, id, (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    checkItems: (u_id, id) => {
        return new Promise((resolve, reject) => {
            connection.query(query.checkItems, [u_id, id], (error, result) => {
                if(error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    checkAvailable: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(query.checkAvailable, id, (error, result) => {
                if(error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    insertCart: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(query.insertCart, data, (error, result) => {
                if(error) {
                    return reject(error)
                }
                const response = {
                    id: result.insertId,
                    ...data
                }
                resolve(response)
            })
        })
    },
    updateCart: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(query.updateCart, [data, id], (error, result) => {
                if(error) {
                    return reject(error)
                }
                const response = {
                    id: id,
                    ...data
                }
                resolve(response)
            })
        })
    },
    deleteCart: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(query.deleteCart, id, (error, result) => {
                if(error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
}