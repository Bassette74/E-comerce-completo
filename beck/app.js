/*
var express = require('express');//Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index');//Para a rota principal do app
var usersRouter = require('./routes/users');//Para a rota users ./routes/users.js
var usersRouter = require('./routes/produtoRoute');//Para a rota users ./routes/users.js

var app = express();//Ativa a API com o Express

app.use(logger('dev'));
app.use(express.json()); //Permite o uso de JSon
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//Cria a rota app/
app.use('/users', usersRouter);//Cria a rota app/users
app.use('/produto' , produtoRoute);//Cria a rota app/produto

// Sincronizando o Sequelize (em dev)
//Instanciar o banco de dados

const db = require('./models');
const produto = require('./models/produto');

async function applyDataStructure(){
    await db.sequelize.sync({alter: true});
}

applyDataStructure();
// if (process.env.NODE_ENV !== 'production') {
//     sequelize.sync({ force: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
//         .then(() => {
//             console.log('Banco de dados sincronizado');
//         })
//         .catch(err => {
//             console.error('Erro ao sincronizar o banco de dados:', err);
//         });
// }

//Inciar o servidor com o app.js na porta 8080
var port = 8080;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
module.exports = app;
*/

var express = require('express'); // Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;

var indexRouter = require('./routes/index'); // Para a rota principal do app
var usersRouter = require('./routes/users'); // Para a rota users
var produtoRoute = require('./routes/produtoRoute'); // Corrigido para a rota de produtos
var cartRoutes = require('./routes/cartRoutes');

var app = express(); // Ativa a API com o Express

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // Cria a rota app/
app.use('/users', usersRouter); // Cria a rota app/users
app.use('/produto', produtoRoute); // Cria a rota app/produto
app.use('/cart', cartRoutes); // Cria a rota app/cart


// Sincronizando o Sequelize (em dev)
// Instanciar o banco de dados
const db = require('./models');

async function applyDataStructure() {
    await db.sequelize.sync({ alter: true });
}

applyDataStructure();

// Iniciar o servidor com o app.js na porta 8080
var port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
