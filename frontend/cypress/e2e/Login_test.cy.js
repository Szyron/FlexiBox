describe('template spec', () => {
  beforeEach('Oldal betöltése', () => {
    cy.visit('https://flexistore.hu/login2');
  });

  it('Működik-e a belépés?', () => {
    cy.get('input#email').type('SuperAdmin@example.com');
    cy.get('input#password').type('test1234');
    cy.get('form').submit();
  });
});


