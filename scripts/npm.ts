import * as path from "std_path";
import { build, emptyDir, type BuildOptions, type EntryPoint } from "dnt";
import npmConfig from "./npm.json" assert { type: "json" };

export const buildOptions: BuildOptions = {
  entryPoints: npmConfig.entryPoints as EntryPoint[],
  outDir: npmConfig.outDir,
  declaration: "separate",
  typeCheck: "both",
  shims: {
    deno: "dev",
  },
  compilerOptions: {
    target: "Latest",
    importHelpers: true,
  },
  packageManager: "npm",
  package: {
    name: npmConfig.name,
    version: npmConfig.version,
    description: npmConfig.description,
    license: "MIT"
  },
  postBuild() {
    Deno.copyFileSync(
      path.relative(Deno.cwd(), "./LICENSE"),
      path.relative(Deno.cwd(), path.resolve(npmConfig.outDir, "LICENSE")
    ));
    Deno.copyFileSync(
      path.relative(Deno.cwd(), "./README.md"),
      path.relative(Deno.cwd(), path.resolve(npmConfig.outDir, "README.md")
    ));
  }
};

if (import.meta.main) {
  emptyDir("./.npm");
  await build(buildOptions);
}
