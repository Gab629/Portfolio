export default class ProjectVideo {
  constructor(media) {
    this.media = media;
    this.card = media.closest(".projectCard");
    this.video = media.querySelector("video");

    if (!this.video || !this.card) return;

    this.video.muted = true;
    this.video.loop = true;

    this.bindEvents();
  }

  bindEvents() {
    this.card.addEventListener("mouseenter", () => this.play());
    this.card.addEventListener("mouseleave", () => this.stop());
  }

  play() {
    this.card.classList.add("is-playing");

    const p = this.video.play();
    if (p) p.catch(() => {});
  }

  stop() {
    this.video.pause();
    this.card.classList.remove("is-playing");
  }
}
