require('express-async-errors')
const AppError = require('./utils/AppError')

// Inicializando o banco de dados e criando as tabelas necessárias quando a aplicação for inicializada.
const migrationsDatabase = require('./database/sqlite/migrations')
migrationsDatabase()

// Criando a aplicação baseada em NodeJS express.
const express = require('express');
const routes = require('./routes')
const app = express();

app.use(express.json());
app.use(routes)

// Configurando a aplicação para utilizar uma classe chamada AppError cujo irá retornar os erros do NodeJS express.
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message
    })
  }
})

// Informando em qual porta de rede a aplicação irá funcionar.
const port = 3000
app.listen(port, () => {
  console.log(`ReactFood running in port ${port}`);
})