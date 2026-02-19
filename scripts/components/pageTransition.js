export default class PageTransition {
  constructor(element) {
    this.element = element;
    this.duration = 500; 
    this.init();
  }

  init() {
    this.enter();
    this.bindLinks();
  }

  enter() {
    const images = this.element.querySelectorAll("img");
    const promises = Array.from(images).map(img =>
      img.complete ? Promise.resolve() : new Promise(r => img.onload = img.onerror = r)
    );

    Promise.all(promises).then(() => {
      requestAnimationFrame(() => {
        this.element.classList.add("is-entered");

        setTimeout(() => {
          import("./lazyVideo.js").then(module => {
            new module.default();
          });
        }, 500);
      });
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
        url === window.location.pathname.split("/").pop() 
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
