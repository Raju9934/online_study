const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: (user, callback) => {
        const { username, password } = user;
        bcrypt.hash(password, 10, (err, hash) => {
            console.log(hash)
            if (err) return callback(err);
            db.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hash],
                callback
            );
        });
    },


    findByUsername: (username, callback) => {
        db.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results[0]);
            }
            
        );
    },





    
};

module.exports = User;
