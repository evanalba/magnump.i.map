import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import path from 'path';
import fs from 'fs';


// localhost part
dns.setDefaultResultOrder('verbatim');

function getHtmlFiles(dir) {
  const files = {};
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.html')) {
      const name = path.basename(file, '.html');
      files[name] = path.resolve(__dirname, dir, file);
    }
  });
  return files;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),        
        ...getHtmlFiles(path.resolve(__dirname, 'public', 'html')),
      },
    },
  },
});
