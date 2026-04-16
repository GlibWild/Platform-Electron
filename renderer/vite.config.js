import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',   // 关键：让打包后的资源路径相对化
  build: {
    outDir: 'dist'
  }
});
