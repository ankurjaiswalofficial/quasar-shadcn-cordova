import { execSync } from "child_process";

const dependencies = JSON.parse(execSync("yarn list --pattern .* --json").toString())
  .data.trees.map(dep => dep.name.split("@")[0])
  .filter(name => !name.startsWith("@")) // Ignore scoped packages
  .map(name => `@types/${name}`);

if (dependencies.length) {
  execSync(`yarn add --dev ${dependencies.join(" ")}`, { stdio: "inherit" });
} else {
  console.log("No dependencies found.");
}
