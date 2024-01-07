# Proiect Tehnologii Web, anul 3, ID Informatica Economica
1117_Pamfil_Rodica-Ana_Maria_TC1_Jurnal_muti-user_integrat_cu_Google_translate
# Despre Proiect

Acest proiect se concentrează pe dezvoltarea unui jurnal multi-utilizator cu funcționalități integrate de traducere utilizând serviciul Google Translate. Scopul său este de a oferi utilizatorilor o platformă unde pot ține un jurnal personal și pot traduce conținutul lor în diferite limbi utilizând Google Translate. Postarile vor fi incarcate dintr-o baza de date. API-ul extern Google TL va traduce postarile:
Apasand un label de sub fiecare postare, textul va fi tradus din limba specificata in alta.

Tehnologii incluse:
- Node.js (express)
- React.js
- RESTful
- Google Translate

Structura bazei de date:

1) Journal
- ID: numeric automat (primary key)
- Title: text (titlul postarii)
- Post: text (aici va fi stocat continutul postarii din jurnal)
- User: ID (va fi specificat utilizatorul ce a facut postarea) (foreign key -> Users: ID)
- CreatedAt: date (data postarii)

2) Users
- ID: numeric automat (primary key)
- Username: text (nume utilizator)
- Password: text (parola utilizator)
- CreatedAt: date (data crearii)









