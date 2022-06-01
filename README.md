# Mozi üzemeltető rendszer

## Feladat leírása
Készítsünk egy mozi üzemeltető rendszert, amely alkalmas az előadások, illetve a jegyvásárlások kezelésére.

A webes felületen keresztül a nézők megtekinthetik a moziműsort, valamint rendelhetnek jegyeket.
-	A főoldalon megjelenik a moziban játszott összes film.
-	A filmet kiválasztva megjelenik annak részletes leírása (év, szinopszis, hossz), plakátja, továbbá az összes előadás időpontja.
-	Időpontot kiválasztva lehetőség nyílik helyfoglalásra az adott előadásra. Ekkor a felhasználónak ki kell választania a lefoglalandó üléseket (csak a szabad helyek foglalhatóak).

Alkalmazottként lehetőség nyílik új film felvitelére, és újabb előadások meghirdetésére.
-	Új film felvitelekor ki kell tölteni a film adatait (cím, szinopszis, év, hossz), valamint kiválaszthatunk véletlenszerűen egy plakátot.
-	Új előadás meghirdetéséhez ki kell választani a dátumot, időpontot, és a mozitermet.

## Adatbázis táblák
-	User (username, password, fullName, phone)
-	Movie (title, description, length, imageUrl, createDate, *categories*)
-	Category (name)
-	Auditorium (rows, columns)
-	Screening (*auditorium*, *movie*, startTime)
-	Ticket (*screening*, seatRow, seatColumn, *user*)

## Adatbázis relációk
-	N–1 (Ticket - User)
-	N–1 (Ticket - Screening)
-	N–1 (Screening - Auditorium)
-	N–1 (Screening - Movie)
-	N–N (Category - Movie)

![Relation Diagram](/ERDDiagram1.jpg)

## Végpontok
### Frontend
<code>GET /</code> Főoldal

<code>GET /login</code> Bejelentkező oldal

<code>GET /registration</code> Regisztrációs oldal

<code>GET /add-movie (ADMIN)</code> Film hozzáadása oldal

<code>GET /movies/:id</code> Film oldal

<code>GET /buy-ticket/:id</code> Jegy vásárlása oldal

<code>GET /profile</code> Bejelentkezett felhasználó oldala (User adatok megtekintése/módosítása, és jegyek listázása/törlése)

### Backend

<code>GET /users/:id</code> Felhasználó adatai

<code>POST /users/login</code> Bejelentkezés

<code>POST /users</code> Regisztráció

<code>PATCH /users</code> Módosítás

<code>GET /movies</code> Filmek listázása

<code>GET /movies/:id</code> Film adatai

<code>POST /movies (ADMIN)</code> Új film felvétele

<code>GET /screenings</code> Vetítések listázása

<code>GET /screenings/:id</code> Vetítés adatai

<code>POST /screenings (ADMIN)</code> Új vetítés felvétele

<code>GET /categories</code> Kategóriák listázása

<code>GET /categories/:id</code> Filmek listázása kategória szerint

<code>GET /tickets/:id</code> Jegyek listázása felhasználó szerint

<code>GET /tickets/:id/:sid</code> Jegyek listázása felhasználó és vetítés szerint

<code>POST /tickets</code> Jegy vásárlása

<code>DELETE /tickets/:id</code> Jegy törlése

<code>GET /auditoriums</code> Termek listázása





