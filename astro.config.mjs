import { defineConfig } from 'astro/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  // Other configurations...

  output: 'server' // Change this to 'hybrid' if you need some pages to be static
  ,
  integrations: [icon()]
});