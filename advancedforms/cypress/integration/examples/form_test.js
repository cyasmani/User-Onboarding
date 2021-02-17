describe("My First Test", function() {
    beforeEach(function(){
        cy.visit("http://localhost:3000/")
    });

    it("Finds the Name input", () => {
        cy.get('#name')
        .type("Yasmani Castaneda")
        .should("have.value", "Yasmani Castaneda")
        
    })

    it("Finds the Email input", () => {
        cy.get('#email')
        .type("yasmanicastaneda@yahoo.com")
        .should("have.value", "yasmanicastaneda@yahoo.com")
    })

    it("Finds the Password input", () => {
        cy.get('#password')
        .type("Itachi18")
        .should("have.value", "Itachi18")
    })

    it("See if Checkbox works", () => {
        cy.get('#terms').check().should("be.checked")
        
    })

    it("Check to see if submit button works", () => {
        cy.get('#name')
        .type("Yasmani Castaneda"),
        cy.get('#email')
        .type("yasmanicastaneda@yahoo.com"),
        cy.get('#password')
        .type("Itachi18"),
        cy.get('#terms').check(),
        cy.get('button').click()

    })

    it("Validation input", () => {
        cy.get("#email").type("not_an_email"),
        cy.get('[for="email"] > p')
        .should("have.length", 1)
    
     })
})
