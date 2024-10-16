import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

// Configurações básicas
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@PondianMSQL',
    database: 'db_gasto_certo'
});

connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
});

app.post('/salvar', async (req, res) => {
    const { nomeGasto,
        origemGasto,
        categoriaGasto,
        valorGasto,
        dataGasto } = req.body;

    const query = 'INSERT INTO gasto (nome, origem, categoria, valor, data_gasto) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nomeGasto, origemGasto, categoriaGasto, valorGasto, dataGasto],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            return res.json({ id: result.insertId, ...req.body });
        });
});

app.get('/listar', async (req, res) => {
    let { nomeGasto, categoriaGasto } = req.query;

    let query = 'SELECT * FROM gasto';
    let params = [];

    if (nomeGasto || categoriaGasto) {
        query += ' WHERE';
    }

    if (nomeGasto) {
        query += ' nome LIKE ?';
        params.push(`%${nomeGasto}%`);
    }

    if (nomeGasto && categoriaGasto) {
        query += ' OR';
    }

    if (categoriaGasto) {
        query += ' categoria LIKE ?';
        params.push(`%${categoriaGasto}%`);
    }

    connection.execute(query, params,
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            return res.json(result);
        });
});

app.delete('/deletar', async (req, res) => {
    const { idGasto } = req.body;

    const query = 'DELETE FROM gasto WHERE id = ?';
    connection.query(query, idGasto,
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            return res.json({ id: result.insertId, ...req.body });
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
