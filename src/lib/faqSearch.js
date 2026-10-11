export function normalize(text) {
  return String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

const stopWords = new Set('a ai au aux avec ce ces cet cette chez comment dans de des du d l t j n c s elle en est et eux fait il ils je la le les leur lui ma me mes mon moi ne nos nous on ou par pas peut pour pourquoi qu que quel quelle quelles quels qui sa se ses si son sont sur ta te tes ton tu un une vos votre vous y acson bonjour bonsoir salut svp stp please merci pouvez pourrais voudrais aimerais besoin savoir explique expliquez expliquer dites dire propose proposer prevu prevus prevue prevues prevoit concerne programme projet candidat mame youssou diagne puis'.split(' '));
const conversationalWords = new Set('quoi quand combien veux veut peux suis va vont cela ca fait faire etait anciennete longtemps depuis actuellement monsieur president futur cursus universitaire scolarite suivi etudier motivation motive motives ambition ambition objectifs nouvelles nouvellement viens vient elargir connaitre aider aide premier arrive arrivee rejoindre rejoint entrer entre travaille travail concret concretement reellement changer apporter comprendre parler parle presenter presente presentation profil biographie certification diplome planning demarrer lancement demarrage cout coute coutera couter financement financer montant prix tarif tarifs maintenant pourquoi meilleur vieille vieux age ans annees devenir reseautage difficultes difficile coup dur coups durs soutien reduction reductions remise remises taux choisir choix selectionner selectionnes choisis choisies tenus promesses engagements priorites axes age hobbies loisirs generation generations intergenerationnel intergenerationnelle culture culturel culturelle culturels culturelles familial familiale familiaux familiales participation participations inscrire telecharger telechargement obtenir recevoir lire consulter brochure complet complete pdf formation formations apprendre innovation numerisation digitaliser modernisation resume principale principal centrale centrale signature devise slogan gouvernance budget'.split(' '));
const aliases = {
  formations: 'formation', former: 'formation', apprendre: 'formation', apprentissage: 'formation',
  etudes: 'formation', etudie: 'formation', etudier: 'formation', diplome: 'formation', diplomes: 'formation',
  certifiantes: 'certification', certifiante: 'certification', certifiant: 'certification', certifications: 'certification',
  privileges: 'privilege', avantages: 'avantage', benefices: 'avantage', beneficier: 'avantage', budgets: 'budget', cout: 'budget', coute: 'budget', financement: 'budget',
  planning: 'calendrier', delai: 'calendrier', delais: 'calendrier', dates: 'date', demarrage: 'lancement',
  numerique: 'digital', digitalisation: 'digital', digitaliser: 'digital',
  sportif: 'sport', sportive: 'sport', sportives: 'sport', sports: 'sport', familles: 'famille', familial: 'famille', familiales: 'famille', familiaux: 'famille', enfants: 'famille',
  membres: 'membre', cadres: 'cadre', generational: 'generation', generations: 'generation',
  integrer: 'integration', accueil: 'integration', accueillir: 'integration', arrive: 'integration', arriver: 'integration',
  nouveaux: 'nouveau', nouvelles: 'nouveau', nouvelle: 'nouveau',
  partenaires: 'partenaire', partenariats: 'partenariat', inscriptions: 'inscription', valeurs: 'valeur',
  travaille: 'travail', travailler: 'travail', travaux: 'travail', metier: 'travail',
  competences: 'competence', expertises: 'expertise', experiences: 'experience', annees: 'an', ans: 'an',
  specialite: 'expertise', specialites: 'expertise',
  objectifs: 'vision', objectif: 'vision', ambition: 'vision', ambitions: 'vision',
  difficultes: 'difficulte', difficiles: 'difficulte', difficile: 'difficulte',
  collegues: 'collegue', rencontrer: 'networking', rencontres: 'networking', reseautage: 'networking', contacts: 'networking',
  actions: 'action', mesures: 'action', initiatives: 'initiative', activites: 'activite', idees: 'idee', conserver: 'preserver',
};

function tokens(text) {
  const words = normalize(text).replace(/\bintelligence artificielle\b/g, 'ia').split(' ');
  return [...new Set(words.filter((word) => word && !stopWords.has(word)).map((word) => aliases[word] || word))];
}

function unknown() {
  return { type: 'unknown', items: [] };
}

// These intentions only select existing FAQ entries. They never generate facts.
function findIntentIds(text) {
  const has = (pattern) => pattern.test(text);
  const person = has(/\b(mame|youssou|diagne|candidat|president|il|lui|sa|ses|son)\b/);
  const namedPerson = has(/\b(mame|youssou|diagne|candidat|president)\b/);
  const employee = namedPerson || has(/\b(il|lui)\b/);
  const asks = has(/\b(quoi|qu est ce|comment|quel|quelle|quels|quelles|pourquoi|combien|quand|explique|expliquer|savoir|veux|veut|voudrais|aimerais|besoin|pouvez|peux|aider|aide|prevoit|prevu|propose|propositions)\b/);
  const educationProposal = has(/\b(programme|academy|prevoit|propose|prevu|former|certifiantes?|cadres|membres)\b/);
  const health = has(/\b(sante|bien etre)\b/);
  const ids = [];
  const add = (id, condition) => { if (condition) ids.push(id); };

  const cost = has(/\b(budget|budgets|cout|coute|couter|financement|financer|montant|prix|tarif|tarifs)\b/);
  const schedule = has(/\b(calendrier|planning|delai|delais|lancement|demarrage)\b/) ||
    (has(/\b(quand|date|dates)\b/) && has(/\b(initiative|initiatives|programme|projet|academy|connect|privileges|360|activite|activites|formations?|lance|lancer|commence|commencer|prevu|prevue|demarrer)\b/));
  // A specific budget/calendar request takes precedence over the named initiative.
  if (cost && asks) return [50];
  if (schedule && asks) return [49];

  add(1, has(/\b(mame|youssou|diagne|candidat)\b/) && has(/\b(qui est|presente|presenter|presentation|profil|biographie|connaitre)\b/) && !has(/\b(pourquoi|motivation|motive|raison)\b/));
  add(1, asks && person && has(/\bparcours\b/) && !has(/\b(projets|valoriser|valorisation|partager|partage|transmettre|transmission)\b/));
  add(2, person && has(/\b(age|vieux)\b/) && (!has(/\bsonatel\b/) || namedPerson));
  add(3, person && has(/\b(formation|etudes|etudie|etudier|diplome|diplomes|scolarite)\b/) && !educationProposal);
  add(4, has(/\b(anciennete|combien de temps|combien d annees|combien d ans|depuis quand|depuis longtemps|quelle annee|quand.*(?:rejoint|arrive|entre))\b/) &&
    employee && has(/\b(sonatel|travail|travaille|travailler|anciennete|rejoint|arrive|entre)\b/) && !has(/\b(academy|connect|360|privileges|think tank|tournoi|mandat|election)\b/));
  add(5, person && has(/\b(poste|fonction|fonctions|role|service|direction|occupe|exerce|actuellement|aujourd hui|maintenant|responsabilites)\b/) &&
    has(/\b(travail|travaille|travailler|sonatel|poste|fonction|fonctions|occupe|exerce|responsabilites)\b/));
  add(6, person && has(/\b(expertise|competences|specialite|specialites|savoir faire)\b/) && !has(/\b(cadres|membres|valoris|valorise|valoriser|valorisees)\b/));
  add(7, person && has(/\b(domaines? techniques?|maitrise|ip mpls|ftth|adsl|broadband)\b/));
  add(8, person && has(/\b(gestion de projets|gerer des projets|piloter des projets|experience.*projets|projets.*experience)\b/));
  add(9, person && has(/\b(motivation|motive|motivee|motivations)\b/));
  add(10, person && has(/\b(pourquoi|raison|raisons)\b/) && has(/\b(candidature|presider|president|presente|presenter|se presenter|candidat)\b/));
  add(11, asks && has(/\b(vision|ambition|ambitions|objectif|objectifs)\b/) && !has(/\b(academy|connect|360|privileges|think tank)\b/));
  add(12, asks && has(/\bnouvelle dynamique\b/));
  add(14, asks && has(/\b(slogan|devise|signature)\b/));
  add(15, asks && has(/\b(gouvernance|engagements de gouvernance)\b/) && !has(/\b(think tank|transparence|inclusion|ecoute|continuite|suivis?|resultats?)\b/));
  add(16, asks && has(/\b(priorites|axes|six priorites|6 priorites)\b/));
  add(39, asks && has(/\bvaleurs\b/));

  // A need expressed by a visitor can point to the relevant proposal.
  add(52, has(/\b(nouveaux? cadres?|nouvelle? cadre|nouvellement|viens d arriver|vient d arriver|viens d integrer|premier mois)\b/) &&
    (asks || has(/\b(mentorat|integration|accueil|accompagnement)\b/)));
  add(53, asks && has(/\b(generations|generation|intergenerationnel|intergenerationnelle|anciens et jeunes|jeunes et anciens)\b/));
  add(54, asks && has(/\b(certifications?|certifiantes?|certifiant|diplomantes?)\b/) && (!person || educationProposal));
  add(55, asks && has(/\b(partager|transmettre|transmission|partage)\b/) && has(/\b(experiences?|competences?|parcours|savoir)\b/));
  add(56, asks && has(/\b(partenaires?|partenariats?|reductions?|remises?)\b/) &&
    has(/\b(privileges|choisis?|choisir|choix|selection|selectionner|selectionnes|negocies|taux|quels|lesquels)\b/));
  add(57, asks && has(/\b(sport|sportives?|sportifs?)\b/) && has(/\b(directions?|inter directions|collegues)\b/));
  add(58, asks && has(/\b(culturels?|culturelles?|familiales?|familiaux|evenements.*famille|activites.*famille)\b/));
  add(59, asks && has(/\b(difficulte|difficultes|difficiles|moment difficile|moments difficiles|coup dur|coups durs|entraide|soutien)\b/) &&
    has(/\b(cadres?|membres?|aide|aider|accompagner|accompagnement|soutien|solidarite|entraide|je|moi|nous)\b/));
  add(60, has(/\bthink tank\b/) && has(/\b(remplace|remplacer|remplacera|gouvernance|direction)\b/));
  add(61, asks && has(/\b(expertises?|competences?|parcours)\b/) && has(/\b(valoriser|valorisees|valorisation|mettre en valeur|mettre en lumiere|reconnaitre|reconnaissance)\b/));
  add(62, asks && has(/\b(inscriptions?|inscrire|participations?|demarches)\b/));
  add(63, asks && has(/\b(suivi|suivis|suivre|resultats|tenir.*promesses|tenus|tableau de bord|rendre.*compte|rendra.*compte|mesurer)\b/) && !has(/\b(etudes|etudie|formation|formations|diplome)\b/));
  add(64, asks && has(/\b(acquis|existant|existantes|continuite|preserver|conserver)\b/));
  add(66, asks && has(/\b(avis|idee|idees|suggestion|suggestions|proposition|propositions)\b/) && has(/\b(donner|partager|soumettre|envoyer|participer|contribuer|exprimer|proposer)\b/));
  add(67, has(/\b(programme|pdf|brochure)\b/) && has(/\b(telecharger|telechargement|recevoir|obtenir|complet|completes|lire|consulter)\b/));

  // Detailed proposals are more useful than their parent initiative when both match.
  if (!ids.length) {
    add(17, has(/\bconnect\b/));
    add(18, has(/\bacademy\b/));
    add(19, has(/\bprivileges\b/) || (asks && (health || has(/\b(avantages?|benefices?|beneficier|reductions?|remises?)\b/))));
    add(20, has(/\btournoi\b/) && has(/\b(numerique|digital)\b/));
    add(21, has(/\bthink tank\b/));
    add(22, has(/\b360\b/));
    add(24, asks && has(/\b(ia|intelligence artificielle)\b/));
    add(23, asks && has(/\b(former|formation|formations|apprendre|competences)\b/) && (!person || educationProposal) && !has(/\b(ia|intelligence artificielle)\b/));
    add(25, asks && has(/\binnovation\b/));
    add(26, asks && has(/\bsolidarite\b/));
    add(27, asks && has(/\bsport\b/));
    add(28, asks && has(/\b(famille|familles|enfants)\b/) && !health);
    add(29, asks && has(/\b(digitalisation|digitaliser|numerisation|moderniser|modernisation)\b/));
    add(30, asks && has(/\b(networking|reseautage|reseau de contacts|rencontrer.*collegues|connaitre.*collegues|elargir.*reseau)\b/));
    add(31, asks && has(/\b(ecoute|ecouter|besoins des membres)\b/));
    add(32, asks && has(/\b(inclusion|inclure|place.*chacun|place.*tous)\b/));
    add(33, asks && has(/\butilite\b/));
    add(34, asks && has(/\btransparence\b/));
    add(45, person && has(/\b(loisirs|hobbies|centres d interet|aime.*faire|temps libre)\b/));
    add(48, asks && has(/\b(concret|concrete|concrets|concretes|concretement|actions|mesures|va changer|vont changer|changer pour|apporter aux|apporter pour)\b/));
    add(51, asks && has(/\b(message central|idee centrale|message principal|en resume|resume du programme)\b/));
  }
  return [...new Set(ids)];
}

function unsupportedRequest(text) {
  // No private biography, precise financial promises, or operational support is in this FAQ.
  if (/\b(salaire|remuneration|fortune|revenus|epouse|marie|mariage|divorce|religion|telephone|portable|email|mail|mot de passe|adresse personnelle|date de naissance|ne le)\b/.test(text)) return true;
  const privateChildren = /\b(ses enfants|enfants du candidat|enfants de (?:mame|youssou|diagne)|a t il (?:des )?enfants|il a (?:des )?enfants|combien.*enfants.*(?:il|candidat|diagne)|(?:il|candidat|diagne).*combien.*enfants)\b/.test(text);
  if (privateChildren) return true;
  if (/\bsonatel\b/.test(text) && /\b(pdg|directeur general|fondateur|fondee|fonde|creation|existe|existence|cree|creee|recrutement|recrute|chiffre d affaires|cours de bourse|cours des actions)\b/.test(text)) return true;
  if (/^(?:qui est|qu est ce que) sonatel$/.test(text)) return true;
  if (/\belection\b/.test(text) || (/\bmandat\b/.test(text) && /\b(duree|durera|combien de temps|quand)\b/.test(text))) return true;
  if (/\b(budget|cout|montant|prix)\b/.test(text) && /\b(famille|familles|familial|familiale)\b/.test(text) && !/\b(acson|programme|initiative|initiatives|activites|activite|privileges)\b/.test(text)) return true;
  if (/\b(expertise|specialite|competences)\b/.test(text) && /\b(sport|sportif|sportive|sante)\b/.test(text) && /\b(son|sa|ses|il|candidat|diagne)\b/.test(text)) return true;
  if (/\b(devenir membre|adherer|adhesion|cotisation)\b/.test(text)) return true;
  return false;
}

export function searchFaq(query, faq) {
  const normalized = normalize(query);
  if (!normalized) return unknown();
  const exact = faq.find((item) => normalize(item.question) === normalized);
  if (exact) return { type: 'answer', items: [exact] };
  if (unsupportedRequest(normalized)) return unknown();

  const words = tokens(query);
  const intentItems = findIntentIds(normalized).map((id) => faq.find((item) => item.id === id)).filter(Boolean);
  if (!words.length) return intentItems.length ? { type: intentItems.length === 1 ? 'answer' : 'choices', items: intentItems.slice(0, 5) } : unknown();
  const knownWords = new Set(faq.flatMap((item) => tokens(`${item.question} ${item.reponse}`)));
  for (const word of ['poste', 'occupe', 'fonction', 'fonctions', 'exerce', 'responsabilites', 'commence', 'commencer', 'piloter', 'assurer']) knownWords.add(word);
  const recognized = words.filter((word) => knownWords.has(word) || conversationalWords.has(word)).length;
  // A familiar keyword alone must not turn a question about another person/product
  // into a fact about this candidate or a promise from the campaign.
  if (recognized / words.length < 0.75) return unknown();
  if (intentItems.length) {
    return { type: intentItems.length === 1 ? 'answer' : 'choices', items: intentItems.slice(0, 5) };
  }

  const ranked = faq.map((item) => {
    const questionWords = tokens(item.question);
    const answerWords = tokens(item.reponse);
    const questionMatches = words.filter((word) => questionWords.includes(word));
    const answerMatches = words.filter((word) => !questionMatches.includes(word) && answerWords.includes(word));
    const matched = questionMatches.length + answerMatches.length;
    const score = questionMatches.length * 4 + answerMatches.length;
    return { item, score, coverage: matched / words.length, questionCoverage: questionMatches.length / words.length };
  }).filter((result) => result.score >= 4 && result.coverage >= 0.5)
    .sort((a, b) => b.score - a.score || b.coverage - a.coverage || a.item.id - b.item.id);
  if (!ranked.length) return unknown();
  const best = ranked[0];
  // A single keyword offers choices; clear questions can match answer wording too.
  if (words.length >= 2 && best.coverage >= 0.8 && best.questionCoverage >= 0.5 && best.score >= 6 && best.score - (ranked[1]?.score || 0) >= 3) {
    return { type: 'answer', items: [best.item] };
  }
  return { type: 'choices', items: ranked.slice(0, 5).map((result) => result.item) };
}

export function isGreeting(text) {
  return /^(bonjour|bonsoir|salut|hello|coucou|merci|merci beaucoup)[ !?.]*$/i.test(text.trim());
}
