import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vey } from './lang/vite.ts';

export default defineConfig({
  plugins: [vey(), react()],
  server: { allowedHosts: ['clikey.store', 'www.clikey.store'] },
});
