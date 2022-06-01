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
