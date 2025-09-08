describe('Regisztráció teszt', () => {
  beforeEach(() => {
    cy.visit('https://flexistore.hu/register2');
    cy.viewport(1920, 1080);
  });

  it('Sikeres-e a regisztráció?', () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    cy.get('input#last_name').type('Teszt');
    cy.get('input#first_name').type('János');
    cy.get('input#email').type(uniqueEmail);
    cy.get('input#password').type('Jelszo123!');
    cy.get('input#passwordAgain').type('Jelszo123!');

    cy.get('form').submit();
    cy.contains('Sikeres regisztráció').should('exist');
  });
});

const users = [
  { first_name: "Anna", last_name: "Kovács", email: "anna.kovacs@example.com", password: "Jelszo123!" },
  { first_name: "Béla", last_name: "Nagy", email: "bela.nagy@example.com", password: "Jelszo123!" },
  { first_name: "Csilla", last_name: "Tóth", email: "csilla.toth@example.com", password: "Jelszo123!" },
  { first_name: "Dániel", last_name: "Szabó", email: "daniel.szabo@example.com", password: "Jelszo123!" },
  { first_name: "Eszter", last_name: "Kiss", email: "eszter.kiss@example.com", password: "Jelszo123!" },
  { first_name: "Ferenc", last_name: "Varga", email: "ferenc.varga@example.com", password: "Jelszo123!" },
  { first_name: "Gábor", last_name: "Molnár", email: "gabor.molnar@example.com", password: "Jelszo123!" },
  { first_name: "Hanna", last_name: "Németh", email: "hanna.nemeth@example.com", password: "Jelszo123!" },
  { first_name: "István", last_name: "Farkas", email: "istvan.farkas@example.com", password: "Jelszo123!" },
  { first_name: "Judit", last_name: "Horváth", email: "judit.horvath@example.com", password: "Jelszo123!" },
]

describe('Regisztráció 10 valószerű felhasználóval', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });
  users.forEach((user, index) => {
    it(`Regisztráció teszt: ${user.first_name} ${user.last_name}`, () => {

      cy.visit('https://flexistore.hu/register2');

      cy.get('input#last_name').type(user.last_name);
      cy.get('input#first_name').type(user.first_name);
      cy.get('input#email').type(user.email);
      cy.get('input#password').type(user.password);
      cy.get('input#passwordAgain').type(user.password);
      cy.get('form').submit();
      cy.contains('Sikeres regisztráció').should('exist');
    });
  });
});