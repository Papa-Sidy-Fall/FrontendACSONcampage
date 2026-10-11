import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { presentationVideoUrl } from './src/content/presentation.js'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), {
    name: 'check-presentation-video',
    apply: 'build',
    buildStart() {
      const source = loadEnv(mode, process.cwd(), 'VITE_').VITE_PRESENTATION_VIDEO_URL?.trim() || presentationVideoUrl
      if (!source) this.error('Ajoutez VITE_PRESENTATION_VIDEO_URL dans Vercel avec l’URL publique directe de la vidéo Cloudinary, puis relancez le déploiement.')
      let url
      try { url = new URL(source) } catch { this.error('VITE_PRESENTATION_VIDEO_URL doit contenir une URL vidéo HTTPS complète.') }
      if (url.protocol !== 'https:') this.error('VITE_PRESENTATION_VIDEO_URL doit utiliser HTTPS.')
    },
  }],
}))
