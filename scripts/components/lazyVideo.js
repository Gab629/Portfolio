export default class LazyVideo {
  constructor() {
    this.videos = document.querySelectorAll(".js-lazy-video");
    if (!this.videos.length) return;

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    this.videos.forEach(video => this.observer.observe(video));
  }
}
