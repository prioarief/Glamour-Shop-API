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
}