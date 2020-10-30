describe("Test filter options ", () => {
    const backendUrl = Cypress.config("backendUrl");

    before(() => {
        cy.start();
    });
    
    //testing different filters
    it("testing the different buttons in filter", ()=> {
        cy.get('[data-cy=color1]').click();
        cy.get('[data-cy=brand3]').click();
        cy.get('[data-cy=product_type2]').click();
        cy.get('[data-cy=color1]').click();
        cy.expect('item-display').length.greaterThan(1);
    })

    //testing default sort
    it("testing default sorting ", () => {
        cy.get('[data-cy=select_filter]').should("have.value", name_asc);
    })

    //testing sorting low to high price
    it("testing sorting price low to high", () => {
        cy.get('[data-cy=select_filter]').select("Price $ - $$$").should("have.value", price_asc);
        cy.get('[data-cy=item-display-items]').contains('0');
    })

})