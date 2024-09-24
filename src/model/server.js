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

let connection2 = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@PondianMSQL',
    database: 'db_gasto_certo'
});

connection2.connect(error => {
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
    connection2.query(query, [nomeGasto, origemGasto, categoriaGasto, valorGasto, dataGasto],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            return res.json({ id: result.insertId, ...req.body });
        });
});

app.get('/listar', async (req, res) => {

    const query = 'SELECT * FROM gasto';
    connection2.query(query,
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            return res.json(result);
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
