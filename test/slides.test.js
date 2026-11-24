const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function carousel() {
  const handlers = {};
  const image = {
    src: "/slides/tyche_eurosp2026/slide-01.jpg",
    alt: "Tyche talk slides — slide 1 of 43",
    getAttribute(name) { return this[name]; },
  };
  const counter = { textContent: "Slide 1 of 43" };
  const controls = { hidden: true };
  const element = {
    dataset: { slideCount: "43" },
    querySelector(selector) {
      if (selector === "img") return image;
      if (selector === ".slide-counter") return counter;
      if (selector === ".slide-carousel-controls") return controls;
      return { addEventListener(event, handler) { handlers[selector] = handler; } };
    },
    addEventListener(event, handler) { handlers[event] = handler; },
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../public/slides.js"), "utf8"), {
    document: { querySelectorAll: () => [element] },
  });
  return { image, counter, controls, element, handlers };
}

test("carousel buttons update the slide and accessible label, wrapping at both ends", () => {
  const { image, counter, controls, handlers } = carousel();
  assert.equal(controls.hidden, false);
  handlers["[data-slide-previous]"]();
  assert.equal(image.src, "/slides/tyche_eurosp2026/slide-43.jpg");
  assert.equal(image.alt, "Tyche talk slides — slide 43 of 43");
  assert.equal(counter.textContent, "Slide 43 of 43");
  handlers["[data-slide-next]"]();
  assert.equal(image.src, "/slides/tyche_eurosp2026/slide-01.jpg");
  handlers["[data-slide-next]"]();
  assert.equal(image.src, "/slides/tyche_eurosp2026/slide-02.jpg");
});

test("arrow keys navigate without scrolling; unrelated keys remain untouched", () => {
  const { image, element, handlers } = carousel();
  assert.equal(element.tabIndex, 0);
  let prevented = 0;
  const preventDefault = () => prevented++;
  handlers.keydown({ key: "ArrowRight", preventDefault });
  assert.equal(image.src, "/slides/tyche_eurosp2026/slide-02.jpg");
  handlers.keydown({ key: "ArrowLeft", preventDefault });
  assert.equal(image.src, "/slides/tyche_eurosp2026/slide-01.jpg");
  handlers.keydown({ key: "Tab", preventDefault });
  assert.equal(prevented, 2);
  assert.equal(image.src, "/slides/tyche_eurosp2026/slide-01.jpg");
});
