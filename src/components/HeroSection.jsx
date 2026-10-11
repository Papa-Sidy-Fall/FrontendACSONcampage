import { site } from '../content/site';
import HeroScene from './HeroScene';

export default function HeroSection() {
  return (
    <section id="accueil" className="relative min-h-[92vh] flex items-end bg-navy text-white overflow-hidden">
      <img
        src="/assets/image1.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/40" />
      <HeroScene />

      <div className="container-wide hero-copy relative pb-24 pt-28 md:pb-32 md:pt-36">
        <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-200">
          {site.name}
        </p>

        <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.05] tracking-tight">
          Ensemble,<br />
          <span className="text-orange">donnons une nouvelle dynamique</span><br />
          à l’ACSON
        </h1>

        <p className="mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
          {site.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-cyan">
          {site.keywords.map((word, i) => (
            <span key={word} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/30">•</span>}
              {word}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#vision"
            className="inline-flex justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange/30 hover:bg-orange/90 transition"
          >
            Découvrir notre vision
          </a>
          <a
            href="#priorites"
            className="inline-flex justify-center rounded-full border-2 border-white/40 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
          >
            Nos 6 priorités
          </a>
        </div>
      </div>
    </section>
  );
}
