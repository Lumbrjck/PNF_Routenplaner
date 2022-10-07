// ============================
//      translation.js      
//      Renas Delibalta
//      19.04.2021
// ============================ 

/* Text Dict */
var de_dict = {
    menuSelector_one: "KARTE",
    menuSelector_two: "SUCHE",
    menuSelector_three: "ANSICHT &amp; LEGENDE",
    menuSelector_four: "IMPRESSUM",

    compassInfo: "Tippen Sie auf den Kompass, um ihn zu aktivieren.",
    
    impressum_Header_One: "Individuelle praktische Arbeit (IPA)",
    impressum_Paragraph_One: "Diese interaktive Webkartenanwendung, die gedruckten Karten und die Anleitung für die Aktualisierung der Daten sind das Resultat meiner IPA 2021.",
    impressum_Paragraph_Two: "Lernender Geomatiker EFZ 2017 – 2021<br><br>Bundesamt für Landestopografie<br>Seftigenstrasse 264<br>CH-3084 Wabern",
    impressum_Header_Copyright: "Datenquellen:",

    punktsucheTitel: "Punktnummer:",
    punktsucheMinimieren: "minimieren",

    legende_lfp1: "LFP1",
    legende_lfp1_nextC: "LFP1 nächster Zyklus",
    legende_lv95_haupt: "LV95 – Hauptpunkt",
    legende_lv95_verdicht: "LV95 – Verdichtungspunkt",
    legende_agnes: "AGNES",
    legende_signale: "Signale",
    legende_farOffRoute: "Undeutliche Anfahrt",

    sectorSelectionButton: "Sektoren",
    curSelectedSectorTitle: "Momentan ausgewählt:",
    curSelectedSectorName: "Sektor",

    selectedSectCH: "Gesamte Schweiz",
    selectedSect1: "Sektor 1: Westschweiz",
    selectedSect2: "Sektor 2: Luzern &#8211; Aargau",
    selectedSect3: "Sektor 3: St. Gallen &#8211; Zürich",
    selectedSect4: "Sektor 4: Bern &#8211 Wallis",
    selectedSect5: "Sektor 5: Tessin &#8211; Graubünden"
};
var fr_dict = {
    menuSelector_one: "CARTE",
    menuSelector_two: "RECHERCHE",
    menuSelector_three: "VUE &amp; LÉGENDE",
    menuSelector_four: "MENTIONS LÉGALES",

    compassInfo: "Appuyez sur la boussole pour l'activer.",
    
    impressum_Header_One: "Travail pratique individuel (TPI)",
    impressum_Paragraph_One: "Cette application cartographique interactive sur internet, ainsi que les cartes imprimées et le guide de suivi des données, sont le résultat de mon TPI 2021.",
    impressum_Paragraph_Two: "Apprenti Géomaticien CFC 2017 – 2021<br><br>Office fédéral de topographie<br>Seftigenstrasse 264<br>CH-3084 Wabern",
    impressum_Header_Copyright: "Sources de données:",

    punktsucheTitel: "Numéro de point:",
    punktsucheMinimieren: "minimiser",

    legende_lfp1: "PFP1",
    legende_lfp1_nextC: "PFP1 cycle suivant",
    legende_lv95_haupt: "MN95 point principal",
    legende_lv95_verdicht: "MN95 point densification",
    legende_agnes: "AGNES",
    legende_signale: "Signaux",
    legende_farOffRoute: "Approche indistincte",
    
    sectorSelectionButton: "Secteurs",
    curSelectedSectorTitle: "Actuellement sélectionné:",
    curSelectedSectorName: "Secteur",

    selectedSectCH: "Toute la Suisse",
    selectedSect1: "Secteur 1: Suisse romande",
    selectedSect2: "Secteur 2: Lucerne &#8211; Argovie",
    selectedSect3: "Secteur 3: St-Gall &#8211; Zurich",
    selectedSect4: "Secteur 4: Berne &#8211 Valais",
    selectedSect5: "Secteur 5: Ticino &#8211; Grisons"
};
var it_dict = {
    menuSelector_one: "CARTA",
    menuSelector_two: "RICERCA",
    menuSelector_three: "VISUALIZZAZIONE &amp; LEGENDA",
    menuSelector_four: "COLOFONE",

    compassInfo: "Tocca la bussola per attivarla.",
    
    impressum_Header_One: "Lavoro pratico individuale (LPI)",
    impressum_Paragraph_One: "Questa applicazione web interattiva, le carte stampate e la guida all'aggiornamento dei dati rappresentano il risultato finale del mio LPI 2021.",
    impressum_Paragraph_Two: "Apprendista Geomatico AFC 2017 – 2021<br><br>Ufficio federale di topografia<br>Seftigenstrasse 264<br>CH-3084 Wabern",
    impressum_Header_Copyright: "Fonte dei dati:",

    punktsucheTitel: "Numero del punto:",
    punktsucheMinimieren: "minimizzare",

    legende_lfp1: "PFP1",
    legende_lfp1_nextC: "PFP1 ciclo successivo",
    legende_lv95_haupt: "MN95 – punto principale",
    legende_lv95_verdicht: "MN95 – punto densificazione",
    legende_agnes: "AGNES",
    legende_signale: "Segnali",
    legende_farOffRoute: "Approccio indistinto",
    
    sectorSelectionButton: "Settori",
    curSelectedSectorTitle: "Attualmente selezionato:",
    curSelectedSectorName: "Settore",

    selectedSectCH: "Tutta la Svizzera",
    selectedSect1: "Settore 1: Svizzera occidentale",
    selectedSect2: "Settore 2: Lucerna &#8211; Argovia",
    selectedSect3: "Settore 3: San Gallo &#8211; Zurigo",
    selectedSect4: "Settore 4: Berna &#8211 Vallese",
    selectedSect5: "Settore 5: Ticino &#8211; Grigioni"
};

