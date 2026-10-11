import useDialog from '../hooks/useDialog';

export default function PriorityModal({ priority, onClose }) {
  const dialogRef = useDialog(Boolean(priority), onClose);
  if (!priority) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="priority-title"
      ref={dialogRef}
    >
      <div
        className="dialog-enter w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={priority.image} alt="" className="h-40 w-full object-cover" />

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan">{priority.num} — {priority.title}</p>
              <h3 id="priority-title" className="mt-1 text-xl font-extrabold text-navy">{priority.project}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-navy/10 px-3 py-1 text-sm font-bold text-navy/60 hover:bg-surface"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-orange">Besoin</p>
              <p className="mt-1 text-navy/75 leading-relaxed">{priority.need}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-cyan">Notre réponse</p>
              <p className="mt-1 text-navy/75 leading-relaxed">{priority.response}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-navy-mid">Actions</p>
              <ul className="mt-2 grid gap-1.5">
                {priority.actions.map((action) => (
                  <li key={action} className="flex gap-2 text-navy/75">
                    <span className="text-orange">→</span> {action}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-surface px-4 py-3">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-gold">Résultat attendu</p>
              <p className="mt-1 font-semibold text-navy">{priority.result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
