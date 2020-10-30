describe("Test search ", () => {
    const backendUrl = Cypress.config("backendUrl");

    before(() => {
        cy.visit("/");
    });
    
    it("enter data into search field", ()=> {
        cy.get('[data-cy=search-button]').click();
        cy.get('[data-cy=search]').type('lipstick').type('{enter}');
        cy.expect('item-display').length.greaterThan(1);
    })
})