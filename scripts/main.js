import ComponentFactory from './componentsFactory.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    // Attend que le DOM soit complètement chargé
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.classList.add('has-js');

      new ComponentFactory();
    });
  }
}

new Main();