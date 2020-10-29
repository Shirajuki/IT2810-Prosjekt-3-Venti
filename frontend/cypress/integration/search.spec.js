describe("Test search ", () => {
    before(() => {
        cy.visit('/');
        cy.waitForReact();
    
    });
    
    it("enter data into search field", ()=> {
        cy.get('[data-cy=search-button]').click();
        cy.get('[data-cy=search]').type(input).type('lipstick');
        cy.get('[data-cy=search]').type(input).type('{enter}')
    })
})