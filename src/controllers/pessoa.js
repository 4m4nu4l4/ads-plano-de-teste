const ServicoExercicio = require("../services/pessoa.js");

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
    try {
        const { pessoa } = req.body;

        if (!pessoa) {
            throw new Error("Pessoa não está definido na requisição!");
        }

        await servico.Adicionar(pessoa);
        
        res.status(201).json({ message: "Adicionado com sucesso!" });
    } catch (error) {
        if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
            res.status(400).json({ message: "Email já cadastrado!" });
        } else {
            res.status(404).json({ message: error.message });
        }
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
      const id = req.params.id

      await servico.Deletar(id)

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }

}

module.exports = ControllerExercicio