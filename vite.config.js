import { defineConfig } from "vite";

export default defineConfig({
    base: '/sf2_minimal/',  
    // from here:
    esbuild: {
        supported: {
          'top-level-await': true //browsers can handle top-level-await features
        },
      },
})