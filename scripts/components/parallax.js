export default class Parallax {
  constructor(element) {
    this.element = element;
    this.image = element.querySelector("img");

    this.modes = (element.dataset.parallax || "scroll").split(" ");
    this.speed = parseFloat(element.dataset.speed) || 0.15;
    this.strength = parseFloat(element.dataset.strength) || 20;

    this.scrollY = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    this.raf = null;

    this.init();
  }

  init() {
    if (!this.image) return;

    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    this.image.style.willChange = "transform";

    if (this.modes.includes("scroll")) {
      this.scrollContainer = document.querySelector(".page") || window;
      this.scrollContainer.addEventListener("scroll", this.onScroll.bind(this));
    }

    if (this.modes.includes("mouse")) {
      window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    this.animate();
  }

  onScroll() {
    const rect = this.element.getBoundingClientRect();
    this.scrollY = rect.top * this.speed;
  }

  onMouseMove(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    this.mouseX = x * this.strength;
    this.mouseY = y * this.strength;
  }

  animate() {
    this.image.style.transform = `
      translate3d(
        ${this.mouseX}px,
        ${this.scrollY + this.mouseY}px,
        0
      )
    `;

    this.raf = requestAnimationFrame(this.animate.bind(this));
  }
}
