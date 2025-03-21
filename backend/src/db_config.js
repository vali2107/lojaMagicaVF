// Importar pacote do mysql
const mysql = require('mysql2');

// Cria conexão com banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RootLocalHost1.',
    database: 'crud_api'
})

// Testar conexão
connection.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log('Mysql conectado')
    }
});

module.exports = connection;