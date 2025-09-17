describe('Belépés Desktop Teszt!', () => {
  beforeEach('Oldal betöltése', () => {
    cy.visit('https://flexistore.hu/login2');
    cy.viewport(1920, 1080);
  });

  it('Működik-e a belépés?', () => {
    cy.get('input#email').type('testuser@gmail.com');
    cy.get('input#password').type('Elekes4455!');
    cy.get('form').submit();
  });
});
