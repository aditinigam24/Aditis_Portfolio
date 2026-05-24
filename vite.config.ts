import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const plugins = [];

if (process.env.NETLIFY === "true" || process.env.USE_NETLIFY_PLUGIN === "1") {
  const netlify = (await import("@netlify/vite-plugin-tanstack-start")).default;
  plugins.push(netlify());
}

if (process.env.VERCEL === "1" || process.env.USE_NITRO === "1") {
  const { nitro } = await import("nitro/vite");
  plugins.push(nitro());
}

// Local dev: no Netlify/Nitro plugins. Vercel sets VERCEL=1 on build; use `npm run build:vercel` locally.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins,
  vite: {
    server: {
      port: 5173,
    },
  },
});
