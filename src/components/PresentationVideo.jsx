import { useRef, useState } from 'react';
import { presentationVideoUrl } from '../content/presentation.js';

const source = import.meta.env.VITE_PRESENTATION_VIDEO_URL?.trim() || presentationVideoUrl;
const downloadSource = source?.startsWith('https://res.cloudinary.com/')
  ? source.replace('/video/upload/', '/video/upload/fl_attachment/')
  : source;
const poster = '/videos/presentation-poster.jpg';

export default function PresentationVideo() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(!source);

  async function play() {
    setPlayFailed(false);
    setStarted(true);
    videoRef.current.focus({ preventScroll: true });
    try {
      await videoRef.current.play();
    } catch {
      // Keep the native controls available if the browser declines scripted playback.
      setPlayFailed(true);
    }
  }

  return (
    <figure className="presentation-video">
      <figcaption className="presentation-caption">
        <p className="presentation-eyebrow">Le candidat vous parle</p>
        <p className="presentation-name">Mame Youssou Diagne</p>
      </figcaption>
      <div className="presentation-frame">
        {unavailable
          ? <img src={poster} alt="Mame Youssou Diagne dans sa vidéo de présentation" width="540" height="960" loading="eager" />
          : <video
              ref={videoRef}
              src={source}
              poster={poster}
              controls={started}
              playsInline
              preload="none"
              width="1080"
              height="1920"
              aria-label="Vidéo de présentation du candidat"
              tabIndex={started ? 0 : -1}
              onError={() => setUnavailable(true)}
            />}
        {!unavailable && !started && <button
          type="button"
          className="presentation-play"
          aria-label="Lire la vidéo de présentation de Mame Youssou Diagne"
          onClick={play}
        >
          <span className="presentation-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 5v14l11-7z" /></svg>
          </span>
          <span className="presentation-play-label">Lire la vidéo</span>
        </button>}
      </div>
      {playFailed && !unavailable && <p className="mt-3 text-sm leading-relaxed text-white/85" role="status">
        Utilisez le bouton de lecture du lecteur ou téléchargez la vidéo.
      </p>}
      {unavailable && <p className="mt-3 text-sm leading-relaxed text-white/85" role="status">
        {source
          ? 'La lecture n’est pas disponible dans ce navigateur. Vous pouvez télécharger la vidéo pour la regarder.'
          : 'La vidéo sera bientôt disponible.'}
      </p>}
      <div className="presentation-footer">
        <span>Présentation · 1 min 19</span>
        {source && <a href={downloadSource} download aria-label="Télécharger la vidéo de présentation">
          Télécharger <span aria-hidden="true">↓</span>
        </a>}
      </div>
    </figure>
  );
}
