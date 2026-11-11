const body = document.body;
const menu = document.querySelector("#sp-menu");
const menuOpenButton = document.querySelector(".hamburger-button");
const menuCloseButton = document.querySelector(".sp-menu__close");
const menuLinks = document.querySelectorAll(".sp-menu__nav a");
const qaButtons = document.querySelectorAll(".qa-item__question");
const gallerySlider = document.querySelector("[data-gallery-slider]");
const galleryPrevButton = document.querySelector("[data-gallery-prev]");
const galleryNextButton = document.querySelector("[data-gallery-next]");

const openMenu = () => {
  if (!menu || !menuOpenButton) return;

  menu.classList.add("is-open");
  body.classList.add("is-menu-open");
  menu.setAttribute("aria-hidden", "false");
  menuOpenButton.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  if (!menu || !menuOpenButton) return;

  menu.classList.remove("is-open");
  body.classList.remove("is-menu-open");
  menu.setAttribute("aria-hidden", "true");
  menuOpenButton.setAttribute("aria-expanded", "false");
};

menuOpenButton?.addEventListener("click", openMenu);
menuCloseButton?.addEventListener("click", closeMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

qaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".qa-item");
    const answer = item?.querySelector(".qa-item__answer");
    const icon = item?.querySelector(".qa-item__icon");

    if (!item || !answer || !icon) return;

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    answer.hidden = !isOpen;
    icon.textContent = isOpen ? "−" : "+";
  });
});

if (gallerySlider && galleryPrevButton && galleryNextButton) {
  const galleryItems = Array.from(gallerySlider.querySelectorAll(".gallery-item")).map((item) => {
    const source = item.querySelector("source");
    const image = item.querySelector("img");

    return {
      pcSrc: source?.getAttribute("srcset") ?? "",
      spSrc: image?.getAttribute("src") ?? "",
      alt: image?.getAttribute("alt") ?? "",
    };
  });

  let galleryStartIndex = 0;

  const updateGallery = () => {
    gallerySlider.querySelectorAll(".gallery-item").forEach((item, index) => {
      const imageData = galleryItems[(galleryStartIndex + index) % galleryItems.length];
      const source = item.querySelector("source");
      const image = item.querySelector("img");

      if (!imageData || !source || !image) return;

      source.setAttribute("srcset", imageData.pcSrc);
      image.setAttribute("src", imageData.spSrc);
      image.setAttribute("alt", imageData.alt);
    });
  };

  galleryPrevButton.addEventListener("click", () => {
    galleryStartIndex = (galleryStartIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery();
  });

  galleryNextButton.addEventListener("click", () => {
    galleryStartIndex = (galleryStartIndex + 1) % galleryItems.length;
    updateGallery();
  });
}
