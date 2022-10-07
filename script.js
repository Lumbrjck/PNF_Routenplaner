// ============================
//      script.js   
//      Renas Delibalta
//      19.04.2021
// ============================ 

/* Variablen */
var mainMenu_open = false;

var suchMenu_open = false;
var ansichtUndLegendeMenu_open = false;
var impressum_open = false;

var searchminimezd = false;

var mainMenuBRValueCSS; 
if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) >= 690) {
    mainMenuBRValueCSS = "20px";
} else {
    mainMenuBRValueCSS = "0xp";
}

/* Objekte */

var menuBtn = document.getElementById("menuBtn");

var menuContainer_Karte = document.getElementById("menuContainer_Karte");
var menuContainer_Suche = document.getElementById("menuContainer_Suche");
var menuContainer_AnsichtUndLegende = document.getElementById("menuContainer_AnsichtUndLegende");
var menuContainer_Impressum = document.getElementById("menuContainer_Impressum");
var menuContainer_Sprachen = document.getElementById("menuContainer_Sprachen");

/* == Subcontainers */

var suche_SubContainer = document.getElementById("sucheContainer");
var impressum_SubContainer = document.getElementById("impressumContainer");
var ansichtUndLegende_SubContainer = document.getElementById("ansichtUndLegendeContainer");

var menuSelector_Karte = document.getElementById("menuSelector_Karte");
var menuSelector_Suche = document.getElementById("menuSelector_Suche");
var menuSelector_AnsichtUndLegende = document.getElementById("menuSelector_AnsichtUndLegende");
var menuSelector_Impressum = document.getElementById("menuSelector_Impressum");

/* == Punktsuche */
var searchInput = document.getElementById("suchInput");
var clearBtn = document.getElementById("clearInputBtn");
var searchInputTitle = document.getElementById("searchInputTitle");

/* == Sprachselektion */
var langSelector_DE = document.getElementById("langSelector_DE");
var langSelector_FR = document.getElementById("langSelector_FR");
var langSelector_IT = document.getElementById("langSelector_IT");

/* == Sector Selector */
var sectorSelector_SubContainer = document.getElementById("sectorSelectorContainer");

var selectedSector;
var sektor_selectedColor = "#55f696";
var sektor_unselectedColor = "#EDEDED";

/* =============== */

setTimeout(function(){ 
    document.getElementsByTagName("body")[0].setAttribute("touch-action", "none");
}, 200);

var userLang = navigator.language || navigator.userLanguage;
var userLangCode = userLang.substring(0, 2);

if (localStorage.getItem("setLanguage") == null) {
    setLanguage = userLangCode;
} else {
    setLanguage = localStorage.getItem("setLanguage");
}
changeLanguage(setLanguage);

setTimeout(function(){ 
    changeMapLanguage(setLanguage);
}, 2000);

function menuBtn_clicked() {
    document.getElementById("backToMenuBtn").style.display = "none";
    document.getElementById("map").style.height = "100%";

    if (mainMenu_open) {
        menuContainer_Karte.style.bottom = "-350px";
        menuContainer_Karte.style.boxShadow = "none";

        menuContainer_Suche.style.bottom = "-250px";
        menuContainer_Suche.style.boxShadow = "none";

        menuContainer_AnsichtUndLegende.style.bottom = "-200px";
        menuContainer_AnsichtUndLegende.style.boxShadow = "none";

        menuContainer_Impressum.style.bottom = "-110px";
        menuContainer_Impressum.style.boxShadow = "none";

        menuContainer_Sprachen.style.bottom = "-50px";
        menuContainer_Sprachen.style.boxShadow = "none";

        menuBtn.style.bottom = "40px";

        mainMenu_open = false;
    } else {
        menuContainer_Karte.style.bottom = "0";
        menuContainer_Karte.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";
        menuContainer_Karte.style.borderTopLeftRadius = mainMenuBRValueCSS;
        menuContainer_Karte.style.borderTopRightRadius = mainMenuBRValueCSS;

        menuContainer_Suche.style.bottom = "0";
        menuContainer_AnsichtUndLegende.style.bottom = "0";
        menuContainer_Impressum.style.bottom = "0";
        menuContainer_Sprachen.style.bottom = "0";

        menuBtn.style.bottom = "-40px";

        mainMenu_open = true;
    }
}

