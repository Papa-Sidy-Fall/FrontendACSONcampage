import { personas } from '../content/site';
import SectionHeader from './SectionHeader';

const colorMap = {
  cyan: 'border-cyan/30 bg-cyan/5',
  orange: 'border-orange/30 bg-orange/5',
  navy: 'border-navy-mid/20 bg-navy/5',
  gold: 'border-gold/40 bg-gold/5',
};

export default function ImpactCards() {
  return (
    <section id="actions" className="section-pad bg-surface">
      <div className="container-wide">
        <SectionHeader
          label="Pour vous"
          title="Concrètement, qu’est-ce que cela change pour moi ?"
          intro="Trouvez votre entrée en une seconde — selon votre situation."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((p) => (
            <article
              key={p.title}
              className={`rounded-2xl border p-5 ${colorMap[p.color] || colorMap.navy}`}
            >
              <h3 className="text-base font-extrabold text-navy leading-snug">Si je suis… {p.title.toLowerCase()}</h3>
              <ul className="mt-3 space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-navy/75">
                    <span className="text-orange font-bold">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
