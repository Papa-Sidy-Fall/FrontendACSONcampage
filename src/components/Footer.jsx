import { navLinks, site } from '../content/site';

export default function Footer() {
  return (
    <footer data-motion-section className="bg-navy py-10 text-white/70">
      <div className="container-wide grid md:grid-cols-2 gap-6 items-end">
        <div>
          <p data-motion="rise" className="text-white font-extrabold">{site.name}</p>
          <p data-motion="rise" className="mt-1 text-sm">Amicale des Cadres de Sonatel — Programme de mandat</p>
        </div>
        <nav data-motion="rise" className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm hover:text-white transition">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p data-motion="rise" className="container-wide mt-8 pt-6 border-t border-white/10 text-xs text-center md:text-left">
        © 2026 ACSON. Tous droits réservés.
      </p>
    </footer>
  );
}