function sucheSelector_clicked() {
    sucheMenu_open = true;

    menuSelector_Karte.style.display = "none";
    menuSelector_AnsichtUndLegende.style.display = "none";
    menuSelector_Impressum.style.display = "none";
    
    menuContainer_Karte.style.bottom = "-350px";
    menuContainer_Karte.style.borderTopLeftRadius = "none";
    menuContainer_Karte.style.borderTopRightRadius = "none";

    menuContainer_AnsichtUndLegende.style.bottom = "-200px";
    menuContainer_Impressum.style.bottom = "-110px";

    menuContainer_Suche.style.height = "115px";
    menuContainer_Suche.style.paddingTop = "30px";
    menuContainer_Suche.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";

    menuSelector_Karte.classList.remove("activeMenuSelector");
    menuSelector_Suche.classList.add("activeMenuSelector");

    suche_SubContainer.style.bottom = "145px";
    suche_SubContainer.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";
}

function ansichtUndLegendeSelector_clicked() {
    if (!ansichtUndLegendeMenu_open) {
        ansichtUndLegendeMenu_open = true;

        menuSelector_Karte.style.display = "none";
        menuSelector_Suche.style.display = "none";
        menuSelector_Impressum.style.display = "none";

        menuContainer_Karte.style.bottom = "-350px";
        menuContainer_Karte.style.borderTopLeftRadius = "0px";
        menuContainer_Karte.style.borderTopRightRadius = "0px";

        menuContainer_Suche.style.bottom = "-250px";
        menuContainer_Impressum.style.bottom = "-110px";

        menuContainer_AnsichtUndLegende.style.height = "145px";
        menuContainer_AnsichtUndLegende.style.paddingTop = "30px";
        menuContainer_AnsichtUndLegende.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";

        menuSelector_Karte.classList.remove("activeMenuSelector");
        menuSelector_AnsichtUndLegende.classList.add("activeMenuSelector");

        ansichtUndLegende_SubContainer.style.bottom = "175px";
        ansichtUndLegende_SubContainer.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";
    }
}

