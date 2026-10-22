import { useRef, useState } from 'react';
import { presentationVideos } from '../content/presentation.js';

const videos = presentationVideos.map((video, index) => ({
  ...video,
  source: (index === 0 && import.meta.env.VITE_PRESENTATION_VIDEO_URL?.trim()) || video.source,
}));

export default function PresentationVideo() {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const video = videos[index];
  const { source, poster } = video;
  const downloadSource = source.startsWith('https://res.cloudinary.com/')
    ? source.replace('/video/upload/', '/video/upload/fl_attachment/')
    : source;

  function changeVideo(nextIndex) {
    if (nextIndex < 0 || nextIndex >= videos.length) return;
    videoRef.current?.pause();
    setIndex(nextIndex);
    setStarted(false);
    setPlayFailed(false);
    setUnavailable(false);
  }

  async function play() {
    const player = videoRef.current;
    if (!player) return;
    setPlayFailed(false);
    setStarted(true);
    player.focus({ preventScroll: true });
    try {
      await player.play();
    } catch {
      // Keep the native controls available if the browser declines scripted playback.
      if (videoRef.current === player) setPlayFailed(true);
    }
  }

  return (
    <figure className="presentation-video">
      <figcaption className="presentation-caption">
        <p className="presentation-eyebrow" aria-live="polite" aria-atomic="true">{video.title}</p>
        <p className="presentation-name">Mame Youssou Diagne</p>
      </figcaption>
      <div className="presentation-frame">
        {unavailable
          ? <img src={poster} alt={`Aperçu : ${video.title}`} width={video.width} height={video.height} loading="eager" />
          : <video
              key={video.id}
              ref={videoRef}
              src={source}
              poster={poster}
              controls={started}
              playsInline
              preload="none"
              width={video.width}
              height={video.height}
              aria-label={`${video.title} de Mame Youssou Diagne`}
              tabIndex={started ? 0 : -1}
              onError={() => setUnavailable(true)}
            />}
        {!unavailable && !started && <button
          type="button"
          className="presentation-play"
          aria-label={`Lire la vidéo : ${video.title} de Mame Youssou Diagne`}
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
      <nav className="presentation-navigation" aria-label="Choisir une vidéo">
        <button type="button" onClick={() => changeVideo(index - 1)} disabled={index === 0}>
          <span aria-hidden="true">←</span> Précédent
        </button>
        <span className="presentation-position" role="status" aria-label={`Vidéo ${index + 1} sur ${videos.length}`}>
          {index + 1} / {videos.length}
        </span>
        <button type="button" onClick={() => changeVideo(index + 1)} disabled={index === videos.length - 1}>
          Suivant <span aria-hidden="true">→</span>
        </button>
      </nav>
      <div className="presentation-footer">
        <span>Durée · {video.duration}</span>
        {source && <a href={downloadSource} download aria-label={`Télécharger : ${video.title}`}>
          Télécharger <span aria-hidden="true">↓</span>
        </a>}
      </div>
    </figure>
  );
}
