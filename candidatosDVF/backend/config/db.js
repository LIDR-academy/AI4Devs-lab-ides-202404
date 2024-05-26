const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'candidatos'
});

connection.connect(error => {
    if (error) throw error;
    console.log('Conexión exitosa a la base de datos.');
});

module.exports = connection;

