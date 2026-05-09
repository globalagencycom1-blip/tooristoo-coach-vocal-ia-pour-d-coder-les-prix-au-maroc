import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  logLevel: 'error',
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ],

  build: {
    // ─── Taille cible par chunk : 500 Ko max ──────────────────────
    chunkSizeWarningLimit: 500,

    // ─── Code splitting manuel : sépare les grosses libs ──────────
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — chargé en premier, petit
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI Radix — chargé à la demande
          'radix-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-switch',
            '@radix-ui/react-slider',
            '@radix-ui/react-toast',
          ],

          // Framer Motion — lourd, séparé
          'framer-motion': ['framer-motion'],

          // Three.js — très lourd (500+ Ko), chargé seulement si utilisé
          'three': ['three'],

          // Charts — chargés seulement sur les pages avec graphiques
          'charts': ['recharts'],

          // Carte — chargée seulement sur les pages avec carte
          'maps': ['react-leaflet'],

          // PDF/Canvas — chargés seulement si export activé
          'pdf-tools': ['jspdf', 'html2canvas'],

          // Utilitaires — petits mais souvent appelés
          'utils': ['lodash', 'date-fns', 'clsx', 'tailwind-merge'],

          // Forms
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Icônes — peut être lourd
          'icons': ['lucide-react'],
        },
      },
    },

    // ─── Minification agressive ────────────────────────────────────
    minify: 'esbuild',

    // ─── Retire les source maps en production (-113 Ko) ───────────
    sourcemap: false,

    // ─── Cible navigateurs modernes (bundle plus léger) ───────────
    target: 'es2020',
  },

  // ─── Optimisation des dépendances en dev ──────────────────────
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
    exclude: ['three', 'jspdf', 'html2canvas'], // ne pas pré-bundler les très grosses libs
  },
})
