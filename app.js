(function () {
  "use strict";
  var total = 0;
  var needed = 0;
  var hasNeeded = false;

  function byId(id) { return document.getElementById(id); }
  function text(id, value) { byId(id).textContent = String(value); }
  function germanStatus(status) {
    var known = {
      "Starting Lua...": "Lua wird gestartet …",
      "Sending client info...": "Spielerdaten werden übermittelt …",
      "Retrieving server info...": "Serverdaten werden abgerufen …",
      "Workshop Complete": "Workshop-Download abgeschlossen"
    };
    return known[status] || status;
  }
  function updateProgress() {
    var percent = total > 0 && hasNeeded ? Math.round((total - needed) * 100 / total) : 0;
    percent = Math.max(0, Math.min(100, percent));
    byId("progress-fill").style.width = percent + "%";
    byId("progress").setAttribute("aria-valuenow", percent);
    text("percent", percent + " %");
    text("file-count", total > 0 ? Math.max(0, needed) + " / " + total + " Dateien verbleiben" : "");
  }

  var query = window.location.search || "";
  var match = /(?:\?|&)map=([^&]*)/i.exec(query);
  if (match) {
    try { text("map", decodeURIComponent(match[1].replace(/\+/g, " "))); } catch (e) { /* Keep fallback. */ }
  }

  window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamId, gameMode) {
    if (serverName) { text("server", serverName); }
    if (mapName) { text("map", mapName); }
    if (gameMode) { text("gamemode", gameMode === "starwarsrp" ? "Star Wars Roleplay" : gameMode); }
  };
  window.SetFilesTotal = function (value) { total = Math.max(0, Number(value) || 0); updateProgress(); };
  window.SetFilesNeeded = function (value) { needed = Math.max(0, Number(value) || 0); hasNeeded = true; updateProgress(); };
  window.DownloadingFile = function () { text("status", "Spieldateien werden geladen …"); };
  window.SetStatusChanged = function (status) { if (status) { text("status", germanStatus(status)); } };
  updateProgress();
}());

