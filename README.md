FikuMiku - Sklep Internetowy z Zabawkami

| Opis wstępny |

Projekt nowoczesnej aplikacji e-commerce dedykowanej sprzedaży zabawek edukacyjnych i kreatywnych dla dzieci. Aplikacja została zaprojektowana z naciskiem na przejrzysty interfejs, intuicyjną nawigację oraz doskonałe doświadczenia użytkownika (UX). Projekt ewoluował ze statycznej makiety frontowej do pełnoprawnej aplikacji Full-Stack z własnym serwerem i bazą danych.

| Technologie |

W projekcie zastosowaliśmy następujące rozwiązania technologiczne:

React 18 - biblioteka interfejsu użytkownika.

TypeScript - zapewnienie statycznego typowania danych i bezpieczeństwa kodu.

Tailwind CSS - framework narzędziowy do szybkiej i responsywnej stylizacji komponentów.

React Router Dom - obsługa trasowania i nawigacji wewnątrz aplikacji bez przeładowywania strony.

Lucide React - biblioteka nowoczesnych ikon wektorowych.

Vite - superszybkie narzędzie do budowania i serwowania aplikacji.

Node.js & Express.js - środowisko uruchomieniowe i framework do budowy tras API dla backendu.

MongoDB & Mongoose - nierelacyjna baza danych w chmurze oraz biblioteka do modelowania danych.

JSON Web Token (JWT) - bezpieczny mechanizm autoryzacji i utrzymywania sesji użytkownika.

Bcrypt.js - szyfrowanie haseł użytkowników w bazie danych.

| Funkcjonalności |

System nawigacji - płynne przechodzenie między stroną główną a kartami produktów bez odświeżania strony.

Responsywność - interfejs dostosowany do urządzeń mobilnych oraz desktopowych.

Kategorie produktów - segmentacja asortymentu według przedziałów wiekowych (0-2 lata, 3-5 lat, 6+ lat).

Strona produktu - dynamiczne generowanie widoku szczegółowego na podstawie parametrów URL.

Architektura Layoutu - wykorzystanie wspólnego szablonu dla spójnego wyglądu nagłówka i stopki.

System Autoryzacji - rejestracja i logowanie użytkowników z wykorzystaniem szyfrowanych haseł i tokenów JWT.

Inteligentna Wyszukiwarka - wyszukiwanie produktów w czasie rzeczywistym z podpowiedziami oraz optymalizacją zapytań.

Zarządzanie Koszykiem i Ulubionymi - dynamiczny stan aplikacji, który po zalogowaniu automatycznie synchronizuje się z bazą danych MongoDB. Dane przetrwają odświeżenie strony i są przypisane do konkretnego konta.

Płynna Nawigacja (Smooth Scroll) - intuicyjne przewijanie strony do odpowiednich sekcji z poziomu głównego menu.

| Instrukcja instalacji i uruchomienia |

Uruchomienie lokalne (Development)
Aby uruchomić pełne środowisko Full-Stack lokalnie:

Sklonuj repozytorium:

Bash
git clone <link-do-repozytorium>

Uruchom Backend:
Przejdź do folderu backend, zainstaluj zależności i stwórz plik .env (zawierający MONGO_URI oraz JWT_SECRET), a następnie wystartuj serwer:

Bash
cd backend
npm install
npm run dev

Uruchom Frontend:
W nowym oknie terminala przejdź do głównego folderu frontendu, zainstaluj zależności i uruchom Vite:

Bash
npm install
npm run dev


| Podział pracy i odpowiedzialności |

Oskar Skrzeczkowski - odpowiedzialność za architekturę komponentów, konfigurację React Router, logikę zarządzania stanem interfejsu (Context API) oraz strukturę podstrony produktu. Integracja warstwy Frontend z backendowym API (Full-Stack), wspieranie w warstwie wizualnej (Tailwind CSS).

Oskar Stefański - odpowiedzialność za warstwę wizualną, implementację stylów Tailwind CSS, responsywność elementów UI, wsparcie przy pracy nad komponentami o wyższym poziomie złożoności, Integracja warstwy Frontend z backendowym API (Full-Stack).

