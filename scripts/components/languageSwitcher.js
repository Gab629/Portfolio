export default class LanguageSwitcher {
  constructor(element) {
    this.element = element;
    this.btn = element.querySelector('.lang-switcher__btn');
    this.item = element.querySelector('.lang-switcher__item');

    this.init();
  }

  init() {
    this.updateUI(this.getLang());
    this.item.addEventListener('click', () => this.toggleLanguage());
  }

  getLang() {
    return localStorage.getItem('lang') || 'fr';
  }

  setLang(lang) {
    localStorage.setItem('lang', lang);

    // 🔥 notification globale
    window.dispatchEvent(
      new CustomEvent('languageChanged', { detail: lang })
    );
  }

  updateUI(lang) {
    if (lang === 'en') {
      this.btn.textContent = 'EN';
      this.item.textContent = 'FR';
    } else {
      this.btn.textContent = 'FR';
      this.item.textContent = 'EN';
    }
  }

  toggleLanguage() {
    const newLang = this.getLang() === 'fr' ? 'en' : 'fr';
    this.setLang(newLang);
    this.updateUI(newLang);
  }
}
