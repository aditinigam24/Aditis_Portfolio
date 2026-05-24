process.env.USE_NITRO = "1";
process.env.VERCEL = "1";
const { spawnSync } = await import("node:child_process");
const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
process.exit(result.status ?? 1);
