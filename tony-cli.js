#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , cmd, name] = process.argv;

if (cmd === "new") {
  if (!name) {
    console.log("Usage: tony new <project-name>");
    process.exit(1);
  }
  const target = path.resolve(process.cwd(), name);
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
    fs.writeFileSync(path.join(target, "app.js"), "// new app.js");
    console.log(`Project '${name}' created.`);
  } else {
    console.log("Directory already exists.");
  }
} else {
  console.log("Tony CLI - commands: new <project>");
}
