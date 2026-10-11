import { news } from '../content/site';
import SectionHeader from './SectionHeader';

export default function News() {
  return (
    <section data-motion-section id="actualites" className="section-pad bg-white">
      <div className="container-wide">
        <SectionHeader
          label="Campagne"
          title="Notre campagne en action"
          intro="Des formats courts — rencontres, vidéos, propositions."
        />

        <div className="grid sm:grid-cols-3 gap-4">
          {news.map((item, index) => (
            <article
              key={item.title}
              data-motion="card"
              style={{ '--motion-delay': `${index * 100}ms` }}
              className="rounded-2xl border border-navy/8 p-5 hover:shadow-md hover:border-cyan/25 transition"
            >
              <span className="inline-block rounded-full bg-orange/10 px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-orange">
                {item.type}
              </span>
              <h3 data-motion="rise" className="mt-3 text-base font-extrabold text-navy">{item.title}</h3>
              <p data-motion="rise" className="mt-1 text-sm text-navy/65">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
