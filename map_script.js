// ============================
//      map_script.js    
//      Renas Delibalta
//      19.04.2021  
// ============================ 

/* Variablen */
var organisation_gitHub = "Lumbrjck";

var toggleableLayerIds_routes = [];
var toggleableLayerIds_tracks = [];
var toggleableLayerIds_publicTransport = [];

var satOpened = false;

var northArrow = document.getElementById("northArrow");
var northArrowInfo = document.getElementById("northArrowInfo");

var isIOS;
var isIPad;

var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/iPhone|iPod/.test(userAgent) && !window.MSStream && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    isIOS = true;
    isIPad = false;
} else if (/iPad/.test(userAgent) && !window.MSStream || (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)) {
    isIOS = true;
    isIPad = true;
    $("a[href='https://assets.ubuntu.com/v1/81e5605d-ubuntu-font-licence-1.0.txt?_ga=2.49704614.1644561378.1618388275-1839032549.1618388275']").attr("target", "_top");
} else {
    isIOS = false;
}

/* === Vector Tiles Welt */
mapboxgl.setRTLTextPlugin('https://cdn.klokantech.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js');
var map = new mapboxgl.Map({
	container: 'map',
	style: 'https://api.maptiler.com/maps/256381ff-43ff-4495-ae3b-b227562f0cbe/style.json?key=ikKb7yPjxvOQgGWH28nA',
	center: [8.23430, 46.82697],
	zoom: 8,
	hash: true
});
map.addControl(new mapboxgl.NavigationControl());

document.getElementsByClassName("mapboxgl-canvas")[0].classList.add("transition_ease_in_out");

var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
});
map.addControl(scale);

var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showAccuracyCircle: false,
    maxzoom: 18
});

map.addControl(geolocate);

/* Routen laden*/
map.on('load', function () {
    checkForViewSettings();

    if (localStorage.getItem("selectedSector") == 1) {
        hideLyrs("sektor_one");
    } else if (localStorage.getItem("selectedSector") == 2) {
        hideLyrs("sektor_two");
    } else if (localStorage.getItem("selectedSector") == 3) {
        hideLyrs("sektor_three");
    } else if (localStorage.getItem("selectedSector") == 4) {
        hideLyrs("sektor_four");
    } else if (localStorage.getItem("selectedSector") == 5) {
        hideLyrs("sektor_five");
    } else {
        return 0;
    }

});

function loadroutes(layerId, type) {

    var setPathColor = "";
    var setPathWidth = 0;

    map.addSource(layerId, {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/' + organisation_gitHub + '/PNF_Routenplaner' + '/main/' + layerId + '.geojson'
    });

    if (type == "drive") {
        toggleableLayerIds_routes.push(layerId);
        setPathColor = "#4139D7";
        setPathWidth = 5;
    } else if (type == "track"){
        toggleableLayerIds_tracks.push(layerId);
        setPathColor = "#FC19E6";
        setPathWidth = 3;
    } else {
        toggleableLayerIds_publicTransport.push(layerId);
        setPathColor = "#00FFFF";
        setPathWidth = 3;
    }

    map.addLayer({
        'id': layerId,
        'type': 'line',
        'source': layerId,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': setPathColor,
            'line-width': setPathWidth
        }
    });
}

/* Fixpunkte */
var el;
var popupTxtAgnes;
var linkTarget;

if (isIPad) {
    linkTarget = "_top";
} else {
    linkTarget = "_blank";
}

