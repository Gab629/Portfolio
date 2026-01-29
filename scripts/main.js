// YouTube Iframe API callback (GLOBAL)
window.youtubeAPIReady = false;

window.onYouTubeIframeAPIReady = () => {
  window.youtubeAPIReady = true;
};


import ComponentFactory from './componentsFactory.js';
import { initParticles } from '././components/particles.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    // Attend que le DOM soit complètement chargé
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.classList.add('has-js');

      new ComponentFactory();
      initParticles();
    });
  }
}

new Main();