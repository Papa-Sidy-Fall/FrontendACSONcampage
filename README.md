# FrontendACSONcampage — Site de campagne ACSON 2026–2030

Site vitrine React + Vite + Tailwind CSS, avec chatbot FAQ dans le navigateur.
Aucun backend ni service d’IA n’est nécessaire. Les textes de campagne existants sont conservés.

## Lancer le site

Prérequis : Node.js 22, version 22.12 ou supérieure.
Après un clonage du dépôt, installer [Git LFS](https://git-lfs.com/) et récupérer
la vidéo originale avant de construire le site :

```bash
git lfs install
git lfs pull
```

```bash
npm ci
npm run dev
```

Ouvrir l’adresse affichée par Vite. Pour consulter sur un téléphone du même réseau :

```bash
npm run dev -- --host 0.0.0.0
```

## Déployer sur Vercel

Langage : **JavaScript**, interface **React**, compilation **Vite**, styles **Tailwind CSS**.
Le site et son chatbot fonctionnent dans le navigateur, sans backend.

1. Dans Vercel, choisir **Add New → Project** et importer
   [Papa-Sidy-Fall/FrontendACSONcampage](https://github.com/Papa-Sidy-Fall/FrontendACSONcampage).
2. Laisser **Root Directory : `./`** : ce dépôt contient directement `package.json`.
3. Vérifier ces paramètres :
   - Framework : **Vite**.
   - Node.js : **22.x**.
   - Installation : `npm ci`.
   - Build : `npm run build`.
   - Output Directory : `dist`.
4. Dans le projet, ouvrir **Settings → Git**, activer **Git LFS**, puis lancer
   **Redeploy**. Vercel récupère ainsi la vidéo originale de 108 Mo.
   Si le premier build précède l’activation, il s’arrête avec une instruction claire
   afin de ne pas publier un faux fichier vidéo.
5. Aucune variable d’environnement n’est nécessaire avec cette configuration.
   `VITE_PRESENTATION_VIDEO_URL` reste une option si la vidéo est hébergée séparément.

[Prise en charge Git LFS dans Vercel](https://vercel.com/docs/project-configuration/git-settings#git-large-file-storage-lfs).

`vercel.json` définit déjà le framework, le build, le dossier de sortie et des en-têtes de sécurité.
La navigation utilise des ancres : aucune réécriture de routes n’est nécessaire.
Utiliser le code source actuel ; les anciens ZIP Netlify ne contiennent pas ces améliorations.

Autre possibilité, avec la CLI Vercel et un compte connecté, après hébergement
externe de la vidéo et configuration de son URL :

```bash
npx vercel
```

Cette commande publie une prévisualisation. Après vérification, `npx vercel --prod` publie en production.

## Vérifications

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Chatbot FAQ

- `src/content/faq.json` contient les 67 questions et leurs réponses, avec uniquement
  les champs publics `id`, `categorie`, `question` et `reponse`.
  Les références éditoriales internes restent dans `../contenu/FAQ_ACSON_complete.json`.
- Les catégories permettent d’accéder à toutes les questions.
- Les questions libres reconnaissent des intentions, synonymes et formulations personnelles
  sur les sujets couverts : parcours du candidat, ancienneté, vision, mentorat,
  formation, IA, réseau, solidarité, famille et initiatives.
- Les réponses parlent directement au public, sans références aux documents de préparation.
- Une correspondance ambiguë propose des questions ; une demande hors programme invite à reformuler.
- Le bot n’invente pas de réponse. Il ne comprend pas toutes les formulations comme une IA.
- Le bouton « Programme complet (PDF) » télécharge la version publique de cinq pages :
  `public/documents/programme-acson-2026-2030.pdf`.
  La réponse consacrée au téléchargement propose aussi ce même PDF.
- La conversation reste en mémoire pendant la visite et n’est pas transmise à un serveur.
- Avant chaque réponse à une saisie ou à un choix, trois points ondulent pendant
  800 ms. Les réponses restent celles de la FAQ. Le délai se règle avec `responseDelay`
  dans `src/components/Chatbot.jsx`.
- « Recommencer » efface la conversation. Un rechargement l’efface également.
- « Recommencer » et « Tous les thèmes » annulent une réponse en attente.
  Les doubles envois sont bloqués pendant cette attente ; la saisie reste disponible.

Exemples de questions à essayer : « Ça fait combien d’années qu’il travaille à Sonatel ? »,
« Je suis nouveau cadre, comment m’intégrer ? », « J’aimerais me former en intelligence
artificielle », « Comment élargir mon réseau ? », « Quel budget est prévu ? ».
Une demande sur un sujet privé ou absent du programme n’entraîne pas de fait inventé.

## Programme public téléchargeable

Le PDF présente la vision du candidat, ses six axes avec objectifs/actions/bénéfices,
les cinq engagements de gouvernance et les priorités de la première année.
Il est rédigé à la première personne au nom de Mame Youssou Diagne, à partir du programme
fourni, sans ajouter de montant, de partenaire nommé ou de nouvelle promesse.

Les sections de préparation éditoriale, d’arborescence, de diffusion WhatsApp et les
consignes destinées au développeur sont exclues. L’ancien Word a été retiré de `public/`
et du build ; le fichier source reste dans le dossier parent `cahier de charge/`.
Ne jamais copier ce document interne ni les autres cahiers de charge dans `public/`.

Source révisable : `../contenu/Programme_ACSON_public.html`. Pour régénérer le PDF
depuis le dossier parent, avec Python 3 et Google Chrome ou Chromium installé :

```bash
python3 scripts/generer_programme_pdf.py
```

Le PDF est déjà fourni dans le projet : cette génération n’est pas nécessaire sur Vercel.
Après une modification du PDF, relancer `npm run build` avant publication.

## Interface et animations

Décor 3D en CSS, cartes inclinables à la souris, apparitions des sections et des textes.
Titres animés mot par mot et apparitions progressives des éléments du calendrier,
des engagements, des actualités, de l’appel final et du pied de page, au défilement.
Les textes de campagne sont conservés. Le logo AC possède un fond orange uni.
La main du chatbot fait coucou sur un cycle de deux secondes.
L’option système « Réduire les animations » désactive les mouvements.
Les dialogues prennent en charge Échap, le parcours clavier et le retour du focus.

Le formulaire d’idées existant conserve son fonctionnement local : les idées sont enregistrées
uniquement dans le navigateur du visiteur, sans envoi à l’équipe. Aucune collecte distante n’a été ajoutée.

## Vidéo de présentation

- Original fourni : `../Vidéo de présentation/HDRR.MOV`, 107 750 936 octets,
  environ 108 Mo (103 Mio), durée 78,6 secondes, HEVC Main, 1080 × 1920, 30 images/s,
  son AAC. L’utilisateur a choisi de conserver cet original sans réencodage.
- Copie strictement identique : `public/videos/presentation-acson.mov`.
  L’original fourni reste intact. Les essais de compression réellement sans perte
  sur un extrait augmentaient fortement le poids ; aucune version réencodée n’est utilisée.
- Ce fichier est suivi par **Git LFS** dans `.gitattributes`, car il dépasse 100 Mio.
  Le dépôt Git conserve un petit pointeur, Git LFS conserve les octets de l’original.
  Après clonage, `git lfs pull` récupère la vidéo ; sur Vercel, activer Git LFS puis redéployer.
- Aperçu : `public/videos/presentation-poster.jpg`, extrait à 2 secondes.
- Présentation dans la rubrique « Pourquoi je m’engage ». Lecture native lorsque
  le navigateur annonce la prise en charge HEVC ; sinon aperçu, explication et lien
  pour télécharger l’original. En cas d’échec de lecture, le même repli s’affiche.
- Pas de lecture automatique. `preload="none"` évite de charger la vidéo au démarrage.
  Le format original n’assure pas une lecture dans tous les navigateurs.

Le déploiement recommandé utilise l’import Git et Git LFS. Pour héberger l’original
ailleurs, notamment en cas de déploiement par CLI :

1. Héberger le fichier original sur un stockage de fichiers servant une URL HTTPS
   publique directe (type MIME adapté et requêtes Range pour la lecture).
   Aucun fichier n’a été envoyé à un service externe dans cette intervention.
2. Renseigner `VITE_PRESENTATION_VIDEO_URL` dans les variables du projet Vercel,
   avec cette URL, puis relancer le build. Pour les essais locaux, utiliser `.env.local`.
3. Pour ce parcours CLI uniquement, ajouter `public/videos/presentation-acson.mov`
   à `.vercelignore`. Garder l’original fourni dans le dossier parent. Ne pas ajouter
   cette exclusion pour le parcours recommandé Git LFS.
   Garder l’aperçu JPEG dans `public/videos/`.
4. Vérifier la lecture ou le téléchargement de l’original sur le site publié.

Le fichier dépasse la limite de 100 Mio d’un fichier GitHub standard.
[Documentation GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).
La CLI Vercel limite l’ensemble des sources envoyées à 100 Mo sur Hobby, 1 Go sur Pro.
[Documentation Vercel](https://vercel.com/docs/limits#static-file-uploads).
L’upload de la vidéo par Git LFS utilise les quotas du compte GitHub. Le site charge
la vidéo seulement à la demande. Aucun abonnement ni déploiement Vercel n’a été créé.
