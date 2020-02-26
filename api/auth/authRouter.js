const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

const Users = require('../users/usersModel.js');

const router = express.Router();

/* endpoints */

/* register a user */
router.post('/register', (req, res) => {

    let newUser = req.body;

    console.log(newUser.password);

    const hash = bcrypt.hashSync(newUser.password, 8);

    console.log(hash);

    newUser.password = hash;

    console.log(req.session);

    Users.add(newUser)
        .then(user => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(400).json({ error: 'User could not be registered.' });
        })
});

/* login a user */
router.post('/login', (req, res) => {

    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = createToken(user);
                req.session.loggedIn = true;

                res.status(200).json({ success: 'You have logged in.', token });
            }
            else {
                res.status(401).json({ error: 'Invalid credentials. Please try again.' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Something went wrong on our end.' });
        })
});

function createToken(user) {
    const payload = {
        subject: user.id, // sub
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;