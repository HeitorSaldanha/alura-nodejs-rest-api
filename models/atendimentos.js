const moment = require('moment');
const conexao = require('../infra/conexao');

class Atendimento {
  adiciona(atendimento, res) {
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const validacaoData = moment(data).isSameOrAfter(dataCriacao);
    const validacaoCliente = atendimento.cliente.length >= 5;
    const objValidacoes = [
      {
        nome: 'data',
        valido: validacaoData,
        mensagem: 'A Data do atendimento deve ser maior ou igual do que a data atual'
      },{
        nome: 'cliente',
        valido: validacaoCliente,
        mensagem: 'O nome do cliente deve conter ao menos 5 caracteres'
      }
    ];
    const erros = objValidacoes.filter(campo => !campo.valido);

    if(erros.length) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data};
      const sql = `INSERT INTO Atendimentos SET ?`;

      conexao.query(sql, atendimentoDatado, (err, result) => {
        if(err) {
          res.status(400).json(err);
        } else {
          res.status(201).json({atendimentoDatado});
        }
      });
    }
  }

  lista(res){
    const sql = `
      SELECT * FROM Atendimentos
    `;

    conexao.query(sql, (err, result) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(result)
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `
      SELECT * FROM Atendimentos WHERE id=${id}
    `;

    conexao.query(sql, (err, result) => {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result[0]);
      }
    })
  }

  altera(id, valores, res) {
    if(valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }
    const sql = 'UPDATE Atendimentos set ? WHERE id=?';
    conexao.query(sql, [valores,id], (err, result) => {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({...valores, id});
      }
    });
  }

  remove(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`;
    conexao.query(sql, (err, result) => {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({id});
      }
    });
  }
}

module.exports = new Atendimento;