describe("Test search ", () => {
    const backendUrl = Cypress.config("backendUrl");

    before(() => {
        cy.start();
    });
    
    //test to see if search works
    it("enter data into search field", () => {
        cy.get('[data-cy=search-button]').click();
        cy.get('[data-cy=search]').type('lipstick').should('have.value', 'lipstick');
        cy.get('[data-cy=search]').type('{enter}');
        cy.expect('item-display').length.greaterThan(1);
    })

    //test sorting the search
    it("sort after a search", () => {
        cy.sortAsc();
        cy.get('[data-cy=item-display]').get('[data-cy=item-display-items]').contains('a')
    })
})