const joiBase = require('@hapi/joi');
const joiDate = require('@hapi/joi-date');
const joi = joiBase.extend(joiDate); // extends

const moment = require('moment');
const max = moment().format('YYYY-MM-DD');
const min = '1945-08-17';

const schema = {
	editValidation: joi.object({
		name: joi.string().max(30),
		password: joi.string().min(6),
		birthday_date: joi
			.date()
			.format('YYYY-MM-DD')
			.min(min)
			.message(`"date" cannot be earlier than ${min}`)
			.max(max)
			.message(`"date" cannot be later than ${max}`)
			.required(),
		image: joi.string()
	}),
	addAddressVal: joi.object({
		user_id: joi.number().required(),
		name: joi.string().required(),
		type: joi.string().required(),
		address: joi.string().required(),
		telp: joi.string().min(12).max(13).required(),
		city: joi.string().required(),
		zipcode: joi.string().max(11).required(),
		province: joi.string().required(),
		country: joi.string().required(),
	}),
};

module.exports = schema;
