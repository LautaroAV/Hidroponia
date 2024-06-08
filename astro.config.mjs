import { defineConfig } from 'astro/config';

export default defineConfig({
  // Other configurations...

  output: 'server', // Change this to 'hybrid' if you need some pages to be static
});