function fetchJSONFile(path) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var fixpunkte = JSON.parse(httpRequest.responseText);

                fixpunkte.features.forEach(function(marker) {

                    el = document.createElement('div');


                    if (marker.properties.OBJEKTART == "AGNES") {
                        if (marker.properties.NOWAY === 1) {
                            el.className = 'noway_agnes_marker';
                        } else {
                            el.className = 'agnes_marker';
                        }

                        if (marker.properties.SECTOR === 1) {
                            el.classList.add("sector1");
                        } else if (marker.properties.SECTOR === 2) {
                            el.classList.add("sector2");
                        } else if (marker.properties.SECTOR === 3) {
                            el.classList.add("sector3");
                        } else if (marker.properties.SECTOR === 4) {
                            el.classList.add("sector4");
                        } else if (marker.properties.SECTOR === 5) {
                            el.classList.add("sector5");
                        }

						if (String(marker.properties.TITEL) === "MTTI" || String(marker.properties.TITEL) === "PFAN") {
							popupTxtAgnes = '<h2>' + marker.properties.TITEL + '</h2>';
						} else {
							popupTxtAgnes = '<h2>' + marker.properties.TITEL + '</h2>' + '<a target=' + linkTarget + ' href=' + "http://pnac.swisstopo.admin.ch/pages/de/" + marker.properties.PUNKTNAME + ".html" +'>' + "PNAC" + '</a>' + '<img src=' + "Res/hyperlink_icon_blue.png" + '>';
						}

                        new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 15 })
						.setHTML(popupTxtAgnes))
                        .addTo(map);

                    } else if (marker.properties.OBJEKTART == "Signal") {
                        if (marker.properties.NOWAY === 0) {
                            el.className = 'signale_marker';
                        } else {
                            el.className = 'noway_signale_marker';
                        }

                        if (marker.properties.SECTOR === 1) {
                            el.classList.add("sector1");
                        } else if (marker.properties.SECTOR === 2) {
                            el.classList.add("sector2");
                        } else if (marker.properties.SECTOR === 3) {
                            el.classList.add("sector3");
                        } else if (marker.properties.SECTOR === 4) {
                            el.classList.add("sector4");
                        } else if (marker.properties.SECTOR === 5) {
                            el.classList.add("sector5");
                        }

                        new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 15 })
                        .setHTML('<h2>' + el.id + marker.properties.PUNKTNAME + '</h2>' + '<br>' + '<p>' + marker.properties.LFPNR + '</p>' + '<a target=' + linkTarget + ' href=' + "https://data.geo.admin.ch/ch.swisstopo.fixpunkte-lfp1/protokolle/LV03AV/" + marker.properties.LK25 + "/CH030000" + marker.properties.LK25 + "_" + marker.properties.LFPNR + ".pdf" +'>' + "Protocol" + '</a>' + '<img src=' + "Res/hyperlink_icon_blue.png" + '>'))
                        .addTo(map);
						
						localStorage.setItem(marker.properties.LFPNR, marker.geometry.coordinates);
						
                    } else if (marker.properties.OBJEKTART == "LFP1") {

                        var currYear = new Date().getFullYear();
                        var currentYearSector;

                        if ((currYear - 2021) % 6) {
                            currentYearSector = 5;
                        } else if ((currYear - 2020) % 6) {
                            currentYearSector = 4;
                        } else if ((currYear - 2019) % 6) {
                            currentYearSector = 3;
                        } else if ((currYear - 2018) % 6) {
                            currentYearSector = 2;
                        } else if ((currYear - 2017) % 6) {
                            currentYearSector = 1;
                        } else {
                            currentYearSector = 0; // CHTRF+
                        }
 
                        if (marker.properties.NOWAY === 0) {
                            if ((currYear - marker.properties.ZYKLUS) % 12 > 6) {
                                el.className = "lfp1_marker";
                            } else {
                                el.className = 'lfp1_nextC_marker';
                            }
                        } else {
                            if ((currYear - marker.properties.ZYKLUS) % 12 > 6) {
                                el.className = 'noway_lfp1_marker';
                            } else {
                                el.className = 'noway_lfp1_nextC_marker';
                            }
                        }

                        if (marker.properties.SECTOR === 1) {
                            el.classList.add("sector1");
                        } else if (marker.properties.SECTOR === 2) {
                            el.classList.add("sector2");
                        } else if (marker.properties.SECTOR === 3) {
                            el.classList.add("sector3");
                        } else if (marker.properties.SECTOR === 4) {
                            el.classList.add("sector4");
                        } else if (marker.properties.SECTOR === 5) {
                            el.classList.add("sector5");
                        }

                        new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 15 })
                        .setHTML('<h2>' + el.id + marker.properties.PUNKTNAME + '</h2>' + '<br>' + '<p>' + marker.properties.LFPNR + '</p>' + '<a target=' + linkTarget + ' href=' + "https://data.geo.admin.ch/ch.swisstopo.fixpunkte-lfp1/protokolle/LV03AV/" + marker.properties.LK25 + "/CH030000" + marker.properties.LK25 + "_" + marker.properties.LFPNR + ".pdf" +'>' + "Protocol" + '</a>' + '<img src=' + "Res/hyperlink_icon_blue.png" + '>'))
                        .addTo(map);
						
						localStorage.setItem(marker.properties.LFPNR, marker.geometry.coordinates);
						
                    } else if (marker.properties.OBJEKTART == "LV95-Hauptpunkt") {
                        if (marker.properties.NOWAY === 0) {
                            el.className = 'lv95_main_marker';
                        } else {
                            el.className = 'noway_lv95_main_marker';
                        }

                        if (marker.properties.SECTOR === 1) {
                            el.classList.add("sector1");
                        } else if (marker.properties.SECTOR === 2) {
                            el.classList.add("sector2");
                        } else if (marker.properties.SECTOR === 3) {
                            el.classList.add("sector3");
                        } else if (marker.properties.SECTOR === 4) {
                            el.classList.add("sector4");
                        } else if (marker.properties.SECTOR === 5) {
                            el.classList.add("sector5");
                        }

                        new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 15 })
                        .setHTML('<h2>' + el.id + marker.properties.PUNKTNAME + '</h2>' + '<br>' + '<p>' + marker.properties.LFPNR + '</p>' + '<a target=' + linkTarget + ' href=' + "https://data.geo.admin.ch/ch.swisstopo.fixpunkte-lfp1/protokolle/LV03AV/" + marker.properties.LK25 + "/CH030000" + marker.properties.LK25 + "_" + marker.properties.LFPNR + ".pdf" +'>' + "Protocol" + '</a>' + '<img src=' + "Res/hyperlink_icon_blue.png" + '>'))
                        .addTo(map);
						
						localStorage.setItem(marker.properties.LFPNR, marker.geometry.coordinates);
						
                    } else if (marker.properties.OBJEKTART == "lV95-Verbindungspunkt") {
                        if (marker.properties.NOWAY === 0) {
                            el.className = 'lv95_dens_marker';
                        } else {
                            el.className = 'noway_lv95_dens_marker';
                        }

                        if (marker.properties.SECTOR === 1) {
                            el.classList.add("sector1");
                        } else if (marker.properties.SECTOR === 2) {
                            el.classList.add("sector2");
                        } else if (marker.properties.SECTOR === 3) {
                            el.classList.add("sector3");
                        } else if (marker.properties.SECTOR === 4) {
                            el.classList.add("sector4");
                        } else if (marker.properties.SECTOR === 5) {
                            el.classList.add("sector5");
                        }

                        new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 15 })
                        .setHTML('<h2>' + el.id + marker.properties.PUNKTNAME + '</h2>' + '<br>' + '<p>' + marker.properties.LFPNR + '</p>' + '<a target=' + linkTarget + ' href=' + "https://data.geo.admin.ch/ch.swisstopo.fixpunkte-lfp1/protokolle/LV03AV/" + marker.properties.LK25 + "/CH030000" + marker.properties.LK25 + "_" + marker.properties.LFPNR + ".pdf" +'>' + "Protocol" + '</a>' + '<img src=' + "Res/hyperlink_icon_blue.png" + '>'))
                        .addTo(map);
						
						localStorage.setItem(marker.properties.LFPNR, marker.geometry.coordinates);
                    } else if (marker.properties.OBJEKTART == "Trurmann") {
                        if (marker.properties.NOWAY === 0) {
                            el.className = 'trutmann_marker';
                        } else {
                            el.className = 'noway_trutmann_marker';
                        }

                        if (marker.properties.SECTOR === 1) {
                            el.classList.add("sector1");
                        } else if (marker.properties.SECTOR === 2) {
                            el.classList.add("sector2");
                        } else if (marker.properties.SECTOR === 3) {
                            el.classList.add("sector3");
                        } else if (marker.properties.SECTOR === 4) {
                            el.classList.add("sector4");
                        } else if (marker.properties.SECTOR === 5) {
                            el.classList.add("sector5");
                        }

                        new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 15 })
                        .setHTML('<h2>' + el.id + marker.properties.PUNKTNAME + '</h2>' + '<br>' + '<p>' + marker.properties.LFPNR + '</p>' + '<a target=' + linkTarget + ' href=' + "https://data.geo.admin.ch/ch.swisstopo.fixpunkte-lfp1/protokolle/LV03AV/" + marker.properties.LK25 + "/CH030000" + marker.properties.LK25 + "_" + marker.properties.LFPNR + ".pdf" +'>' + "Protocol" + '</a>' + '<img src=' + "Res/hyperlink_icon_blue.png" + '>'))
                        .addTo(map);
						
						localStorage.setItem(marker.properties.LFPNR, marker.geometry.coordinates);
                    }
                });
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}
fetchJSONFile("https://raw.githubusercontent.com/Lumbrjck/PNF_Routenplaner/main/Fixpunkte_PNF.geojson");

