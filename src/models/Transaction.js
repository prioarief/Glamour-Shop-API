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
    }
}