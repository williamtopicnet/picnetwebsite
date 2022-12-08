import compress from "astro-compress";
import { defineConfig } from "astro/config";
import path from "node:path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  integrations: [compress()],
  vite: {
    resolve: {
      alias: [
        {
          find: "@styles",
          replacement: path.resolve(__dirname, "./src/styles"),
        },
      ],
    },
  },
});
