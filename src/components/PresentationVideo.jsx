import { useState } from 'react';
import { presentationVideoUrl } from '../content/presentation.js';

const source = import.meta.env.VITE_PRESENTATION_VIDEO_URL?.trim() || presentationVideoUrl;
const downloadSource = source?.startsWith('https://res.cloudinary.com/')
  ? source.replace('/video/upload/', '/video/upload/fl_attachment/')
  : source;
const poster = '/videos/presentation-poster.jpg';

export default function PresentationVideo() {
  const [unavailable, setUnavailable] = useState(!source);

  return (
    <figure className="presentation-video mt-5" data-motion="card">
      <figcaption className="mb-3 text-sm font-bold text-white">Vidéo de présentation — 1 min 19</figcaption>
      <div className="presentation-frame">
        {unavailable
          ? <img src={poster} alt="Aperçu de la vidéo de présentation" width="540" height="960" loading="lazy" />
          : <video
              src={source}
              poster={poster}
              controls
              playsInline
              preload="none"
              width="1080"
              height="1920"
              aria-label="Vidéo de présentation du candidat"
              onError={() => setUnavailable(true)}
            />}
      </div>
      {unavailable && <p className="mt-3 text-sm leading-relaxed text-white/85" role="status">
        {source
          ? 'La lecture n’est pas disponible dans ce navigateur. Vous pouvez télécharger la vidéo pour la regarder.'
          : 'La vidéo sera bientôt disponible.'}
      </p>}
      {source && <a className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 transition" href={downloadSource} download>
        Télécharger la vidéo ↓
      </a>}
    </figure>
  );
}
