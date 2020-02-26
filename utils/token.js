const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

module.exports = function createToken(user) {
    const payload = {
        subject: user.id, // sub
        username: user.username,

    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}