/* Fliege zum gesuchten Punkt */
function flyToSearchedPoint(lon, lat) {
	map.flyTo({
		center: [lon, lat],
		essential: true,
		zoom: 16
	});
}

/* Wechsel auf Swissimage */
function changeMapStyle() {

    var visibility = map.getLayoutProperty("swissIMAGE", 'visibility');

    if(!satOpened) {
        
        satOpened = true;

        map.addSource('orthophoto', {
            'type': 'raster',
            'tiles': [
                'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg'
            ],
            'tileSize': 256
        });
    
        map.setLayoutProperty("swissIMAGE", 'visibility', 'none');
    
        map.addLayer(
            {
                'id': 'swissIMAGE',
                'type': 'raster',
                'source': 'orthophoto',
                'paint': {}
            },
                'place_country',
        );
        
        document.getElementById("styleViewer").src = "Res/vector_picture.png";

    } 
        
    if (visibility === 'visible') {
        map.setLayoutProperty("swissIMAGE", 'visibility', 'none');
        document.getElementById("styleViewer").src = "Res/swissImage_picture.png";
    } else {
        map.setLayoutProperty("swissIMAGE", 'visibility', 'visible');
        document.getElementById("styleViewer").src = "Res/vector_picture.png";
    }
}

/* Kompass */

