# ADIM Ladebildschirm

Eigenständige, statische Ladeseite für Garry's Mod und GitHub Pages. Die Dateien und Bilder aus der gekauften ZIP werden nicht veröffentlicht; deren Lizenz untersagt die Veröffentlichung des Quellcodes.

## Veröffentlichung

Diese drei Dateien (`index.html`, `style.css`, `app.js`) in das gewählte GitHub-Repository legen und GitHub Pages für den Branch-Root aktivieren. `.nojekyll` ist ebenfalls enthalten.

Danach die **tatsächlich erreichbare** Pages-URL in `sv_loadingurl` eintragen, beispielsweise:

```cfg
sv_loadingurl "https://BENUTZER.github.io/adim-loading-screen/?map=%m"
```

Die Seite nutzt die Garry's Mod-JavaScript-Ereignisse für Servername, Karte, Spielmodus, Downloadfortschritt und Status. Außerhalb des Spiels zeigt sie Platzhalter. Es werden keine Steam-IDs an weitere Dienste gesendet.

