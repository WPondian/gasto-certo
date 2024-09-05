import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';

// Configurações básicas
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

async function connect(params) {

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@PondianMSQL',
  database: 'db_gasto_certo'
});

try {
    console.log('Conectado ao banco de dados MySQL!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

connect();

app.post('/salvar', async (req, res) => {
    const { nome, email } = req.body; // Captura os dados enviados via AJAX
  
    try {
      // Inserindo os dados no banco de dados
      const [result] = await connection.execute(
        'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
        [nome, email]
      );
  
      // Verifica se a inserção foi bem-sucedida
      if (result.affectedRows > 0) {
        res.status(200).send('Dados inseridos com sucesso');
      } else {
        res.status(500).send('Erro ao inserir os dados');
      }
    } catch (error) {
      console.error('Erro ao inserir dados no banco:', error);
      res.status(500).send('Erro no servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
