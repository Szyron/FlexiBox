function PrivacyPolicy() {
  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-lg">Adatvédelmi Irányelvek – FlexiStore</h1>

        Hatályos: 2025.04.08.
        <br />
        A FlexiStore számára fontos a felhasználói adatok védelme. Jelen dokumentum ideiglenes irányelveket tartalmaz, melyek a tesztelési fázis során érvényesek.
        <p className="py-4">
          <h3>1. Milyen adatokat gyűjtünk?</h3>
          Jelenleg a tesztoldalon keresztül nem gyűjtünk személyes adatokat. A végleges szolgáltatás során azonban a következő típusú adatgyűjtés lehetséges:


          <li>Név, e-mail cím, telefonszám</li>
          <li>Helyadatok (pl. automata elhelyezkedése)</li>
          <li>Bérlési előzmények</li>
          <li>Fizetési adatok (pl. kártyaadatok – ezeket kizárólag biztonságos fizetési szolgáltatón keresztül)</li>


        </p>
        <p className="py-4">
          <h3>2. Mire használjuk az adatokat?</h3>
          <li>A bérlési folyamat biztosítására</li>
          <li>Ügyfélszolgálat és kapcsolattartás céljára</li>
          <li>A szolgáltatás fejlesztésére</li>
        </p>
        <p className="py-4">
          <h3>3. Adatok megosztása</h3>
          Az adatokat harmadik félnek nem adjuk el. Kizárólag az alábbi esetekben történhet megosztás:
          <li>Törvény által előírt esetek</li>
          <li>Technikai partnerekkel, akik segítenek a szolgáltatás működtetésében</li>
        </p>
        <p className="py-4">
          <h3>4. Adatbiztonság</h3>
          Az adatvédelmet komolyan vesszük, és minden ésszerű technikai intézkedést megteszünk annak érdekében, hogy az adatok biztonságban legyenek.

          A FlexiStore nem vállal felelősséget semmilyen kárért, amely a tesztplatform használatából ered.
        </p>
        <p className="py-4">
          <h3>5. Felhasználói jogok</h3>
          A jövőben lehetőséged lesz:

          <li>Adatod módosítására vagy törlésére</li>
          <li>Tájékoztatást kérni az általunk tárolt adatokról</li>
          <li>Hozzájárulásod visszavonására</li>
        </p>
        <p className="py-4">
          <h3>6. Tesztelési fázis sajátosságai</h3>
          A FlexiStore jelenlegi verziója tesztelési fázisban van. Ennek keretében:
          <li>Egyes felhasználói adatok technikai okokból az adatbázisba kerülhetnek, de ezek nem kerülnek feldolgozásra vagy elemzésre</li>
          <li>A „kosár” funkció csak teszt célokat szolgál, a benne szereplő fizetési lehetőségek mögött nincs valós tranzakció</li>

        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy