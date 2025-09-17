describe('Regisztráció teszt', () => {
  beforeEach(() => {
    cy.visit('https://flexistore.hu/register2');
    cy.viewport(1920, 1080);
  });

  it('Sikeres regisztráció végrehajtása', () => {
    const uniqueEmail = `testuser@gmail.com`;

    //Regisztrációs adatok kitöltése
    cy.get('input#last_name').type('Teszt');
    cy.get('input#first_name').type('Elek');
    cy.get('input#email').type(uniqueEmail);
    cy.get('input#password').type('Elekes4455!');
    cy.get('input#passwordAgain').type('Elekes4455!');

    cy.get('form').submit();
    cy.contains('Sikeres regisztráció').should('exist');
  });
});

describe('Bejelentkezés és rendelés teszteletése!Müködik-e?', () => {
  beforeEach('Oldal betöltése', () => {
    cy.viewport(1920, 1080);
  });
  it('Teljes rendelés végrehajtás! ', () => {
    // Bejelentkezés
    cy.visit('https://flexistore.hu/login2');
    cy.get('input#email').type('testuser@gmail.com');
    cy.get('input#password').type('Elekes4455!');
    cy.get('form').submit();
    cy.url().should('not.include', '/login2');

    //Termék kiválasztása
    cy.visit('https://flexistore.hu/products');

  
    cy.get('.card').first().should('exist');

    //Termék Kosárba helyezése
    cy.get('#add-to-cart-button')
      .should('be.visible')
      .click();

    //Termék ellenőrzése ,hogy sikeresen hozzáadva a kosárhoz és toasty eltűnt-e
    cy.contains('Termék hozzáadva a kosárhoz!').should('exist');
    cy.scrollTo('top');
    cy.wait(4000);
    cy.get('.Toastify__toast').should('not.exist');
    
    cy.wait(1000)
    cy.get('.hidden > .dropdown > .btn-ghost') 
      .should('be.visible')
      .scrollIntoView()
      .click(); 


    cy.wait(1000);
    cy.get('.dropdown > .card > .card-body > .card-actions > .btn') 
      .should('be.visible')
      .click();

     cy.scrollTo('top');
     cy.wait(2000);

    //Tovább a pénztárhoz gomb
    cy.get('#next-to-checkout')
      .should('be.visible')
      .click();
    
    //TermOfUse elfogadása,checkbox bejelölése
    cy.scrollTo('top');
    cy.wait(2000);
    cy.contains('Elfogadom a felhasználási feltételeket.').scrollIntoView();
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.wait(1000);

    cy.get('#accepted-term')
      .should('be.visible')
      .click();
    

    //Címadatok megadása
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.wait(1000);
    const randomZip = Math.floor(1000 + Math.random() * 8999);
    const cities = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Győr'];
    const streets = ['Petőfi Sándor', 'Kossuth Lajos', 'Ady Endre', 'Rákóczi', 'Jókai'];
    const houseNumbers = ['12', '45A', '7/B', '102', '18'];

    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomHouseNumber = houseNumbers[Math.floor(Math.random() * houseNumbers.length)];
    const email = `teszt${Date.now()}@gmail.com`;
  
    cy.get('#city').type(randomCity);
    cy.get('#zip').type(randomZip.toString());
    cy.get('#email').type(email);
    cy.get('#street').type(randomStreet);
    cy.get('#house_number').type(randomHouseNumber);

    cy.get('#street_id').then(($select) => {
      const options = $select.find('option');
      if (options.length > 1) {
        cy.get('#street_id').select(options.eq(1).val());
      }
    });

    cy.scrollTo('top');
    cy.wait(5000);

    //Fizetési mód kiválasztása
    cy.get('select#id')
    .should('be.visible')
    .then(($select) => {
      const options = $select.find('option');
      if (options.length > 1) {
        const firstValidOption = options.eq(1);
        const value = firstValidOption.val();
        const text = firstValidOption.text();
  
        cy.log(`Első valódi opció kiválasztva: "${text}" (value="${value}")`);
        console.log(`Cypress kiválasztja: "${text}" (value="${value}")`);
  
        cy.wrap($select).select(value);
      } else {
        cy.log('Nincs elérhető valódi opció.');
        console.warn('Nincs elérhető valódi opció a select mezőben.');
      }
    });
    cy.wait(2000);
    cy.contains('button', 'Megrendelés')
      .should('be.visible')
      .click();
    cy.scrollTo('top');
  });
});