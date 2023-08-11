describe("Form1 Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays error messages for invalid form submission", () => {
    cy.get("button[type='submit']").click();

    cy.get(".name-form span")
      .should("be.visible")
      .and("contain", "İsim yazmanız gerekli");
    cy.get(".mail-form span")
      .should("be.visible")
      .and("contain", "Lütfen e-posta adresini giriniz!");
    cy.get(".password-form span")
      .should("be.visible")
      .and("contain", "Lütfen şifrenizi giriniz!");
    cy.get(".terms-form span")
      .should("be.visible")
      .and("contain", "Okudum anladım onaylıyorum!");
  });

  it("submits the form and displays a user", () => {
    cy.get("#name").type("Kadir Aydin");
    cy.get("#email").type("example@example.com");
    cy.get("#password").type("secure123");
    cy.get("#dogum").type("1990-01-01");
    cy.get("#tcKimlik").type("12345678901");
    cy.get("#role").select("role 1");
    cy.get("#terms").check();

    cy.get("button[type='submit']").click();

    cy.get(".ullar li:last-child p:first").should(
      "contain",
      "İsim: Kadir Aydin"
    );
    cy.get(".ullar li:last-child p:nth-child(2)").should(
      "contain",
      "E-mail: example@example.com"
    );
    cy.get(".ullar li:last-child p:last-child").should(
      "contain",
      "Doğum Tarihi: 1990-01-01"
    );
  });
});
