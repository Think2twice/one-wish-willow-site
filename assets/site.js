(function () {
  const page = document.documentElement.dataset.page || 'home';
  const sourceContent = new WeakMap();
  const translations = {
    en: {
      common: {
        skipToContent: 'Skip to content',
        homeAria: 'One Wish Willow home',
        navigationAria: 'Site navigation',
        languageAria: 'Language',
        backToProduct: '← Back to product'
      },
      nav: {
        ritual: 'Ritual',
        states: 'States',
        privacy: 'Privacy',
        support: 'Support'
      },
      footer: {
        support: 'Support',
        privacy: 'Privacy'
      },
      hero: {
        eyebrow: 'A little time for yourself',
        title: 'One wish,<br><em>kept just for you.</em>',
        lead: 'Write a line or record your voice. When you are ready, break the willow with your own hands, then choose whether to keep this wish on your device.',
        primaryAction: 'See how it unfolds ↓',
        secondaryAction: 'How your wish is stored',
        availability: 'One Wish Willow is complete for iPhone and iPad.',
        stageAria: 'One Wish Willow running on iPad',
        imageAlt: 'A close view of One Wish Willow after it has been broken: the separated branches and wish box rest against a deep red background.',
        caption: 'App capture · After the break',
        stageNote: 'After the break, decide whether to seal it.'
      },
      ritual: {
        eyebrow: 'The ritual',
        title: 'From opening the box to sealing it,<br>one thing, unhurriedly finished.',
        one: { title: 'See', body: 'Open the box first. There is only one thing in view; nothing needs to be written yet.' },
        two: { title: 'Say', body: 'After taking out the willow, you can write a line or record your voice.' },
        three: { title: 'Break', body: 'When you are sure, press and hold to break it. Sound, touch, and the broken edge answer together.' },
        four: { title: 'Seal', body: 'After breaking it, you can revisit it or choose to seal it. Sealed wishes stay on this device.' }
      },
      states: {
        eyebrow: 'App screens',
        title: 'Three states,<br>each from the App in use.',
        lead: 'The sense of space comes from the page and the App. This site does not offer USDZ files, Blender projects, textures, or other source model assets; every screen here comes from the App in use.',
        one: { title: 'Before opening', body: 'The box is still closed, and nothing has been written yet.', alt: 'One Wish Willow with the box still closed.' },
        two: { title: 'After breaking', body: 'The branches have separated. Drag sideways to look from different angles.', alt: 'One Wish Willow after breaking, with the two branches separated from the wish box.' },
        three: { title: 'For your eyes only', body: 'The revisit page shows only the wish saved by the person who wrote it.', alt: 'The One Wish Willow revisit page, showing a saved written wish.' }
      },
      privacy: {
        eyebrow: 'Storage',
        title: 'Your wish stays on your device.',
        body: 'Unsealed content exists only during the current session. Once you choose to seal it, it is saved locally; the current version does not use iCloud. Deleting the App also removes its local sandbox data.',
        factOne: 'No source 3D assets on this site',
        factTwo: 'Wishes are not synced to iCloud',
        factThree: 'You choose when to seal',
        link: 'Read the privacy statement →'
      },
      closing: {
        title: 'Some words only need to be remembered by you.',
        body: 'One Wish Willow is a complete, quiet personal experience.'
      },
      support: {
        eyebrow: 'Support',
        title: 'Support',
        lead: 'Common questions and a direct way to contact the developer.',
        contact: {
          kicker: 'Contact',
          title: 'Get in touch',
          body: 'If you cannot continue, see something unexpected, or have a question about storage, please email us. We usually reply within <strong>two business days</strong>.',
          note: '<strong>Please do not send your wish text, recordings, Apple ID password, verification codes, payment information, or other sensitive material.</strong> A description of the product issue is enough.'
        },
        details: {
          kicker: 'Helpful details',
          title: 'What to include',
          one: 'Your device model, system version, and App version.',
          two: 'What you did before the issue appeared.',
          three: 'What you expected to happen and what happened instead.',
          four: 'A screenshot with personal information removed, if useful.'
        },
        faq: {
          kicker: 'FAQ',
          title: 'Frequently asked questions',
          one: { question: 'Do I need an account?', answer: 'No. One Wish Willow has no sign-up, sign-in, or subscription account flow.' },
          two: { question: 'Are wishes synced to the cloud?', answer: 'No. The current design does not use iCloud or developer servers to store sealed wishes; they stay in local device storage.' },
          three: { question: 'What can I do after breaking it?', answer: 'After breaking it, you can revisit the wish or choose to seal it. Sealing is not sharing; it remains available only on your device.' },
          four: { question: 'What if the App closes unexpectedly?', answer: 'Open the App again and see whether you can return to the current state. If it happens again, contact us with the details above.' }
        },
        privacy: {
          kicker: 'Privacy',
          title: 'Protect first, then troubleshoot',
          body: 'We do not need your wish content to resolve most issues. Please start with the steps you took and your device details; if you send a screenshot, cover private text and anything related to recordings.'
        }
      },
      privacyPage: {
        eyebrow: 'Privacy',
        title: 'How a wish<br><em>is stored.</em>',
        lead: 'This page explains how One Wish Willow stores data locally. If storage, syncing, or analysis changes, this page will be updated at the same time.',
        storage: { title: 'How wishes are stored', body: 'A wish you write or record is used only during the current App session until you seal it. Once you do, the App stores it locally in the device’s Application Support space.' },
        sync: { title: 'No iCloud sync', body: 'One Wish Willow does not use iCloud, Keychain, or cloud sync to store sealed content. Deleting the App also removes the local sandbox data.' },
        assets: { title: 'No model downloads on this site', body: 'This site shows App screenshots and its own CSS effects only. It does not include USDZ files, Blender files, source textures, or downloadable 3D models.' },
        updates: { title: 'Updates to this statement', body: 'If storage, syncing, or analysis features are added later, this statement will be updated first.' }
      },
      meta: {
        home: {
          title: 'One Wish Willow',
          description: 'One Wish Willow is a personal ritual you can see, write, break, and seal.',
          ogDescription: 'One wish, kept just for you.'
        },
        support: {
          title: 'Support | One Wish Willow',
          description: 'Support, frequently asked questions, and a way to contact the developer of One Wish Willow.'
        },
        privacy: {
          title: 'Privacy | One Wish Willow',
          description: 'How One Wish Willow stores wishes locally and handles privacy.'
        }
      }
    }
  };

  function valueFor(language, key) {
    if (language === 'zh-CN') return undefined;
    const dictionary = translations[language];
    const source = key.startsWith('meta.') ? dictionary.meta[page] : dictionary;
    const parts = key.startsWith('meta.') ? key.split('.').slice(1) : key.split('.');
    return parts.reduce((value, part) => value && value[part], source);
  }

  function originalFor(element, type) {
    if (!sourceContent.has(element)) sourceContent.set(element, {});
    const original = sourceContent.get(element);
    if (!(type in original)) {
      original[type] = type === 'text' ? element.textContent : type === 'html' ? element.innerHTML : element.getAttribute(type);
    }
    return original[type];
  }

  function setContent(selector, attribute, language, type) {
    document.querySelectorAll(selector).forEach((element) => {
      const key = element.getAttribute(attribute);
      const original = originalFor(element, type);
      const translated = valueFor(language, key);
      const content = translated === undefined ? original : translated;
      if (type === 'text') element.textContent = content;
      else if (type === 'html') element.innerHTML = content;
      else element.setAttribute(type, content);
    });
  }

  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    setContent('[data-i18n]', 'data-i18n', language, 'text');
    setContent('[data-i18n-html]', 'data-i18n-html', language, 'html');
    setContent('[data-i18n-content]', 'data-i18n-content', language, 'content');
    setContent('[data-i18n-alt]', 'data-i18n-alt', language, 'alt');
    setContent('[data-i18n-aria-label]', 'data-i18n-aria-label', language, 'aria-label');
    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
  }

  function preferredLanguage() {
    try {
      const saved = window.localStorage.getItem('one-wish-willow-language');
      if (saved === 'zh-CN' || saved === 'en') return saved;
    } catch (_) {
      // Local storage can be unavailable in private or restricted browsing modes.
    }
    const languages = [...(navigator.languages || []), navigator.language].filter(Boolean);
    return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh-CN' : 'en';
  }

  applyLanguage(preferredLanguage());
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.language;
      try {
        window.localStorage.setItem('one-wish-willow-language', language);
      } catch (_) {
        // The selected language still applies for the current page.
      }
      applyLanguage(language);
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const stage = document.querySelector('[data-stage]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stage && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const frame = stage.querySelector('.hero-frame');
      if (frame) frame.style.transform = `rotateX(${4 - y * 8}deg) rotateY(${-12 + x * 10}deg) rotateZ(${5 - x * 3}deg) translateZ(0)`;
    });
    stage.addEventListener('pointerleave', () => {
      const frame = stage.querySelector('.hero-frame');
      if (frame) frame.style.transform = '';
    });
  }
}());
