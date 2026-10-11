import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { closeSync, existsSync, openSync, readSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), {
    name: 'check-presentation-video',
    apply: 'build',
    buildStart() {
      if (loadEnv(mode, process.cwd(), 'VITE_').VITE_PRESENTATION_VIDEO_URL) return
      const video = new URL('./public/videos/presentation-acson.mov', import.meta.url)
      if (!existsSync(video)) {
        this.error('Vidéo manquante : récupérez l’original avec git lfs pull, ou configurez VITE_PRESENTATION_VIDEO_URL.')
      }
      const file = openSync(video, 'r')
      const header = Buffer.alloc(128)
      try { readSync(file, header, 0, header.length, 0) } finally { closeSync(file) }
      if (header.toString().startsWith('version https://git-lfs.github.com/spec/v1')) {
        this.error('La vidéo est un pointeur Git LFS : dans Vercel, activez Settings → Git → Git LFS, puis relancez le déploiement. En local, exécutez git lfs pull.')
      }
    },
  }],
}))
