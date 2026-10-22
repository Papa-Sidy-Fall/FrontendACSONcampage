import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { presentationVideos } from './src/content/presentation.js'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), {
    name: 'check-presentation-video',
    apply: 'build',
    buildStart() {
      const override = loadEnv(mode, process.cwd(), 'VITE_').VITE_PRESENTATION_VIDEO_URL?.trim()
      for (const [index, video] of presentationVideos.entries()) {
        const source = (index === 0 && override) || video.source
        let url
        try { url = new URL(source) } catch { this.error(`L’URL de la vidéo « ${video.title} » doit être une URL HTTPS complète.`) }
        if (url.protocol !== 'https:') this.error(`L’URL de la vidéo « ${video.title} » doit utiliser HTTPS.`)
      }
    },
  }],
}))
