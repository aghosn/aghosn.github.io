const contactFallback = document.querySelector("[data-email-reveal]");
const revealButton = document.createElement("button");
revealButton.type = "button";
revealButton.className = "email-reveal";
revealButton.textContent = "Reveal email \u2197";
revealButton.addEventListener("click", () => {
  const address = ["ghosn.adrien", "+website", "@", "gmail.com"].join("");
  const emailLink = document.createElement("a");
  emailLink.href = `mailto:${address}`;
  emailLink.textContent = address;
  emailLink.className = "email-address";
  revealButton.replaceWith(emailLink);
  emailLink.focus();
}, { once: true });
contactFallback.replaceWith(revealButton);
