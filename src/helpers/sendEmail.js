require('dotenv').config();
const nodemailer = require('nodemailer');
const { USER_EMAIL, PASS_EMAIL, APP_URL } = process.env;
const mustache = require('mustache');
const fs = require('fs');

module.exports = {
	sendEmail: (type, data) => {
		const templateEmail = fs.readFileSync('./src/helpers/template.html', {
			encoding: 'utf-8',
		});
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			secure: false,
			auth: {
				user: USER_EMAIL,
				pass: PASS_EMAIL,
			},
		});

		const mailOptions = {
			from: 'prioariefgunawangunawan@gmail.com',
			to: data.email,
			subject: type,
			html: mustache.render(templateEmail, data),
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`OTP Code has been sent to ${info.accepted[0]}`);
			}
		});
	},
};
