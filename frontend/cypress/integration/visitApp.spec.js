describe("Visits website", () => {
    const backendUrl = Cypress.config("backendUrl");

    beforeEach(() => {
        cy.start();
    })
    
    //end to end testing of the application
    it("visits website and tests differnet components", ()=> {
        cy.server();

        cy.visit("http://localhost:3000")
    })
})