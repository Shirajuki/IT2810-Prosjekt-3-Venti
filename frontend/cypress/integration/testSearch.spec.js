describe("Test search ", () => {
    const backendUrl = Cypress.config("backendUrl");

    before(() => {
        cy.start();
    });
    
    //test to see if search works
    it("enter data into search field", () => {
        cy.get('[data-cy=search-button]').click();
        cy.get('[data-cy=search]').should('exist');
        cy.get('[data-cy=search]').type('lipstick').should('have.value', 'lipstick');
        cy.get('[data-cy=search]').type('{enter}');
        cy.expect('item-display').length.greaterThan(1);
    })

    //test sorting the search
    // cannot reach select options
    it("sort after a search", () => {
        cy.sortAsc();
        cy.get('[data-cy=item-price]').first().contains('0')
    })


})