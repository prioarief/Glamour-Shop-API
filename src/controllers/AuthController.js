const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const { response } = require('../helpers/response');
const {
	RegisterValidation,
	LoginValidation,
	VerifyValidation,
	forgotPassVal,
	changePassVal,
} = require('../helpers/validation');
const {
	Register,
	Login,
	insertOTP,
	checkOTP,
	deleteOTP,
	updateUser,
} = require('../models/Auth');
const randomCode = require('randomatic');
const { sendEmail } = require('../helpers/sendEmail');
const { createToken } = require('../helpers/createToken');
const jwt = require('jsonwebtoken');
// Create an encryptor:
const encryptor = require('simple-encryptor')('secretsecrettsecret');

module.exports = {
	Register: async (req, res) => {
		try {
			const data = req.body;
			const validation = RegisterValidation(data);
			if (validation.error === undefined) {
				data.password = hashSync(req.body.password, genSaltSync(1));
				const emailCheck = await Login(data.email);
				if (emailCheck.length === 0) {
					const result = await Register(data);
					data.code = randomCode('a0', 6);
					sendEmail('OTP Code', data);
					const otp = {
						code: data.code,
						email: result.email,
					};
					insertOTP(otp);
					delete result.password;
					return response(res, true, result, 200);
				}
				return response(res, false, 'Email has been registered', 400);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},

	Verification: async (req, res) => {
		try {
			const data = req.body;
			const validation = VerifyValidation(data);
			if (validation.error === undefined) {
				const codeCheck = await checkOTP(data.email);
				const emailCheck = await Login(data.email);
				if (emailCheck.length !== 0) {
					if (codeCheck.length !== 0) {
						if (
							data.code === codeCheck[0].code &&
							data.email === codeCheck[0].email
						) {
							const update = {
								is_active: 1,
							};
							await updateUser(update, data.email);
							await deleteOTP(data.email);
							return response(res, true, 'Verification Success', 200);
						}
						return response(res, false, 'Code is wrong', 400);
					}
					return response(res, false, 'Email is not registered', 404);
				}
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	Login: async (req, res) => {
		try {
			const data = req.body;
			const validation = LoginValidation(data);
			// validation check
			if (validation.error === undefined) {
				const emailCheck = await Login(data.email);
				if (emailCheck.length !== 0) {
					if (emailCheck[0].is_active === 1) {
						// password check
						if (compareSync(data.password, emailCheck[0].password)) {
							delete emailCheck[0].is_active;
							delete emailCheck[0].password;
							// create token
							const token = createToken(emailCheck, process.env.JWT_KEY, '24h');
							emailCheck[0].token = token;
							return response(res, true, emailCheck, 200);
						}
						return response(res, false, 'Password wrong', 400);
					}
					return response(res, false, 'Account is not verified', 400);
				}
				return response(res, false, 'Email is not registered', 404);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	RefreshToken: async (req, res) => {
		try {
			if (req.headers.token) {
				const payload = jwt.verify(req.headers.token, process.env.JWT_KEY, {
					ignoreExpiration: true,
				});
				const token = createToken(payload.result, process.env.JWT_KEY, '24h');
				const RefreshToken = createToken(
					payload.result,
					process.env.JWT_KEY,
					'48h'
				);
				const data = {
					token: token,
					refreeshToken: RefreshToken,
				};
				return response(res, true, data, 200);
			}
			return response(res, false, 'Token not found', 400);
		} catch (error) {
			console.log(error);
		}
	},
	ForgotPassword: async (req, res) => {
		try {
			const validation = forgotPassVal(req.body);
			if (validation.error === undefined) {
				const emailCheck = await Login(req.body.email);
				if (emailCheck.length === 1) {
					let code = randomCode('a0', 6);
					const data = {
						code: code,
						email: emailCheck[0].email,
						name: emailCheck[0].name,
					};
					sendEmail('OTP Code', data);
					const otp = {
						code: data.code,
						email: emailCheck[0].email,
					};
					insertOTP(otp);
					delete emailCheck.password;
					return response(res, true, emailCheck, 200);
				}
				return response(res, false, 'Email is not registered', 404);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	ChangePassword: async (req, res) => {
		try {
			const data = {
				email: req.body.email,
				password: hashSync(req.body.password, genSaltSync(1)),
			};
			const validation = changePassVal(data);
			if (validation.error === undefined) {
				const result = await updateUser(data, data.email);
				console.log(result);
				return response(res, true, 'Password has been changed', 200);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
};
