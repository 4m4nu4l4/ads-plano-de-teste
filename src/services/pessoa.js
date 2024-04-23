const RepositorioExercicio = require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()
class ServicoExercicio {

  async PegarUm(id) {
    if (!id || isNaN(id)) {
      throw new Error("Favor digite corretamente o id.") // sarah comentou aqui 
    }
    return repositorio.PegarUm(id)
  }

  async PegarTodos() {
    return repositorio.PegarTodos()
  }

  async Adicionar(pessoa) {
    if (!pessoa) { // sera que aqui não deveria puxar o id da pessoa?
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

  async Alterar(id, pessoa) {
    if (!id || isNaN(id)) {
      throw new Error("Favor corretamente o id.")
    }

    return repositorio.Alterar(id, pessoa) // aqui é alterar não adicionar, corrigiuuuu
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