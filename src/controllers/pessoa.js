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
  async Adicionar(pessoa) {
    if (!pessoa.nome) {
      throw new Error("Favor preencher o nome.");
  } else if (!pessoa.email) {
      throw new Error("Favor preencher o email.");
  } else if (!pessoa.senha) {
      throw new Error("Favor preencher o senha.");
  }

  // Expressão regular para validar o formato de um e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expressão regular para validar a senha
  // Pelo menos uma letra maiúscula, uma letra minúscula, um número,
  // um caractere especial e no mínimo 8 caracteres
  const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Verificar se o email está em um formato válido
  if (!emailRegex.test(pessoa.email)) {
      throw new Error('Formato de e-mail inválido.');
  }

  // Verificar se a senha atende aos critérios de segurança
  if (!senhaRegex.test(pessoa.senha)) {
      throw new Error('A senha não atende aos critérios de segurança.');
  }

  return repositorio.Adicionar(pessoa);
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