if (isIOS) {
    northArrow.src = "Res/northArrow_inactive.png";
    northArrowInfo.style.display = "block";
    DeviceOrientationEvent.requestPermission()
    .then((response) => {
        if (response === "granted") {
            window.addEventListener("deviceorientation", handlerIOS, true);
            northArrow.src = "Res/northArrow.png";
            northArrowInfo.style.display = "none";
        }
    }).catch();
	
	northArrow.addEventListener("click", function() {
    DeviceOrientationEvent.requestPermission()
    .then((response) => {
        if (response === "granted") {
            window.addEventListener("deviceorientation", handlerIOS, true);
            northArrow.src = "Res/northArrow.png";
            northArrowInfo.style.display = "none";
        } else {
            northArrowInfo.style.display = "block";
            northArrow.src = "Res/northArrow_inactive.png";
            alert("Nicht möglich!");
        }
    }).catch(() => alert("Kompassfunktion wird nicht unterstützt!"));
	});
	
} else {
    northArrow.src = "Res/northArrow.png";
    window.addEventListener("deviceorientationabsolute", handler, true);
    northArrowInfo.style.display = "none";
}

function handlerIOS(e) {
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    northArrow.style.transform = `rotateZ(${-compass}deg)`;
}

function handler(e) {
    northArrow.style.transform = `rotateZ(${e.alpha}deg)`;
}

/* Hide Layers */

var visibility_check;

var hidden_lyr_routes = false;
var hidden_lyr_tracks = false;
var hidden_lyr_publicTransport = false;
var clickedLayer = null;

