import MotionText from './MotionText';

export default function SectionHeader({ label, title, intro, light = false }) {
  return (
    <header className="mb-10 md:mb-12 max-w-2xl">
      {label && (
        <p className={`text-xs font-bold uppercase tracking-[0.14em] mb-2 ${light ? 'text-orange-300' : 'text-orange'}`}>
          {label}
        </p>
      )}
      <h2 data-motion="words" className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight ${light ? 'text-white' : 'text-navy'}`}>
        <MotionText text={title} />
      </h2>
      {intro && (
        <p data-motion="rise" className={`mt-3 text-base md:text-lg leading-relaxed ${light ? 'text-white/80' : 'text-navy/70'}`}>
          {intro}
        </p>
      )}
    </header>
  );
}

