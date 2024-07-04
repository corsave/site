class ToolBar extends HTMLElement {
  constructor() {
    super();
    this.applySavedStyles();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.querySelectorAll('[data-font-size], [data-color], [data-line-height], [data-letter-spacing]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.dataset.fontSize) {
          this.setFontSize(item.dataset.fontSize);
        } else if (item.dataset.color) {
          this.setColor(item.dataset.color);
        } else if (item.dataset.lineHeight) {
          this.setLineHeight(item.dataset.lineHeight);
        } else if (item.dataset.letterSpacing) {
          this.setLetterSpacing(item.dataset.letterSpacing);
        }
      });
    });
  }

  setFontSize(sizeChange) {
    console.log('sizeChange>', sizeChange)
    const root = document.documentElement;
    const currentSize = parseInt(getComputedStyle(root).getPropertyValue('--font-size'));
    console.log("currentSize", sizeChange)

    let newSize = 0;
    if (sizeChange === 'more') {
      newSize = currentSize + 2;
    } else if (sizeChange === 'less') {
      newSize = currentSize - 2;
    } else {
      newSize = parseInt(sizeChange);
    }

    newSize = `${Math.max(0, Math.min(15, newSize))}px`;
    root.style.setProperty('--font-size', newSize);
    localStorage.setItem('fontSize', newSize);
  }

  setColor(color) {
    const root = document.documentElement;
    const colors = {
      'predetermined': {
        onBackground: '#000000',
        backgroundColor: '#FFFFFF',
        onBackgroundRgb: '0, 0, 0',
        backgroundColorRgb: '255, 255, 255',
        onPrimary: '#FFFFFF',
        primary: '#000000',
        onPrimaryRgb: '255, 255, 255',
        primaryRgb: '0, 0, 0'
      },
      'light': {
        onBackground: '#000000',
        backgroundColor: '#FFFFFF',
        onBackgroundRgb: '0, 0, 0',
        backgroundColorRgb: '255, 255, 255',
        onPrimary: '#FFFFFF',
        primary: '#000000',
        onPrimaryRgb: '255, 255, 255',
        primaryRgb: '0, 0, 0'
      },
      'dark': {
        onBackground: '#FFFFFF',
        backgroundColor: '#000000',
        onBackgroundRgb: '255, 255, 255',
        backgroundColorRgb: '0, 0, 0',
        onPrimary: '#000000',
        primary: '#FFFFFF',
        onPrimaryRgb: '0, 0, 0',
        primaryRgb: '255, 255, 255'
      },
      'yellow': {
        onBackground: '#1f1f1f',
        backgroundColor: '#feefc3',
        onBackgroundRgb: '31, 31, 31',
        backgroundColorRgb: '254, 239, 195',
        onPrimary: '#feefc3',
        primary: '#1f1f1f',
        onPrimaryRgb: '254, 239, 195',
        primaryRgb: '31, 31, 31',
      },
      'blue': {
        onBackground: '#1f1f1f',
        backgroundColor: '#d2e2fc',
        onBackgroundRgb: '31, 31, 31',
        backgroundColorRgb: '210, 226, 252',
        onPrimary: '#d2e2fc',
        primary: '#1f1f1f',
        onPrimaryRgb: '210, 226, 252',
        primaryRgb: '31, 31, 31',
      }
    };

    root.style.setProperty('--color-on-background', colors[color].onBackground);
    root.style.setProperty('--color-background', colors[color].backgroundColor);
    root.style.setProperty('--color-on-background-rgb', colors[color].onBackgroundRgb);
    root.style.setProperty('--color-background-rgb', colors[color].backgroundColorRgb);
    root.style.setProperty('--color-on-primary', colors[color].onPrimary);
    root.style.setProperty('--color-primary', colors[color].primary);
    localStorage.setItem('colorScheme', color);
  }

  setLineHeight(lineHeight) {
    const root = document.documentElement;
    const lineHeightsBase = { 'standard': '1.5', 'separate': '1.6', 'very-separate': '2' };
    const lineHeightsHeading = { 'standard': '1.2', 'separate': '1.3', 'very-separate': '1.4' };

    root.style.setProperty('--line-height-base', lineHeightsBase[lineHeight]);
    root.style.setProperty('--line-height-heading', lineHeightsHeading[lineHeight]);
    localStorage.setItem('lineHeight', lineHeight);
  }

  setLetterSpacing(letterSpacing) {
    const root = document.documentElement;
    const spacings = {
      'standard': 'normal',
      'wide': '1.5px',
      'very-wide': '2px',
    };

    root.style.setProperty('--letter-spacing', spacings[letterSpacing]);
    localStorage.setItem('letterSpacing', letterSpacing);
  }

  applySavedStyles() {
    if (localStorage.getItem('fontSize')) {
      this.setFontSize(localStorage.getItem('fontSize'));
    }
    if (localStorage.getItem('colorScheme')) {
      this.setColor(localStorage.getItem('colorScheme'));
    }
    if (localStorage.getItem('lineHeight')) {
      this.setLineHeight(localStorage.getItem('lineHeight'));
    }
    if (localStorage.getItem('letterSpacing')) {
      this.setLetterSpacing(localStorage.getItem('letterSpacing'));
    }
  }
}

export const toolBar = () => {
  if (window.customElements && !window.customElements.get('tool-bar')) {
    window.customElements.define('tool-bar', ToolBar);
  }
}
