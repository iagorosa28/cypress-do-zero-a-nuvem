// describe -> switch de testes
// it -> caso de teste

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html')
    //cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') // da aula kkkk mas o de cima está certo tbm
    // da para usar 'not.be.equal' se quiser pegar algo que não for igual 
  })
})