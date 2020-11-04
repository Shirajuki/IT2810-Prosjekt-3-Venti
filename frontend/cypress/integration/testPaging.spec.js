describe("testing to see if the pagination works", () => {

    before(() => {
        cy.start();
    })

    //test to see that we start on page 1
    it('page 1', () => {
        cy.get(".pagination").get(".active").should("have.text", 11);
    })

    //test to see if paging works
    //Because of two paginatoins, we test for 11, 22 and so on, instead of 1 and 2
    it("testing paging", () => {
        //cy.get('.next').click();
        cy.get('.next > a').eq(0).click({force: true}); 
        cy.get('.next > a').eq(0).click({force: true}); 
        cy.get(".pagination").get(".active").should("have.text", 33);
        cy.get('.previous > a').eq(0).click({force: true});
        cy.get(".pagination").get(".active").should("have.text", 22);
    })

})