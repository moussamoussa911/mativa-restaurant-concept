(() => {
  "use strict";

  const STORAGE_LANG = "mativa-language";
  const STORAGE_TABLE = "mativa-table";
  const page = document.body.dataset.page || "home";
  const supported = ["de", "nl", "en"];
  const savedLanguage = localStorage.getItem(STORAGE_LANG);
  let lang = supported.includes(savedLanguage) ? savedLanguage : "de";
  let cart = readCart();
  let drawerOpen = false;

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 17h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3Z"/></svg>',
    fork: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3v18M17 3c3 2 3 7 0 9"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2ZM7 2v4M17 2v4M3 9h18"/></svg>',
    story: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4Zm4 0v16M12 8h4M12 12h4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5-3 9-8 11-5-2-8-6-8-11V5Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3 4 5c0 8 7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>',
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-4 2-7 6-7s6 3 6 7M15 14c4 0 6 2 6 6"/></svg>',
    chair: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 13V6a3 3 0 0 1 6 0v7M6 9H4v7h16V9h-2M7 16v5M17 16v5"/></svg>',
    fire: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2c2 5-2 6 1 10 1-3 3-3 4-5 2 3 3 5 3 8a9 9 0 1 1-18 0c0-4 2-7 6-11-1 5 1 6 2 8 2-3 0-6 2-10Z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4C9 4 4 9 4 16c4 2 10 1 13-3 2-3 3-6 3-9ZM4 20c2-5 6-8 12-11"/></svg>',
    fish: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s5-6 11-6c3 0 5 2 7 6-2 4-4 6-7 6-6 0-11-6-11-6Zm0 0-2-4v8Zm13-1h.01"/></svg>',
    platter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16h16M2 20h20M6 16a6 6 0 0 1 12 0M12 7V4"/></svg>',
    cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2 11h11l2-8H6M9 20h.01M17 20h.01"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 5 5L20 6"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v13M7 11l5 5 5-5M4 21h16"/></svg>'
  };

  const copy = {
    de: {
      nav: { home: "Start", menu: "Speisekarte", book: "Reservieren", restaurant: "Restaurant", legal: "Rechtliches", open: "Menü öffnen", close: "Menü schließen" },
      hero: {
        kicker: "Steakhaus · Gronau-Epe · Seit 2000",
        titleA: "Über Glut.",
        titleB: "Unter Freunden.",
        text: "Premium Angus, kroatische Seele und ein Edelstahlgrill, der jeden Abend zum Erlebnis macht.",
        menu: "Karte entdecken",
        book: "Tisch am Feuer",
        badge: "Argentinisches Angus",
        badge2: "kroatische Gastfreundschaft"
      },
      home: {
        introKicker: "Zwei Herkunftsorte. Eine Handschrift.",
        introTitle: "Wo der Balkan das Feuer Argentiniens trifft.",
        introText: "Seit 2000 verbindet Mativa in Gronau-Epe ehrliche kroatische Küche mit sorgfältig ausgewähltem Premium Angus. Individuell zugeschnitten, auf Edelstahl gegrillt und ohne Umwege serviert.",
        quality: "Vom Stück zum perfekten Garpunkt",
        qualityText: "Das Steak wird individuell geschnitten. Sie wählen Gewicht und Garpunkt – die Küche kümmert sich um den Rest.",
        signature: "Unsere Handschrift",
        signatureTitle: "Drei Gründe, den Grill anzufeuern.",
        fire: "Direkt vom Edelstahlgrill",
        region: "Regional, wo es möglich ist",
        share: "Zum Teilen gemacht",
        dishesKicker: "Favoriten am Tisch",
        dishesTitle: "Nicht nur ansehen. Schon jetzt zusammenstellen.",
        storyKicker: "Mativa seit 2000",
        storyTitle: "Ein Steakhaus mit Seele, nicht mit Show.",
        storyText: "Bestes Fleisch, ein offener Blick für Qualität und Gastfreundschaft, die persönlich bleibt.",
        visit: "Besuch planen",
        address: "Nienborger Straße 32 · 48599 Gronau-Epe",
        hours: "Mi–Sa 17:00–22:00 · So 17:00–21:00",
        kitchen: "Küche bis 21:00 Uhr",
        insta: "Mehr vom Grill auf Instagram"
      },
      menu: {
        kicker: "Aktuelle Karte · September 2025",
        title: "Gutes Fleisch braucht keine langen Reden.",
        text: "Wählen Sie aus Premium Angus, kroatischen Klassikern und Gerichten zum Teilen. Preise und Angebot entsprechen der aktuellen Restaurantkarte.",
        all: "Alle",
        starters: "Vorspeisen",
        steaks: "Angus Steaks",
        grill: "Grill & Klassiker",
        fish: "Fisch",
        platters: "Platten",
        add: "Zum Tisch",
        added: "Hinzugefügt",
        pdf: "Originalkarte als PDF",
        builder: "Ihr Tisch",
        builderTitle: "Bauen Sie Ihren Abend.",
        builderText: "Gerichte sammeln, Personen wählen und den Preis pro Gast sofort sehen.",
        empty: "Noch ist der Tisch leer.",
        emptySub: "Fügen Sie oben Ihre Favoriten hinzu.",
        guests: "Personen",
        total: "Gesamt",
        perGuest: "pro Person",
        reserve: "Mit Auswahl reservieren",
        close: "Tisch schließen",
        remove: "Entfernen",
        note: "Auswahl dient zur Planung und ist noch keine Bestellung."
      },
      book: {
        kicker: "Tischassistent",
        title: "Ihr Platz am Feuer.",
        text: "Vier kurze Schritte. Öffnungstage, Bereiche und Zeiten werden automatisch passend angezeigt.",
        step: "Schritt",
        of: "von 4",
        dateTitle: "Wann dürfen wir für Sie anheizen?",
        dateText: "Montag und Dienstag sind Ruhetage.",
        partyTitle: "Wie kommt Ihre Runde?",
        partyText: "Wählen Sie die Personenzahl und Ihren bevorzugten Bereich.",
        areaWindow: "Am Fenster",
        areaWindowSub: "Hell & lebendig",
        areaGrill: "Grillblick",
        areaGrillSub: "Nah am Geschehen",
        areaQuiet: "Ruhige Ecke",
        areaQuietSub: "Für lange Gespräche",
        timeTitle: "Welche Uhrzeit passt?",
        timeText: "Zeiten mit wenigen Plätzen werden markiert.",
        available: "Verfügbar",
        limited: "Wenige Plätze",
        detailsTitle: "Nur noch Ihre Kontaktdaten.",
        detailsText: "Wir fassen alles übersichtlich zusammen.",
        name: "Vor- und Nachname",
        phone: "Telefonnummer",
        email: "E-Mail-Adresse",
        occasion: "Anlass oder Wunsch (optional)",
        privacy: "Ich stimme der Verarbeitung meiner Angaben zur Reservierungsanfrage zu.",
        back: "Zurück",
        next: "Weiter",
        request: "Reservierung anfragen",
        summary: "Ihre Auswahl",
        date: "Datum",
        party: "Gäste",
        area: "Bereich",
        time: "Uhrzeit",
        missing: "Noch offen",
        phoneOption: "Lieber persönlich?",
        call: "02565 40 14 11",
        demoTitle: "Die Anfrage ist vorbereitet.",
        demoText: "In der Live-Version wird sie jetzt direkt an Mativa übertragen und bestätigt. Dies ist eine unverbindliche Konzeptdemo.",
        done: "Verstanden"
      },
      story: {
        kicker: "Restaurant Mativa · Seit 2000",
        title: "Hier zählt, was auf den Grill kommt. Und wer am Tisch sitzt.",
        lead: "Mativa ist ein Steakhaus mit kroatischer Seele – gewachsen in Epe, geprägt von ehrlichem Handwerk und herzlicher Gastfreundschaft.",
        craftKicker: "Das Handwerk",
        craftTitle: "Individuell geschnitten. Präzise gegrillt.",
        craftText: "Das argentinische Premium Angus wird nach Wunsch zugeschnitten und auf einem Edelstahlgrill zubereitet. Dazu kommen regionale Produkte und kroatische Klassiker, die seit Jahren ihren festen Platz auf der Karte haben.",
        since: "Jahre Gastgeber",
        origin: "Herkünfte. Eine Küche.",
        grill: "Edelstahlgrill",
        promiseKicker: "Das Mativa-Versprechen",
        promiseTitle: "Kein Theater. Nur gute Produkte, Hitze und Zeit.",
        promiseText: "Wir glauben an das, was man schmeckt: Qualität bei den Zutaten, Sorgfalt am Grill und Aufmerksamkeit am Tisch.",
        visit: "Mativa erleben"
      },
      legal: {
        kicker: "Transparent & korrekt",
        title: "Rechtliches",
        imprint: "Impressum",
        operator: "Restaurant Steakhaus Mativa · Inh. A. Vrdoljak",
        tax: "Umsatzsteuer-ID",
        privacy: "Datenschutz",
        privacyText: "Dieses Website-Konzept setzt keine Analyse- oder Marketing-Cookies ein. Angaben im Reservierungsassistenten werden in dieser Demo nicht übertragen oder dauerhaft gespeichert. Für eine produktive Veröffentlichung wird die Datenschutzerklärung an die tatsächlich eingesetzten Dienste angepasst.",
        rights: "Ihre Rechte",
        rightsText: "Sie haben insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit nach Maßgabe der DSGVO.",
        contact: "Datenschutz-Kontakt",
        notice: "Konzept-Hinweis",
        noticeText: "Diese Seite ist ein unverbindlicher Design- und Funktionsentwurf und nicht die offizielle Website des Restaurants."
      },
      common: {
        reserve: "Reservieren",
        call: "Anrufen",
        route: "Route",
        menu: "Speisekarte",
        details: "Mehr erfahren",
        todayOpen: "Heute geöffnet",
        todayClosed: "Heute Ruhetag",
        nowOpen: "Jetzt geöffnet",
        footerClaim: "Feuer. Handwerk. Gastfreundschaft.",
        concept: "Unverbindliches Website-Konzept",
        instagram: "Instagram"
      }
    },
    nl: {
      nav: { home: "Home", menu: "Menukaart", book: "Reserveren", restaurant: "Restaurant", legal: "Juridisch", open: "Menu openen", close: "Menu sluiten" },
      hero: {
        kicker: "Steakhouse · Gronau-Epe · Sinds 2000",
        titleA: "Boven het vuur.",
        titleB: "Onder vrienden.",
        text: "Premium Angus, een Kroatische ziel en een rvs-grill die van elke avond een belevenis maakt.",
        menu: "Bekijk de kaart",
        book: "Tafel bij het vuur",
        badge: "Argentijnse Angus",
        badge2: "Kroatische gastvrijheid"
      },
      home: {
        introKicker: "Twee oorsprongen. Eén signatuur.",
        introTitle: "Waar de Balkan het vuur van Argentinië ontmoet.",
        introText: "Sinds 2000 combineert Mativa in Gronau-Epe eerlijke Kroatische gerechten met zorgvuldig geselecteerde premium Angus. Op maat gesneden, gegrild op rvs en zonder omwegen geserveerd.",
        quality: "Van het stuk naar de perfecte garing",
        qualityText: "De steak wordt individueel gesneden. U kiest gewicht en garing – de keuken doet de rest.",
        signature: "Onze signatuur",
        signatureTitle: "Drie redenen om de grill aan te steken.",
        fire: "Rechtstreeks van de rvs-grill",
        region: "Regionaal waar mogelijk",
        share: "Gemaakt om te delen",
        dishesKicker: "Favorieten aan tafel",
        dishesTitle: "Niet alleen bekijken. Stel uw tafel alvast samen.",
        storyKicker: "Mativa sinds 2000",
        storyTitle: "Een steakhouse met een ziel, niet met show.",
        storyText: "Uitstekend vlees, aandacht voor kwaliteit en gastvrijheid die persoonlijk blijft.",
        visit: "Plan uw bezoek",
        address: "Nienborger Straße 32 · 48599 Gronau-Epe",
        hours: "Wo–za 17:00–22:00 · zo 17:00–21:00",
        kitchen: "Keuken tot 21:00",
        insta: "Meer van de grill op Instagram"
      },
      menu: {
        kicker: "Actuele kaart · september 2025",
        title: "Goed vlees heeft geen lange uitleg nodig.",
        text: "Kies uit premium Angus, Kroatische klassiekers en gerechten om te delen. Prijzen en aanbod komen overeen met de actuele restaurantkaart.",
        all: "Alles",
        starters: "Voorgerechten",
        steaks: "Angus steaks",
        grill: "Grill & klassiekers",
        fish: "Vis",
        platters: "Schotels",
        add: "Aan tafel",
        added: "Toegevoegd",
        pdf: "Originele kaart als pdf",
        builder: "Uw tafel",
        builderTitle: "Bouw uw avond.",
        builderText: "Verzamel gerechten, kies het aantal personen en zie direct de prijs per gast.",
        empty: "De tafel is nog leeg.",
        emptySub: "Voeg hierboven uw favorieten toe.",
        guests: "Personen",
        total: "Totaal",
        perGuest: "per persoon",
        reserve: "Reserveer met selectie",
        close: "Tafel sluiten",
        remove: "Verwijderen",
        note: "De selectie is alleen ter planning en nog geen bestelling."
      },
      book: {
        kicker: "Tafelassistent",
        title: "Uw plek bij het vuur.",
        text: "Vier korte stappen. Open dagen, ruimtes en tijden worden automatisch passend getoond.",
        step: "Stap",
        of: "van 4",
        dateTitle: "Wanneer mogen we het vuur voor u aansteken?",
        dateText: "Maandag en dinsdag zijn rustdagen.",
        partyTitle: "Hoe groot is uw gezelschap?",
        partyText: "Kies het aantal personen en de ruimte van uw voorkeur.",
        areaWindow: "Bij het raam",
        areaWindowSub: "Licht & levendig",
        areaGrill: "Zicht op de grill",
        areaGrillSub: "Dicht bij de actie",
        areaQuiet: "Rustige hoek",
        areaQuietSub: "Voor lange gesprekken",
        timeTitle: "Welke tijd past?",
        timeText: "Tijden met weinig plekken zijn gemarkeerd.",
        available: "Beschikbaar",
        limited: "Weinig plekken",
        detailsTitle: "Alleen uw contactgegevens nog.",
        detailsText: "We zetten alles overzichtelijk voor u op een rij.",
        name: "Voor- en achternaam",
        phone: "Telefoonnummer",
        email: "E-mailadres",
        occasion: "Gelegenheid of wens (optioneel)",
        privacy: "Ik ga akkoord met de verwerking van mijn gegevens voor deze reserveringsaanvraag.",
        back: "Terug",
        next: "Verder",
        request: "Reservering aanvragen",
        summary: "Uw keuze",
        date: "Datum",
        party: "Gasten",
        area: "Ruimte",
        time: "Tijd",
        missing: "Nog open",
        phoneOption: "Liever persoonlijk?",
        call: "02565 40 14 11",
        demoTitle: "De aanvraag staat klaar.",
        demoText: "In de liveversie wordt deze nu rechtstreeks naar Mativa gestuurd en bevestigd. Dit is een vrijblijvende conceptdemo.",
        done: "Begrepen"
      },
      story: {
        kicker: "Restaurant Mativa · Sinds 2000",
        title: "Hier telt wat er op de grill ligt. En wie er aan tafel zit.",
        lead: "Mativa is een steakhouse met een Kroatische ziel – geworteld in Epe, gevormd door eerlijk vakmanschap en warme gastvrijheid.",
        craftKicker: "Het vak",
        craftTitle: "Op maat gesneden. Precies gegrild.",
        craftText: "De Argentijnse premium Angus wordt naar wens gesneden en op een rvs-grill bereid. Daarbij komen regionale producten en Kroatische klassiekers die al jaren een vaste plek op de kaart hebben.",
        since: "Jaar gastheer",
        origin: "Herkomsten. Eén keuken.",
        grill: "Rvs-grill",
        promiseKicker: "De Mativa-belofte",
        promiseTitle: "Geen theater. Alleen goede producten, hitte en tijd.",
        promiseText: "Wij geloven in wat u proeft: kwaliteit van de ingrediënten, aandacht op de grill en zorg aan tafel.",
        visit: "Beleef Mativa"
      },
      legal: {
        kicker: "Transparant & correct",
        title: "Juridisch",
        imprint: "Colofon",
        operator: "Restaurant Steakhaus Mativa · eigenaar A. Vrdoljak",
        tax: "Btw-identificatienummer",
        privacy: "Privacy",
        privacyText: "Dit websiteconcept gebruikt geen analyse- of marketingcookies. Gegevens in de reserveringsassistent worden in deze demo niet verzonden of permanent opgeslagen. Voor publicatie wordt het privacybeleid aangepast aan de werkelijk gebruikte diensten.",
        rights: "Uw rechten",
        rightsText: "U heeft onder de AVG onder meer recht op inzage, correctie, verwijdering, beperking, bezwaar en overdraagbaarheid van gegevens.",
        contact: "Privacycontact",
        notice: "Conceptmelding",
        noticeText: "Deze pagina is een vrijblijvend ontwerp- en functieconcept en niet de officiële website van het restaurant."
      },
      common: {
        reserve: "Reserveren", call: "Bellen", route: "Route", menu: "Menukaart", details: "Meer informatie",
        todayOpen: "Vandaag geopend", todayClosed: "Vandaag gesloten", nowOpen: "Nu geopend",
        footerClaim: "Vuur. Vakmanschap. Gastvrijheid.", concept: "Vrijblijvend websiteconcept", instagram: "Instagram"
      }
    },
    en: {
      nav: { home: "Home", menu: "Menu", book: "Reserve", restaurant: "Restaurant", legal: "Legal", open: "Open menu", close: "Close menu" },
      hero: {
        kicker: "Steakhouse · Gronau-Epe · Since 2000",
        titleA: "Over fire.",
        titleB: "Among friends.",
        text: "Premium Angus, a Croatian soul and a stainless-steel grill that turns every evening into an experience.",
        menu: "Explore the menu",
        book: "Table by the fire",
        badge: "Argentinian Angus",
        badge2: "Croatian hospitality"
      },
      home: {
        introKicker: "Two origins. One signature.",
        introTitle: "Where the Balkans meet Argentina’s fire.",
        introText: "Since 2000, Mativa in Gronau-Epe has paired honest Croatian cooking with carefully selected premium Angus. Cut to order, grilled on stainless steel and served without fuss.",
        quality: "From the cut to the perfect doneness",
        qualityText: "Your steak is cut individually. Choose the weight and doneness – the kitchen takes care of the rest.",
        signature: "Our signature",
        signatureTitle: "Three reasons to fire up the grill.",
        fire: "Straight from the stainless-steel grill",
        region: "Regional whenever possible",
        share: "Made for sharing",
        dishesKicker: "Table favourites",
        dishesTitle: "Don’t just look. Build your table now.",
        storyKicker: "Mativa since 2000",
        storyTitle: "A steakhouse with soul, not spectacle.",
        storyText: "Excellent meat, a clear eye for quality and hospitality that stays personal.",
        visit: "Plan your visit",
        address: "Nienborger Straße 32 · 48599 Gronau-Epe",
        hours: "Wed–Sat 17:00–22:00 · Sun 17:00–21:00",
        kitchen: "Kitchen until 21:00",
        insta: "More from the grill on Instagram"
      },
      menu: {
        kicker: "Current menu · September 2025",
        title: "Good meat needs no long explanation.",
        text: "Choose from premium Angus, Croatian classics and dishes made for sharing. Prices and selection match the restaurant’s current menu.",
        all: "All", starters: "Starters", steaks: "Angus steaks", grill: "Grill & classics", fish: "Fish", platters: "Platters",
        add: "Add to table", added: "Added", pdf: "Original menu PDF", builder: "Your table",
        builderTitle: "Build your evening.", builderText: "Collect dishes, choose your party size and see the price per guest instantly.",
        empty: "The table is still empty.", emptySub: "Add your favourites above.", guests: "Guests", total: "Total",
        perGuest: "per person", reserve: "Reserve with selection", close: "Close table", remove: "Remove",
        note: "Your selection is for planning and is not an order yet."
      },
      book: {
        kicker: "Table assistant", title: "Your place by the fire.",
        text: "Four short steps. Opening days, areas and times are displayed automatically.",
        step: "Step", of: "of 4", dateTitle: "When shall we light the fire for you?", dateText: "Monday and Tuesday are closed.",
        partyTitle: "How many are joining?", partyText: "Choose your party size and preferred area.",
        areaWindow: "By the window", areaWindowSub: "Bright & lively", areaGrill: "Grill view", areaGrillSub: "Close to the action",
        areaQuiet: "Quiet corner", areaQuietSub: "For long conversations",
        timeTitle: "What time suits you?", timeText: "Times with limited availability are marked.",
        available: "Available", limited: "Few tables", detailsTitle: "Just your contact details.",
        detailsText: "We’ll present everything in one clear summary.", name: "Full name", phone: "Phone number",
        email: "Email address", occasion: "Occasion or request (optional)",
        privacy: "I agree to the processing of my details for this reservation request.",
        back: "Back", next: "Continue", request: "Request reservation", summary: "Your selection", date: "Date",
        party: "Guests", area: "Area", time: "Time", missing: "Not selected", phoneOption: "Prefer to talk?",
        call: "02565 40 14 11", demoTitle: "Your request is ready.",
        demoText: "In the live version it would now be sent directly to Mativa and confirmed. This is a non-binding concept demo.",
        done: "Got it"
      },
      story: {
        kicker: "Restaurant Mativa · Since 2000",
        title: "What matters is what goes on the grill. And who sits at the table.",
        lead: "Mativa is a steakhouse with a Croatian soul – grown in Epe, shaped by honest craft and warm hospitality.",
        craftKicker: "The craft", craftTitle: "Cut to order. Grilled with precision.",
        craftText: "Argentinian premium Angus is cut to your preference and cooked on a stainless-steel grill. Regional produce and Croatian classics have held their place on the menu for years.",
        since: "Years hosting", origin: "Origins. One kitchen.", grill: "Stainless-steel grill",
        promiseKicker: "The Mativa promise", promiseTitle: "No theatre. Just fine produce, heat and time.",
        promiseText: "We believe in what you can taste: quality ingredients, care at the grill and attention at the table.",
        visit: "Experience Mativa"
      },
      legal: {
        kicker: "Transparent & correct", title: "Legal", imprint: "Imprint",
        operator: "Restaurant Steakhaus Mativa · Proprietor A. Vrdoljak", tax: "VAT ID", privacy: "Privacy",
        privacyText: "This website concept uses no analytics or marketing cookies. Details entered in the reservation assistant are not transmitted or stored permanently in this demo. Before publication, the privacy policy will be adapted to the services actually used.",
        rights: "Your rights", rightsText: "Under the GDPR, you have rights including access, correction, erasure, restriction, objection and data portability.",
        contact: "Privacy contact", notice: "Concept notice",
        noticeText: "This page is a non-binding design and function concept and not the restaurant’s official website."
      },
      common: {
        reserve: "Reserve", call: "Call", route: "Directions", menu: "Menu", details: "Learn more",
        todayOpen: "Open today", todayClosed: "Closed today", nowOpen: "Open now",
        footerClaim: "Fire. Craft. Hospitality.", concept: "Non-binding website concept", instagram: "Instagram"
      }
    }
  };

  const menuItems = [
    { id: "carpaccio", category: "starters", name: { de: "Gegrilltes Carpaccio", nl: "Gegrilde carpaccio", en: "Grilled carpaccio" }, desc: { de: "Rinderfilet · Parmesan · Rucola", nl: "Ossenhaas · parmezaan · rucola", en: "Beef fillet · parmesan · rocket" }, price: 16.9 },
    { id: "tapas", category: "starters", name: { de: "Balkan-Tapas", nl: "Balkan tapas", en: "Balkan tapas" }, desc: { de: "Kleine Auswahl kroatischer Vorspeisen", nl: "Selectie Kroatische voorgerechten", en: "A selection of Croatian starters" }, price: 12.9 },
    { id: "shrimp", category: "starters", name: { de: "Hot & Spicy Garnelen", nl: "Hot & spicy garnalen", en: "Hot & spicy shrimp" }, desc: { de: "Garnelen · Knoblauch · Chili", nl: "Garnalen · knoflook · chili", en: "Shrimp · garlic · chilli" }, price: 14.9 },
    { id: "angusspiesse", category: "starters", name: { de: "Kleine Angus-Fleischspieße", nl: "Kleine Angus-spiesen", en: "Small Angus skewers" }, desc: { de: "Mit hausgemachtem Chimichurri", nl: "Met huisgemaakte chimichurri", en: "With house-made chimichurri" }, price: 13.9 },
    { id: "rump200", category: "steaks", featured: true, name: { de: "Rumpsteak · 200 g", nl: "Rumpsteak · 200 g", en: "Rump steak · 200 g" }, desc: { de: "Argentinisches Premium Angus", nl: "Argentijnse premium Angus", en: "Argentinian premium Angus" }, price: 29.9 },
    { id: "rump300", category: "steaks", name: { de: "Rumpsteak · 300 g", nl: "Rumpsteak · 300 g", en: "Rump steak · 300 g" }, desc: { de: "Argentinisches Premium Angus", nl: "Argentijnse premium Angus", en: "Argentinian premium Angus" }, price: 38.9 },
    { id: "filet200", category: "steaks", featured: true, name: { de: "Filetsteak · 200 g", nl: "Filetsteak · 200 g", en: "Fillet steak · 200 g" }, desc: { de: "Zartes Premium Angus Filet", nl: "Malse premium Angus filet", en: "Tender premium Angus fillet" }, price: 37.9 },
    { id: "filet300", category: "steaks", name: { de: "Filetsteak · 300 g", nl: "Filetsteak · 300 g", en: "Fillet steak · 300 g" }, desc: { de: "Zartes Premium Angus Filet", nl: "Malse premium Angus filet", en: "Tender premium Angus fillet" }, price: 49.9 },
    { id: "pfeffer", category: "steaks", name: { de: "Pfeffersteak", nl: "Pepersteak", en: "Pepper steak" }, desc: { de: "Rinderfilet · Pfeffersauce", nl: "Ossenhaas · pepersaus", en: "Beef fillet · pepper sauce" }, price: 36.9 },
    { id: "gerding", category: "steaks", name: { de: "Medaillons „Gerdingseite“", nl: "Medaillons ‘Gerdingseite’", en: "Medallions ‘Gerdingseite’" }, desc: { de: "Rinderfiletmedaillons nach Art des Hauses", nl: "Ossenhaasmedaillons op huiswijze", en: "Beef fillet medallions, house style" }, price: 32.9 },
    { id: "raznjici", category: "grill", name: { de: "Ražnjići · groß", nl: "Ražnjići · groot", en: "Ražnjići · large" }, desc: { de: "Kroatischer Fleischspieß vom Grill", nl: "Kroatische vleesspies van de grill", en: "Croatian meat skewer from the grill" }, price: 23.9 },
    { id: "grillteller", category: "grill", featured: true, name: { de: "Grillteller Classico", nl: "Grillschotel Classico", en: "Classico grill plate" }, desc: { de: "Eine Auswahl vom Mativa-Grill", nl: "Een selectie van de Mativa-grill", en: "A selection from the Mativa grill" }, price: 24.9 },
    { id: "cevapcici", category: "grill", name: { de: "Ćevapčići · groß", nl: "Ćevapčići · groot", en: "Ćevapčići · large" }, desc: { de: "Balkan-Klassiker mit Beilagen", nl: "Balkanklassieker met bijgerechten", en: "Balkan classic with sides" }, price: 19.9 },
    { id: "spareribs", category: "grill", featured: true, name: { de: "Spare Ribs", nl: "Spare ribs", en: "Spare ribs" }, desc: { de: "Mittwoch, Donnerstag & Freitag", nl: "Woensdag, donderdag & vrijdag", en: "Wednesday, Thursday & Friday" }, price: 26.9 },
    { id: "cordon", category: "grill", name: { de: "Cordon Bleu", nl: "Cordon bleu", en: "Cordon bleu" }, desc: { de: "Klassisch gefüllt und goldbraun gebraten", nl: "Klassiek gevuld en goudbruin gebakken", en: "Classic filling, fried golden" }, price: 19.9 },
    { id: "lachs", category: "fish", featured: true, name: { de: "Wester Ross Lachs", nl: "Wester Ross-zalm", en: "Wester Ross salmon" }, desc: { de: "Schottischer Lachs vom Grill", nl: "Schotse zalm van de grill", en: "Scottish salmon from the grill" }, price: 30.9 },
    { id: "garnelen", category: "fish", name: { de: "Riesengarnelen", nl: "Reuzengarnalen", en: "King prawns" }, desc: { de: "Vom Grill · Zitrone · Kräuter", nl: "Van de grill · citroen · kruiden", en: "Grilled · lemon · herbs" }, price: 31.9 },
    { id: "mativa", category: "platters", featured: true, name: { de: "Mativa-Steakhausplatte", nl: "Mativa steakhouse-schotel", en: "Mativa steakhouse platter" }, desc: { de: "Für zwei Personen · zum Teilen", nl: "Voor twee personen · om te delen", en: "For two people · made for sharing" }, price: 69.9 },
    { id: "gourmand", category: "platters", name: { de: "Gourmand-Platte", nl: "Gourmand-schotel", en: "Gourmand platter" }, desc: { de: "Für zwei Personen · Grillvielfalt", nl: "Voor twee personen · grillselectie", en: "For two people · grill selection" }, price: 51.9 }
  ];

  const categoryIcons = { all: icons.fork, starters: icons.leaf, steaks: icons.fire, grill: icons.fork, fish: icons.fish, platters: icons.platter };
  const state = {
    booking: { step: 1, date: "", guests: 2, area: "", time: "" },
    category: "all"
  };

  function readCart() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_TABLE) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_TABLE, JSON.stringify(cart));
  }

  function c(group, key) {
    return copy[lang][group][key];
  }

  function formatPrice(value) {
    return new Intl.NumberFormat(lang === "en" ? "en-GB" : lang === "nl" ? "nl-NL" : "de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(value);
  }

  function pathFor(target) {
    const routes = { home: "/", menu: "/speisekarte", book: "/reservieren", restaurant: "/restaurant", legal: "/rechtliches" };
    return routes[target];
  }

  function header() {
    const navItems = [
      ["home", icons.home],
      ["menu", icons.fork],
      ["book", icons.calendar],
      ["restaurant", icons.story],
      ["legal", icons.shield]
    ];
    return `
      <header class="site-header" data-header>
        <a class="brand-mark" href="/" aria-label="Mativa Startseite">
          <span class="brand-orbit" aria-hidden="true"><i></i><i></i><i></i></span>
          <img src="/assets/logo-mativa.svg" width="652" height="151" alt="Mativa">
        </a>
        <div class="header-tools">
          <div class="language-switch" aria-label="Language">
            ${supported.map(code => `<button class="${lang === code ? "active" : ""}" data-language="${code}" aria-pressed="${lang === code}">${code.toUpperCase()}</button>`).join("")}
          </div>
          <a class="header-reserve" href="/reservieren"><span>${c("common", "reserve")}</span>${icons.arrow}</a>
          <button class="menu-toggle" type="button" aria-label="${c("nav", "open")}" aria-expanded="false" data-menu-toggle>${icons.menu}</button>
        </div>
      </header>
      <div class="menu-overlay" data-menu-overlay aria-hidden="true">
        <div class="menu-backdrop" data-menu-close></div>
        <nav class="menu-panel" aria-label="Main navigation">
          <div class="menu-panel-top">
            <span>MATIVA · GRONAU-EPE</span>
            <button type="button" data-menu-close aria-label="${c("nav", "close")}">${icons.close}</button>
          </div>
          <div class="menu-links">
            ${navItems.map(([target, icon], index) => `
              <a href="${pathFor(target)}" class="${page === target || (page === "booking" && target === "book") ? "active" : ""}">
                <span class="menu-index">0${index + 1}</span>
                <span class="menu-icon">${icon}</span>
                <strong>${c("nav", target)}</strong>
                <span class="menu-arrow">${icons.arrow}</span>
              </a>`).join("")}
          </div>
          <div class="menu-panel-foot">
            <a href="tel:+492565401411">${icons.phone}<span>02565 40 14 11</span></a>
            <a href="https://www.instagram.com/mativa_steakhaus/" target="_blank" rel="noopener">${icons.instagram}<span>@mativa_steakhaus</span></a>
          </div>
        </nav>
      </div>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-brand">
            <img src="/assets/logo-mativa.svg" width="652" height="151" alt="Mativa">
            <p>${c("common", "footerClaim")}</p>
          </div>
          <div class="footer-links">
            <div><span>Explore</span><a href="/">${c("nav", "home")}</a><a href="/speisekarte">${c("nav", "menu")}</a><a href="/restaurant">${c("nav", "restaurant")}</a></div>
            <div><span>Visit</span><a href="/reservieren">${c("nav", "book")}</a><a href="tel:+492565401411">${c("common", "call")}</a><a href="https://maps.google.com/?q=Nienborger+Stra%C3%9Fe+32+48599+Gronau" target="_blank" rel="noopener">${c("common", "route")}</a></div>
            <div><span>Social</span><a href="https://www.instagram.com/mativa_steakhaus/" target="_blank" rel="noopener">${c("common", "instagram")} ↗</a><a href="/rechtliches">${c("nav", "legal")}</a></div>
          </div>
        </div>
        <div class="footer-word" aria-hidden="true">MATIVA</div>
        <div class="footer-bottom"><span>© ${new Date().getFullYear()} Mativa Steakhaus</span><span>${c("common", "concept")}</span></div>
      </footer>`;
  }

  function homePage() {
    const featured = [
      { image: "/assets/steak.jpg", item: menuItems.find(item => item.id === "filet200"), label: "01 · ANGUS" },
      { image: "/assets/surf-and-turf.jpg", item: menuItems.find(item => item.id === "garnelen"), label: "02 · SURF & TURF" },
      { image: "/assets/spareribs-complete.jpg", item: menuItems.find(item => item.id === "spareribs"), label: "03 · FIRE" }
    ];
    return `
      <main id="content">
        <section class="home-hero">
          <div class="hero-image"><img src="/assets/hero-steakhouse.jpg" width="1920" height="1280" alt="Premium Angus Steak vom Grill bei Mativa" fetchpriority="high"></div>
          <div class="hero-shade"></div>
          <div class="heat-lines" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="hero-content">
            <div class="eyebrow light"><span class="ember-dot"></span>${c("hero", "kicker")}</div>
            <h1><span>${c("hero", "titleA")}</span><em>${c("hero", "titleB")}</em></h1>
            <p>${c("hero", "text")}</p>
            <div class="hero-actions">
              <a class="button button-copper" href="/reservieren"><span>${c("hero", "book")}</span>${icons.arrow}</a>
              <a class="text-link light" href="/speisekarte"><span>${c("hero", "menu")}</span>${icons.arrow}</a>
            </div>
          </div>
          <div class="hero-stamp" aria-hidden="true"><span>GRILL</span><strong>2000</strong><small>EST.</small></div>
          <div class="hero-bottom">
            <span>${c("hero", "badge")}</span><i></i><span>${c("hero", "badge2")}</span>
            <span class="open-status">${openStatus()}</span>
          </div>
        </section>

        <section class="origin-section section">
          <div class="section-kicker reveal"><span>01</span><span>${c("home", "introKicker")}</span></div>
          <div class="origin-layout">
            <h2 class="display-title reveal">${c("home", "introTitle")}</h2>
            <div class="origin-copy reveal">
              <p>${c("home", "introText")}</p>
              <a class="round-link" href="/restaurant" aria-label="${c("common", "details")}">${icons.arrow}</a>
            </div>
          </div>
          <div class="cut-card reveal">
            <div class="cut-visual">
              <span class="cut-weight">300<small>g</small></span>
              <svg viewBox="0 0 460 220" aria-hidden="true"><path d="M46 127c25-73 104-98 178-88 83 10 153 59 188 116-44 35-106 49-176 41-78-9-146-30-190-69Z"/><path d="M113 113c31-42 85-54 134-39M285 66c29 11 51 31 68 55"/></svg>
              <div class="temperature"><span>RARE</span><i></i><span>MEDIUM</span><i></i><span>WELL</span></div>
            </div>
            <div class="cut-copy">
              <span class="eyebrow">${c("home", "quality")}</span>
              <h3>Cut. Heat.<br><em>Perfect.</em></h3>
              <p>${c("home", "qualityText")}</p>
            </div>
          </div>
        </section>

        <section class="values-section">
          <div class="section-kicker light"><span>02</span><span>${c("home", "signature")}</span></div>
          <h2 class="display-title light reveal">${c("home", "signatureTitle")}</h2>
          <div class="values-grid">
            <article class="value-card reveal"><div>${icons.fire}</div><span>01</span><h3>${c("home", "fire")}</h3><i></i></article>
            <article class="value-card reveal"><div>${icons.leaf}</div><span>02</span><h3>${c("home", "region")}</h3><i></i></article>
            <article class="value-card reveal"><div>${icons.platter}</div><span>03</span><h3>${c("home", "share")}</h3><i></i></article>
          </div>
        </section>

        <section class="featured-section section">
          <div class="section-heading">
            <div><span class="section-number">03</span><span class="eyebrow">${c("home", "dishesKicker")}</span></div>
            <h2 class="display-title">${c("home", "dishesTitle")}</h2>
          </div>
          <div class="featured-grid">
            ${featured.map((card, index) => `
              <article class="dish-card reveal ${index === 1 ? "dish-card-offset" : ""}">
                <a href="/speisekarte">
                  <div class="dish-image"><img src="${card.image}" alt="${card.item.name[lang]}" loading="lazy"><span>${card.label}</span></div>
                  <div class="dish-meta"><h3>${card.item.name[lang]}</h3><strong>${formatPrice(card.item.price)}</strong>${icons.arrow}</div>
                </a>
              </article>`).join("")}
          </div>
          <div class="center-action"><a class="button button-ink" href="/speisekarte"><span>${c("hero", "menu")}</span>${icons.arrow}</a></div>
        </section>

        <section class="story-band">
          <div class="story-band-image"><img src="/assets/surf-and-turf.jpg" alt="Surf and Turf bei Mativa" loading="lazy"></div>
          <div class="story-band-copy">
            <span class="eyebrow light">${c("home", "storyKicker")}</span>
            <h2>${c("home", "storyTitle")}</h2>
            <p>${c("home", "storyText")}</p>
            <a class="button button-cream" href="/restaurant"><span>${c("common", "details")}</span>${icons.arrow}</a>
          </div>
        </section>

        <section class="visit-section section">
          <div class="section-kicker"><span>04</span><span>${c("home", "visit")}</span></div>
          <div class="visit-grid">
            <div class="visit-copy">
              <h2>Nienborger<br>Straße 32.</h2>
              <a class="button button-copper" href="/reservieren"><span>${c("common", "reserve")}</span>${icons.arrow}</a>
            </div>
            <div class="visit-facts">
              <a href="https://maps.google.com/?q=Nienborger+Stra%C3%9Fe+32+48599+Gronau" target="_blank" rel="noopener"><span>${icons.pin}</span><div><small>ADDRESS</small><strong>${c("home", "address")}</strong></div>${icons.arrow}</a>
              <div><span>${icons.clock}</span><div><small>OPEN</small><strong>${c("home", "hours")}</strong><em>${c("home", "kitchen")}</em></div></div>
              <a href="tel:+492565401411"><span>${icons.phone}</span><div><small>RESERVATION</small><strong>02565 40 14 11</strong></div>${icons.arrow}</a>
              <a href="https://www.instagram.com/mativa_steakhaus/" target="_blank" rel="noopener"><span>${icons.instagram}</span><div><small>SOCIAL</small><strong>${c("home", "insta")}</strong></div>${icons.arrow}</a>
            </div>
          </div>
        </section>
      </main>`;
  }

  function menuPage() {
    return `
      <main id="content" class="menu-page">
        <section class="page-hero menu-hero">
          <div class="page-hero-image"><img src="/assets/steak.jpg" alt="Steak vom Grill bei Mativa" fetchpriority="high"></div>
          <div class="page-hero-copy">
            <div class="eyebrow light"><span class="ember-dot"></span>${c("menu", "kicker")}</div>
            <h1>${c("menu", "title")}</h1>
            <p>${c("menu", "text")}</p>
            <a class="text-link light" href="/assets/speisekarte-2025.pdf" target="_blank">${icons.download}<span>${c("menu", "pdf")}</span></a>
          </div>
        </section>
        <section class="menu-content">
          <div class="category-rail-wrap">
            <div class="category-rail" data-category-rail>
              ${["all", "starters", "steaks", "grill", "fish", "platters"].map(category => `
                <button class="${state.category === category ? "active" : ""}" data-category="${category}">
                  <span>${categoryIcons[category]}</span><strong>${c("menu", category)}</strong>
                </button>`).join("")}
            </div>
          </div>
          <div class="menu-list-head"><span data-menu-count></span><i></i><span>MATIVA · 2025</span></div>
          <div class="menu-list" data-menu-list></div>
          <div class="menu-pdf-card">
            <div>${icons.download}</div>
            <h3>${c("menu", "pdf")}</h3>
            <a href="/assets/speisekarte-2025.pdf" target="_blank" class="button button-outline"><span>PDF</span>${icons.arrow}</a>
          </div>
        </section>
      </main>
      ${tableBuilder()}`;
  }

  function tableBuilder() {
    return `
      <button class="table-fab ${drawerOpen ? "is-open" : ""}" type="button" data-table-open>
        <span class="table-fab-icon">${icons.platter}<i data-cart-badge>${cartCount()}</i></span>
        <span><small>${c("menu", "builder")}</small><strong data-cart-total>${formatPrice(cartTotal())}</strong></span>
        ${icons.arrow}
      </button>
      <div class="table-drawer ${drawerOpen ? "open" : ""}" data-table-drawer aria-hidden="${!drawerOpen}">
        <button class="drawer-backdrop" type="button" data-table-close aria-label="${c("menu", "close")}"></button>
        <aside class="drawer-panel" aria-label="${c("menu", "builder")}">
          <div class="drawer-head">
            <div><span class="eyebrow">${c("menu", "builder")}</span><h2>${c("menu", "builderTitle")}</h2></div>
            <button type="button" data-table-close aria-label="${c("menu", "close")}">${icons.close}</button>
          </div>
          <p class="drawer-intro">${c("menu", "builderText")}</p>
          <div class="tabletop" aria-hidden="true"><span></span><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="cart-lines" data-cart-lines></div>
          <div class="guest-control">
            <span>${icons.people}<strong>${c("menu", "guests")}</strong></span>
            <div><button type="button" data-guest-change="-1">${icons.minus}</button><output data-guest-count>${state.booking.guests}</output><button type="button" data-guest-change="1">${icons.plus}</button></div>
          </div>
          <div class="cart-totals">
            <div><span>${c("menu", "total")}</span><strong data-drawer-total>${formatPrice(cartTotal())}</strong></div>
            <div><span>${c("menu", "perGuest")}</span><strong data-per-guest>${formatPrice(cartTotal() / state.booking.guests)}</strong></div>
          </div>
          <a class="button button-copper drawer-reserve" href="/reservieren"><span>${c("menu", "reserve")}</span>${icons.arrow}</a>
          <small class="drawer-note">${c("menu", "note")}</small>
        </aside>
      </div>`;
  }

  function bookingPage() {
    return `
      <main id="content" class="booking-page">
        <section class="booking-intro">
          <div class="eyebrow light"><span class="ember-dot"></span>${c("book", "kicker")}</div>
          <h1>${c("book", "title")}</h1>
          <p>${c("book", "text")}</p>
          <div class="booking-intro-art" aria-hidden="true">${icons.fire}<span></span></div>
        </section>
        <section class="booking-shell" data-booking-root></section>
        <section class="booking-phone">
          <span>${icons.phone}</span>
          <div><small>${c("book", "phoneOption")}</small><a href="tel:+492565401411">${c("book", "call")}</a></div>
          ${icons.arrow}
        </section>
      </main>`;
  }

  function restaurantPage() {
    return `
      <main id="content" class="restaurant-page">
        <section class="restaurant-hero">
          <div class="restaurant-hero-media"><img src="/assets/hero-steakhouse.jpg" alt="Handwerk am Grill bei Mativa" fetchpriority="high"></div>
          <div class="restaurant-hero-copy">
            <div class="eyebrow light"><span class="ember-dot"></span>${c("story", "kicker")}</div>
            <h1>${c("story", "title")}</h1>
            <p>${c("story", "lead")}</p>
          </div>
          <div class="year-stamp"><span>EST.</span><strong>2000</strong></div>
        </section>
        <section class="craft-section section">
          <div class="section-kicker"><span>01</span><span>${c("story", "craftKicker")}</span></div>
          <div class="craft-layout">
            <div class="craft-copy reveal">
              <h2>${c("story", "craftTitle")}</h2>
              <p>${c("story", "craftText")}</p>
            </div>
            <figure class="craft-image reveal"><img src="/assets/steak.jpg" alt="Premium Angus Steak bei Mativa" loading="lazy"><figcaption>ARGENTINIAN ANGUS · STAINLESS STEEL GRILL</figcaption></figure>
          </div>
          <div class="facts-row">
            <div><strong>${new Date().getFullYear() - 2000}</strong><span>${c("story", "since")}</span></div>
            <div><strong>2</strong><span>${c("story", "origin")}</span></div>
            <div><strong>01</strong><span>${c("story", "grill")}</span></div>
          </div>
        </section>
        <section class="promise-section">
          <div class="promise-image"><img src="/assets/spareribs-complete.jpg" alt="Spare Ribs bei Mativa" loading="lazy"></div>
          <div class="promise-copy">
            <span class="eyebrow light">${c("story", "promiseKicker")}</span>
            <h2>${c("story", "promiseTitle")}</h2>
            <p>${c("story", "promiseText")}</p>
            <a class="button button-copper" href="/reservieren"><span>${c("story", "visit")}</span>${icons.arrow}</a>
          </div>
        </section>
        <section class="restaurant-gallery">
          <figure><img src="/assets/surf-and-turf.jpg" alt="Surf and Turf" loading="lazy"><figcaption>SURF & TURF</figcaption></figure>
          <figure><img src="/assets/hero-steakhouse.jpg" alt="Steakvariation vom Grill" loading="lazy"><figcaption>FIRE & CRAFT</figcaption></figure>
          <figure><img src="/assets/steak.jpg" alt="Angus Steak" loading="lazy"><figcaption>PREMIUM ANGUS</figcaption></figure>
        </section>
      </main>`;
  }

  function legalPage() {
    return `
      <main id="content" class="legal-page">
        <section class="legal-hero">
          <div class="eyebrow light"><span class="ember-dot"></span>${c("legal", "kicker")}</div>
          <h1>${c("legal", "title")}</h1>
        </section>
        <section class="legal-content section">
          <nav class="legal-nav"><a href="#impressum">${c("legal", "imprint")}</a><a href="#datenschutz">${c("legal", "privacy")}</a><a href="#hinweis">${c("legal", "notice")}</a></nav>
          <article id="impressum">
            <span>01</span><div><h2>${c("legal", "imprint")}</h2><p><strong>${c("legal", "operator")}</strong><br>Nienborger Straße 32<br>48599 Gronau-Epe</p><p>Tel.: <a href="tel:+492565401411">+49 2565 40 14 11</a></p><p>${c("legal", "tax")}: DE174725696<br>Steuernummer: 301/5146/0856</p></div>
          </article>
          <article id="datenschutz">
            <span>02</span><div><h2>${c("legal", "privacy")}</h2><p>${c("legal", "privacyText")}</p><h3>${c("legal", "rights")}</h3><p>${c("legal", "rightsText")}</p><h3>${c("legal", "contact")}</h3><p>A. Vrdoljak<br>Restaurant Steakhaus Mativa<br>Nienborger Straße 32 · 48599 Gronau-Epe</p></div>
          </article>
          <article id="hinweis">
            <span>03</span><div><h2>${c("legal", "notice")}</h2><p>${c("legal", "noticeText")}</p></div>
          </article>
        </section>
      </main>`;
  }

  function render() {
    document.documentElement.lang = lang;
    const pages = { home: homePage, menu: menuPage, booking: bookingPage, restaurant: restaurantPage, legal: legalPage };
    document.getElementById("app").innerHTML = header() + pages[page]() + footer();
    bindShared();
    if (page === "menu") bindMenu();
    if (page === "booking") renderBooking();
    initReveal();
  }

  function bindShared() {
    document.querySelectorAll("[data-language]").forEach(button => {
      button.addEventListener("click", () => {
        lang = button.dataset.language;
        localStorage.setItem(STORAGE_LANG, lang);
        render();
      });
    });

    const overlay = document.querySelector("[data-menu-overlay]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const setMenu = open => {
      overlay.classList.toggle("open", open);
      overlay.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? icons.close : icons.menu;
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", () => setMenu(!overlay.classList.contains("open")));
    document.querySelectorAll("[data-menu-close]").forEach(button => button.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        setMenu(false);
        closeDrawer();
      }
    }, { once: true });

    let previous = window.scrollY;
    const headerElement = document.querySelector("[data-header]");
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      headerElement.classList.toggle("scrolled", current > 30);
      headerElement.classList.toggle("hidden", current > previous && current > 180 && !document.body.classList.contains("menu-open"));
      previous = current;
    }, { passive: true });
  }

  function openStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    if (day === 1 || day === 2) return c("common", "todayClosed");
    const closing = day === 0 ? 21 : 22;
    if (hour >= 17 && hour < closing) return c("common", "nowOpen");
    return c("common", "todayOpen");
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach(item => observer.observe(item));
  }

  function bindMenu() {
    renderMenuItems();
    renderCart();
    document.querySelector("[data-category-rail]").addEventListener("click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      document.querySelectorAll("[data-category]").forEach(item => item.classList.toggle("active", item === button));
      renderMenuItems();
      const top = document.querySelector(".menu-content").getBoundingClientRect().top + window.scrollY - 105;
      window.scrollTo({ top, behavior: "smooth" });
    });
    document.querySelector("[data-menu-list]").addEventListener("click", event => {
      const button = event.target.closest("[data-add-item]");
      if (!button) return;
      changeCart(button.dataset.addItem, 1);
      button.classList.add("added");
      window.setTimeout(() => button.classList.remove("added"), 500);
    });
    document.querySelector("[data-table-open]").addEventListener("click", openDrawer);
    document.querySelectorAll("[data-table-close]").forEach(button => button.addEventListener("click", closeDrawer));
    document.querySelector("[data-cart-lines]").addEventListener("click", event => {
      const button = event.target.closest("[data-cart-change]");
      if (!button) return;
      changeCart(button.dataset.cartChange, Number(button.dataset.delta));
    });
    document.querySelectorAll("[data-guest-change]").forEach(button => button.addEventListener("click", () => {
      state.booking.guests = Math.max(1, Math.min(12, state.booking.guests + Number(button.dataset.guestChange)));
      renderCart();
    }));
  }

  function renderMenuItems() {
    const list = document.querySelector("[data-menu-list]");
    const items = state.category === "all" ? menuItems : menuItems.filter(item => item.category === state.category);
    document.querySelector("[data-menu-count]").textContent = String(items.length).padStart(2, "0") + " ITEMS";
    list.innerHTML = items.map((item, index) => `
      <article class="menu-item ${item.featured ? "featured" : ""}">
        <div class="menu-item-number">${String(index + 1).padStart(2, "0")}</div>
        <div class="menu-item-main">
          <span class="menu-item-category">${categoryIcons[item.category]} ${c("menu", item.category)}</span>
          <h2>${item.name[lang]}</h2>
          <p>${item.desc[lang]}</p>
        </div>
        <strong class="menu-item-price">${formatPrice(item.price)}</strong>
        <button type="button" class="add-item" data-add-item="${item.id}" aria-label="${c("menu", "add")}: ${item.name[lang]}">
          <span>${icons.plus}</span><em>${c("menu", "add")}</em>
        </button>
      </article>`).join("");
  }

  function changeCart(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    if (!cart[id]) delete cart[id];
    saveCart();
    renderCart();
  }

  function cartCount() {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }

  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, quantity]) => {
      const item = menuItems.find(entry => entry.id === id);
      return sum + (item ? item.price * quantity : 0);
    }, 0);
  }

  function renderCart() {
    const lines = document.querySelector("[data-cart-lines]");
    if (!lines) return;
    const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
    lines.innerHTML = entries.length ? entries.map(([id, quantity]) => {
      const item = menuItems.find(entry => entry.id === id);
      if (!item) return "";
      return `
        <div class="cart-line">
          <div><strong>${item.name[lang]}</strong><small>${formatPrice(item.price)} · ${quantity}×</small></div>
          <div class="line-controls">
            <button type="button" data-cart-change="${id}" data-delta="-1" aria-label="${c("menu", "remove")}">${icons.minus}</button>
            <span>${quantity}</span>
            <button type="button" data-cart-change="${id}" data-delta="1" aria-label="${c("menu", "add")}">${icons.plus}</button>
          </div>
        </div>`;
    }).join("") : `<div class="cart-empty">${icons.platter}<strong>${c("menu", "empty")}</strong><span>${c("menu", "emptySub")}</span></div>`;

    const total = cartTotal();
    document.querySelectorAll("[data-cart-badge]").forEach(element => element.textContent = cartCount());
    document.querySelectorAll("[data-cart-total], [data-drawer-total]").forEach(element => element.textContent = formatPrice(total));
    document.querySelectorAll("[data-per-guest]").forEach(element => element.textContent = formatPrice(total / state.booking.guests));
    document.querySelectorAll("[data-guest-count]").forEach(element => element.textContent = state.booking.guests);
  }

  function openDrawer() {
    drawerOpen = true;
    const drawer = document.querySelector("[data-table-drawer]");
    if (!drawer) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    drawerOpen = false;
    const drawer = document.querySelector("[data-table-drawer]");
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
  }

  function openDates() {
    const dates = [];
    const cursor = new Date();
    cursor.setHours(12, 0, 0, 0);
    while (dates.length < 10) {
      if (cursor.getDay() !== 1 && cursor.getDay() !== 2) dates.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }

  function dateKey(date) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  }

  function dateLabel(key) {
    if (!key) return c("book", "missing");
    const locale = lang === "nl" ? "nl-NL" : lang === "en" ? "en-GB" : "de-DE";
    return new Intl.DateTimeFormat(locale, { weekday: "short", day: "2-digit", month: "long" }).format(new Date(`${key}T12:00:00`));
  }

  function timesForDate(key) {
    if (!key) return [];
    const day = new Date(`${key}T12:00:00`).getDay();
    const last = day === 0 ? 19.5 : 20.5;
    const slots = [];
    for (let value = 17; value <= last; value += 0.5) {
      const hours = Math.floor(value);
      const minutes = value % 1 ? "30" : "00";
      slots.push({ time: `${String(hours).padStart(2, "0")}:${minutes}`, limited: (slots.length + new Date(`${key}T12:00:00`).getDate()) % 4 === 0 });
    }
    return slots;
  }

  function renderBooking() {
    const root = document.querySelector("[data-booking-root]");
    if (!root) return;
    const booking = state.booking;
    const stepLabels = [c("book", "date"), c("book", "party"), c("book", "time"), c("book", "summary")];
    root.innerHTML = `
      <div class="booking-progress">
        ${stepLabels.map((label, index) => `<button type="button" class="${booking.step === index + 1 ? "active" : ""} ${booking.step > index + 1 ? "complete" : ""}" data-progress-step="${index + 1}" ${index + 1 > booking.step ? "disabled" : ""}><span>${booking.step > index + 1 ? icons.check : `0${index + 1}`}</span><strong>${label}</strong></button>`).join("")}
      </div>
      <div class="booking-body">
        <div class="booking-stage">
          <div class="step-marker">${c("book", "step")} ${booking.step} ${c("book", "of")}</div>
          ${bookingStep()}
          <div class="booking-navigation">
            ${booking.step > 1 ? `<button class="button button-outline" type="button" data-book-back>${icons.arrow}<span>${c("book", "back")}</span></button>` : "<span></span>"}
            ${booking.step < 4 ? `<button class="button button-copper" type="button" data-book-next ${canContinue() ? "" : "disabled"}><span>${c("book", "next")}</span>${icons.arrow}</button>` : `<button class="button button-copper" type="button" data-book-submit><span>${c("book", "request")}</span>${icons.arrow}</button>`}
          </div>
        </div>
        <aside class="booking-summary">
          <span class="eyebrow">${c("book", "summary")}</span>
          <div class="summary-ember">${icons.fire}</div>
          ${summaryLine(icons.calendar, c("book", "date"), dateLabel(booking.date))}
          ${summaryLine(icons.people, c("book", "party"), `${booking.guests} ${c("book", "party").toLowerCase()}`)}
          ${summaryLine(icons.chair, c("book", "area"), booking.area ? areaLabel(booking.area) : c("book", "missing"))}
          ${summaryLine(icons.clock, c("book", "time"), booking.time || c("book", "missing"))}
          ${cartCount() ? `<div class="summary-table">${icons.platter}<span>${cartCount()} ${c("menu", "builder")} · ${formatPrice(cartTotal())}</span></div>` : ""}
        </aside>
      </div>`;

    bindBooking();
  }

  function bookingStep() {
    const booking = state.booking;
    if (booking.step === 1) {
      const locale = lang === "nl" ? "nl-NL" : lang === "en" ? "en-GB" : "de-DE";
      return `
        <div class="booking-heading"><span>${icons.calendar}</span><div><h2>${c("book", "dateTitle")}</h2><p>${c("book", "dateText")}</p></div></div>
        <div class="date-grid">
          ${openDates().map((date, index) => {
            const key = dateKey(date);
            const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
            const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(date);
            return `<button type="button" class="${booking.date === key ? "active" : ""}" data-date="${key}"><small>${index === 0 ? "NEXT" : weekday}</small><strong>${date.getDate()}</strong><span>${month}</span></button>`;
          }).join("")}
        </div>`;
    }
    if (booking.step === 2) {
      const areas = [
        ["window", c("book", "areaWindow"), c("book", "areaWindowSub"), icons.pin],
        ["grill", c("book", "areaGrill"), c("book", "areaGrillSub"), icons.fire],
        ["quiet", c("book", "areaQuiet"), c("book", "areaQuietSub"), icons.chair]
      ];
      return `
        <div class="booking-heading"><span>${icons.people}</span><div><h2>${c("book", "partyTitle")}</h2><p>${c("book", "partyText")}</p></div></div>
        <div class="party-picker"><button type="button" data-party="-1">${icons.minus}</button><output>${booking.guests}</output><span>${c("book", "party")}</span><button type="button" data-party="1">${icons.plus}</button></div>
        <div class="area-grid">
          ${areas.map(([id, title, subtitle, icon]) => `<button type="button" class="${booking.area === id ? "active" : ""}" data-area="${id}"><span>${icon}</span><strong>${title}</strong><small>${subtitle}</small><i>${icons.check}</i></button>`).join("")}
        </div>`;
    }
    if (booking.step === 3) {
      return `
        <div class="booking-heading"><span>${icons.clock}</span><div><h2>${c("book", "timeTitle")}</h2><p>${c("book", "timeText")}</p></div></div>
        <div class="time-legend"><span><i></i>${c("book", "available")}</span><span><i></i>${c("book", "limited")}</span></div>
        <div class="time-grid">
          ${timesForDate(booking.date).map(slot => `<button type="button" class="${booking.time === slot.time ? "active" : ""} ${slot.limited ? "limited" : ""}" data-time="${slot.time}"><strong>${slot.time}</strong><small>${slot.limited ? c("book", "limited") : c("book", "available")}</small></button>`).join("")}
        </div>`;
    }
    return `
      <div class="booking-heading"><span>${icons.check}</span><div><h2>${c("book", "detailsTitle")}</h2><p>${c("book", "detailsText")}</p></div></div>
      <form class="details-form" data-details-form>
        <label><span>${c("book", "name")}</span><input type="text" name="name" autocomplete="name" required placeholder=" "></label>
        <div class="form-row">
          <label><span>${c("book", "phone")}</span><input type="tel" name="phone" autocomplete="tel" required placeholder=" "></label>
          <label><span>${c("book", "email")}</span><input type="email" name="email" autocomplete="email" required placeholder=" "></label>
        </div>
        <label><span>${c("book", "occasion")}</span><textarea name="note" rows="3" placeholder=" "></textarea></label>
        <label class="check-label"><input type="checkbox" required><i>${icons.check}</i><span>${c("book", "privacy")}</span></label>
      </form>`;
  }

  function summaryLine(icon, title, value) {
    return `<div class="summary-line"><span>${icon}</span><div><small>${title}</small><strong>${value}</strong></div></div>`;
  }

  function areaLabel(id) {
    const names = { window: c("book", "areaWindow"), grill: c("book", "areaGrill"), quiet: c("book", "areaQuiet") };
    return names[id];
  }

  function canContinue() {
    const booking = state.booking;
    if (booking.step === 1) return Boolean(booking.date);
    if (booking.step === 2) return Boolean(booking.area && booking.guests);
    if (booking.step === 3) return Boolean(booking.time);
    return true;
  }

  function bindBooking() {
    document.querySelectorAll("[data-progress-step]").forEach(button => button.addEventListener("click", () => {
      const target = Number(button.dataset.progressStep);
      if (target <= state.booking.step) {
        state.booking.step = target;
        renderBooking();
      }
    }));
    document.querySelectorAll("[data-date]").forEach(button => button.addEventListener("click", () => {
      state.booking.date = button.dataset.date;
      state.booking.time = "";
      renderBooking();
    }));
    document.querySelectorAll("[data-party]").forEach(button => button.addEventListener("click", () => {
      state.booking.guests = Math.max(1, Math.min(12, state.booking.guests + Number(button.dataset.party)));
      renderBooking();
    }));
    document.querySelectorAll("[data-area]").forEach(button => button.addEventListener("click", () => {
      state.booking.area = button.dataset.area;
      renderBooking();
    }));
    document.querySelectorAll("[data-time]").forEach(button => button.addEventListener("click", () => {
      state.booking.time = button.dataset.time;
      renderBooking();
    }));
    const back = document.querySelector("[data-book-back]");
    if (back) back.addEventListener("click", () => {
      state.booking.step = Math.max(1, state.booking.step - 1);
      renderBooking();
    });
    const next = document.querySelector("[data-book-next]");
    if (next) next.addEventListener("click", () => {
      if (!canContinue()) return;
      state.booking.step = Math.min(4, state.booking.step + 1);
      renderBooking();
      document.querySelector(".booking-shell").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const submit = document.querySelector("[data-book-submit]");
    if (submit) submit.addEventListener("click", () => {
      const form = document.querySelector("[data-details-form]");
      if (!form.reportValidity()) return;
      showBookingModal();
    });
  }

  function showBookingModal() {
    const modal = document.createElement("div");
    modal.className = "success-modal";
    modal.innerHTML = `
      <div class="success-backdrop"></div>
      <div class="success-card" role="dialog" aria-modal="true">
        <div class="success-fire">${icons.fire}<span></span></div>
        <small>MATIVA · RESERVATION</small>
        <h2>${c("book", "demoTitle")}</h2>
        <p>${c("book", "demoText")}</p>
        <div class="success-summary"><strong>${dateLabel(state.booking.date)} · ${state.booking.time}</strong><span>${state.booking.guests} ${c("book", "party").toLowerCase()} · ${areaLabel(state.booking.area)}</span></div>
        <button type="button" class="button button-copper"><span>${c("book", "done")}</span>${icons.check}</button>
      </div>`;
    document.body.appendChild(modal);
    window.requestAnimationFrame(() => modal.classList.add("open"));
    const close = () => {
      modal.classList.remove("open");
      window.setTimeout(() => modal.remove(), 300);
    };
    modal.querySelector("button").addEventListener("click", close);
    modal.querySelector(".success-backdrop").addEventListener("click", close);
  }

  render();
})();
