const RepositorioExercicio = require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()
class ServicoExercicio {

  async PegarUm(id) {
    if (!id || isNaN(id)) {
      throw new Error("Favor digite corretamente o id.")
    }
    return repositorio.PegarUm(id)
  }

  async PegarTodos() {
    return repositorio.PegarTodos()
  }

  async Adicionar(pessoa) {

    if (!pessoa.nome) {
      throw new Error("Favor preencher o nome.");
    } else if (!pessoa.email) {
      throw new Error("Favor preencher o email.");
    } else if (!pessoa.senha) {

      if (!pessoa) {
        throw new Error("Favor preencher o pessoa.")
      } else if (!pessoa.nome) {
        throw new Error("Favor preencher o nome.")
      } else if (!pessoa.email) {
        throw new Error("Favor preencher o email.")
      } else if (!pessoa.senha) {
        throw new Error("Favor preencher o senha.")
      }

      return repositorio.Adicionar(pessoa)

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
  async Alterar(id, pessoa) {
    if (!id || isNaN(id)) {
      throw new Error("Favor corretamente o id.")
    }

    return repositorio.Alterar(id, pessoa) // aqui é alterar não adicionar
  }

  async Deletar(id) {
    if (!id || isNaN(id)) {
      throw new Error("Favor corretamente o id.")
    }
    const idPessoa = await Pessoa.findOne({ where: { id: id } });
    if (!idPessoa) {
      throw new Error("Favor corretamente o id.")
    }
    return repositorio.Deletar(id)
  }

}
module.exports = ServicoExercicio