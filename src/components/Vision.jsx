import { vision } from '../content/site';
import SectionHeader from './SectionHeader';

export default function Vision() {
  return (
    <section id="vision" className="section-pad bg-navy text-white">
      <div className="container-narrow text-center">
        <SectionHeader label="Notre vision" title="Une communauté qui pèse" light />

        <blockquote className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-3xl font-bold leading-snug text-white">
          « {vision.main} »
        </blockquote>
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
          {vision.sub}
        </p>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-2 sm:gap-4">
          {['Profils', 'Talents', 'Transmission', 'Opportunités'].map((label, i, arr) => (
            <div key={label} className="flex items-center gap-2 sm:gap-4">
              <div className="text-center">
                <span className="grid h-10 w-10 mx-auto place-items-center rounded-full bg-white/10 text-sm font-bold border border-white/15">
                  {i + 1}
                </span>
                <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-wider text-white/60">{label}</span>
              </div>
              {i < arr.length - 1 && <span className="text-white/25 hidden sm:inline">→</span>}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-cyan font-bold">
          Intelligence collective · Leadership · Solidarité
        </p>
      </div>
    </section>
  );
}
