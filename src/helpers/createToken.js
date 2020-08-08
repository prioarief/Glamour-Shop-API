const jwt = require('jsonwebtoken')

module.exports = {
    createToken : (data, key, expired) => {
        return jwt.sign({result: data}, key, {
            expiresIn: expired
        })
    }
}