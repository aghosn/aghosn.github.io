for (const carousel of document.querySelectorAll("[data-slide-carousel]")) {
  const image = carousel.querySelector("img");
  const counter = carousel.querySelector(".slide-counter");
  const count = Number(carousel.dataset.slideCount);
  const firstSource = image.getAttribute("src");
  const firstLabel = image.alt;
  let current = 1;

  function showSlide(number) {
    current = ((number - 1 + count) % count) + 1;
    image.src = firstSource.replace("01.jpg", `${String(current).padStart(2, "0")}.jpg`);
    image.alt = firstLabel.replace("slide 1 of", `slide ${current} of`);
    counter.textContent = `Slide ${current} of ${count}`;
  }

  carousel.querySelector("[data-slide-previous]").addEventListener("click", () => showSlide(current - 1));
  carousel.querySelector("[data-slide-next]").addEventListener("click", () => showSlide(current + 1));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(current + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  carousel.tabIndex = 0;
  carousel.querySelector(".slide-carousel-controls").hidden = false;
}
