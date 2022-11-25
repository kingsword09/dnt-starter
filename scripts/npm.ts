import * as path from "std_path";
import { build, emptyDir, type BuildOptions, type EntryPoint } from "dnt";
import npmConfig from "./npm.json" assert { type: "json" };

export const buildOptions: BuildOptions = {
  importMap: npmConfig.importMap,
  entryPoints: npmConfig.entryPoints as EntryPoint[],
  outDir: npmConfig.outDir,
  typeCheck: true,
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
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/BioforestChain/plaoc.git",
    },
    bugs: {
      url: "https://github.com/BioforestChain/plaoc/issues",
    },
  },
};

if (import.meta.main) {
  emptyDir("./.npm");
  await build(buildOptions);
  await Deno.copyFile(
    "./LICENSE",
    path.relative(Deno.cwd(), path.resolve(npmConfig.outDir, "LICENSE"))
  );
  await Deno.copyFile(
    "./README.md",
    path.relative(Deno.cwd(), path.resolve(npmConfig.outDir, "README.md"))
  );
}
