(function () {
  "use strict";

  var photos = [
    ["01.jpg", "104TH", "104th im Stützpunkt"],
    ["02.jpg", "501ST", "501st Legion"],
    ["03.jpg", "AVP", "AVP Hangar"],
    ["04.jpg", "AVP", "Flugzeuge im Hangar"],
    ["05.jpg", "EINSATZ", "Kampftraining"],
    ["06.jpg", "MEDBAY", "Medizinischer Bereich"],
    ["07.jpg", "NAVY", "Navy Brücke"],
    ["08.jpg", "NAVY", "Navy Kontrollraum"],
    ["09.jpg", "PURGE", "Purge Trooper"],
    ["10.jpg", "SENAT", "Galaktischer Senat"],
    ["11.jpg", "ST", "Stoßtruppen Kontrollraum"],
    ["12.jpg", "ST", "Stoßtruppen Einsatz"],
    ["13.jpg", "VADER", "Darth Vader vor den Flammen"]
  ];
  var order = photos.map(function (_, i) { return i; });
  var position = 0;
  var total = 0, needed = 0, hasNeeded = false;

  function el(id) { return document.getElementById(id); }
  function set(id, value) { el(id).textContent = String(value); }
  function shuffle(a, previous) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), item = a[i];
      a[i] = a[j]; a[j] = item;
    }
    if (a[0] === previous) { var first = a[0]; a[0] = a[1]; a[1] = first; }
  }
  function setDots() {
    var dots = el("gallery-dots").getElementsByTagName("i");
    for (var i = 0; i < dots.length; i++) { dots[i].className = i === position ? "on" : ""; }
  }
  function preloadNext() {
    var image = new Image();
    image.src = "assets/" + photos[order[(position + 1) % photos.length]][0];
  }
  function renderSlide(animate) {
    var item = photos[order[position]], gallery = el("gallery"), image = el("slide-image");
    var next = new Image();
    if (animate) { gallery.className = "gallery changing"; }
    next.onload = function () {
      image.src = next.src;
      image.alt = item[2];
      set("slide-label", item[1]);
      set("slide-number", (order[position] < 9 ? "0" : "") + (order[position] + 1));
      set("gallery-index", (position < 9 ? "0" : "") + (position + 1) + " / 13");
      setDots();
      gallery.className = "gallery";
      preloadNext();
    };
    next.onerror = function () { gallery.className = "gallery"; };
    next.src = "assets/" + item[0];
  }
  function advanceSlide() {
    var previous = order[position];
    position++;
    if (position === photos.length) {
      position = 0;
      shuffle(order, previous);
    }
    renderSlide(true);
  }
  function updateProgress() {
    if (!total || !hasNeeded) { set("percent", "LÄDT"); return; }
    var pct = Math.max(0, Math.min(100, Math.round((total - needed) * 100 / total)));
    el("progress-fill").style.width = pct + "%";
    el("progress").setAttribute("aria-valuenow", pct);
    set("percent", pct + " %");
    set("file-count", Math.max(0, needed) + " VON " + total + " DATEIEN VERBLEIBEN");
  }

  var statusNames = {
    "Starting Lua...": "Lua wird gestartet …",
    "Sending client info...": "Spielerdaten werden übermittelt …",
    "Retrieving server info...": "Serverdaten werden abgerufen …",
    "Workshop Complete": "Workshop-Download abgeschlossen"
  };
  var match = /(?:\?|&)map=([^&]*)/i.exec(location.search || "");
  if (match) { try { set("map", decodeURIComponent(match[1].replace(/\+/g, " "))); } catch (e) {} }
  window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamId, gameMode) {
    if (serverName) { set("server", serverName); }
    if (mapName) { set("map", mapName); }
    if (gameMode) { set("gamemode", gameMode === "starwarsrp" ? "Star Wars Roleplay" : gameMode); }
  };
  window.SetFilesTotal = function (value) { total = Math.max(0, Number(value) || 0); updateProgress(); };
  window.SetFilesNeeded = function (value) { needed = Math.max(0, Number(value) || 0); hasNeeded = true; updateProgress(); };
  window.DownloadingFile = function () { set("status", "Spieldateien werden geladen …"); };
  window.SetStatusChanged = function (status) { if (status) { set("status", statusNames[status] || status); } };

  var dots = el("gallery-dots");
  for (var d = 0; d < photos.length; d++) { dots.appendChild(document.createElement("i")); }
  shuffle(order, -1);
  renderSlide(false);
  window.setInterval(advanceSlide, 4500);
  updateProgress();
}());
