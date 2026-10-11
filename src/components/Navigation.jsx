import { useEffect, useState } from 'react';
import { navLinks, site } from '../content/site';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('keydown', close);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
        }`}
        data-light={scrolled || open}
      >
        <div className="container-wide flex h-16 items-center justify-between gap-3">
          <a href="#accueil" className="brand-link flex items-center gap-2 min-w-0" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-[0.6rem] font-extrabold text-white">
              AC
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-sm font-bold text-navy">{site.name}</strong>
              <span className="block truncate text-[0.65rem] font-semibold uppercase tracking-wide text-orange">
                Mandat 2026–2030
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="desktop-nav-link text-sm font-semibold text-navy/70 hover:text-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#participer"
            className="hidden sm:inline-flex rounded-full bg-orange px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange/25 hover:bg-orange/90 transition"
          >
            Partager une idée
          </a>

          <button
            type="button"
            className="menu-toggle lg:hidden rounded-lg border border-navy/10 px-3 py-2 text-navy"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Navigation principale" className="lg:hidden border-t border-navy/10 bg-white px-4 py-3">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#participer"
                className="mt-2 rounded-full bg-orange px-4 py-2.5 text-center text-sm font-bold text-white"
                onClick={() => setOpen(false)}
              >
                Partager une idée
              </a>
            </div>
          </nav>
        )}
      </header>

      <nav
        aria-label="Navigation mobile rapide"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 backdrop-blur-md lg:hidden"
      >
        <div className="grid grid-cols-3 gap-1 px-2 py-2">
          <a href="#vision" className="rounded-lg py-2 text-center text-[0.68rem] font-bold text-navy/80">Vision</a>
          <a href="#priorites" className="rounded-lg py-2 text-center text-[0.68rem] font-bold text-navy/80">Priorités</a>
          <a href="#participer" className="rounded-lg bg-orange py-2 text-center text-[0.68rem] font-bold text-white">Participer</a>
        </div>
      </nav>
    </>
  );
}
