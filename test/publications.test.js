const test = require("node:test");
const assert = require("node:assert/strict");
const { parsePublications } = require("../lib/publications");

test("groups years newest first and preserves publication links and optional project pages", () => {
  const groups = parsePublications(`
    @article{old, title={{Older} work}, author={A and B}, year={2019}, doi={10.1/old}}
    @article{new, title={New work}, author={C}, year={2023}, url={https://example.org/new},
      pdf={/assets/pdf/new.pdf}, slides={/slides/new.pdf}, project={/research/new/}}
    @article{same, title={Another work}, author={D}, year={2023}, doi={10.1/same}}
  `);
  assert.deepEqual(groups.map((group) => group.year), [2023, 2019]);
  assert.deepEqual(groups[0].papers.map((paper) => paper.title), ["Another work", "New work"]);
  assert.equal(groups[0].papers[1].pdf, "/assets/pdf/new.pdf");
  assert.equal(groups[0].papers[1].slides, "/slides/new.pdf");
  assert.equal(groups[0].papers[1].project, "/research/new/");
  assert.equal(groups[1].papers[0].title, "Older work");
  assert.equal(groups[1].papers[0].authors, "A, B");
  assert.equal(groups[1].papers[0].url, "https://doi.org/10.1/old");
  assert.equal(groups[1].papers[0].pdf, undefined);
  assert.equal(groups[1].papers[0].slides, undefined);
});

test("rejects incomplete records, invalid years, and duplicate citation keys", () => {
  const valid = "@article{a,title={Title},author={Author},year={2023},doi={10.1/test}}";
  assert.throws(() => parsePublications("@article{a,title={Incomplete}}"), /Invalid/);
  assert.throws(() => parsePublications(valid.replace("2023", "unknown")), /Invalid/);
  assert.throws(() => parsePublications(valid + valid), /duplicate/);
  assert.throws(() => parsePublications("<html>Not a bibliography</html>"), /no BibTeX entries/);
});

test("keeps Unicode names and artifacts but does not misattribute edited proceedings", () => {
  const groups = parsePublications(`
    @proceedings{edited,title={Proceedings},editor={Editor},year=2026}
    @misc{artifact,title={Software},author={Clément Pit-Claudel},year=2024,publisher={Zenodo},doi={10.1/code}}
  `);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].papers[0].authors, "Clément Pit-Claudel");
  assert.equal(groups[0].papers[0].artifact, true);
});
