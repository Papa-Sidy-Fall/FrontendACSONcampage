import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { isGreeting, searchFaq } from './faqSearch.js';

const faq = JSON.parse(readFileSync(new URL('../content/faq.json', import.meta.url)));

test('les 67 questions retrouvent leur propre réponse, accents et ponctuation compris', () => {
  assert.equal(faq.length, 67);
  assert.equal(new Set(faq.map((item) => item.id)).size, 67);
  for (const item of faq) {
    const result = searchFaq(item.question, faq);
    assert.equal(result.type, 'answer');
    assert.equal(result.items[0].id, item.id);
  }
});
test('une demande claire sur le budget conserve la limite du programme', () => {
  assert.equal(searchFaq('Quel budget est prévu ?', faq).items[0].id, 50);
});
test('la formation ambiguë propose plusieurs questions sans choisir une réponse', () => {
  const result = searchFaq('formation', faq);
  assert.equal(result.type, 'choices');
  assert.ok(result.items.some((item) => item.id === 3));
  assert.ok(result.items.some((item) => item.id === 23));
});
test('les variantes de mots permettent de retrouver le mentorat d’accueil', () => {
  const result = searchFaq('Comment accueillir les nouveaux cadres ?', faq);
  assert.equal(result.type, 'answer');
  assert.equal(result.items[0].id, 52);
});
test('une demande hors programme et une saisie vide ne produisent pas de réponse', () => {
  for (const query of ['astronomie sur Mars', '   ', 'qui ?']) {
    assert.deepEqual(searchFaq(query, faq), { type: 'unknown', items: [] });
  }
});
test('un mélange de thèmes reste une sélection de questions', () => {
  assert.equal(searchFaq('budget sport', faq).type, 'choices');
});
test('les salutations sont reconnues sans avaler une question', () => {
  assert.ok(isGreeting('Bonjour !'));
  assert.ok(isGreeting('Merci beaucoup'));
  assert.equal(isGreeting('Bonjour quel budget est prévu ?'), false);
});

test('les paraphrases publiques retrouvent les faits du candidat', () => {
  const cases = [
    ['Pouvez-vous me présenter Mame Youssou Diagne ?', 1],
    ['Il a quel âge ?', 2],
    ['Il a étudié quoi ?', 3],
    ['Quelles études a suivi Mame Youssou ?', 3],
    ['Ça fait combien d’années qu’il travaille chez Sonatel ?', 4],
    ['Il est à Sonatel depuis longtemps ?', 4],
    ['Depuis quand travaille le candidat chez Sonatel ?', 4],
    ['Quel poste occupe-t-il maintenant ?', 5],
    ['Quelle est sa spécialité ?', 6],
    ['Quelle expérience a-t-il pour piloter des projets ?', 8],
    ['Qu’est-ce qui motive le candidat ?', 9],
    ['Pourquoi est-il candidat ?', 10],
    ['Quelle est son ambition pour nous ?', 11],
  ];
  for (const [query, id] of cases) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, id, query);
    assert.equal(result.items[0].reponse, faq.find((item) => item.id === id).reponse);
  }
});

test('les besoins personnels pointent vers une proposition existante', () => {
  const cases = [
    ['Je suis nouveau cadre, comment pouvez-vous m’aider ?', 52],
    ['Je viens d’arriver à Sonatel et je veux être accompagné', 52],
    ['J’aimerais me former en intelligence artificielle', 24],
    ['Quelle formation son programme prévoit-il pour les cadres ?', 23],
    ['Quelles formations certifiantes propose-t-il ?', 54],
    ['Je veux obtenir une certification', 54],
    ['Comment élargir mon réseau de contacts ?', 30],
    ['Comment puis-je partager mon expérience ?', 55],
    ['Quels avantages sont prévus pour les membres ?', 19],
    ['Comment peux-tu aider les familles ?', 28],
    ['Comment aider les cadres qui traversent des moments difficiles ?', 59],
    ['Comment mettre en valeur les compétences des cadres ?', 61],
    ['Comment faciliter les inscriptions ?', 62],
    ['Comment mesurer les résultats des engagements ?', 63],
    ['Comment conserver les acquis ?', 64],
    ['Je voudrais proposer une idée', 66],
  ];
  for (const [query, id] of cases) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, id, query);
  }
});

test('les demandes libres distinguent initiatives, ambition et actions', () => {
  const cases = [
    ['Tu peux me parler d’ACSON Connect ?', 17],
    ['Expliquez-moi ACSON Academy', 18],
    ['À quoi va servir ACSON 360 ?', 22],
    ['Quelle est la devise ?', 14],
    ['Quels sont les axes ?', 16],
    ['Comment favoriser l’inclusion ?', 32],
    ['Comment assurer la transparence ?', 34],
    ['Concrètement qu’est-ce qui va changer pour nous ?', 48],
    ['Comment obtenir la brochure complète ?', 67],
  ];
  for (const [query, id] of cases) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, id, query);
  }
});

