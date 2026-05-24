process.env.USE_NETLIFY_PLUGIN = "1";
const { spawnSync } = await import("node:child_process");
const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
process.exit(result.status ?? 1);
