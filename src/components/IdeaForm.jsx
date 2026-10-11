import { useState } from 'react';
import { ideaCategories } from '../content/site';
import SectionHeader from './SectionHeader';

export default function IdeaForm() {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!idea.trim()) return;
    const ideas = JSON.parse(localStorage.getItem('acson_ideas') || '[]');
    ideas.push({ idea: idea.trim(), category, date: new Date().toISOString() });
    localStorage.setItem('acson_ideas', JSON.stringify(ideas));
    setIdea('');
    setCategory('');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="participer" className="section-pad bg-surface pb-28 lg:pb-24">
      <div className="container-narrow">
        <SectionHeader
          label="Votre voix compte"
          title="Une idée pour l’ACSON ?"
          intro="Si vous pouviez améliorer une seule chose à l’ACSON, laquelle serait-elle ? Pas de données personnelles — juste votre idée."
        />

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-navy/8 p-5 md:p-6 shadow-sm">
          <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">
            Catégorie (facultatif)
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-navy/10 bg-surface px-3 py-2.5 text-sm text-navy mb-4"
          >
            <option value="">Choisir une catégorie</option>
            {ideaCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label htmlFor="idea" className="block text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">
            Votre idée
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
            rows={4}
            placeholder="Ex. : Un parcours d’intégration pour les nouveaux cadres dès le premier mois…"
            className="w-full rounded-xl border border-navy/10 bg-surface px-3 py-2.5 text-sm text-navy resize-y"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-orange py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange/25 hover:bg-orange/90 transition"
          >
            Je propose mon idée
          </button>

          {sent && (
            <p className="mt-3 text-center text-sm font-semibold text-cyan">
              Merci — votre idée a bien été enregistrée.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
