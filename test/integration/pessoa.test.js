const { describe, expect, it } = require('@jest/globals');
const conexao = require("../../src/database");
const ServicoExercicio = require("../../src/services/pessoa");

describe('Testes do primeiro exercício', () => {

   const servico = new ServicoExercicio()

   // Executado antes de TODOS os testes
   beforeAll(async () => {
      this.transaction = await conexao.transaction();
      console.info('Iniciando TDD com jest!');
   });

   // Executado após TODOS os testes
   afterAll(() => {
      this.transaction.rollback();
      console.info('Encerrados os testes');
   });

   it('Should add a name', async () => {
      const mockPessoa = { nome: "Joao", email: "batata@123.com", senha: "123456" }
      // const result = await servico.Adicionar(mockPessoa)
      // const dataValues = result.dataValues
      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)

      expect(mockPessoa.nome).toBe(dataValues.nome);
      expect(mockPessoa.email).toBe(dataValues.email);
      expect(mockPessoa.senha).toBe(dataValues.senha);
   })

})



// test de api testa a camada externa
// então o teste de api não pode ser usado com o transsation (teste de integração)

// transação não vai precisar adicionar pessoas no meu banco original 