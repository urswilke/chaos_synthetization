import { defineConfig } from "vite";

export default defineConfig({
    base: '/chaos_synthetization/',  
    // from here:
    esbuild: {
        supported: {
          'top-level-await': true //browsers can handle top-level-await features
        },
      },
})