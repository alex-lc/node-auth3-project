const jwt = require('jsonwebtoken');

module.exports = function restricted(req, res, next) {

    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET || 'Every villain is lemons';

    if (authorization) {
        jwt.verify(authorization, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
            else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    }
    else {
        res.status(401).json({ error: 'Access denied.' });
    }
}