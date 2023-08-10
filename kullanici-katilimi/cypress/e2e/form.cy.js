describe("Ödev TEST", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Name Check", () => {
    cy.get("[data-cy=isimformu]").type("Burak").should("have.value", "Burak");
  });
  it("Email Check", () => {
    cy.get("#email")
      .type("burakcevizli@gmail.com")
      .should("have.value", "burakcevizli@gmail.com");
  });
  it("Password Check", () => {
    cy.get("#password").type("2511606").should("have.value", "2511606");
  });
  it("TC Check", () => {
    cy.get("#tcKimlik").type("20267367104").should("have.value", "20267367104");
  });
  it("Rol Check", () => {
    cy.get("select").select("Mechanic").should("have.value", "role 3");
  });
  it("Terms Check", () => {
    cy.get("#terms").check();
  });
  it("Buton Check", () => {
    cy.get(".btn").click();
  });
});
