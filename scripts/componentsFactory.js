import Header from './components/header.js';
import Scrolly from './components/scrolly.js';
import PageTransition from './components/pageTransition.js';
import Parallax from './components/parallax.js';
import Scrollbar from './components/scrollBar.js';
import ProjectVideo from './components/projectVideo.js';
import I18n from './components/i18n.js';
import LanguageSwitcher from './components/languageSwitcher.js';
import LazyVideo from './components/lazyVideo.js';
import PlayableVideo from './components/playableVideo.js';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Header,
      Scrolly,
      PageTransition,
      Parallax,
      Scrollbar,
      ProjectVideo,
      I18n,
      LanguageSwitcher,
      LazyVideo,
      PlayableVideo,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}