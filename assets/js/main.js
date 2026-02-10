/* Global JS: mobile nav, year, and hero carousel */

function setCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(year);
  });
}

function setupMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.classList.toggle("hidden", !open);
    panel.toggleAttribute("hidden", !open);
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Close after clicking a link (mobile UX)
  panel.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest("a")) setOpen(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) setOpen(false);
  });
}

function setupCarousels() {
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));

    if (!slides.length) return;
    let index = 0;
    let timer = null;

    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
      dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));
    };

    const play = () => {
      if (prefersReducedMotion) return;
      stop();
      timer = window.setInterval(() => show(index + 1), 6000);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    prevBtn?.addEventListener("click", () => {
      show(index - 1);
      play();
    });
    nextBtn?.addEventListener("click", () => {
      show(index + 1);
      play();
    });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        show(i);
        play();
      });
    });

    // Pause on hover/focus for better control
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", play);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", play);

    // Initialize
    show(0);
    play();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setupMobileNav();
  setupCarousels();
});

