describe("Visits website", () => {
    const backendUrl = Cypress.config("backendUrl");

    beforeEach(() => {
        cy.visit("/");
    })
    
    it("visits website", ()=> {
        cy.server();

        cy.visit("http://localhost:3000")
    })
})