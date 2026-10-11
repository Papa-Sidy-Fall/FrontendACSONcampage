# FrontendACSONcampage — Site de campagne ACSON 2026–2030

Site vitrine React + Vite + Tailwind CSS, avec chatbot FAQ dans le navigateur.
Aucun backend ni service d’IA n’est nécessaire. Les textes de campagne existants sont conservés.

## Lancer le site

Prérequis : Node.js 22, version 22.12 ou supérieure.
L’URL Cloudinary de la vidéo est déjà configurée dans `src/content/presentation.js`.
Aucune variable d’environnement n’est nécessaire.

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
4. Laisser les variables d’environnement vides : l’URL de la vidéo déjà importée
   dans Cloudinary est fournie dans le code.
5. Déployer la dernière version de `main`. Si le projet a déjà été créé, vérifier
   que le déploiement utilise le nouveau commit, puis lancer Redeploy si nécessaire.

La vidéo est servie par Cloudinary. Git LFS n’est plus nécessaire pour déployer
la version actuelle du site. Aucune clé API Cloudinary ni autre secret n’est requis.
L’URL est publique et intégrée au JavaScript visible dans le navigateur. Pour
remplacer la vidéo, modifier `src/content/presentation.js` ou utiliser la variable
facultative `VITE_PRESENTATION_VIDEO_URL` avec une autre URL HTTPS publique directe,
puis relancer le build. `.env.example` documente cette option pour les essais locaux.

`vercel.json` définit déjà le framework, le build, le dossier de sortie et des en-têtes de sécurité.
La navigation utilise des ancres : aucune réécriture de routes n’est nécessaire.
Utiliser le code source actuel ; les anciens ZIP Netlify ne contiennent pas ces améliorations.

Autre possibilité, avec la CLI Vercel et un compte connecté :

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

- Original conservé intact hors dépôt : `../Vidéo de présentation/HDRR.MOV`,
  107 750 936 octets, durée 78,6 secondes, HEVC Main, 1080 × 1920, 30 images/s,
  son AAC. Sa copie identique est conservée dans le même dossier sous
  `presentation-acson-original.mov`.
- Copie web importée dans Cloudinary : `../Vidéo de présentation/presentation-acson-cloudinary.mp4`,
  **86 030 624 octets (86,03 Mo)**, sous le plafond de 100 MB indiqué par l’utilisateur.
  MP4 H.264 High, CRF 18, même définition et cadence, son AAC original copié et
  en-tête faststart. Le réencodage de l’image n’est pas strictement sans perte.
- Aucun fichier vidéo n’est inclus dans le dépôt courant ni dans `dist/`.
  Le pointeur MOV et la règle Git LFS ont été retirés de la version actuelle.
  Les archives des anciens commits restent inchangées.
- Aperçu : `public/videos/presentation-poster.jpg`, extrait à 2 secondes.
- Présentation dans la rubrique « Pourquoi je m’engage ». Lecture native lorsque
  le navigateur peut lire le MP4. En cas d’échec de lecture, aperçu, explication et
  lien vers la vidéo restent disponibles. La détection HEVC de l’ancien fichier
  a été retirée : elle empêchait certains navigateurs de lire un MP4 compatible.
- Pas de lecture automatique. `preload="none"` évite de charger la vidéo au démarrage.

La compilation vérifie que l’URL configurée utilise HTTPS ; elle ne garantit
pas la disponibilité du fichier chez Cloudinary. Après l’import, vérifier la lecture
sur le site publié. Le fichier doit être public, et l’URL doit pointer sur la vidéo,
pas sur une page de la console Cloudinary. Aucun upload Cloudinary n’est automatisé
par le site ; il n’y a pas de backend ni de clé API.
