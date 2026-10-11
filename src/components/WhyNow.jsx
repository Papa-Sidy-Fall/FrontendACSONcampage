import { whyNow } from '../content/site';
import SectionHeader from './SectionHeader';

export default function WhyNow() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeader label="Pourquoi maintenant ?" title="Continuité, pas rupture" intro={whyNow.intro} />
          <p className="text-navy/80 text-base md:text-lg leading-relaxed">{whyNow.goal}</p>

          <div className="mt-8 grid gap-3">
            {whyNow.items.map((item) => (
              <div key={item.title} className="rounded-xl bg-white border border-navy/8 px-4 py-3.5">
                <strong className="block text-navy font-extrabold">{item.title}</strong>
                <span className="text-sm text-navy/65">{item.line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src="/assets/image2.jpg"
            alt="Équipe de cadres en collaboration"
            className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-4 -left-4 max-w-[220px] rounded-xl bg-navy px-4 py-3 text-white shadow-lg hidden sm:block">
            <p className="text-xs uppercase tracking-wider text-orange-300 font-bold">Notre position</p>
            <p className="text-sm mt-1 leading-snug">Préserver, renforcer, moderniser — ensemble.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
