import { useState } from 'react';
import { priorities } from '../content/site';
import SectionHeader from './SectionHeader';
import PriorityModal from './PriorityModal';

export default function Priorities() {
  const [active, setActive] = useState(null);

  return (
    <section id="priorites" className="section-pad bg-white">
      <div className="container-wide">
        <SectionHeader
          label="Programme"
          title="6 priorités. 6 projets concrets."
          intro="Une phrase par priorité. Le détail en un clic — pas un long document à lire."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {priorities.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <img src={p.image} alt="" className="h-36 w-full object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <p className="text-xs font-extrabold text-cyan">{p.num}</p>
                <h3 className="mt-1 text-lg font-extrabold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed flex-1">{p.hook}</p>
                <p className="mt-3 text-sm font-bold text-orange">{p.project}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-surface px-2 py-0.5 text-[0.65rem] font-semibold text-navy/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="mt-4 w-full rounded-full border border-navy/12 py-2.5 text-sm font-bold text-navy hover:bg-navy hover:text-white transition"
                >
                  Découvrir
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <PriorityModal priority={active} onClose={() => setActive(null)} />
    </section>
  );
}
