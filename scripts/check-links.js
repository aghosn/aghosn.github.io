const fs = require("node:fs");
const path = require("node:path");

const output = path.resolve("_site");
const origin = "https://local.invalid";
const errors = [];
let checked = 0;

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(file);
    return entry.name.endsWith(".html") ? [file] : [];
  });
}

const files = htmlFiles(output);
if (!files.length) {
  throw new Error("The generated site contains no HTML pages; run npm run build first.");
}

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(output, file).split(path.sep).join("/");
  const pageUrl = new URL(`/${relative.replace(/index\.html$/, "")}`, origin);
  for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(href.replaceAll("&amp;", "&"), pageUrl);
    if (url.origin !== origin) continue;
    let target = path.resolve(output, `.${decodeURIComponent(url.pathname)}`);
    if (!target.startsWith(`${output}${path.sep}`) && target !== output) {
      errors.push(`${relative}: link escapes the site: ${href}`);
      continue;
    }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, "index.html");
    }
    if (!fs.existsSync(target)) {
      errors.push(`${relative}: missing target: ${href}`);
      continue;
    }
    if (url.hash && target.endsWith(".html")) {
      const ids = [...fs.readFileSync(target, "utf8").matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
      if (!ids.includes(decodeURIComponent(url.hash.slice(1)))) {
        errors.push(`${relative}: missing anchor: ${href}`);
      }
    }
    checked++;
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${checked} local links and resources; no missing files or anchors.`);
}
