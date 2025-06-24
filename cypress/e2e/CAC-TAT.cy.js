/* describe -> switch de testes */
/* it -> caso de teste */

const { faker } = require('@faker-js/faker'); // biblioteca para criar dados "fake"

describe('Central de Atendimento ao Cliente TAT', () => {

  const user = {}; // Objeto vazio em JavaScript
  
  beforeEach(() => {
    cy.visit('./src/index.html')

    user.email = faker.internet.email(); // Criar um email fake
    user.firstname = faker.name.firstName(); // Criar um nome fake
    user.lastname = faker.name.lastName();
  })

  it('verifica o título da aplicação', () => {
    //cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') // da aula kkkk mas o de cima está certo tbm
    /* da para usar 'not.be.equal' se quiser pegar algo que não for igual */
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const LongText = Cypress._.repeat('iabadabadu', 50); // repitir 'iabadabadu' 50 vezes (da aula de resolução)

    cy.get('input#firstName').type('Iago')
    cy.get('input#lastName').type('Oliveira')
    cy.get('input#email').type('iagorosa@gmail.com')
    // cy.get('textarea#open-text-area').type('sla, se vira') // Exercício
    cy.get('textarea#open-text-area').type(LongText, { delay: 0 }) // Exercício extra 1 -- sobrescrever o delay
    cy.get('button.button').click() // daria para pegar '.button' apenas, ou como na correção, 'button[type="submit"]'
    cy.get('span.success').should('be.visible') // pega mensagem de sucesso
    /* poderia pegar usuando apenas '.success' tbm, que seria a classe success*/
  })

  /* Exercício extra 2 */
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input#firstName').type('Iago')
    cy.get('input#lastName').type('Oliveira')
    cy.get('input#email').type('iabadabadu') // forçando o erro digitando email com formatação errada
    cy.get('textarea#open-text-area').type('sla, se vira')
    cy.get('button.button').click()
    cy.get('span.error').should('be.visible') // pega mensagem de erro
    /* poderia pegar usuando apenas '.error' tbm, que seria a classe error*/
  })

  /* Exercício extra 3 */
  it('validar se o campo telefone continue vazio após ser digitado um valor não-numérico', () => {
    cy.get('input#phone').type('abc')
    cy.get('input#phone').should('have.value', '') // verificar se no campo não tem valor
    /* Talvez daria para fazer not.have.value */
    
    /* Resolução do moço */
    /* 
    cy.get('#phone').
      .type('abc')
      .should('have.value', '')
    */
  })

  /* Exercício extra 4 */
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input#firstName').type('Iago')
    cy.get('input#lastName').type('Oliveira')
    cy.get('input#email').type('iagorosa@gmail.com')
    cy.get('input#phone-checkbox').click() // clica no checkbox
    cy.get('textarea#open-text-area').type('sla, se vira')
    cy.get('button.button').click()
    cy.get('span.error').should('be.visible') // pega mensagem de sucesso
  })

  /* Exercício extra 5 */
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input#firstName').type('Iago').should('have.value', 'Iago')
    cy.get('input#lastName').type('Oliveira').should('have.value', 'Oliveira')
    cy.get('input#email').type('iagorosa@gmail.com').should('have.value', 'iagorosa@gmail.com')
    cy.get('input#phone').type('123456789').should('have.value', '123456789')
    cy.get('input#firstName').clear().should('have.value', '')
    cy.get('input#lastName').clear().should('have.value', '')
    cy.get('input#email').clear().should('have.value', '')
    cy.get('input#phone').clear().should('have.value', '')
    // dava para fazer assim tbm -> cy.get('input#firstName').type('Iago').should('have.value', 'Iago').clear().should('have.value', '')
  })

  /* Exercício extra 6 */
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button.button').click()
    cy.get('span.error').should('be.visible')
  })

  /* Exercício extra 7 */
  it('envia o formuário com sucesso usando um comando customizado', () => { // '.only' ali no 'it' é para rodar só esse 'it'
    cy.fillMandatoryFieldsAndSubmit(user); // comando customizado que fiz em 'cypress -> support -> commands.js'
  })

  /* Exercício extra 8 */
  // Eu tinha que trocar o modo de achar o botão para cy.contains()
  // Fiz isso no comando customizado que fiz para o exercício 7, só seguir o caminho que comentei lá no exercício 7

})