var art_1_h1_impr = document.getElementById("art_1_h1_impr");
var art_1_p_impr = document.getElementById("art_1_p_impr");
var art_2_p_impr = document.getElementById("art_2_p_impr"); 
var art_3_h1_impr = document.getElementById("art_3_h1_impr");

var sucheTitle = document.getElementById("searchInputTitle");
var sucheMinimieren = document.getElementById("minimierenSpan");

var legende_drei = document.getElementById("lfp1LayerTag");
var legende_vier = document.getElementById("lfp1_nextC_LayerTag");
var legende_fünf = document.getElementById("lv95HauptLayerTag");
var legende_sechs = document.getElementById("lv95VerdichtLayerTag");
var legende_sieben = document.getElementById("agnesLayerTag");
var legende_acht = document.getElementById("signaleLayerTag");
var legende_neun = document.getElementById("farOffRoad_points");

var curSelSecTitle = document.getElementById("titleCurSelSector");
var curSelSecName = document.getElementById("currSelSectorName");

function changeLanguage(lang) {

    if (lang == "de") {

        setNewLanguage(de_dict);

        langSelector_DE.classList.add("activeLangSelector");
        langSelector_FR.classList.remove("activeLangSelector");
        langSelector_IT.classList.remove("activeLangSelector");

    } else if (lang == "fr") {

        setNewLanguage(fr_dict);
        
        langSelector_DE.classList.remove("activeLangSelector");
        langSelector_FR.classList.add("activeLangSelector");
        langSelector_IT.classList.remove("activeLangSelector");

    } else if (lang == "it") {

        setNewLanguage(it_dict);

        langSelector_DE.classList.remove("activeLangSelector");
        langSelector_FR.classList.remove("activeLangSelector");
        langSelector_IT.classList.add("activeLangSelector");

    }
}

function setNewLanguage(dict) {
    menuSelector_Karte.innerHTML = dict.menuSelector_one;
    menuSelector_Suche.innerHTML = dict.menuSelector_two;
    menuSelector_AnsichtUndLegende.innerHTML = dict.menuSelector_three;
    menuSelector_Impressum.innerHTML = dict.menuSelector_four;
    
    art_1_h1_impr.innerHTML = dict.impressum_Header_One;
    art_1_p_impr.innerHTML = dict.impressum_Paragraph_One; 
    art_2_p_impr.innerHTML = dict.impressum_Paragraph_Two;
    art_3_h1_impr.innerHTML = dict.impressum_Header_Copyright;
    
    sucheTitle.innerHTML = dict.punktsucheTitel;
    sucheMinimieren.innerHTML = dict.punktsucheMinimieren;
    
    northArrowInfo.innerHTML = dict.compassInfo;

    legende_drei.innerHTML = dict.legende_lfp1;
    legende_vier.innerHTML = dict.legende_lfp1_nextC;
    legende_fünf.innerHTML = dict.legende_lv95_haupt;
    legende_sechs.innerHTML = dict.legende_lv95_verdicht;
    legende_sieben.innerHTML = dict.legende_agnes;
    legende_acht.innerHTML = dict.legende_signale;
    legende_neun.innerHTML = dict.legende_farOffRoute;

    secSelH1.innerHTML = dict.sectorSelectionButton + ":";
    secSelButtonSpan.innerHTML = dict.sectorSelectionButton;

    curSelSecTitle.innerHTML = dict.curSelectedSectorTitle;

    if (localStorage.getItem("selectedSector") == 1) {
        currSelSectorName.innerHTML = dict.selectedSect1;
    } else if (localStorage.getItem("selectedSector") == 2) {
        currSelSectorName.innerHTML = dict.selectedSect2;
    } else if (localStorage.getItem("selectedSector") == 3) {
        currSelSectorName.innerHTML = dict.selectedSect3;
    } else if (localStorage.getItem("selectedSector") == 4) {
        currSelSectorName.innerHTML = dict.selectedSect4;
    } else if (localStorage.getItem("selectedSector") == 5) {
        currSelSectorName.innerHTML = dict.selectedSect5;
    } else if (localStorage.getItem("selectedSector") == 6) {
        currSelSectorName.innerHTML = dict.selectedSectCH;
    }
}