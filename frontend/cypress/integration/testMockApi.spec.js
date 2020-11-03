//kan slettes
describe("test the mock api works", ()=> {
  it("requests data of mock api", () => {
      cy.request("../mock-data").as("makeup");

      cy.get("@makeup").should(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.of.at.least(1);
      });
    });
})