function resetMenuContainer(hide, fixateSearch) {

    if (searchminimezd) {
        searchminimezd = false;
        document.getElementById("map").style.height = "100%";
        menuBtn_clicked();
    }

	suchMenu_open = false;
    ansichtUndLegendeMenu_open = false;
    impressum_open = false;

    menuSelector_Karte.style.display = "block";
    menuSelector_Suche.style.display = "block";
    menuSelector_AnsichtUndLegende.style.display = "block";
    menuSelector_Impressum.style.display = "block";
    
    menuSelector_Karte.classList.add("activeMenuSelector");
    menuContainer_Karte.style.borderTopLeftRadius = mainMenuBRValueCSS;
    menuContainer_Karte.style.borderTopRightRadius = mainMenuBRValueCSS;
    menuSelector_Suche.classList.remove("activeMenuSelector");
    menuSelector_AnsichtUndLegende.classList.remove("activeMenuSelector");
    menuSelector_Impressum.style.fontWeight = "var(--mainFontLight)";

    impressum_SubContainer.style.bottom = "-900px";
    impressum_SubContainer.style.boxShadow = "none";

    ansichtUndLegende_SubContainer.style.bottom = "-650px";
    ansichtUndLegende_SubContainer.style.boxShadow = "none";

    sectorSelector_SubContainer.style.bottom = "-600px"
    sectorSelector_SubContainer.style.boxShadow = "none"

    if(fixateSearch) {
        suche_SubContainer.style.bottom = "0px";
        document.getElementById("minimizeBtn").style.display = "none"; 
        document.getElementById("downArrow_searchCont").style.display = "none";

        searchInput.style.bottom = "20px";

        suche_SubContainer.style.height = "110px";

        searchInput.focus();

    } else {
        document.getElementById("map").style.height = "100%";
        if(!isIOS) {
            setTimeout(function(){ 
                resizeMap();
            }, 800);
        }
        document.getElementById("map_Style_Selector").style.bottom = "50px";

        suche_SubContainer.style.bottom = "-500px";
        suche_SubContainer.style.boxShadow = "none";
        searchInput.style.bottom = "60px";
        suche_SubContainer.style.height = "150px";

        setTimeout(function(){ 
            document.getElementById("minimizeBtn").style.display = "block"; 
            document.getElementById("downArrow_searchCont").style.display = "block";
        }, 200);
        
	    searchInput.value = "";   
        searchInput.style.color = "black";
        searchInputTitle.style.color = "black";
    }


    if(hide) {
        mainMenu_open = false;
        menuContainer_Karte.style.bottom = "-350px";
        menuContainer_Karte.style.boxShadow = "none";
        menuContainer_AnsichtUndLegende.style.bottom = "-200px";
        menuContainer_Impressum.style.bottom = "-70px";
        menuContainer_Sprachen.style.bottom = "-50px";
        menuContainer_Suche.style.bottom = "-250px";
        
        if(fixateSearch) {

        } else {
            menuBtn.style.bottom = "40px";
        }
    } else {
        menuContainer_Karte.style.bottom = "0";
        menuContainer_Suche.style.bottom = "0";
        menuContainer_AnsichtUndLegende.style.bottom = "0";
        menuContainer_Impressum.style.bottom = "0";
        menuContainer_Sprachen.style.bottom = "0px";
    }

    menuContainer_Suche.style.boxShadow = "none";
    menuContainer_AnsichtUndLegende.style.boxShadow = "none";
    menuContainer_Impressum.style.boxShadow = "none";

    menuContainer_Suche.style.height = "225px";
    menuContainer_AnsichtUndLegende.style.height = "180px";
    menuContainer_Impressum.style.height = "70px";

    menuContainer_Suche.style.paddingTop = "0";
    menuContainer_AnsichtUndLegende.style.paddingTop = "0";
    menuContainer_Impressum.style.paddingTop = "0";

    document.getElementById("unbefahrbarePunkteContainer").style.boxShadow = "none";
    document.getElementById("unbefahrbarePunkteContainer").style.bottom = "-600px";
    document.getElementById("unbefahrbarePunkteContainer").style.borderTopLeftRadius = "0px";
    document.getElementById("unbefahrbarePunkteContainer").style.borderTopRightRadius = "0xp";
}

function impressumSelector_clicked() {
    impressum_open = true;

    menuSelector_Karte.style.display = "none";
    menuSelector_Suche.style.display = "none";
    menuSelector_AnsichtUndLegende.style.display = "none";

    menuContainer_Karte.style.bottom = "-350px";
    menuContainer_Karte.style.borderTopLeftRadius = "0px";
    menuContainer_Karte.style.borderTopRightRadius = "0px";

    menuContainer_Suche.style.bottom = "-250px";
    menuContainer_AnsichtUndLegende.style.bottom = "-200px";

    menuContainer_Impressum.style.height = "70px";
    menuContainer_Impressum.style.paddingTop = "30px";
    menuContainer_Impressum.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";

    menuSelector_Karte.classList.remove("activeMenuSelector");
    menuSelector_Impressum.style.fontWeight = "var(--mainFontBold)";

    impressum_SubContainer.style.bottom = "100px";
    impressum_SubContainer.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";
}

function colorizeSelectedSector(selectedSector) {
    if (selectedSector == 6) {
        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_selectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").style.fill = sektor_unselectedColor;
    } else if (selectedSector == 1) {
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").style.fill = sektor_selectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").style.fill = sektor_unselectedColor;
    } else if (selectedSector == 2) {
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").style.fill = sektor_selectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").style.fill = sektor_unselectedColor;
    } else if (selectedSector == 3) {
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").style.fill = sektor_selectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").style.fill = sektor_unselectedColor;
    } else if (selectedSector == 4) {
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").style.fill = sektor_selectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").style.fill = sektor_unselectedColor;
    } else {
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").style.fill = sektor_selectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").style.fill = sektor_unselectedColor;
        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_unselectedColor;
    }
}

