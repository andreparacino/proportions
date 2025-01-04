import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

const root = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
});
