import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vey } from './lang/vite.ts';

export default defineConfig({
  plugins: [vey(), react()],
  build: { rolldownOptions: { input: { main: 'index.html', hub: 'hub/index.html' } } },
  server: { allowedHosts: ['clikey.store', 'www.clikey.store'] },
});
