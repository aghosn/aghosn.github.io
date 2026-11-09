const bibtex = require("bibtex-parse");

function text(value = "") {
  return String(value).replace(/[{}]/g, "").replace(/\s+/g, " ").trim();
}

function parsePublications(source) {
  const keys = new Set();
  const entries = bibtex.entries(source);
  if (!entries.length) {
    throw new Error("The bibliography contains no BibTeX entries");
  }
  const papers = entries.filter((entry) => entry.type !== "proceedings").map(({ key: citationKey, type, ...entryTags }) => {
    const fields = Object.fromEntries(
      Object.entries(entryTags).map(([key, value]) => [key.toLowerCase(), text(value)]),
    );
    if (
      !citationKey ||
      keys.has(citationKey) ||
      !fields.title ||
      !fields.author ||
      !/^\d{4}$/.test(fields.year || "") ||
      !(fields.url || fields.doi)
    ) {
      throw new Error(`Invalid or duplicate publication: ${citationKey || "(missing key)"}`);
    }
    keys.add(citationKey);
    return {
      key: citationKey,
      title: fields.title,
      authors: fields.author.split(/\s+and\s+/).join(", "),
      year: Number(fields.year),
      venue: fields.venue || fields.booktitle || fields.journal || fields.school || "",
      url: fields.url || `https://doi.org/${fields.doi}`,
      pdf: fields.pdf,
      slides: fields.slides,
      project: fields.project,
      artifact: type === "misc" && fields.publisher === "Zenodo",
    };
  });
  papers.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  const groups = [];
  for (const paper of papers) {
    let group = groups.at(-1);
    if (!group || group.year !== paper.year) {
      group = { year: paper.year, papers: [] };
      groups.push(group);
    }
    group.papers.push(paper);
  }
  return groups;
}

module.exports = { parsePublications };
