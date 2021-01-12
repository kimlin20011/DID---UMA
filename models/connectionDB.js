// DataBase
const config = require('../configs/config');
const mysqlt = require("mysql");
const connection = mysqlt.createConnection({
    host: `${config.mysql.host}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`,
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('db connecting success');
    }
});

module.exports = connection;