var agnesMarkers_visible = false;
var lfp1_visible = false;
var lfp1_nxtC_visible = false;
var lv95_main_visible = false;
var lv95_dens_visible = false;
var signale_visible = false;
var trutmann_visible = false;
var farOffRoad_only = false;

var agnesMarkers = document.getElementsByClassName("agnes_marker");
var nw_agnesMarkers = document.getElementsByClassName("noway_agnes_marker");
var lfp1Markers = document.getElementsByClassName("lfp1_marker");
var nw_lfp1Markers = document.getElementsByClassName("noway_lfp1_marker");
var lfp1NextCMarkers = document.getElementsByClassName("lfp1_nextC_marker");
var nw_lfp1NextCMarkers = document.getElementsByClassName("noway_lfp1_nextC_marker");
var lv95MainMarkers = document.getElementsByClassName("lv95_main_marker");
var nw_lv95MainMarkers = document.getElementsByClassName("noway_lv95_main_marker");
var lv95DensMarkers = document.getElementsByClassName("lv95_dens_marker");
var nw_lv95DensMarkers = document.getElementsByClassName("noway_lv95_dens_marker");
var signaleMarkers = document.getElementsByClassName("signale_marker");
var nw_signaleMarkers = document.getElementsByClassName("noway_signale_marker");
var trutmannMarkers = document.getElementsByClassName("trutmann_marker");
var nw_trutmannMarkers = document.getElementsByClassName("noway_trutmann_marker");

var sector1_markers = document.getElementsByClassName("sector1");
var sector2_markers = document.getElementsByClassName("sector2");
var sector3_markers = document.getElementsByClassName("sector3");
var sector4_markers = document.getElementsByClassName("sector4");
var sector5_markers = document.getElementsByClassName("sector5");

var pufferTimer = 10;

