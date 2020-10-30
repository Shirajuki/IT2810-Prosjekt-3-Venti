describe("Test filter options ", () => {
    const backendUrl = Cypress.config("backendUrl");

    before(() => {
        cy.visit("/");
    });
    
    it("testing the different buttons in filter", ()=> {
        cy.get('[data-cy=color1]').click();
        cy.get('[data-cy=brand3]').click();
        cy.get('[data-cy=product_type2]').click();
        cy.get('[data-cy=color1]').click();
        cy.expect('item-display').length.greaterThan(1);
    })
})