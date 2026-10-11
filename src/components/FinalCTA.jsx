import { site } from '../content/site';
import MotionText from './MotionText';

export default function FinalCTA() {
  return (
    <section data-motion-section className="final-cta relative overflow-hidden bg-gradient-to-br from-navy via-navy-mid to-navy py-16 md:py-20 text-white text-center">
      <div className="container-narrow relative">
        <h2 data-motion="words" className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
          <MotionText text={site.signature} />
        </h2>
        <p data-motion="rise" className="mx-auto mt-4 max-w-lg text-sm md:text-base text-white/80 leading-relaxed">
          Rassembler les talents · Valoriser les expériences · Inspirer les générations · Agir concrètement
        </p>
        <div data-motion="rise" className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#priorites"
            className="inline-flex justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-xl"
          >
            Découvrir le programme
          </a>
          <a
            href="#participer"
            className="inline-flex justify-center rounded-full border-2 border-white/35 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
          >
            Partager une idée
          </a>
        </div>
      </div>
    </section>
  );
}
