
describe('template spec', () => {
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

describe('Termék hozzáadása a kosárhoz', () => {
  beforeEach('Oldal betöltése', () => {
    cy.viewport(1920, 1080);
  });
  it('Bejelentkezés és első termék kosárba tétele', () => {
    // Bejelentkezés
    cy.visit('https://flexistore.hu/login2');
    cy.get('input#email').type('testuser@gmail.com');
    cy.get('input#password').type('Elekes4455!');
    cy.get('form').submit();

    // Várjuk meg, hogy a belépés tényleg megtörténjen
    cy.url().should('not.include', '/login2');

    // Manuálisan navigálunk, ha nincs menülink
    cy.visit('https://flexistore.hu/products'); // vagy az aktuális termékoldal path

    // Várjuk meg, amíg legalább az első termék betöltődik
    cy.get('.card').first().should('exist');

    // Az első terméken belül kattintunk a Kosárba gombra
    cy.get('#add-to-cart-button')  // Most az ID alapján keresünk
      .should('be.visible')  // Ellenőrizzük, hogy látható-e
      .click();  // Kattintás a gombra

    // Visszajelzés ellenőrzés
    cy.contains('Termék hozzáadva a kosárhoz!').should('exist'); // Állítsd be a pontos szöveget, ha van
    cy.scrollTo('top');
    cy.wait(4000); // Várjunk egy kicsit, hogy a Toast értesítés eltűnjön
    // Ellenőrizzük, hogy a Toast értesítés eltűnik, mielőtt kattintanánk a kosár gombra
    cy.get('.Toastify__toast').should('not.exist');
     // Ha az értesítés jelen van, várjuk meg, amíg eltűnik
    
     
     cy.wait(1000)
    // Kosár ikon ellenőrzése és kattintás az id alapján
    cy.get('#cart-button')  // ID alapján célozzuk meg a kosár gombot
      .should('be.visible')  // Ellenőrizzük, hogy látható-e
      .scrollIntoView()      // Görgetés a gombhoz, ha szükséges
      .click();  // Kattintás a kosár gombra
    cy.wait(1000); // Várjunk egy kicsit, hogy a kosár oldal betöltődjön
    cy.get('.hidden > .dropdown > .btn-ghost')  // ID alapján célozzuk meg a kosár nézet gombot
      //.should('be.visible')  // Ellenőrizzük, hogy látható-e
      .click(); // Kattintás a kosár nézet gombra
    
     // Várjunk egy kicsit, hogy a kosár oldal betöltődjön
     cy.scrollTo('top');
     cy.wait(2000);

    cy.get('#next-to-checkout')
      .should('be.visible')  // Ellenőrizzük, hogy látható-e
      .click();  // Kattintás a pénztárhoz gombra
    
    cy.scrollTo('top');
    cy.wait(2000);
    
    cy.get('input[type="checkbox"]').check({ force: true }); // checkbox bepipálása
    cy.wait(1000); // Várjunk egy kicsit, hogy a checkbox állapota frissüljön
    cy.get('#accepted-term') // gomb keresése ID alapján
      //.scrollIntoView()
      .should('be.visible')
      .click();
    
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.wait(1000); // Várjunk egy kicsit, hogy a checkbox állapota frissüljön
    // Tesztadat generálása
    const randomZip = Math.floor(1000 + Math.random() * 8999); // 4 számjegyű irányítószám
    const cities = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Győr'];
    const streets = ['Petőfi Sándor utca', 'Kossuth Lajos tér', 'Ady Endre út', 'Rákóczi út', 'Jókai utca'];
    const houseNumbers = ['12', '45A', '7/B', '102', '18'];

    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomHouseNumber = houseNumbers[Math.floor(Math.random() * houseNumbers.length)];
    const email = `teszt${Date.now()}@gmail.com`; // egyedi email minden futásnál
  
    // Űrlapmezők kitöltése
    cy.get('#city').type(randomCity);
    cy.get('#zip').type(randomZip.toString());
    cy.get('#email').type(email);
    cy.get('#street').type(randomStreet);
    cy.get('#house_number').type(randomHouseNumber);

    // Közterület jellege (dropdown) – ha van legalább 1 opció
    cy.get('#street_id').then(($select) => {
      const options = $select.find('option');
      if (options.length > 1) {
        cy.get('#street_id').select(options.eq(1).val()); // az első valódi opció
      }
    });

    cy.scrollTo('top');
    cy.wait(2000); // Várjunk egy kicsit, hogy a mezők kitöltődjenek

    cy.get('select#id')
    .should('be.visible')
    .then(($select) => {
      // Kiválasztjuk az első valódi opciót, ha van (nem az üres 'Válasszon...')
      const options = $select.find('option');
      if (options.length > 1) {
        const firstValidOption = options.eq(1).val();
        cy.get('select#id').select(firstValidOption);
      }
    });
    cy.wait(2000); // Várjunk egy kicsit, hogy a mezők kitöltődjenek
    cy.contains('button', 'Rendelés véglegesítése')
      .should('be.visible')
      .click();
    cy.scrollTo('top');
  });
});