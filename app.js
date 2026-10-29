(function () {
  "use strict";
  var photos = [
    ["01.jpg", "104TH", "104th im Stützpunkt"], ["02.jpg", "501ST", "501st Legion"],
    ["03.jpg", "AVP", "AVP Hangar"], ["04.jpg", "AVP", "Flugzeuge im Hangar"],
    ["05.jpg", "EINSATZ", "Kampftraining"], ["06.jpg", "MEDBAY", "Medizinischer Bereich"],
    ["07.jpg", "NAVY", "Navy Brücke"], ["08.jpg", "NAVY", "Navy Kontrollraum"],
    ["09.jpg", "PURGE", "Purge Trooper"], ["10.jpg", "SENAT", "Galaktischer Senat"],
    ["11.jpg", "ST", "Stoßtruppen Kontrollraum"], ["12.jpg", "ST", "Stoßtruppen Einsatz"],
    ["13.jpg", "VADER", "Darth Vader vor den Flammen"]
  ];
  var order = photos.map(function (_, i) { return i; });
  var scene = 0, total = 0, needed = 0, hasNeeded = false;
  function el(id) { return document.getElementById(id); }
  function set(id, value) { el(id).textContent = String(value); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } }
  function preload(indices) { indices.forEach(function (n) { var img = new Image(); img.src = "assets/" + photos[n][0]; }); }
  function renderScene() {
    var gallery = el("gallery");
    gallery.className = "gallery changing layout-" + "abcd".charAt(scene % 4);
    window.setTimeout(function () {
      var start = (scene % 2) * 7, indices = [];
      for (var i = 0; i < 7; i++) { indices.push(order[(start + i) % order.length]); }
      var tiles = gallery.getElementsByTagName("figure");
      indices.forEach(function (n, i) {
        var p = photos[n], tile = tiles[i], image = tile.getElementsByTagName("img")[0], caption = tile.getElementsByTagName("figcaption")[0];
        image.src = "assets/" + p[0]; image.alt = p[2];
        caption.firstChild.textContent = p[1] + " ";
        caption.getElementsByTagName("small")[0].textContent = (n < 9 ? "0" : "") + (n + 1);
      });
      set("gallery-index", start === 0 ? "01–07 / 13" : "08–13 / 13");
      gallery.className = "gallery layout-" + "abcd".charAt(scene % 4);
      var dots = el("gallery-dots").getElementsByTagName("i");
      for (var k = 0; k < dots.length; k++) { dots[k].className = k === scene % 4 ? "on" : ""; }
      preload(order.slice(((scene + 1) % 2) * 7, ((scene + 1) % 2) * 7 + 7));
    }, 350);
  }
  function updateProgress() {
    if (!total || !hasNeeded) { set("percent", "LÄDT"); return; }
    var pct = Math.max(0, Math.min(100, Math.round((total - needed) * 100 / total)));
    el("progress-fill").style.width = pct + "%";
    el("progress").setAttribute("aria-valuenow", pct);
    set("percent", pct + " %");
    set("file-count", Math.max(0, needed) + " VON " + total + " DATEIEN VERBLEIBEN");
  }
  var statusNames = {"Starting Lua...":"Lua wird gestartet …","Sending client info...":"Spielerdaten werden übermittelt …","Retrieving server info...":"Serverdaten werden abgerufen …","Workshop Complete":"Workshop-Download abgeschlossen"};
  var match = /(?:\?|&)map=([^&]*)/i.exec(location.search || "");
  if (match) { try { set("map", decodeURIComponent(match[1].replace(/\+/g, " "))); } catch (e) {} }
  window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamId, gameMode) {
    if (serverName) { set("server", serverName); } if (mapName) { set("map", mapName); }
    if (gameMode) { set("gamemode", gameMode === "starwarsrp" ? "Star Wars Roleplay" : gameMode); }
  };
  window.SetFilesTotal = function (value) { total = Math.max(0, Number(value) || 0); updateProgress(); };
  window.SetFilesNeeded = function (value) { needed = Math.max(0, Number(value) || 0); hasNeeded = true; updateProgress(); };
  window.DownloadingFile = function () { set("status", "Spieldateien werden geladen …"); };
  window.SetStatusChanged = function (status) { if (status) { set("status", statusNames[status] || status); } };
  var dots = el("gallery-dots");
  for (var d = 0; d < 4; d++) { var dot = document.createElement("i"); dot.className = d === 0 ? "on" : ""; dots.appendChild(dot); }
  shuffle(order); renderScene();
  window.setInterval(function () { scene++; if (scene % 4 === 0) { shuffle(order); } renderScene(); }, 6500);
  updateProgress();
}());
