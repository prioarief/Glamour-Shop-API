const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
	let token = null;
	try {
		token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.decoded = decoded;
		next();
	} catch (error) {
		if (error.name == "TokenExpiredError") {
			return res.status(401).json({
                message: "Token Expired",
			});
		}
		return res.status(401).json({
			message: "Invalid Token",
		});
	}
};
