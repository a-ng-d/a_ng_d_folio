# Contenu des projets

Un dossier = un projet. Le nom du dossier est le slug ; il n'est écrit nulle
part ailleurs. `published: false` retire la route en production tout en la
gardant accessible en développement.

## Écrire un corps

Le Markdown est compilé en composant Vue. Les composants de mise en page sont
disponibles sans import : `OneColumn`, `TwoColumns`, `ThreeColumns`,
`WrapColumn`, `FullWidthFigure`, `Figure`, `ContentContainer`, `LinkContainer`,
`SimpleExternalLink`, `Label`, `Button`.

Les sections s'ouvrent avec `::: section`, ou `::: challenge`, `::: success`,
`::: credit`, `::: takeaways`, `::: ending` pour celles qui portent un fond
particulier. Leur **ordre compte** : les sections sans classe sont zébrées au
rang.

## Deux pièges

1. **Une balise de composant doit tenir sur une seule ligne.** Étalée sur
   plusieurs, Markdown ne la reconnaît plus comme HTML et l'affiche en texte.
2. **Une ligne vide ferme le bloc HTML.** Laissez-en une là où vous voulez de
   la prose Markdown, n'en laissez pas entre deux balises de composants.

## Images

Ne déclarez ni `width` ni `height` : le build les lit dans le fichier. Pour
imposer un cadre plutôt que suivre le ratio natif, utilisez `ratio` — `square`,
`landscape`, `wide`, `ultrawide`, `panorama`, `portrait`, `tall`, ou toute
valeur CSS.

## Ce que le Markdown ne sait pas faire

Parallaxe, animation Lottie, données distantes : un composant `.vue` posé à côté
du `index.en.md`, importé dans un bloc `<script setup>`. Voir
`_awesome_ipsums/Ending.vue`.
