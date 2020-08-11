const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const { response } = require('../helpers/response');
const { editValidation, addAddressVal, editAddressVal } = require('../helpers/validation');
const { editUser, getData, addAddress, editAddress, getMyAddress, getDetailMyAddress, deleteMyAddress } = require('../models/Profile');
const fs = require('fs');

module.exports = {
	editProfile: async (req, res) => {
		try {
			const id = req.decoded.result[0].id;
			req.body.password
				? (req.body.password = hashSync(req.body.password, genSaltSync(1)))
				: null;
			const data = req.body;
			const getUser = await getData(id);
			let oldImage = getUser[0].image;
			if (!req.fileValidationError) {
				const image = req.file ? req.file.filename : null;
				image !== null ? (data.image = image) : null;
				const validate = editValidation(data);
				if (validate.error === undefined) {
					const result = await editUser(data, id);
					if (result.affectedRows === 1 && oldImage !== 'user-default.png')
						fs.unlinkSync(`./src/images/users/${oldImage}`);
					return response(res, true, result, 200);
				}
				let errorMessage = validate.error.details[0].message;
				errorMessage = errorMessage.replace(/"/g, '');
				fs.unlinkSync(`./src/images/users/${data.image}`);
				return response(res, false, errorMessage, 400);
			}
			return response(res, false, req.fileValidationError, 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},

	insertMyAddress: async (req, res) => {
		try {
			const id = req.decoded.result[0].id;
			const data = req.body;
			data.user_id = id;
			const validate = addAddressVal(data);
			if (validate.error === undefined) {
				const result = await addAddress(data)
				if(result){
					return response(res, true, result, 200);
				}
			}
			let errorMessage = validate.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	
	editMyAddress: async (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const validate = editAddressVal(data);
			if (validate.error === undefined) {
				const checkData = await getDetailMyAddress(id)
				if(checkData.length === 1){
					const result = await editAddress(data, id)
					if(result){
						return response(res, true, result, 200);
					}
				}
				return response(res, false, 'Data not found', 404);
			}
			let errorMessage = validate.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	
	getMyAddress: async (req, res) => {
		try {
			const id = req.decoded.result[0].id;
			if(id){
				const result = await getMyAddress(id)
				const redis = req.redis
				redis.setex('address', 3600, JSON.stringify(result))
				return response(res, true, result, 200)
			}
			return response(res, false, 'id is null', 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	
	getDetailMyAddress: async (req, res) => {
		try {
			const id = req.params.id;
			if(id){
				const result = await getDetailMyAddress(id)
				if(result.length === 1) {
					return response(res, true, result, 200)
				}
				return response(res, false, 'Data not found', 404)
			}
			return response(res, false, 'id is null', 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	deleteMyAddress: async (req, res) => {
		try {
			const id = req.params.id;
			if(id){
				const result = await getDetailMyAddress(id)
				if(result.length === 1) {
					const deleted = await deleteMyAddress(id)
					if(deleted.affectedRows === 1){
						return response(res, true, `Data with ${id} has been deleted`, 200)
					}
					return response(res, false, `Data with ${id} has not been deleted`, 400)
				}
				return response(res, false, 'Data not found', 404)
			}
			return response(res, false, 'id is null', 400);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
};
