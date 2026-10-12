# APS Windows

Site d'une page qui présente les logiciels essentiels pour Windows, avec une fiche explicative et un lien vers le site officiel de chaque éditeur.

## Structure

```
index.html        Accueil, catalogue, étapes, inscription
apropos.html      Page « Le créateur »
data/apps.js      Données : catégories, logiciels, sélection de l'accueil
admin/            Back office pour gérer les logiciels
css/style.css     Styles et animations communs
css/apropos.css   Styles propres à la page « Le créateur »
js/app.js         Motion design et affichage de l'accueil
js/apropos.js     Motion design de la page « Le créateur »
```

## Lancer le site

Ouvrir `index.html` dans un navigateur, ou lancer un serveur local :

```bash
python -m http.server 5617
```

puis aller sur http://localhost:5617.

## Ajouter ou modifier un logiciel : le back office

1. Ouvrir `admin/index.html` dans **Chrome ou Edge** (http://localhost:5617/admin/ avec le serveur local).
2. Cliquer sur « Ajouter un logiciel », ou choisir un logiciel dans la liste.
3. Remplir la fiche. L'aperçu de la carte et de la fiche se met à jour pendant la saisie.
4. Cliquer sur « Valider la fiche », puis sur « Enregistrer le fichier » (ou Ctrl+S).
   La première fois, choisir le fichier `data/apps.js` du site. Le navigateur s'en souvient ensuite.
5. Publier : `git add data/apps.js`, `git commit`, `git push`.

Le back office vérifie que les deux lettres de la tuile et l'identifiant sont uniques, que le lien est en https et que l'accueil ne dépasse pas 6 logiciels.
Les flèches de la liste règlent l'ordre d'affichage sur le site.

Sur Firefox ou Safari, le bouton devient « Télécharger apps.js » : remplacer ensuite `data/apps.js` par le fichier téléchargé.

Le back office n'écrit que sur votre ordinateur : en ligne, il ne peut rien modifier sur le serveur.

## Notes

- La police Bricolage Grotesque est chargée depuis Google Fonts (connexion nécessaire).
- Le formulaire d'inscription est simulé : aucune donnée n'est envoyée tant qu'il n'y a pas de serveur.
- Les animations sont désactivées si le système demande de réduire les animations.
