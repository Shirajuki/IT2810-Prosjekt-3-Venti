describe("testing to see if the pagination works", () => {

    before(() => {
        crypto.start();
    })

    //test to see that we start on page 1
    it('page 1', () => {
        cy.get("HvaEnnNavnetPåPageingEr").should("have.text", '1');
    })

    //test to see if paging works
    it("testing paging", () => {
        cy.get("howmanybuttons").contians("2").click();
        cy.get("howmanybuttons").contains('Next').click();
        cy.get("HvaEnnNavnetPåPageingEr").should("have.text", '3')
    })

})