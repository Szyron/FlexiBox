describe('Regisztráció teszt', () => {
  beforeEach(() => {
    cy.visit('https://flexistore.hu/register2');
  });

  it('Sikeres regisztráció végrehajtása', () => {
    // Generálunk egy egyedi email címet minden tesztfutáshoz
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
  { first_name: "Anna", last_name: "Kovács", email: "anna.kovacs+1@example.com", password: "Jelszo123!" },
  { first_name: "Béla", last_name: "Nagy", email: "bela.nagy+2@example.com", password: "Jelszo123!" },
  { first_name: "Csilla", last_name: "Tóth", email: "csilla.toth+3@example.com", password: "Jelszo123!" },
  { first_name: "Dániel", last_name: "Szabó", email: "daniel.szabo+4@example.com", password: "Jelszo123!" },
  { first_name: "Eszter", last_name: "Kiss", email: "eszter.kiss+5@example.com", password: "Jelszo123!" },
  { first_name: "Ferenc", last_name: "Varga", email: "ferenc.varga+6@example.com", password: "Jelszo123!" },
  { first_name: "Gábor", last_name: "Molnár", email: "gabor.molnar+7@example.com", password: "Jelszo123!" },
  { first_name: "Hanna", last_name: "Németh", email: "hanna.nemeth+8@example.com", password: "Jelszo123!" },
  { first_name: "István", last_name: "Farkas", email: "istvan.farkas+9@example.com", password: "Jelszo123!" },
  { first_name: "Judit", last_name: "Horváth", email: "judit.horvath+10@example.com", password: "Jelszo123!" },
]

describe('Regisztráció 10 valószerű felhasználóval', () => {
  users.forEach((user, index) => {
    it(`Regisztráció teszt: ${user.first_name} ${user.last_name}`, () => {
      const uniqueEmail = user.email.replace('@', `.${Date.now()}@`);

      cy.visit('https://flexistore.hu/register2');

      cy.get('input#last_name').type(user.last_name);
      cy.get('input#first_name').type(user.first_name);
      cy.get('input#email').type(uniqueEmail);
      cy.get('input#password').type(user.password);
      cy.get('input#passwordAgain').type(user.password);
      cy.get('form').submit();
      cy.contains('Sikeres regisztráció').should('exist');
    });
  });
});