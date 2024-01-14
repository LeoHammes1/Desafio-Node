const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
});

pool.query(`INSERT INTO people(name) values('Leonardo')`, (err) => {
    if (err) {
        console.error('Erro ao inserir no banco de dados', err);
    }
});

app.get('/', (req, res) => {
    pool.query('SELECT name FROM people', (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados', err);
            res.status(500).send('Erro ao consultar o banco de dados');
            return;
        }

        let names = results.map(row => row.name).join('<br>');
        res.send('<h1>Full Cycle Rocks!</h1><p>' + names + '</p>');
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