test('les demandes de chiffres ou de dates conservent les limites connues', () => {
  for (const [query, id] of [
    ['Combien va coûter ACSON Academy ?', 50],
    ['Quel financement pour les initiatives ?', 50],
    ['Quelle est la date de lancement d’ACSON Academy ?', 49],
    ['Quand va commencer le programme ?', 49],
  ]) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, id, query);
    assert.equal(result.items[0].reponse, faq.find((item) => item.id === id).reponse);
  }
});

test('un mot connu ne fabrique pas de biographie privée ni de réponse hors sujet', () => {
  for (const query of [
    'Quel âge a Emmanuel Macron ?',
    'Quelle est sa formation à Mark Zuckerberg ?',
    'Qui est le candidat Macron ?',
    'Quel est son salaire chez Sonatel ?',
    'Combien gagne Mame Youssou Diagne ?',
    'Quel est son numéro de téléphone ?',
    'Donne son adresse personnelle',
    'Comment s’appelle son épouse ?',
    'Combien d’enfants a le candidat ?',
    'Quelle est sa date de naissance ?',
    'Quel est le mot de passe du candidat ?',
    'Quel budget pour la NASA ?',
    'Combien coûte un billet d’avion pour Paris ?',
    'Qui est Sonatel ?',
    'Qui est le PDG de Sonatel ?',
    'Quelle est la météo sur Mars ?',
    'Écris un programme Python qui joue aux échecs',
  ]) {
    assert.deepEqual(searchFaq(query, faq), { type: 'unknown', items: [] }, query);
  }
});

test('plusieurs intentions distinctes proposent leurs réponses sans en inventer une', () => {
  const result = searchFaq('Quel âge a-t-il et quelle est sa formation ?', faq);
  assert.equal(result.type, 'choices');
  assert.deepEqual(result.items.map((item) => item.id), [2, 3]);
});

test('une durée générale ou l’ancienneté de Sonatel ne devient pas celle du candidat', () => {
  for (const query of [
    'Combien de temps durera son mandat ?',
    'Combien de temps avant son élection ?',
    'Sonatel existe depuis combien d’années ?',
    'Depuis quand Sonatel existe ?',
  ]) {
    assert.deepEqual(searchFaq(query, faq), { type: 'unknown', items: [] }, query);
  }
  for (const query of [
    'Combien de temps travaille-t-il à Sonatel ?',
    'Quelle est l’ancienneté du candidat ?',
    'En quelle année Mame Youssou a-t-il rejoint Sonatel ?',
  ]) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, 4, query);
  }
});

test('une demande de budget familial, d’adhésion ou de compétence sportive reste sans fait inventé', () => {
  for (const query of [
    'Quel est le budget de la famille ?',
    'Quel est le budget de ma famille ?',
    'Quelle est son expertise pour le sport ?',
    'Comment puis-je devenir membre ?',
    'Comment adhérer à l’ACSON ?',
  ]) {
    assert.deepEqual(searchFaq(query, faq), { type: 'unknown', items: [] }, query);
  }
  assert.equal(searchFaq('Quel budget pour les activités familiales du programme ACSON ?', faq).items[0].id, 50);
});

test('les enfants du visiteur sont distingués de la vie privée du candidat', () => {
  for (const query of [
    'Qu’est-ce qu’il propose pour mes enfants ?',
    'Quelles propositions pour nos enfants ?',
  ]) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, 28, query);
  }
  for (const query of [
    'Combien d’enfants a le candidat ?',
    'Quels sont les prénoms de ses enfants ?',
    'A-t-il des enfants ?',
  ]) {
    assert.deepEqual(searchFaq(query, faq), { type: 'unknown', items: [] }, query);
  }
});

test('le parcours libre, les valeurs combinées et la santé retrouvent les bons contenus', () => {
  assert.equal(searchFaq('Quel est son parcours ?', faq).items[0].id, 1);
  const combined = searchFaq('Qui est Mame Youssou Diagne et quelles sont ses valeurs ?', faq);
  assert.equal(combined.type, 'choices');
  assert.deepEqual(combined.items.map((item) => item.id), [1, 39]);
  for (const query of [
    'Qu’est-ce qui est proposé pour la santé de ma famille ?',
    'Que prévoit le programme pour la santé des familles ?',
  ]) {
    const result = searchFaq(query, faq);
    assert.equal(result.type, 'answer', query);
    assert.equal(result.items[0].id, 19, query);
  }
});
