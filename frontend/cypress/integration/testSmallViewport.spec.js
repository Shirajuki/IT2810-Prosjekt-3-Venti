describe("Does the ene to end test but on a smaller screen", () => {
    beforeEach(() => {
        cy.start();
    })

    //change to small screensize

    //First test to see if search works
    it("enter data into search field", () => {
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=search]').should('exist');
    cy.get('[data-cy=search]').type('lipstick').should('have.value', 'lipstick');
    cy.get('[data-cy=search]').type('{enter}');
    cy.expect('item-display').length.greaterThan(1);
    })

    //filter by brand smashbox
    it("testing the different buttons in filter", ()=> {
    cy.get('[data-cy=brand]').eq(8).check({force:true});
    cy.expect('item-display').length.greaterThan(1);
    })

    //testing sorting low to high price
    it("testing sorting price low to high", () => {
    cy.sortAsc();
    cy.get('[data-cy=item-price]').first().contains('0');
    })

    //adding the first product to the cart
    it("add prdocts to cart",() => {
        cy.get('.items').first().click({force: true});
        cy.get('[data-cy=buy-button]').click();
        cy.get('[data-cy=close-button]').click();
    })

    //checking the cart and pressing the purchase button
    it("check cart and remove some products",() => {
    cy.get('[data-cy=cart]').click();
    cy.get('[data-cy=purchase-button]').click();
    })

    //writing a review for a product
    it("write a review and add it to a product",() => {
        cy.get('.items').first().click({force: true});
        cy.get('.star').children().children().eq(4).click();
        cy.get('[data-cy=name-area]').type('Rachel').should('have.value', "Rachel");
        cy.get('[data-cy=review-area]').type('Great product, would buy again');
        cy.get('[data-cy=send-area]').click();
    })
})