describe("testing adding and removing to the cart", () => {
    beforeEach(() => {
        cy.start();
    })

    it("add products to cart",() => {
        cy.get('.items').first().click({force: true});
        cy.get('[data-cy=buy-button]').click();
        cy.get('[data-cy=close-button]').click();
        cy.get('.items').eq(3).click({force: true});
        cy.get('[data-cy=buy-button]').click();
        cy.get('[data-cy=close-button]').click();
    })

    it("check cart and remove some products",() => {
        cy.get('[data-cy=cart]').click();
        //cy.get('[data-cy=remove-item]').first().click();
        cy.get('[data-cy=purchase-button]').click();
    })
})