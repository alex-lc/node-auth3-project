const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knex = require('../data/dbConfig.js');

const restricted = require('../middleware/restricted.js');

const server = express();

/* routers */
const authRouter = require('../api/auth/authRouter.js');
const usersRouter = require('../api/users/usersRouter.js');

const sessionConfig = {
    name: 'c',
    secret: 'Every villain is lemons',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    store: new KnexStore({
        knex: knex,
        tablename: 'sessions',
        createTable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 65
    })
}

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionConfig)); // turn on the session middleware
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
    res.status(200).json({ we: 'online' });
});

module.exports = server;