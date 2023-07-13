import { LOCALES } from '../locales';

export default {
  // Datatlas
  'dashboard.my_projects': 'Mes projets',
  'dashboard.community_projects': 'Communauté Datatlas',
  'about.title': 'A propos',
  'createProjectForm.mapStyle': 'Sélectionnez un fond de carte',
  'createProjectForm.projectName': 'Entrez le nom du projet',
  'createProjectForm.submit': 'Créer',
  'createProjectForm.titleRequired': 'Ce champs est requis',
  'loadRemoteData.incorrectURL': "L'URL n'est pas valide",
  'loadRemoteData.submit': 'Charger',
  'loginForm.errors.loginRequired': 'Ce champs est requis',
  'loginForm.errors.passwordRequired': 'Ce champs est requis',
  'loginForm.forgotPassword': 'J’ai oublié mon mot de passe',
  'loginForm.login': 'Identifiant',
  'loginForm.password': 'Mot de passe',
  'loginForm.rememberMe': 'Se souvenir de moi',
  'loginForm.submit': 'Connexion',
  'navigationBar.help': 'Aide',
  'navigationBar.logout': 'Déconnexion',
  'navigationBar.login': 'Connexion',
  'navigationBar.settings': 'Réglages',
  'project.contributors': 'Contributeurs',
  'project.projectUpdated': 'Projet modifié',
  'sideBar.createProject': 'Démarrer un nouveau projet',
  'layerManager.fileFormat':
    "Vous pouvez utiliser les formats suivants : CSV / JSON / ... Assurez-vous que l'url contient l'extension du\n fichier.",
  'layerManager.contactUs': 'Le format souhaité n’est pas disponible {link}',
  'layerManager.contactUs.link': 'Contactez-nous',
  'layerManager.dataWeight': 'Un trop grand nombre de jeux de données peut altérer le projet',
  'filterManager.filter.make_public.label': 'Rendre ce filtre public',
  'filterManager.filter.make_public.tooltip': 'Affiche ce filtre aux visiteurs',
  'map_menu.title': 'Recherche & filtres',
  'map_menu.dataset.infos': 'Infos jeu de données & glosssaire',
  'map_menu.dataset.show_dataset': 'Afficher le jeu de données',
  'map_control.publish': 'Publier',
  'map_control.unpublish': 'Dépublier',

  // Kepler
  sidebar: {
    panels: {
      layer: 'Données',
      filter: 'Filtres',
      interaction: 'Interactions',
      basemap: 'Carte de base',
    },
  },
  layer: {
    required: 'Requis*',
    radius: 'Rayon',
    color: 'Couleur',
    fillColor: 'Couleur de remplissage',
    outline: 'Contour',
    weight: 'Poids',
    propertyBasedOn: '{propriété} basé sur',
    coverage: 'Couverture',
    stroke: 'Contour',
    strokeWidth: 'Largeur du contour',
    strokeColor: 'Couleur du contour',
    basic: 'De base',
    trailLength: 'Longueur de piste',
    trailLengthDescription: "Nombre de secondes pour qu'un chemin se décolore complètement",
    newLayer: 'Nouvelle couche',
    elevationByDescription: "Lorsque désactivé, l'altitude est basée sur le nombre de points",
    colorByDescription: 'Lorsque désactivé, la couleur est basée sur le nombre de points',
    aggregateBy: 'Agréger {field} par',
    '3DModel': 'Modèle 3D',
    '3DModelOptions': 'Options du modèle 3D',
    type: {
      point: 'point',
      arc: 'arc',
      line: 'ligne',
      grid: 'grille',
      hexbin: 'hexbin',
      polygon: 'polygone',
      geojson: 'geojson',
      cluster: 'cluster',
      icon: 'icône',
      heatmap: 'carte de chaleur',
      hexagon: 'hexagone',
      hexagonid: 'H3',
      trip: 'trajet',
      s2: 'S2',
      '3d': '3D',
    },
  },
  placeholder: {
    search: 'Rechercher',
    selectField: 'Sélectionnez un champ',
    yAxis: 'Axe Y',
    selectType: 'Sélectionnez un type',
    selectValue: 'Sélectionnez une Valeur',
    enterValue: 'Entrer une Valeur',
    empty: 'Vide',
  },
  layerVisConfigs: {
    angle: 'Angle',
    strokeWidth: 'Largeur du contour (pixels)',
    strokeWidthRange: 'Gamme de largeur de contour',
    radius: 'Rayon',
    fixedRadius: 'Rayon fixe en mètres',
    fixedRadiusDescription: 'Associer le rayon à un rayon absolu en mètres, par exemple 5 pour 5 mètres',
    radiusRange: 'Gamme de rayon',
    clusterRadius: 'Rayon de cluster en pixels',
    radiusRangePixels: 'Gamme de rayon en pixels',
    opacity: 'Opacité',
    coverage: 'Couverture',
    outline: 'Contour',
    colorRange: 'Gamme de couleurs',
    stroke: 'Contour',
    strokeColor: 'Couleur du contour',
    strokeColorRange: 'Gamme de couleurs de contour',
    targetColor: 'Couleur cible',
    colorAggregation: 'Agrégation de couleur',
    heightAggregation: "Agrégation d'altitude",
    resolutionRange: 'Plage de résolution',
    sizeScale: 'Échelle de taille',
    worldUnitSize: "Taille de l'unité de monde",
    elevationScale: "Échelle d'altitude",
    enableElevationZoomFactor: "Utiliser le facteur de zoom d'altitude",
    enableElevationZoomFactorDescription: 'Ajuster la hauteur/altitude en fonction du facteur de zoom actuel',
    enableHeightZoomFactor: "Utiliser le facteur de zoom d'altitude",
    heightScale: "Échelle d'altitude",
    coverageRange: 'Plage de couverture',
    highPrecisionRendering: 'Rendu haute précision',
    highPrecisionRenderingDescription: 'Une haute précision entraînera une performance plus lente',
    height: 'Hauteur',
    heightDescription: 'Cliquez sur le bouton en haut à droite de la carte pour passer à la vue 3D',
    fill: 'Remplir',
    enablePolygonHeight: 'Activer la hauteur du polygone',
    showWireframe: 'Afficher le filaire',
    weightIntensity: 'Intensité du poids',
    zoomScale: 'Échelle de zoom',
    heightRange: "Gamme d'altitude",
    heightMultiplier: "Multiplicateur d'altitude",
  },
  layerManager: {
    addData: 'Ajouter des données',
    addLayer: 'Ajouter une couche',
    layerBlending: 'Mélange de couche',
  },
  mapManager: {
    mapStyle: 'Style de la carte',
    addMapStyle: 'Ajouter un style de carte',
    '3dBuildingColor': 'Couleur des bâtiments 3D',
  },
  layerConfiguration: {
    defaultDescription: 'Calculer {propriété} en fonction du champ sélectionné',
    howTo: 'Comment faire',
  },
  filterManager: {
    addFilter: 'Ajouter un filtre',
  },
  datasetTitle: {
    showDataTable: 'Afficher la table de données',
    removeDataset: 'Supprimer le jeu de données',
  },
  datasetInfo: {
    rowCount: '{rowCount} lignes',
  },
  tooltip: {
    hideLayer: 'Masquer la couche',
    showLayer: 'Afficher la couche',
    hideFeature: "Masquer l'élément",
    showFeature: "Afficher l'élément",
    hide: 'Masquer',
    show: 'Afficher',
    removeLayer: 'Supprimer la couche',
    duplicateLayer: 'Dupliquer la couche',
    layerSettings: 'Paramètres de la couche',
    closePanel: 'Fermer le panneau actuel',
    switchToDualView: 'Passer en vue double carte',
    showLegend: 'Afficher la légende',
    disable3DMap: 'Désactiver la carte 3D',
    DrawOnMap: 'Dessiner sur la carte',
    selectLocale: 'Sélectionner la langue',
    hideLayerPanel: 'Masquer le panneau de couches',
    showLayerPanel: 'Afficher le panneau de couches',
    moveToTop: 'Déplacer en haut des couches de données',
    selectBaseMapStyle: 'Sélectionner le style de carte de base',
    delete: 'Supprimer',
    timePlayback: 'Lecture de temps',
    cloudStorage: 'Stockage cloud',
    '3DMap': 'Carte 3D',
    animationByWindow: 'Déplacement temporel de la fenêtre',
    animationByIncremental: 'Fenêtre de temps progressive',
    speed: 'vitesse',
    play: 'lecture',
    pause: 'pause',
    reset: 'réinitialiser',
  },
  toolbar: {
    exportImage: "Exporter l'image",
    exportData: 'Exporter les données',
    exportMap: 'Exporter la carte',
    shareMapURL: "Partager l'URL de la carte",
    saveMap: 'Enregistrer la carte',
    select: 'Sélectionner',
    polygon: 'Polygone',
    rectangle: 'Rectangle',
    hide: 'Masquer',
    show: 'Afficher',
    ...LOCALES,
  },
  editor: {
    filterLayer: 'Filtrer les couches',
    copyGeometry: 'Copier la géométrie',
  },

  modal: {
    title: {
      deleteDataset: 'Supprimer le jeu de données',
      addDataToMap: 'Ajouter des données à la carte',
      exportImage: "Exporter l'image",
      exportData: 'Exporter les données',
      exportMap: 'Exporter la carte',
      addCustomMapboxStyle: 'Ajouter un style de carte personnalisé',
      saveMap: 'Enregistrer la carte',
      shareURL: "Partager l'URL",
    },
    button: {
      delete: 'Supprimer',
      download: 'Télécharger',
      export: 'Exporter',
      addStyle: 'Ajouter un style',
      save: 'Enregistrer',
      defaultCancel: 'Annuler',
      defaultConfirm: 'Confirmer',
    },
    exportImage: {
      ratioTitle: 'Ratio',
      ratioDescription: 'Choisissez le ratio pour différents usages.',
      ratioOriginalScreen: "Écran d'origine",
      ratioCustom: 'Personnalisé',
      ratio4_3: '4:3',
      ratio16_9: '16:9',
      resolutionTitle: 'Résolution',
      resolutionDescription: 'Une haute résolution est meilleure pour les impressions.',
      mapLegendTitle: 'Légende de la carte',
      mapLegendAdd: 'Ajouter une légende sur la carte',
    },
    exportData: {
      datasetTitle: 'Jeu de données',
      datasetSubtitle: 'Choisissez les jeux de données que vous souhaitez exporter',
      allDatasets: 'Tous',
      dataTypeTitle: 'Type de données',
      dataTypeSubtitle: 'Choisissez le type de données que vous voulez exporter',
      filterDataTitle: 'Filtrer les données',
      filterDataSubtitle: "Vous pouvez choisir d'exporter les données originales ou filtrées",
      filteredData: 'Données filtrées',
      unfilteredData: 'Données non filtrées',
      fileCount: '{fileCount} fichiers',
      rowCount: '{rowCount} lignes',
    },
    deleteData: {
      warning: 'vous allez supprimer ce jeu de données. Cela affectera {length} couches',
    },
    publishTitle:
      "2. Si vous avez entré une URL de style Mapbox à l'étape 1, publiez votre style sur Mapbox ou fournissez un jeton d'accès. (Optionnel)",
    publishSubtitle1: 'Vous pouvez créer votre propre style de carte sur',
    publishSubtitle2: 'et le',
    publishSubtitle3: 'publier',
    publishSubtitle4: '.',
    publishSubtitle5: 'Pour utiliser un style privé, collez votre',
    publishSubtitle6: "jeton d'accès",
    publishSubtitle7: 'ici. *kepler.gl est une application côté client, les données restent dans votre navigateur.',
    exampleToken: 'e.g. pk.abcdefg.xxxxxx',
    pasteTitle: "1. Collez l'URL du style",
    pasteSubtitle0: "L'URL du style peut être une carte",
    pasteSubtitle1: "Qu'est-ce qu'une",
    pasteSubtitle2: 'URL de style',
    pasteSubtitle3: 'ou un style.json utilisant le',
    pasteSubtitle4: 'Mapbox GL Style Spec',
    namingTitle: '3. Nommez votre style',
  },
  shareMap: {
    shareUriTitle: "Partager l'URL de la carte",
    shareUriSubtitle: "Générer une URL de la carte à partager avec d'autres personnes",
    cloudTitle: 'Stockage Cloud',
    cloudSubtitle: 'Connectez-vous et téléchargez les données de la carte dans votre stockage cloud personnel',
    shareDisclaimer:
      "kepler.gl enregistrera vos données de carte dans votre stockage cloud personnel. Seules les personnes disposant de l'URL peuvent accéder à votre carte et à vos données. " +
      'Vous pouvez modifier/supprimer le fichier de données dans votre compte cloud à tout moment.',
    gotoPage: 'Accédez à votre page Kepler.gl {currentProvider}',
  },
  statusPanel: {
    mapUploading: 'Téléchargement de la carte',
    error: 'Erreur',
  },
  saveMap: {
    title: 'Stockage Cloud',
    subtitle: 'Connectez-vous pour enregistrer la carte dans votre stockage cloud personnel',
  },
  exportMap: {
    formatTitle: 'Format de la carte',
    formatSubtitle: 'Choisissez le format vers lequel vous souhaitez exporter votre carte',
    html: {
      selection: 'Exportez votre carte dans un fichier HTML interactif.',
      tokenTitle: "Jeton d'accès Mapbox",
      tokenSubtitle: "Utilisez votre propre jeton d'accès Mapbox dans l'HTML (facultatif)",
      tokenPlaceholder: "Collez votre jeton d'accès Mapbox",
      tokenMisuseWarning:
        "* Si vous ne fournissez pas votre propre jeton, la carte peut cesser de s'afficher à tout moment lorsque nous remplaçons le nôtre afin d'éviter une utilisation abusive.",
      tokenDisclaimer: 'Vous pouvez modifier le jeton Mapbox plus tard en suivant les instructions suivantes :',
      tokenUpdate: 'Comment mettre à jour un jeton de carte existant.',
      modeTitle: 'Mode de la carte',
      modeSubtitle1: "Sélectionnez le mode d'application. Plus ",
      modeSubtitle2: 'informations',
      modeDescription: 'Permettre aux utilisateurs de {mode} la carte',
      read: 'lire',
      edit: 'éditer',
    },
    json: {
      configTitle: 'Configuration de la carte',
      configDisclaimer:
        'La configuration de la carte sera incluse dans le fichier Json. Si vous utilisez kepler.gl dans votre propre application, vous pouvez copier cette configuration et la passer à ',
      selection:
        'Exportez les données et la configuration de la carte actuelle dans un seul fichier Json. Vous pouvez ensuite ouvrir la même carte en téléchargeant ce fichier sur kepler.gl.',
      disclaimer:
        "* La configuration de la carte est couplée aux jeux de données chargés. L'identifiant de données est utilisé pour lier les couches, les filtres et les info-bulles à un jeu de données spécifique. " +
        "Lorsque vous passez cette configuration à addDataToMap, assurez-vous que l'identifiant de données correspond aux identifiants de données dans cette configuration.",
    },
  },
  loadingDialog: {
    loading: 'Chargement en cours...',
  },
  loadData: {
    upload: 'Charger des fichiers',
    storage: 'Charger à partir du stockage',
  },
  tripInfo: {
    title: "Comment activer l'animation de trajet",
    description1:
      'Pour animer le trajet, les données geoJSON doivent contenir `LineString` dans leur géométrie de fonctionnalité, et les coordonnées dans le LineString doivent avoir 4 éléments dans les formats de',
    code: ' [longitude, latitude, altitude, horodatage] ',
    description2:
      "avec le dernier élément étant un horodatage. Les formats d'horodatage valides incluent unix en secondes tels que `1564184363` ou en millisecondes tels que `1564184363000`.",
    example: 'Exemple:',
  },
  iconInfo: {
    title: 'Comment dessiner des icônes',
    description1:
      "Dans votre csv, créez une colonne, mettez le nom de l'icône que vous voulez dessiner dedans. Vous pouvez laisser la cellule vide si vous ne voulez pas que l'icône apparaisse pour certains points. Lorsque la colonne est nommée",
    code: 'icône',
    description2: "kepler.gl créera automatiquement une couche d'icônes pour vous.",
    example: 'Exemple:',
    icons: 'Icônes',
  },
  storageMapViewer: {
    lastModified: 'Dernière modification il y a {lastUpdated}',
    back: 'Retour',
  },
  overwriteMap: {
    title: 'Enregistrement de la carte en cours...',
    alreadyExists: "existe déjà dans votre {mapSaved}. Voulez-vous l'écraser?",
  },
  loadStorageMap: {
    back: 'Retour',
    goToPage: 'Allez sur votre page Kepler.gl {displayName}',
    storageMaps: 'Stockage / Cartes',
    noSavedMaps: "Aucune carte enregistrée pour l'instant",
  },
  header: {
    visibleLayers: 'Couches visibles',
    layerLegend: 'Légende',
  },
  interactions: {
    tooltip: 'Personnaliser info-bulle',
    brush: 'Pinceau',
    coordinate: 'Coordonnées',
    geocoder: 'Géocodeur',
  },
  layerBlending: {
    title: 'Mélange de couches',
    additive: 'additif',
    normal: 'normal',
    subtractive: 'soustractif',
  },
  columns: {
    title: 'Colonnes',
    lat: 'lat',
    lng: 'lon',
    altitude: 'altitude',
    icon: 'icône',
    geojson: 'geojson',
    token: 'jeton',
    arc: {
      lat0: 'latitude source',
      lng0: 'longitude source',
      lat1: 'latitude cible',
      lng1: 'longitude cible',
    },
    line: {
      alt0: 'altitude source',
      alt1: 'altitude cible',
    },
    grid: {
      worldUnitSize: 'Taille de la grille (km)',
    },
    hexagon: {
      worldUnitSize: 'Rayon de lhexagone (km)',
    },
    hex_id: 'identifiant hexagonal',
  },
  color: {
    customPalette: 'Palette personnalisée',
    steps: 'étapes',
    type: 'type',
    reversed: 'inversé',
  },
  scale: {
    colorScale: 'Échelle de couleurs',
    sizeScale: 'Échelle de taille',
    strokeScale: 'Échelle de contour',
    scale: 'Échelle',
  },
  fileUploader: {
    message: 'Glissez et déposez votre (vos) fichier(s) ici',
    chromeMessage:
      '* Utilisateur de Chrome : Limitez la taille du fichier à 250 Mo. Si vous devez télécharger un fichier plus volumineux, essayez Safari.',
    disclaimer:
      '*kepler.gl est une application côté client sans backend de serveur. Les données ne sont stockées que sur votre machine/navigateur. ' +
      "Aucune information ou donnée de carte n'est envoyée à un serveur quelconque.",
    configUploadMessage:
      'Télécharger {fileFormatNames} ou sauvegardez la carte **Json**. En savoir plus sur [**formats de fichiers pris en charge**]',
    browseFiles: 'parcourir vos fichiers',
    uploading: 'Téléchargement en cours',
    fileNotSupported: "Le fichier {errorFiles} n'est pas pris en charge.",
    or: 'ou',
  },
  geocoder: {
    title: 'Entrez une adresse ou des coordonnées, ex 37.79,-122.40',
  },
  fieldSelector: {
    clearAll: 'Tout effacer',
    formatting: 'Formatage',
  },
  compare: {
    modeLabel: 'Mode de comparaison',
    typeLabel: 'Type de comparaison',
    types: {
      absolute: 'Absolu',
      relative: 'Relatif',
    },
  },
  mapPopover: {
    primary: 'Principal',
  },
  density: 'densité',
  'Bug Report': 'Rapport de bug',
  'User Guide': "Guide de l'utilisateur",
  Save: 'Enregistrer',
  Share: 'Partager',
};
