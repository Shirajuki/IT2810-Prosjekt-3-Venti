describe("Test filter options ", () => {
    const backendUrl = Cypress.config("backendUrl");

    before(() => {
        cy.start();
    });
    
    //testing different filters
    it("testing the different buttons in filter", ()=> {
        cy.get('[data-cy=type]').eq(3).check({force:true});
        cy.get('[data-cy=brand]').eq(1).check({force:true});
        cy.get('[data-cy=type]').eq(4).check({force:true});
        cy.get('[data-cy=type]').eq(3).uncheck({force:true});
        cy.expect('item-display').length.greaterThan(1);
    })

    //testing default sort
    it("testing default sorting ", () => {
        cy.get('[data-cy=sort-filter]').should("have.value", "name_asc");
    })

    //testing sorting low to high price
    it("testing sorting price low to high", () => {
        cy.sortAsc();
        cy.get('[data-cy=item-price]').first().contains('6');
    })

})