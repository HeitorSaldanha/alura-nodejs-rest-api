const customExpress = require('./config/custom-express');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');
const tabelas = require('./infra/tabelas');
conexao.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Conectado com sucesso');
    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log('Hello World 3000'));
  }
});