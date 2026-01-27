export default class I18n {
  constructor(element) {
    this.element = element;

    this.translations = {
      en: '/i18n/en.json',
      fr: '/i18n/fr.json'
    };

    this.init();
  }

  init() {
    const lang = this.getLang();
    this.setLanguage(lang);

    // 👂 écoute le changement de langue
    window.addEventListener('languageChanged', (e) => {
      this.setLanguage(e.detail);
    });
  }

  getLang() {
    return localStorage.getItem('lang')
      || (navigator.language.startsWith('fr') ? 'fr' : 'en');
  }

  async setLanguage(lang) {
    console.log('🌍 Langue active :', lang);

    const data = await this.loadTranslations(lang);
    this.applyTranslations(data);

    // optionnel mais propre
    document.documentElement.lang = lang;
  }

  async loadTranslations(lang) {
    const path = this.translations[lang];
    console.log('📄 FETCH :', path);

    const response = await fetch(path);
    if (!response.ok) {
      console.error('❌ Impossible de charger', path);
      return {};
    }

    const data = await response.json();
    console.log('📘 DATA :', data);
    return data;
  }

  applyTranslations(data) {
    document.querySelectorAll('[data-i18]').forEach((el) => {
      const key = el.dataset.i18;
      const value = key.split('.').reduce((o, i) => o?.[i], data);

      if (value) {
        el.textContent = value;
      }
    });
  }
}
