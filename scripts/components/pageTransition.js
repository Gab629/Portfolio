export default class PageTransition {
  constructor(element) {
    this.element = element;
    this.duration = 500; // doit matcher le CSS
    this.init();
  }

  init() {
    this.enter();
    this.bindLinks();
  }

  enter() {
    requestAnimationFrame(() => {
      this.element.classList.add("is-entered");
    });
  }

  bindLinks() {
  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    const url = link.getAttribute("href");

    if (
      url.startsWith("#") ||
      link.target === "_blank" ||
      url.startsWith("http") ||
      url === window.location.pathname.split("/").pop() // 👈 IMPORTANT
    ) {
      return;
    }

    link.addEventListener("click", e => {
      e.preventDefault();
      this.leave(url);
    });
  });
}

  leave(url) {
    this.element.classList.remove("is-entered");
    this.element.classList.add("is-leaving");

    setTimeout(() => {
      window.location.href = url;
    }, this.duration);
  }
}
