import { engagements } from '../content/site';
import SectionHeader from './SectionHeader';
import MotionText from './MotionText';

export default function Engagements() {
  return (
    <section data-motion-section className="section-pad bg-white">
      <div className="container-wide">
        <SectionHeader
          label="Gouvernance"
          title="5 engagements. 5 phrases."
          intro="Pas de longs discours — des principes clairs et vérifiables."
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {engagements.map((e, i) => (
            <article
              key={e.title}
              data-motion="card"
              className="rounded-2xl bg-navy p-4 md:p-5 text-white text-center hover:-translate-y-1 transition-transform"
              style={{ marginTop: i % 2 ? '0.5rem' : 0, '--motion-delay': `${i * 80}ms` }}
            >
              <h3 data-motion="words" className="text-sm md:text-base font-extrabold text-orange"><MotionText text={e.title} /></h3>
              <p data-motion="rise" className="mt-2 text-xs md:text-sm text-white/75 leading-relaxed">{e.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