function secktorenSelecktor(hide) {

    if(hide) {
        changeLanguage(setLanguage);
        sectorSelector_SubContainer.style.bottom = "-600px";
        sectorSelector_SubContainer.style.boxShadow = "none";
        ansichtUndLegende_SubContainer.style.bottom = "175px";
        ansichtUndLegende_SubContainer.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";
    } else {

        if (localStorage.getItem('selectedSector') == null) {
            selectedSector = 6;
            localStorage.setItem('selectedSector', 6);
            document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").style.fill = sektor_selectedColor;
        } else {
            colorizeSelectedSector(localStorage.getItem('selectedSector'));
        }
        
        document.getElementById('sectorMap').contentDocument.getElementById("Sektor1").addEventListener("click", function() {
            localStorage.setItem('selectedSector', 1);
            colorizeSelectedSector(localStorage.getItem('selectedSector'));

            hideLyrs("sektor_one");
        });

        document.getElementById('sectorMap').contentDocument.getElementById("Sektor2").addEventListener("click", function() {
            localStorage.setItem('selectedSector', 2);
            colorizeSelectedSector(localStorage.getItem('selectedSector'));

            hideLyrs("sektor_two");
        });

        document.getElementById('sectorMap').contentDocument.getElementById("Sektor3").addEventListener("click", function() {
            localStorage.setItem('selectedSector', 3);
            colorizeSelectedSector(localStorage.getItem('selectedSector'));
            
            hideLyrs("sektor_three");
        });

        document.getElementById('sectorMap').contentDocument.getElementById("Sektor4").addEventListener("click", function() {
            localStorage.setItem('selectedSector', 4);
            colorizeSelectedSector(localStorage.getItem('selectedSector'));
            
            hideLyrs("sektor_four");
        });

        document.getElementById('sectorMap').contentDocument.getElementById("Sektor5").addEventListener("click", function() {
            localStorage.setItem('selectedSector', 5);
            colorizeSelectedSector(localStorage.getItem('selectedSector'));
            
            hideLyrs("sektor_five");
        });

        document.getElementById('sectorMap').contentDocument.getElementById("SektorCH").addEventListener("click", function() {
            localStorage.setItem('selectedSector', 6);
            colorizeSelectedSector(localStorage.getItem('selectedSector'));
            
            hideLyrs("sektor_CH");
        });

        sectorSelector_SubContainer.style.bottom = "175px";
        sectorSelector_SubContainer.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.1)";
        ansichtUndLegende_SubContainer.style.bottom = "-600px";
        ansichtUndLegende_SubContainer.style.boxShadow = "none";
    }
}

/* Punktsuche */

searchInput.addEventListener('keyup',function(){

	searchInput.style.color = "black";
	searchInputTitle.style.color = "black";
	
    if (searchInput.value.length > 0) {
        clearBtn.style.display = "block";
    } else {
        clearBtn.style.display = "none";
    }

	if (searchInput.value.length == 8) {
		coordinates = String(localStorage.getItem(searchInput.value)).split(",");
		try {
			flyToSearchedPoint(coordinates[0], coordinates[1]);	
			searchInput.style.color = "#1ED123";
	        searchInputTitle.style.color = "#1ED123";
		} catch(e) {
			searchInput.style.color = "red";
	        searchInputTitle.style.color = "red";
		}	
	}
});

function clearBtnClicked() {
    clearBtn.style.display = "none";

    searchInput.value = "";
    searchInput.focus();
	searchInput.style.color = "black";

	searchInputTitle.style.color = "black";
}

function minimizeSearchTab() {

    if (window.innerWidth < 690) {
        document.getElementById("map").style.height = "calc(100% - 110px)";
        document.getElementById("map_Style_Selector").style.bottom = "160px";
    }

    document.getElementById("backToMenuBtn").style.display = "block";
    resetMenuContainer(1, 1);
    
    searchminimezd = true;
}

function backToMenuBtn() {
    resetMenuContainer(0, 0);
    menuBtn_clicked();
}

/* Legende */

function layerCB_clicked(cb, layerTag) {
    hideLyrs(layerTag.id);
    if (cb.checked) {
        localStorage.setItem(layerTag.id, 1);
        document.getElementById(layerTag.id).style.color = "#c7c7c7";
    } else {
        localStorage.setItem(layerTag.id, 0);
        document.getElementById(layerTag.id).style.color = "#000";
    }
}

/* Sprachauswahl */

function langSelector_clicked(lang) {
    localStorage.setItem('setLanguage', lang);
    setLanguage = localStorage.getItem('setLanguage');
    changeLanguage(lang);
    changeMapLanguage(lang);
}