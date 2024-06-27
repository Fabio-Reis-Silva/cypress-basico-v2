describe('Centra de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verificar o título da aplicação', function () {


        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('preencha os campos obrigatórios e envia o formulário', function () {
        const longText = 'Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1,Exercício Nº1'
        cy.get('#firstName').type('Fábio')
        cy.get('#lastName').type('Reis')
        cy.get('input[type="email"]').type('testefabio@gmail.com')
        cy.get('textarea[id="open-text-area"]').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Fábio')
        cy.get('#lastName').type('Reis')
        cy.get('input[type="email"]').type('testefabio6gmail.com')
        cy.get('textarea[id="open-text-area"]').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#phone-checkbox').click()

        cy.get('#firstName').type('Fábio')
        cy.get('#lastName').type('Reis')
        cy.get('input[type="email"]').type('testefabio@gmail.com')
        cy.get('textarea[id="open-text-area"]').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Fábio')
            .should('have.value', 'Fábio')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Reis')
            .should('have.value', 'Reis')
            .clear()
            .should('have.value', '')
        cy.get('input[type="email"]').type('testefabio@gmail.com')
            .should('have.value', 'testefabio@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('323232323')
            .should('have.value', '323232323')
            .clear()
            .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class="success"]').should('be.visible')
    })

    it('trocando get por contains', function () {
        cy.get('#firstName').type('Fábio')
        cy.get('#lastName').type('Reis')
        cy.get('input[type="email"]').type('testefabio@gmail.com')
        cy.get('textarea[id="open-text-area"]').type('Teste comandos customizados')
        cy.contains('button', 'Enviar').click()
    })
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('cursos')
            .should('have.value', 'cursos')
    })


    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[value="feedback"]')
            .check()
            .should('be.checked')
    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[value="ajuda"]')
            .check()
            .should('be.checked')
        cy.get('input[value="elogio"]')
            .check()
            .should('be.checked')
        cy.get('input[value="feedback"]')
            .check()
            .should('be.checked')
    })
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('#email-checkbox')
            .check()
            .should('be.checked')
        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')
            .uncheck()
            .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
    })
    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#title')
            .should('have.a.text', 'CAC TAT - Política de privacidade')
    })
    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#title')
            .should('have.a.text', 'CAC TAT - Política de privacidade')
    })
})