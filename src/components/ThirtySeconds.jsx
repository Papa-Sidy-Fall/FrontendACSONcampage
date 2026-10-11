import { pillars30 } from '../content/site';
import SectionHeader from './SectionHeader';

export default function ThirtySeconds() {
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <SectionHeader
          label="En bref"
          title="Notre projet en 30 secondes"
          intro="Quatre idées. Zéro jargon. Tout ce qu’il faut retenir."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars30.map((item) => (
            <article
              key={item.num}
              className="group rounded-2xl border border-navy/8 bg-surface p-5 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl text-orange">{item.icon}</span>
                <span className="text-xs font-extrabold text-cyan">{item.num}</span>
              </div>
              <h3 className="text-lg font-extrabold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
