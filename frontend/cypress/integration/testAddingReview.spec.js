describe("Test if a user can add a review to a product", () => {
    beforeEach(() => {
        cy.start();
    })

    //writing a review for a product
    it("write a review and add it to a product",() => {
        cy.get('[data-cy=item-display-items]').first().click();
        cy.get('[data-cy=star-area]').click();
        cy.get('[data-cy=name-area]').type('Rachel').should('have.value', "Rachel");
        cy.get('[data-cy=review-area]').type('Great product, would buy again');
        cy.get('[data-cy=send-area]').click();
    })


})