function hideLyrs(layerTag) {

    if (layerTag === "agnesLayerTag") {
        if (agnesMarkers_visible) {
            agnesMarkers_visible = false;
            for (var i = 0; i < agnesMarkers.length; i++) {
                agnesMarkers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_agnesMarkers.length; i++) {
                nw_agnesMarkers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            agnesMarkers_visible = true;
            for (var i = 0; i < agnesMarkers.length; i++) {
                agnesMarkers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_agnesMarkers.length; i++) {
                nw_agnesMarkers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "lfp1LayerTag") {
        if (lfp1_visible) {
            lfp1_visible = false;
            for (var i = 0; i < lfp1Markers.length; i++) {
                lfp1Markers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_lfp1Markers.length; i++) {
                nw_lfp1Markers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            lfp1_visible = true;
            for (var i = 0; i < lfp1Markers.length; i++) {
                lfp1Markers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_lfp1Markers.length; i++) {
                nw_lfp1Markers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "lfp1_nextC_LayerTag") {
        if (lfp1_nxtC_visible) {
            lfp1_nxtC_visible = false;
            for (var i = 0; i < lfp1NextCMarkers.length; i++) {
                lfp1NextCMarkers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_lfp1NextCMarkers.length; i++) {
                nw_lfp1NextCMarkers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            lfp1_nxtC_visible = true;
            for (var i = 0; i < lfp1NextCMarkers.length; i++) {
                lfp1NextCMarkers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_lfp1NextCMarkers.length; i++) {
                nw_lfp1NextCMarkers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "lv95HauptLayerTag") {
        if (lv95_main_visible) {
            lv95_main_visible = false;
            for (var i = 0; i < lv95MainMarkers.length; i++) {
                lv95MainMarkers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_lv95MainMarkers.length; i++) {
                nw_lv95MainMarkers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            lv95_main_visible = true;
            for (var i = 0; i < lv95MainMarkers.length; i++) {
                lv95MainMarkers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_lv95MainMarkers.length; i++) {
                nw_lv95MainMarkers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "lv95VerdichtLayerTag") {
        if (lv95_dens_visible) {
            lv95_dens_visible = false;
            for (var i = 0; i < lv95DensMarkers.length; i++) {
                lv95DensMarkers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_lv95DensMarkers.length; i++) {
                nw_lv95DensMarkers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            lv95_dens_visible = true;
            for (var i = 0; i < lv95DensMarkers.length; i++) {
                lv95DensMarkers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_lv95DensMarkers.length; i++) {
                nw_lv95DensMarkers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "signaleLayerTag") {
        if (signale_visible) {
            signale_visible = false;
            for (var i = 0; i < signaleMarkers.length; i++) {
                signaleMarkers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_signaleMarkers.length; i++) {
                nw_signaleMarkers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            signale_visible = true;
            for (var i = 0; i < signaleMarkers.length; i++) {
                signaleMarkers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_signaleMarkers.length; i++) {
                nw_signaleMarkers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "trutmannLayerTag") {
        if (trutmann_visible) {
            trutmann_visible = false;
            for (var i = 0; i < trutmannMarkers.length; i++) {
                trutmannMarkers[i].style.visibility = "visible";
            }
            for (var i = 0; i < nw_trutmannMarkers.length; i++) {
                nw_trutmannMarkers[i].style.visibility = "visible";
            }
            setTimeout(function(){ 
                checkForSectionSelection();
            }, pufferTimer);
        } else {
            checkForSectionSelection();
            trutmann_visible = true;
            for (var i = 0; i < trutmannMarkers.length; i++) {
                trutmannMarkers[i].style.visibility = "hidden";
            }
            for (var i = 0; i < nw_trutmannMarkers.length; i++) {
                nw_trutmannMarkers[i].style.visibility = "hidden";
            }
        }
    } else if (layerTag === "sektor_CH") {
        for (var i = 0; i < sector2_markers.length; i++) {
            sector2_markers[i].style.visibility = "visible";
        }
        for (var i = 0; i < sector3_markers.length; i++) {
            sector3_markers[i].style.visibility = "visible";
        }
        for (var i = 0; i < sector4_markers.length; i++) {
            sector4_markers[i].style.visibility = "visible";
        }
        for (var i = 0; i < sector5_markers.length; i++) {
            sector5_markers[i].style.visibility = "visible";
        }
        for (var i = 0; i < sector1_markers.length; i++) {
            sector1_markers[i].style.visibility = "visible";
        }
        checkForViewSettingsAferSelection();
    } else if (layerTag === "sektor_one") {

        for (var i = 0; i < sector2_markers.length; i++) {
            sector2_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector3_markers.length; i++) {
            sector3_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector4_markers.length; i++) {
            sector4_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector5_markers.length; i++) {
            sector5_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector1_markers.length; i++) {
            sector1_markers[i].style.visibility = "visible";
        }
        checkForViewSettingsAferSelection();
    } else if (layerTag === "sektor_two") {

        for (var i = 0; i < sector1_markers.length; i++) {
            sector1_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector3_markers.length; i++) {
            sector3_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector4_markers.length; i++) {
            sector4_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector5_markers.length; i++) {
            sector5_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector2_markers.length; i++) {
            sector2_markers[i].style.visibility = "visible";
        }
        checkForViewSettingsAferSelection();
    } else if (layerTag === "sektor_three") {

        for (var i = 0; i < sector1_markers.length; i++) {
            sector1_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector2_markers.length; i++) {
            sector2_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector4_markers.length; i++) {
            sector4_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector5_markers.length; i++) {
            sector5_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector3_markers.length; i++) {
            sector3_markers[i].style.visibility = "visible";
        }
        checkForViewSettingsAferSelection();
    } else if (layerTag === "sektor_four") {

        for (var i = 0; i < sector1_markers.length; i++) {
            sector1_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector2_markers.length; i++) {
            sector2_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector3_markers.length; i++) {
            sector3_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector5_markers.length; i++) {
            sector5_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector4_markers.length; i++) {
            sector4_markers[i].style.visibility = "visible";
        }
        checkForViewSettingsAferSelection();
    } else if (layerTag === "sektor_five") {

        for (var i = 0; i < sector1_markers.length; i++) {
            sector1_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector2_markers.length; i++) {
            sector2_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector3_markers.length; i++) {
            sector3_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector4_markers.length; i++) {
            sector4_markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < sector5_markers.length; i++) {
            sector5_markers[i].style.visibility = "visible";
        }
        checkForViewSettingsAferSelection();
    } else {
        return 0;
    }
}

var setlegendEins;
var setlegendZwei;
var setlegendDrei;
var setlegendVier;
var setlegendFünf;
var setlegendSechs;
var setlegendSieben;
var setlegendAcht;

function checkForSectionSelection() {

    if (localStorage.getItem("selectedSector") == 1) {
        hideLyrs("sektor_one");
    } else if (localStorage.getItem("selectedSector") == 2) {
        hideLyrs("sektor_two");
    } else if (localStorage.getItem("selectedSector") == 3) {
        hideLyrs("sektor_three");
    } else if (localStorage.getItem("selectedSector") == 4) {
        hideLyrs("sektor_four");
    } else if (localStorage.getItem("selectedSector") == 5) {
        hideLyrs("sektor_five");
    } else {
        return 0;
    }
}

function checkForViewSettingsAferSelection() {
    
    setlegendEins = localStorage.getItem("lfp1LayerTag");
    setlegendZwei = localStorage.getItem("lfp1_nextC_LayerTag");
    setlegendDrei = localStorage.getItem("lv95HauptLayerTag");
    setlegendVier = localStorage.getItem("lv95VerdichtLayerTag");
    setlegendFünf = localStorage.getItem("agnesLayerTag");
    setlegendSechs = localStorage.getItem("signaleLayerTag");
    setlegendSieben = localStorage.getItem("trutmannLayerTag");

    console.log("HALLO");

    if (setlegendEins == 1) {
        for (var i = 0; i < lfp1Markers.length; i++) {
            lfp1Markers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_lfp1Markers.length; i++) {
            nw_lfp1Markers[i].style.visibility = "hidden";
        }
    }

    if (setlegendZwei == 1) {
        for (var i = 0; i < lfp1NextCMarkers.length; i++) {
            lfp1NextCMarkers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_lfp1NextCMarkers.length; i++) {
            nw_lfp1NextCMarkers[i].style.visibility = "hidden";
        }
    }

    if (setlegendDrei == 1) {
        for (var i = 0; i < lv95MainMarkers.length; i++) {
            lv95MainMarkers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_lv95MainMarkers.length; i++) {
            nw_lv95MainMarkers[i].style.visibility = "hidden";
        }
    }

    if (setlegendVier == 1) {
        for (var i = 0; i < lv95DensMarkers.length; i++) {
            lv95DensMarkers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_lv95DensMarkers.length; i++) {
            nw_lv95DensMarkers[i].style.visibility = "hidden";
        }
    } 

    if (setlegendFünf == 1) {
        for (var i = 0; i < agnesMarkers.length; i++) {
            agnesMarkers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_agnesMarkers.length; i++) {
            nw_agnesMarkers[i].style.visibility = "hidden";
        }
    }

    if (setlegendSechs == 1) {
        for (var i = 0; i < signaleMarkers.length; i++) {
            signaleMarkers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_signaleMarkers.length; i++) {
            nw_signaleMarkers[i].style.visibility = "hidden";
        }
    }

    if (setlegendSieben == 1) {
        for (var i = 0; i < trutmannMarkers.length; i++) {
            trutmannMarkers[i].style.visibility = "hidden";
        }
        for (var i = 0; i < nw_trutmannMarkers.length; i++) {
            nw_trutmannMarkers[i].style.visibility = "hidden";
        }
    }
}

function checkForViewSettings() {

    setlegendEins = localStorage.getItem("lfp1LayerTag");
    setlegendZwei = localStorage.getItem("lfp1_nextC_LayerTag");
    setlegendDrei = localStorage.getItem("lv95HauptLayerTag");
    setlegendVier = localStorage.getItem("lv95VerdichtLayerTag");
    setlegendFünf = localStorage.getItem("agnesLayerTag");
    setlegendSechs = localStorage.getItem("signaleLayerTag");
    setlegendSieben = localStorage.getItem("trutmannLayerTag");

    if (setlegendEins == 1) {
        document.getElementById("lfp1LayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_one").checked = true;
        hideLyrs("lfp1LayerTag");
    }
    if (setlegendZwei == 1) {
        document.getElementById("lfp1_nextC_LayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_two").checked = true;
        hideLyrs("lfp1_nextC_LayerTag");
    }
    if (setlegendDrei == 1) {
        document.getElementById("lv95HauptLayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_three").checked = true;
        hideLyrs("lv95HauptLayerTag");
    }
    if (setlegendVier == 1) {
        document.getElementById("lv95VerdichtLayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_four").checked = true;
        hideLyrs("lv95VerdichtLayerTag");
    }
    if (setlegendFünf == 1) {
        document.getElementById("agnesLayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_five").checked = true;
        hideLyrs("agnesLayerTag");
    }
    if (setlegendSechs == 1) {
        document.getElementById("signaleLayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_six").checked = true;
        hideLyrs("signaleLayerTag");
    }
    if (setlegendSieben == 1) {
        document.getElementById("trutmannLayerTag").style.color = "#c7c7c7";
        document.getElementById("checkbox_seven").checked = true;
        hideLyrs("trutmannLayerTag");
    }
}

function hideOnlyOnRoadPoints(hide) {

    var hideValue;

    if(hide) {
        hideValue = "hidden";
    } else {
        hideValue = "visible";
    }

    for (var i = 0; i < agnesMarkers.length; i++) {
        agnesMarkers[i].style.visibility = hideValue;
    }
    for (var i = 0; i < lfp1Markers.length; i++) {
        lfp1Markers[i].style.visibility = hideValue;
    }
    for (var i = 0; i < lfp1NextCMarkers.length; i++) {
        lfp1NextCMarkers[i].style.visibility = hideValue;
    }
    for (var i = 0; i < lv95MainMarkers.length; i++) {
        lv95MainMarkers[i].style.visibility = hideValue;
    }
    for (var i = 0; i < lv95DensMarkers.length; i++) {
        lv95DensMarkers[i].style.visibility = hideValue;
    }
    for (var i = 0; i < signaleMarkers.length; i++) {
        signaleMarkers[i].style.visibility = hideValue;
    }
}

/* Sprachänderung des Karteninhaltes */

var fLang  = (l) => "name:" + l;
var fCurly = (l) => "{" + fLang(l) + "}";
var fGet   = (l) => ["get", fLang(l)];
var fPeaks = (l) => ["format", fGet(l), {}, "\n", {}, ["get", "ele"], {"font-scale": 0.75}];

var dFunc = {'curly': fCurly, 'get': fGet, 'peaks': fPeaks};

function changeMapLanguage(language) {

    var dTexts =  
    {
        'curly': [
            'road_label',
            'park_label',
            'place_country',
            'omt_place_country',
            'place_state',
            'omt_place_state',
            'water_name_point_label',
            'water_name_line_label'
        ],
        'get': [
            'aerodrome_label',
            'place_city',
            'omt_place_city',
            'place_town',
            'omt_place_town',
            'place_village',
            'omt_place_village',
            'place_hamvar_isolated_dwelling',
            'omt_place_hamvar_isolated_dwelling',
            'place_other',
            'omt_place_other',
            'poi_rank1',
            'poi_rank2',
            'poi_rank3',
            'waterway_line_label'
        ],
        'peaks': [
            'peaks_rank1',
            'peaks_rank2',
            'peaks_rank3+',
            'peaks_other'
        ]
    };

    for (sFunc in dTexts)
    {
        var lTexts = dTexts[sFunc];
        var fFunc  = dFunc[sFunc];
        for (var sText of lTexts)
        {
        map.setLayoutProperty(
            sText, 
            'text-field',
            fFunc(language));
        }
    }
}

function resizeMap() {
    map.resize();
}