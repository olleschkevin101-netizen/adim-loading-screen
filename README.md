# ADIM Ladebildschirm

Eigenständige, statische Ladeseite für Garry's Mod. Die 13 optimierten Serverfotos liegen in `assets/`. Es wird immer genau ein Foto angezeigt. Nach 4,5 Sekunden folgt das nächste; alle 13 erscheinen einmal, bevor die Reihenfolge erneut gemischt wird.

GitHub Pages veröffentlicht den Branch `main` aus dem Root dieses Repositorys unter `https://olleschkevin101-netizen.github.io/adim-loading-screen/`. Der Hauptserver nutzt:

```cfg
sv_loadingurl "https://olleschkevin101-netizen.github.io/adim-loading-screen/?map=%m"
```

Die Seite nutzt Garry's Mods JavaScript-Ereignisse für Servername, Karte, Spielmodus, Downloadfortschritt und Status. Außerhalb des Spiels zeigt sie Platzhalter. Es werden keine Steam-IDs an weitere Dienste gesendet. Das zuvor gekaufte PHP-Template ist nicht Teil dieser Seite.

