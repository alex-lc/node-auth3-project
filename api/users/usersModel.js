const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findBy,
    findById,
    add
};

function find() {
    return db('users');
}

function add(user) {
    return db('users').insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}