const jwt = require('jsonwebtoken');

function Token(privateKey, expiresIn) {
	this.generate = function (payload) {
		return jwt.sign(payload, privateKey, {expiresIn: expiresIn});
	};
	this.verify = function (request, response, next) {
		const token = request.body['token'];
		if (!token) {
			return response.status(401).send();
		}
		jwt.verify(token, privateKey, function (error, decoded) {
			if (error) {
				return response.status(401).send(error);
			}
			request.token = decoded;
			next();
		});
	};
}

module.exports = Token;