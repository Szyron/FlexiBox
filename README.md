# FlexiStore Projekt / FlexiStore Project

**Weboldal / Website**: [https://flexistore.hu](https://flexistore.hu)

---

##  Projekt leírása / Project Description

A FlexiStore egy modern, automatizált bérlési rendszer.  
FlexiStore is a modern, automated rental system.

**Fő funkciók / Main features:**
- Csomagautomaták kezelése  
  Package locker management
- Felhasználói regisztráció és hitelesítés  
  User registration and authentication
- Termékbérlés, rendeléskezelés  
  Product rental and order management
- Adminisztrációs rendszer  
  Administration system

**Fullstack technológia / Fullstack technology**: React (Frontend) + Laravel (Backend)

---

## ⚙️ Telepítési utasítások / Installation Instructions

# Frontend
```bash

cd flexistore
cd frontend
npm install
npm run dev

```
# Backend

```bash
cd flexistore
cd ../backend
composer install

CREATE DATABASE flexibox
cp .env.example .env

DB_DATABASE=flexibox 
DB_USERNAME=your_database_username 
DB_PASSWORD=your_database_password

php artisan key:generate
php artisan migrate
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=UserSeeder
php artisan storage:link
php artisan serve
```
---

## 🧹 Használati utasítások / Usage Instructions

- Nyisd meg a frontendet a `localhost:5173` címen.  
  Open the frontend at `localhost:5173`.
- Jelentkezz be vagy regisztrálj.  
  Log in or register.
- Bérelj termékeket, kezelj csomagautomatákat.  
  Rent products, manage package lockers.
- Admin felület elérhető adminisztrátoroknak.  
  Admin panel available for administrators.

---

## 📁 Projekt struktúra / Project Structure

```
/frontend    # React app (felhasználói és admin oldalak) / React app (user + admin pages)
/backend     # Laravel API backend
/dokuments   # Dokumentációk / Documentation
```

- **Frontend**: React komponensek, Context API, React Router.  
  React components, Context API, React Router.
- **Backend**: Laravel vezérlők, modellek, migrációk.  
  Laravel controllers, models, migrations.
- **Dokumentumok**: PDF dokumentumok, adatbázis dump, prezentáció.  
  Documentation: PDFs, database dump, presentation.

---

## 👥 Készítettek / Contributors

- Gombkötő Gábor (14/FE)  
  Gábor Gombkötő (14/FE)
- Szirony Balázs Gábor (14/FE)  
  Balázs Gábor Szirony (14/FE)

---

## ❓ Gyakori kérdések / FAQ

- **Milyen adatbázist használ?**  
  **Which database is used?**  
  MySQL 8.0

- **Van tesztkörnyezet?**  
  **Is there a test environment?**  
  Igen, Cypress tesztek elérhetők a frontend mappában.  
  Yes, Cypress tests are available in the frontend folder.

---



## 🌐 Verzó / Version

- `v1.0-beta`
- Release és változásnapló elérhető a GitHub Releases menü alatt.  
  Release and changelog available under GitHub Releases.

---

## 📜 Licenc / License

A projekt szerzői jogi védelem alatt áll. Részletek a LICENSE.txt fájlban.  
This project is protected by copyright. See LICENSE.txt for details.

Minden jog fenntartva. Bármely rész felhasználása kizárólag az alkotók előzetes írásos engedélyével lehetséges.  
All rights reserved. Use of any part is only permitted with the authors' prior written consent.

---

# 🔖 Fontos megjegyzés / Important Note

A FlexiStore projekt élesben elérhető:  
The FlexiStore project is live at:

[https://flexistore.hu](https://flexistore.hu)



