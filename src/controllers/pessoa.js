const ServicoExercicio = require("../services/pessoa.js");
const  { validarSenha, validarEmail } = require('../utils/validation.js');
const   pessoa = require('../models/pessoa.js');

const servico = new ServicoExercicio()
class ControllerExercicio {

  async PegarUm(req, res) {
    try {
      const id = req.params.id;

      const result = await servico.PegarUm(id);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  async PegarTodos(req, res) { //
    try {
      const result = await servico.PegarTodos();

      res.status(200).json(result); // 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  //  No código corrigido, adicionamos uma verificação para garantir que req.body.pessoa esteja definido antes de tentar acessá-lo. 
  // Isso evita possíveis erros se o corpo da requisição não incluir o objeto pessoa.
  async Adicionar(req, res) {
    const {pessoa} = req.body;
    try {
        const {email, senha } = req.body.pessoa; // Acessando os campos email e senha do objeto Pessoa

        // Verificar se o email está em um formato válido
        if (!validarEmail(email)) {
            return res.status(400).json({ error: 'Formato de e-mail inválido.' });
        }

        // Verificar se a senha atende aos critérios de segurança
        if (!validarSenha(senha)) {
            return res.status(400).json({ error: 'A senha não atende aos critérios de segurança.' });
        }
        
        await servico.Adicionar(pessoa)

        // Restante da lógica para adicionar a pessoa ao banco de dados...
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao adicionar pessoa.' });
    }
}
/*  async Alterar(req, res) {
    try {
      const id = req.params.id;
      const { pessoa } = req.body; // nao pode passar o objeto nome

      await servico.Alterar(id, pessoa) // mudou aqui tambem

      res.status(200).json({ message: "Alterado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.errors.message || error.message });

    }
  }*/


  //Assim como na função Adicionar, adicionamos uma verificação para garantir que req.body.pessoa esteja definido antes de tentar usá-lo. 
  //Isso evita possíveis erros se o corpo da requisição não incluir o objeto pessoa.
  
  async Alterar(req, res) {
    try {
        const id = req.params.id;
        const { pessoa } = req.body;

        if (!pessoa) {
            throw new Error("Pessoa não está definido na requisição!");
        }

        await servico.Alterar(id, pessoa);

        res.status(200).json({ message: "Alterado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: error.errors.message || error.message });
    }
}

  async Deletar(req, res) {
    try {
      const id = req.params.id;

      await servico.Deletar(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }

}

module.exports = ControllerExercicio;