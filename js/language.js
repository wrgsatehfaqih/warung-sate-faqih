let currentLang = localStorage.getItem('selectedLang') || 'id';
const i18nHtmlKeys = new Set(['nostalgia_desc', 'rev_5', 'footer_copyright']);

function updateLangButton(activeBtn, inactiveBtn) {
    activeBtn.classList.add('bg-brand-orange', 'text-white', 'shadow-sm');
    activeBtn.classList.remove('text-brand-dark', 'hover:text-brand-orange');

    inactiveBtn.classList.remove('bg-brand-orange', 'text-white', 'shadow-sm');
    inactiveBtn.classList.add('text-brand-dark', 'hover:text-brand-orange');
}

function setTranslatedContent(el, value) {
    if (i18nHtmlKeys.has(el.getAttribute('data-i18n'))) {
        el.innerHTML = value;
        return;
    }

    if (el.children.length > 0) {
        const textNode = Array.from(el.childNodes).find(node =>
            node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );

        if (textNode) {
            textNode.textContent = value;
        } else {
            el.insertBefore(document.createTextNode(value), el.firstChild);
        }

        return;
    }

    el.textContent = value;
}

function setLang(lang) {
    currentLang = lang;

    // simpan bahasa terakhir
    localStorage.setItem('selectedLang', lang);

    const btnId = document.getElementById('btn-id');
    const btnEn = document.getElementById('btn-en');

    if (btnId && btnEn) {
        if (lang === 'id') {
            updateLangButton(btnId, btnEn);
        } else {
            updateLangButton(btnEn, btnId);
        }
    }

    const btnIdMob = document.getElementById('btn-id-mob');
    const btnEnMob = document.getElementById('btn-en-mob');

    if (btnIdMob && btnEnMob) {
        if (lang === 'id') {
            updateLangButton(btnIdMob, btnEnMob);
        } else {
            updateLangButton(btnEnMob, btnIdMob);
        }
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        if (dict[lang] && dict[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[lang][key];
            } else {
                setTranslatedContent(el, dict[lang][key]);
            }
        }
    });

    document.querySelectorAll('[data-wa-text-key]').forEach(el => {
        const key = el.getAttribute('data-wa-text-key');
        const value = dict[lang]?.[key];

        if (value) {
            el.href = `https://wa.me/6281233912015?text=${encodeURIComponent(value)}`;
        }
    });

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const heroTitleMain = document.getElementById('hero-title-main');

    if (heroTitleMain && typeof typeWriter === 'function') {
        if (typeof typingTimer !== 'undefined') {
            clearTimeout(typingTimer);
        }

        heroTitleMain.textContent = '';

        if (typeof i !== 'undefined') {
            i = 0;
        }

        typeWriter();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'id';
    setLang(savedLang);
});
