const express = require('express');

const Users = require('./usersModel');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Users could not be found.' });
        })
});

module.exports = router;