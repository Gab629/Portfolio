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

    document.documentElement.lang = lang;

    // ✅ AFFICHER LE SITE ICI
    document.documentElement.style.visibility = 'visible';
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
    const elements = document.querySelectorAll('[data-i18]');

    elements.forEach(el => el.classList.add('is-switching'));

    setTimeout(() => {
      elements.forEach((el) => {
        const key = el.dataset.i18;
        const value = key.split('.').reduce((o, i) => o?.[i], data);

        if (value) el.innerHTML = value;

        const hrefKey = el.getAttribute('data-i18-href');
        if (hrefKey) {
          const hrefValue = hrefKey.split('.').reduce((o, i) => o?.[i], data);
          if (hrefValue) el.setAttribute('href', hrefValue);
        }
      });

      elements.forEach(el => el.classList.remove('is-switching'));
    }, 150);
  }


}
