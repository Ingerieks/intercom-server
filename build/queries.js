'use strict';

var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
});

var getUsers = function getUsers(request, respond) {
    pool.query('SELECT * FROM users ORDER BY id ASC', function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

var getUserById = function getUserById(request, response) {
    var id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

var createUser = function createUser(request, response) {
    var _request$body = request.body,
        name = _request$body.name,
        email = _request$body.email;


    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(201).send('User added with ID: ' + result.insertId);
    });
};

var updateUser = function updateUser(request, response) {
    var id = parseInt(request.params.id);
    var _request$body2 = request.body,
        name = _request$body2.name,
        email = _request$body2.email;


    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send('User modified with ID: ' + id);
    });
};

var deleteUser = function deleteUser(request, response) {
    var id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send('User deleted with ID: ' + id);
    });
};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};
//# sourceMappingURL=queries.js.map