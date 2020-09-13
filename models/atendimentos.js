const conexao = require('../infra/conexao');

class Atendimento {
  adiciona(atendimento) {
    const sql = `INSERT INTO Atendimentos SET ?`;
    conexao.query(sql, atendimento, (err, result) => {
      if(err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
}

module.exports = new Atendimento;