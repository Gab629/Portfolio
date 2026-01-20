export default class Scrollbar {
  constructor(element) {
    this.element = element;
    this.thumb = this.element.querySelector(".scrollbar__thumb");

    if (!this.thumb) {
      console.warn("Scrollbar: thumb not found");
      return;
    }

    this.wrapper = document.querySelector('.scroll-wrapper');
    if (!this.wrapper) {
      console.warn("Scrollbar: wrapper not found");
      return;
    }

    this.onScroll = this.onScroll.bind(this);
    this.wrapper.addEventListener("scroll", this.onScroll);
    this.onScroll();
  }

  onScroll() {
    const scrollTop = this.wrapper.scrollTop;
    const docHeight = this.wrapper.scrollHeight - this.wrapper.clientHeight;

    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    const thumbHeight = 50;
    const trackHeight = this.wrapper.clientHeight - thumbHeight;

    this.thumb.style.transform = `translateY(${trackHeight * progress}px)`;
  }
}
