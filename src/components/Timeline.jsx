import { timeline } from '../content/site';
import SectionHeader from './SectionHeader';

export default function Timeline() {
  return (
    <section data-motion-section className="section-pad bg-navy text-white overflow-hidden">
      <div className="container-wide">
        <SectionHeader
          label="2026–2027"
          title="Les premiers résultats que nous voulons voir"
          intro="Une feuille de route simple — des actions visibles dès la première année."
          light
        />

        <div className="relative mt-4">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-white/15" />
          <div className="grid md:grid-cols-4 gap-4">
            {timeline.map((step, i) => (
              <article data-motion="card" style={{ '--motion-delay': `${i * 100}ms` }} key={step.period} className="relative rounded-2xl border border-white/12 bg-white/5 p-4 md:p-5">
                <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-orange text-xs font-extrabold">
                  {i + 1}
                </span>
                <p data-motion="rise" className="mt-3 text-xs font-bold uppercase tracking-wider text-cyan">{step.period}</p>
                <p data-motion="rise" className="mt-1 text-sm md:text-base font-semibold leading-snug">{step.label}</p>
              </article>
            ))}
          </div>
        </div>

        <p data-motion="rise" className="mt-10 text-center text-base md:text-lg font-extrabold text-orange">
          Première année = actions visibles, mesurables et partagées.
        </p>
      </div>
    </section>
  );
}
