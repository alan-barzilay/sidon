import { defineConfig } from 'astro/config';

import astroI18next from "astro-i18next";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), astroI18next(), prefetch()]
});