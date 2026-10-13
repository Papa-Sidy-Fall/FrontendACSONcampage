import SectionHeader from './SectionHeader';

export default function Candidate() {
  return (
    <section data-motion-section id="candidat" className="section-pad bg-surface">
      <div className="container-wide grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        <div data-motion="card" className="mx-auto lg:mx-0 w-full max-w-[280px]">
          <img
            src="/assets/image9.jpg"
            alt="Portrait du candidat"
            className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <SectionHeader
            label="L’équipe"
            title="Un projet porté par une équipe"
            intro="Pas de culte de la personnalité — une vision collective, portée par l’expérience et l’engagement."
          />

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { k: 'Parcours', v: 'Cadre Sonatel, engagé au service de l’Amicale.' },
              { k: 'Expérience', v: 'Management, transformation et vie associative.' },
              { k: 'Valeurs', v: 'Écoute, utilité, transparence, continuité.' },
              { k: 'Motivation', v: 'Donner plus de valeur à chaque membre.' },
            ].map((item, index) => (
              <div data-motion="card" style={{ '--motion-delay': `${index * 80}ms` }} key={item.k} className="rounded-xl bg-white border border-navy/8 p-4">
                <p data-motion="rise" className="text-xs font-extrabold uppercase tracking-wider text-orange">{item.k}</p>
                <p data-motion="rise" className="mt-1 text-sm text-navy/75 leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-navy p-5 text-white">
            <p data-motion="rise" className="text-xs font-bold uppercase tracking-wider text-cyan">Pourquoi je m’engage</p>
            <p data-motion="rise" className="mt-2 text-sm md:text-base leading-relaxed text-white/85">
              Parce que l’ACSON mérite une nouvelle dynamique — plus proche, plus utile, plus fédératrice — au service de chaque cadre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
