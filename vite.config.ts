import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { AliasOptions, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const root = path.resolve(__dirname, "src");

export default defineConfig({
  base: "/",
  plugins: [react(), eslintPlugin(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
        api: "modern",
        additionalData: `
          @use "./src/shared/styles/utilities" as utilities;
          @use "./src/shared/styles/constants" as constants;
        `
      }
    }
  },
  resolve: {
    alias: {
      "@": root
    } as AliasOptions
  },
  build: {
    outDir: "build"
  }
});
