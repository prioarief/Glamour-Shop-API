const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const { response } = require('../helpers/response');
const {
	RegisterValidation,
	LoginValidation,
} = require('../helpers/validation');
const { Register, Login } = require('../models/Auth');

module.exports = {
	Register: async (req, res) => {
		try {
			const data = req.body;
			const validation = RegisterValidation(data);
			if (validation.error === undefined) {
				data.password = hashSync(req.body.password, genSaltSync(1));
                const emailCheck = await Login(data.email);
                if(emailCheck.length === 0){
                    const result = await Register(data)
                    delete result.password
                    return response(res, true, result, 200);
                }
                return response(res, false, 'Email has been registered', 401);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 401);
		} catch (error) {
			console.log(error);
		}
	},
};
