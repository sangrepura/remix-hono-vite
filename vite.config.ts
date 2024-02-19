import devServer, { defaultOptions } from "@hono/vite-dev-server";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { resolve } from 'path';
import { PluginOption, defineConfig } from "vite";


export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'), // Resolve `~` to the root directory
    },
  },
  plugins: [
    remix({
      serverBuildFile: "remix.js",
    }) as PluginOption, // Add the type assertion to PluginOption
    devServer({
      injectClientScript: false,
      entry: "./server/index.ts", // The file path of your server.
      exclude: [/^\/(app)\/.+/, ...defaultOptions.exclude],
    }),
  ],
});
