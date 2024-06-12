import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Other configurations...

  output: 'server' // Change this to 'hybrid' if you need some pages to be static
  ,

  integrations: [icon(), react()]
});