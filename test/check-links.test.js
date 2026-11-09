const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const checker = path.resolve(__dirname, "../scripts/check-links.js");

function fixture(t, files) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "website-links-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.mkdirSync(path.join(directory, "_site"));
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(directory, "_site", name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return spawnSync(process.execPath, [checker], { cwd: directory, encoding: "utf8" });
}

test("checks pages, relative links, resources, and anchors without requesting external sites", (t) => {
  const result = fixture(t, {
    "index.html": '<h1 id="home">Home</h1><a href="/projects/#tyche">Projects</a><img src="/images/portrait.jpg"><a href="https://example.invalid/">External</a>',
    "projects/index.html": '<h1 id="tyche">Tyche</h1><a href="../#home">Home</a>',
    "images/portrait.jpg": "image fixture",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /no missing files or anchors/);
});

test("fails the build check for missing files and missing anchors", (t) => {
  const result = fixture(t, {
    "index.html": '<a href="/missing.pdf">Missing PDF</a><a href="/#missing">Missing anchor</a>',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing target: \/missing.pdf/);
  assert.match(result.stderr, /missing anchor: \/#missing/);
});

test("rejects an empty build instead of reporting success", (t) => {
  const result = fixture(t, {});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /contains no HTML pages/);
});
