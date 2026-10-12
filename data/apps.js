/* Données du catalogue APS Windows.
   Fichier modifié par le back office (admin/index.html) : évitez de le modifier à la main. */
window.APS_DATA = {
  "categories": {
    "archive": "Archives et disques",
    "web": "Internet",
    "media": "Vidéo et musique",
    "office": "Bureautique et PDF",
    "system": "Outils système",
    "security": "Sécurité",
    "chat": "Communication",
    "creation": "Création"
  },
  "hero": [
    "7zip",
    "firefox",
    "libreoffice",
    "vlc",
    "bitwarden",
    "obs"
  ],
  "apps": [
    {
      "id": "winrar",
      "abbr": "Wr",
      "name": "WinRAR",
      "cat": "archive",
      "role": "Compresser et ouvrir des archives",
      "desc": "WinRAR réduit la taille de vos fichiers et ouvre les archives que vous recevez. Il gère les formats RAR, ZIP, 7Z, TAR et bien d'autres.",
      "features": [
        [
          "Compression",
          "rassemblez des dossiers dans une seule archive plus légère"
        ],
        [
          "Archives auto-extractibles",
          "le destinataire n'a pas besoin de WinRAR pour les ouvrir"
        ],
        [
          "Découpage",
          "divisez une grosse archive en plusieurs parties"
        ],
        [
          "Mot de passe",
          "protégez le contenu d'une archive"
        ],
        [
          "Réparation",
          "récupérez les fichiers d'une archive endommagée"
        ]
      ],
      "licence": "Payant, avec une période d'essai gratuite de 40 jours.",
      "url": "https://www.win-rar.com/download.html"
    },
    {
      "id": "poweriso",
      "abbr": "Pi",
      "name": "PowerISO",
      "cat": "archive",
      "role": "Créer, monter et graver des images disque",
      "desc": "PowerISO travaille avec les images disque (ISO, BIN, DAA…). Il les ouvre, les modifie, les monte comme un vrai lecteur et les grave.",
      "features": [
        [
          "Création",
          "faites une image ISO à partir d'un CD, d'un DVD ou d'un dossier"
        ],
        [
          "Lecteur virtuel",
          "ouvrez une image sans la graver"
        ],
        [
          "Gravure",
          "CD, DVD et Blu-ray, y compris des disques de démarrage"
        ],
        [
          "Conversion",
          "passez d'un format d'image à un autre"
        ]
      ],
      "licence": "Version gratuite limitée aux images de 300 Mo. Licence payante pour lever la limite.",
      "url": "https://www.poweriso.com/download.php"
    },
    {
      "id": "office",
      "abbr": "Of",
      "name": "Microsoft 365",
      "cat": "office",
      "role": "Word, Excel, PowerPoint et Outlook",
      "desc": "La suite bureautique de Microsoft pour écrire des documents, faire des tableaux de calcul, préparer des présentations et gérer vos e-mails.",
      "features": [
        [
          "Word",
          "rédaction et mise en page de documents"
        ],
        [
          "Excel",
          "tableaux, formules et graphiques"
        ],
        [
          "PowerPoint",
          "présentations et diaporamas"
        ],
        [
          "OneDrive",
          "vos fichiers sauvegardés en ligne"
        ]
      ],
      "licence": "Abonnement payant. Une version web gratuite existe sur office.com. Alternative gratuite : LibreOffice.",
      "url": "https://www.microsoft.com/fr-fr/microsoft-365"
    },
    {
      "id": "acrobat",
      "abbr": "Ar",
      "name": "Adobe Acrobat Reader",
      "cat": "office",
      "role": "Lire, annoter et signer des PDF",
      "desc": "Le lecteur PDF de référence. Il affiche fidèlement tous les PDF et permet de remplir des formulaires, d'ajouter des commentaires et de signer.",
      "features": [
        [
          "Lecture",
          "affichage fidèle, recherche dans le texte"
        ],
        [
          "Formulaires",
          "remplissez et enregistrez les PDF interactifs"
        ],
        [
          "Annotations",
          "surlignez, commentez, dessinez"
        ],
        [
          "Signature",
          "signez un document sans l'imprimer"
        ]
      ],
      "licence": "Gratuit. Pendant l'installation, décochez les logiciels proposés en plus.",
      "url": "https://get.adobe.com/fr/reader/"
    },
    {
      "id": "chrome",
      "abbr": "Gc",
      "name": "Google Chrome",
      "cat": "web",
      "role": "Navigateur web rapide",
      "desc": "Le navigateur de Google. Rapide, compatible avec presque tous les sites, il synchronise vos favoris et mots de passe avec votre compte Google.",
      "features": [
        [
          "Synchronisation",
          "favoris, historique et onglets sur tous vos appareils"
        ],
        [
          "Extensions",
          "un large catalogue pour ajouter des fonctions"
        ],
        [
          "Traduction",
          "traduit une page entière en un clic"
        ],
        [
          "Sécurité",
          "alerte sur les sites et téléchargements dangereux"
        ]
      ],
      "licence": "Gratuit.",
      "url": "https://www.google.com/intl/fr/chrome/"
    },
    {
      "id": "firefox",
      "abbr": "Ff",
      "name": "Firefox",
      "cat": "web",
      "oss": true,
      "role": "Navigateur libre et respectueux de la vie privée",
      "desc": "Le navigateur de la fondation Mozilla. Open source, il bloque par défaut une grande partie des traqueurs publicitaires.",
      "features": [
        [
          "Anti-pistage",
          "bloque les traqueurs et les cookies tiers"
        ],
        [
          "Conteneurs",
          "séparez vos comptes dans des onglets isolés"
        ],
        [
          "Extensions",
          "dont des bloqueurs de publicité efficaces"
        ],
        [
          "Synchronisation",
          "avec un compte Mozilla"
        ]
      ],
      "licence": "Gratuit et open source.",
      "url": "https://www.mozilla.org/fr/firefox/new/"
    },
    {
      "id": "vlc",
      "abbr": "Vl",
      "name": "VLC media player",
      "cat": "media",
      "oss": true,
      "role": "Lit toutes les vidéos et musiques",
      "desc": "Le lecteur qui ouvre presque tout : MP4, MKV, AVI, DVD, flux en ligne. Aucun codec supplémentaire à installer.",
      "features": [
        [
          "Tous les formats",
          "vidéo, audio, DVD, flux réseau"
        ],
        [
          "Sous-titres",
          "chargement et synchronisation manuelle"
        ],
        [
          "Conversion",
          "convertissez un fichier vers un autre format"
        ],
        [
          "Léger",
          "fonctionne bien sur les anciens PC"
        ]
      ],
      "licence": "Gratuit et open source, sans publicité.",
      "url": "https://www.videolan.org/vlc/index.fr.html"
    },
    {
      "id": "potplayer",
      "abbr": "Pp",
      "name": "PotPlayer",
      "cat": "media",
      "role": "Lecteur vidéo très personnalisable",
      "desc": "Un lecteur vidéo fluide, très réglable, apprécié pour la lecture en haute définition et la gestion fine des sous-titres.",
      "features": [
        [
          "Accélération matérielle",
          "lecture fluide en 4K"
        ],
        [
          "Sous-titres",
          "styles, positions et délais réglables"
        ],
        [
          "Captures",
          "images et extraits de la vidéo en cours"
        ],
        [
          "Raccourcis",
          "presque tout se règle au clavier"
        ]
      ],
      "licence": "Gratuit.",
      "url": "https://potplayer.daum.net/"
    },
    {
      "id": "idm",
      "abbr": "Id",
      "name": "Internet Download Manager",
      "cat": "system",
      "role": "Accélère et reprend les téléchargements",
      "desc": "IDM découpe chaque téléchargement en plusieurs parties pour aller plus vite, et reprend là où il s'était arrêté après une coupure.",
      "features": [
        [
          "Accélération",
          "téléchargement en plusieurs segments"
        ],
        [
          "Reprise",
          "continue après une coupure de connexion"
        ],
        [
          "Intégration",
          "fonctionne avec Chrome, Firefox et Edge"
        ],
        [
          "Planification",
          "lancez vos téléchargements la nuit"
        ]
      ],
      "licence": "Payant, avec une période d'essai gratuite de 30 jours.",
      "url": "https://www.internetdownloadmanager.com/download.html"
    },
    {
      "id": "sdio",
      "abbr": "Sd",
      "name": "Snappy Driver Installer Origin",
      "cat": "system",
      "oss": true,
      "role": "Installe et met à jour les pilotes",
      "desc": "Après une réinstallation de Windows, il détecte le matériel de votre PC et installe les pilotes manquants, même sans connexion Internet.",
      "features": [
        [
          "Détection",
          "repère les pilotes manquants ou anciens"
        ],
        [
          "Hors ligne",
          "les packs de pilotes peuvent être téléchargés à l'avance"
        ],
        [
          "Point de restauration",
          "créé avant chaque installation"
        ],
        [
          "Portable",
          "fonctionne depuis une clé USB, sans installation"
        ]
      ],
      "licence": "Gratuit et open source.",
      "url": "https://www.sdi-tool.org/"
    },
    {
      "id": "7zip",
      "abbr": "7z",
      "name": "7-Zip",
      "cat": "archive",
      "oss": true,
      "role": "Compression gratuite, l'alternative à WinRAR",
      "desc": "7-Zip compresse vos fichiers avec l'un des meilleurs taux du marché et ouvre presque toutes les archives : 7Z, ZIP, RAR, ISO, TAR et bien d'autres.",
      "features": [
        [
          "Format 7z",
          "des archives souvent plus petites qu'en ZIP ou RAR"
        ],
        [
          "Ouverture universelle",
          "plus d'une trentaine de formats pris en charge"
        ],
        [
          "Chiffrement AES-256",
          "protégez une archive par mot de passe"
        ],
        [
          "Clic droit",
          "compressez et extrayez depuis l'Explorateur Windows"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU LGPL), même pour un usage professionnel.",
      "url": "https://www.7-zip.org/"
    },
    {
      "id": "rufus",
      "abbr": "Ru",
      "name": "Rufus",
      "cat": "archive",
      "oss": true,
      "role": "Créer une clé USB d'installation de Windows",
      "desc": "Rufus transforme une clé USB en support d'installation à partir d'un fichier ISO de Windows ou de Linux. Indispensable pour réinstaller un PC.",
      "features": [
        [
          "Clé de démarrage",
          "Windows, Linux et outils de dépannage"
        ],
        [
          "Options Windows 11",
          "peut retirer certaines exigences matérielles à l'installation"
        ],
        [
          "Rapide",
          "parmi les outils les plus rapides pour préparer une clé"
        ],
        [
          "Portable",
          "un seul fichier, aucune installation"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://rufus.ie/fr/"
    },
    {
      "id": "ventoy",
      "abbr": "Ve",
      "name": "Ventoy",
      "cat": "archive",
      "oss": true,
      "role": "Plusieurs systèmes sur une seule clé USB",
      "desc": "Préparez votre clé USB une seule fois, puis copiez-y autant de fichiers ISO que vous voulez. Au démarrage, un menu vous laisse choisir lequel lancer.",
      "features": [
        [
          "Multi-ISO",
          "Windows, Linux et outils de secours sur la même clé"
        ],
        [
          "Simple copier-coller",
          "ajoutez ou retirez un ISO comme un fichier ordinaire"
        ],
        [
          "Clé toujours utilisable",
          "l'espace libre reste disponible pour vos fichiers"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://www.ventoy.net/"
    },
    {
      "id": "brave",
      "abbr": "Br",
      "name": "Brave",
      "cat": "web",
      "oss": true,
      "role": "Navigateur qui bloque les publicités",
      "desc": "Brave repose sur la même base que Chrome, mais bloque d'origine les publicités et les traqueurs. Les pages se chargent plus vite et consomment moins de données.",
      "features": [
        [
          "Bloqueur intégré",
          "publicités et traqueurs bloqués sans extension"
        ],
        [
          "Extensions Chrome",
          "compatible avec le Chrome Web Store"
        ],
        [
          "Navigation privée avec Tor",
          "pour masquer votre adresse IP"
        ],
        [
          "Synchronisation",
          "favoris et réglages sur tous vos appareils"
        ]
      ],
      "licence": "Gratuit et open source (licence MPL 2.0).",
      "url": "https://brave.com/fr/download/"
    },
    {
      "id": "qbittorrent",
      "abbr": "Qb",
      "name": "qBittorrent",
      "cat": "web",
      "oss": true,
      "role": "Client torrent sans publicité",
      "desc": "qBittorrent télécharge des fichiers via le protocole BitTorrent, par exemple les images ISO de Linux. Il est léger et n'affiche aucune publicité.",
      "features": [
        [
          "Sans publicité",
          "contrairement à de nombreux clients torrent"
        ],
        [
          "Moteur de recherche intégré",
          "cherchez directement depuis le logiciel"
        ],
        [
          "Téléchargement séquentiel",
          "pour prévisualiser une vidéo pendant le téléchargement"
        ],
        [
          "Flux RSS",
          "téléchargez automatiquement les nouveautés"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL). Ne téléchargez que des contenus légaux.",
      "url": "https://www.qbittorrent.org/download"
    },
    {
      "id": "audacity",
      "abbr": "Au",
      "name": "Audacity",
      "cat": "media",
      "oss": true,
      "role": "Enregistrer et modifier de l'audio",
      "desc": "Audacity enregistre votre voix ou un instrument et permet de couper, assembler et nettoyer des fichiers audio. Idéal pour un podcast ou une note vocale.",
      "features": [
        [
          "Enregistrement",
          "depuis un micro ou le son de l'ordinateur"
        ],
        [
          "Montage",
          "coupez, copiez, assemblez plusieurs pistes"
        ],
        [
          "Réduction de bruit",
          "supprimez le souffle et les bruits de fond"
        ],
        [
          "Export",
          "MP3, WAV, FLAC, OGG"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://www.audacityteam.org/download/"
    },
    {
      "id": "handbrake",
      "abbr": "Hb",
      "name": "HandBrake",
      "cat": "media",
      "oss": true,
      "role": "Convertir et compresser des vidéos",
      "desc": "HandBrake convertit une vidéo vers un format lisible partout et réduit fortement son poids sans perte visible de qualité.",
      "features": [
        [
          "Préréglages",
          "pour téléphone, tablette, web ou TV en un clic"
        ],
        [
          "Compression",
          "divisez la taille d'une vidéo pour l'envoyer ou l'archiver"
        ],
        [
          "Sous-titres",
          "ajoutez ou incrustez des sous-titres"
        ],
        [
          "Traitement par lots",
          "convertissez plusieurs vidéos à la suite"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://handbrake.fr/"
    },
    {
      "id": "libreoffice",
      "abbr": "Lo",
      "name": "LibreOffice",
      "cat": "office",
      "oss": true,
      "role": "Suite bureautique, l'alternative à Office",
      "desc": "LibreOffice réunit traitement de texte, tableur et présentations. Il ouvre et enregistre les fichiers Word, Excel et PowerPoint.",
      "features": [
        [
          "Writer",
          "traitement de texte, compatible .docx"
        ],
        [
          "Calc",
          "tableur, compatible .xlsx"
        ],
        [
          "Impress",
          "présentations, compatible .pptx"
        ],
        [
          "Export PDF",
          "intégré à tous les modules"
        ]
      ],
      "licence": "Gratuit et open source (licence MPL 2.0), sans abonnement.",
      "url": "https://fr.libreoffice.org/download/telecharger-libreoffice/"
    },
    {
      "id": "notepadpp",
      "abbr": "Np",
      "name": "Notepad++",
      "cat": "office",
      "oss": true,
      "role": "Éditeur de texte et de code",
      "desc": "Un bloc-notes bien plus puissant que celui de Windows : onglets, coloration du code, recherche avancée. Très léger et rapide.",
      "features": [
        [
          "Coloration syntaxique",
          "pour plus de 80 langages (HTML, CSS, JS, Python…)"
        ],
        [
          "Onglets",
          "ouvrez plusieurs fichiers dans une seule fenêtre"
        ],
        [
          "Recherche avancée",
          "dans plusieurs fichiers, avec expressions régulières"
        ],
        [
          "Extensions",
          "ajoutez des fonctions selon vos besoins"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://notepad-plus-plus.org/downloads/"
    },
    {
      "id": "sumatrapdf",
      "abbr": "Su",
      "name": "SumatraPDF",
      "cat": "office",
      "oss": true,
      "role": "Lecteur PDF ultra léger",
      "desc": "SumatraPDF ouvre les PDF instantanément, même sur un vieux PC. Il lit aussi les livres numériques et les bandes dessinées.",
      "features": [
        [
          "Très rapide",
          "démarre en une fraction de seconde"
        ],
        [
          "Multi-formats",
          "PDF, EPUB, MOBI, XPS, CBZ et CBR"
        ],
        [
          "Version portable",
          "utilisable depuis une clé USB"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL). Lecture seule : il ne modifie pas les PDF.",
      "url": "https://www.sumatrapdfreader.org/download-free-pdf-viewer"
    },
    {
      "id": "crystaldiskinfo",
      "abbr": "Cd",
      "name": "CrystalDiskInfo",
      "cat": "system",
      "oss": true,
      "role": "Vérifier la santé de vos disques",
      "desc": "CrystalDiskInfo lit les indicateurs internes de vos disques durs et SSD pour vous prévenir avant une panne et une perte de données.",
      "features": [
        [
          "État de santé",
          "Bon, Prudence ou Mauvais, en un coup d'œil"
        ],
        [
          "Température",
          "surveillance en continu"
        ],
        [
          "Alertes",
          "notification en cas de problème détecté"
        ]
      ],
      "licence": "Gratuit et open source (licence MIT).",
      "url": "https://crystalmark.info/en/software/crystaldiskinfo/"
    },
    {
      "id": "powertoys",
      "abbr": "Pt",
      "name": "PowerToys",
      "cat": "system",
      "oss": true,
      "role": "Outils Microsoft pour améliorer Windows",
      "desc": "Une collection d'utilitaires officiels de Microsoft qui ajoutent à Windows des fonctions pratiques pour travailler plus vite.",
      "features": [
        [
          "FancyZones",
          "organisez vos fenêtres en zones"
        ],
        [
          "PowerRename",
          "renommez des dizaines de fichiers d'un coup"
        ],
        [
          "Extracteur de texte",
          "copiez le texte d'une image ou de l'écran"
        ],
        [
          "Toujours au premier plan",
          "épinglez une fenêtre au-dessus des autres"
        ]
      ],
      "licence": "Gratuit et open source (licence MIT), édité par Microsoft.",
      "url": "https://learn.microsoft.com/fr-fr/windows/powertoys/install"
    },
    {
      "id": "sharex",
      "abbr": "Sx",
      "name": "ShareX",
      "cat": "system",
      "oss": true,
      "role": "Captures et enregistrements d'écran",
      "desc": "ShareX capture une zone, une fenêtre ou une page entière, enregistre l'écran en vidéo ou en GIF et permet d'annoter le résultat.",
      "features": [
        [
          "Captures",
          "zone, fenêtre, écran entier ou page qui défile"
        ],
        [
          "Enregistrement",
          "vidéo MP4 ou GIF animé"
        ],
        [
          "Annotations",
          "flèches, textes, flou sur les infos sensibles"
        ],
        [
          "Reconnaissance de texte",
          "copiez le texte d'une capture"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://getsharex.com/"
    },
    {
      "id": "bitwarden",
      "abbr": "Bw",
      "name": "Bitwarden",
      "cat": "security",
      "oss": true,
      "role": "Gestionnaire de mots de passe",
      "desc": "Bitwarden retient tous vos mots de passe dans un coffre chiffré, les remplit pour vous et les synchronise entre votre PC et votre téléphone.",
      "features": [
        [
          "Coffre chiffré",
          "vous seul pouvez le déverrouiller"
        ],
        [
          "Remplissage automatique",
          "via l'extension pour navigateur"
        ],
        [
          "Générateur",
          "créez des mots de passe forts et uniques"
        ],
        [
          "Multi-appareils",
          "Windows, Android, iPhone et navigateurs"
        ]
      ],
      "licence": "Gratuit et open source. Offre gratuite sans limite de mots de passe, options payantes.",
      "url": "https://bitwarden.com/download/"
    },
    {
      "id": "keepassxc",
      "abbr": "Kp",
      "name": "KeePassXC",
      "cat": "security",
      "oss": true,
      "role": "Mots de passe stockés sur votre PC",
      "desc": "KeePassXC garde vos mots de passe dans un fichier chiffré sur votre ordinateur, sans aucun compte en ligne. Vous gardez le contrôle total.",
      "features": [
        [
          "Hors ligne",
          "aucune donnée envoyée sur un serveur"
        ],
        [
          "Base chiffrée",
          "un seul fichier, à sauvegarder où vous voulez"
        ],
        [
          "Extension navigateur",
          "pour remplir les formulaires de connexion"
        ],
        [
          "Générateur",
          "mots de passe et phrases de passe"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://keepassxc.org/download/"
    },
    {
      "id": "protonvpn",
      "abbr": "Pv",
      "name": "Proton VPN",
      "cat": "security",
      "oss": true,
      "role": "VPN avec une offre gratuite illimitée",
      "desc": "Proton VPN chiffre votre connexion, utile sur un Wi-Fi public. Son offre gratuite n'a pas de limite de données ni de publicité.",
      "features": [
        [
          "Offre gratuite",
          "données illimitées, sans publicité"
        ],
        [
          "Aucun journal",
          "politique vérifiée par des audits externes"
        ],
        [
          "Coupe-circuit",
          "bloque Internet si le VPN se déconnecte"
        ]
      ],
      "licence": "Applications open source. Offre gratuite avec choix de serveurs limité, offre payante complète.",
      "url": "https://protonvpn.com/fr/download"
    },
    {
      "id": "signal",
      "abbr": "Si",
      "name": "Signal",
      "cat": "chat",
      "oss": true,
      "role": "Messagerie chiffrée",
      "desc": "Signal est une messagerie où messages, appels et fichiers sont chiffrés de bout en bout. La version PC se relie à l'application de votre téléphone.",
      "features": [
        [
          "Chiffrement de bout en bout",
          "activé pour toutes les conversations"
        ],
        [
          "Appels audio et vidéo",
          "en individuel ou en groupe"
        ],
        [
          "Messages éphémères",
          "qui s'effacent après un délai choisi"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU AGPL), sans publicité. Nécessite Signal sur un téléphone.",
      "url": "https://signal.org/download/"
    },
    {
      "id": "telegram",
      "abbr": "Tg",
      "name": "Telegram Desktop",
      "cat": "chat",
      "oss": true,
      "role": "Messagerie synchronisée avec votre téléphone",
      "desc": "Retrouvez toutes vos conversations Telegram sur votre PC, synchronisées en temps réel avec votre téléphone.",
      "features": [
        [
          "Synchronisation",
          "messages et fichiers sur tous vos appareils"
        ],
        [
          "Gros fichiers",
          "envoyez des fichiers jusqu'à 2 Go"
        ],
        [
          "Groupes et chaînes",
          "pour suivre des communautés"
        ]
      ],
      "licence": "Gratuit. L'application est open source (licence GNU GPL).",
      "url": "https://desktop.telegram.org/"
    },
    {
      "id": "thunderbird",
      "abbr": "Tb",
      "name": "Thunderbird",
      "cat": "chat",
      "oss": true,
      "role": "Logiciel de messagerie e-mail",
      "desc": "Thunderbird rassemble tous vos comptes e-mail (Gmail, Outlook, Yahoo…) dans une seule application, avec un agenda intégré.",
      "features": [
        [
          "Multi-comptes",
          "toutes vos adresses dans une seule boîte"
        ],
        [
          "Agenda",
          "événements et tâches intégrés"
        ],
        [
          "Filtre anti-spam",
          "qui apprend de vos choix"
        ],
        [
          "Chiffrement",
          "signez et chiffrez vos e-mails"
        ]
      ],
      "licence": "Gratuit et open source (licence MPL 2.0), par la fondation Mozilla.",
      "url": "https://www.thunderbird.net/fr/"
    },
    {
      "id": "gimp",
      "abbr": "Gi",
      "name": "GIMP",
      "cat": "creation",
      "oss": true,
      "role": "Retouche photo, l'alternative à Photoshop",
      "desc": "GIMP est un logiciel de retouche photo complet : calques, masques, filtres, détourage. Il ouvre aussi les fichiers Photoshop.",
      "features": [
        [
          "Calques et masques",
          "pour des retouches non destructives"
        ],
        [
          "Détourage",
          "sélection intelligente et outils de chemin"
        ],
        [
          "Filtres",
          "flou, netteté, correction des couleurs"
        ],
        [
          "Fichiers PSD",
          "ouvre les fichiers Photoshop"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://www.gimp.org/downloads/"
    },
    {
      "id": "inkscape",
      "abbr": "In",
      "name": "Inkscape",
      "cat": "creation",
      "oss": true,
      "role": "Dessin vectoriel, logos et affiches",
      "desc": "Inkscape crée des illustrations vectorielles qui restent nettes à toutes les tailles : logos, affiches, icônes, schémas.",
      "features": [
        [
          "Vectoriel",
          "aucune perte de qualité à l'agrandissement"
        ],
        [
          "Format SVG",
          "idéal pour le web"
        ],
        [
          "Export",
          "PNG, PDF et EPS pour l'impression"
        ],
        [
          "Vectorisation",
          "transformez une image en tracés"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://inkscape.org/release/"
    },
    {
      "id": "krita",
      "abbr": "Kr",
      "name": "Krita",
      "cat": "creation",
      "oss": true,
      "role": "Peinture et dessin numérique",
      "desc": "Krita est pensé pour les dessinateurs et illustrateurs : pinceaux réalistes, prise en charge des tablettes graphiques et animation image par image.",
      "features": [
        [
          "Pinceaux",
          "des centaines de pinceaux personnalisables"
        ],
        [
          "Tablette graphique",
          "gestion de la pression et de l'inclinaison"
        ],
        [
          "Animation 2D",
          "image par image, avec pelure d'oignon"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://krita.org/fr/download/"
    },
    {
      "id": "obs",
      "abbr": "Ob",
      "name": "OBS Studio",
      "cat": "creation",
      "oss": true,
      "role": "Enregistrer l'écran et diffuser en direct",
      "desc": "OBS Studio enregistre votre écran, votre webcam et votre micro, ou les diffuse en direct sur YouTube, Twitch ou Facebook.",
      "features": [
        [
          "Enregistrement",
          "écran, fenêtre, webcam et son"
        ],
        [
          "Direct",
          "YouTube, Twitch, Facebook et plus"
        ],
        [
          "Scènes",
          "composez et passez d'une mise en page à l'autre"
        ],
        [
          "Mixage audio",
          "réglez chaque source séparément"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://obsproject.com/fr/download"
    },
    {
      "id": "shotcut",
      "abbr": "Sc",
      "name": "Shotcut",
      "cat": "creation",
      "oss": true,
      "role": "Montage vidéo simple et complet",
      "desc": "Shotcut permet de monter des vidéos sur une timeline : couper, assembler, ajouter des transitions, du texte et de la musique.",
      "features": [
        [
          "Timeline multipistes",
          "vidéo, audio et texte"
        ],
        [
          "Transitions et filtres",
          "fondus, couleurs, stabilisation"
        ],
        [
          "Formats",
          "presque tous les formats, jusqu'en 4K"
        ]
      ],
      "licence": "Gratuit et open source (licence GNU GPL).",
      "url": "https://www.shotcut.org/download/"
    }
  ]
};
