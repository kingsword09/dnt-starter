export const doPub = async (cwd: string) => {
  const p = new Deno.Command("npm", {
    cwd,
    args: ["publish", "--access", "public", "--no-git-checks"],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  });
  const process = p.spawn();
  const status = await process.status;
  return status.success;
};

export const doPubFromJson = async (inputConfigFile: string) => {
  const npmConfigs = (
    await import(inputConfigFile, { with: { type: "json" } })
  ).default;

  await doPub(npmConfigs.outDir);
};

if (import.meta.main) {
  await doPubFromJson(import.meta.resolve("./npm.json"));
}
