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
};

module.exports = schema;
