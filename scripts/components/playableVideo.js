export default class PlayableVideo {
  constructor(element) {

    this.element = element;
    this.video = element.querySelector("video");
    this.button = element.querySelector(".playButton");

    if (!this.video) return;

    this.init();
    this.bindEvents();
  }

  init() {
    this.video.controls = false;
  }

  bindEvents() {
    if (this.button) {
      this.button.addEventListener("click", () => this.play());
    }

    this.video.addEventListener("click", () => this.toggle());

    this.video.addEventListener("play", () => {
      this.button?.classList.add("is-hidden");
    });

    this.video.addEventListener("pause", () => {
      this.button?.classList.remove("is-hidden");
    });
  }


  play() {
    const p = this.video.play();
    if (p) p.catch(() => {
      this.video.controls = true; // fallback mobile
    });
  }

  toggle() {
    if (this.video.paused) {
      this.play();
    } else {
      this.video.pause();
    }
  }
}
