const fs = require("node:fs");
const { parsePublications } = require("./lib/publications");

module.exports = function (config) {
  config.addPassthroughCopy({ "src/style.css": "style.css" });
  config.addPassthroughCopy({ public: "." });
  config.addPassthroughCopy({ "public/cv/aghosn_cv.pdf": "assets/pdf/aghosn_cv.pdf" });
  config.addPassthroughCopy({ "public/papers": "assets/pdf" });
  config.addPassthroughCopy({ "bib.tex": "bib.tex" });
  config.addGlobalData("site", {
    url: "https://aghosn.github.io",
    description: "Adrien Ghosn's research in systems, virtualization, and confidential computing.",
  });
  config.addWatchTarget("bib.tex");
  config.addGlobalData("publications", () =>
    parsePublications(fs.readFileSync("bib.tex", "utf8")),
  );
  config.addCollection("sections", (collection) =>
    collection.getFilteredByTag("section").sort((a, b) => a.data.order - b.data.order),
  );
  config.setNunjucksEnvironmentOptions({ autoescape: true });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
