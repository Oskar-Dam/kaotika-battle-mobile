import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), 'VITE_APP');
  const envWithProcessPrefix = {
    'process.env': JSON.stringify(env),
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: 'Final Battle',
          short_name: 'The Final Battle',
          theme_color: '#232428',
          background_color: '#232428',
          orientation: 'portrait',
          display: 'standalone',
          lang: 'en-US',
          start_url: '/index.html',
          icons: [
            {
              sizes: '144x144',
              src: '/icons/icon144.png',
              type: 'image/png',
            },
            {
              purpose: 'maskable',
              sizes: '512x512',
              src: '/icons/icon512_maskable.png',
              type: 'image/png',
            },
            {
              purpose: 'any',
              sizes: '512x512',
              src: '/icons/icon512_rounded.png',
              type: 'image/png',
            },
          ],
        },

        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
        },

        devOptions: {
          enabled: true,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      })
    ],
    define: envWithProcessPrefix,
  };
});
