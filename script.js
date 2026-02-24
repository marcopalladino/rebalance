/* ===========================
   Rebalance Experience
   JavaScript — Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // 0. LANGUAGE DETECTION
    // ========================
    const lang = document.documentElement.lang || 'es';
    const suffix = (lang === 'it') ? '' : '_' + lang;
    window.currentLang = lang;

    // Localized UI strings
    const i18n = {
        it: {
            mesi: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            giorni: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
            badge: 'Prossimo',
            noEvents: '📅 Nuovi eventi in arrivo!',
            noEventsSub: 'Contattami per essere aggiornato sui prossimi appuntamenti.',
            prenota: 'Prenota',
            durata: '1 ora'
        },
        es: {
            mesi: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            giorni: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            badge: 'Próximo',
            noEvents: '📅 ¡Nuevos eventos próximamente!',
            noEventsSub: 'Contáctame para estar al día de las próximas citas.',
            prenota: 'Reservar',
            durata: '1 hora'
        },
        en: {
            mesi: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            giorni: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            badge: 'Next',
            noEvents: '📅 New events coming soon!',
            noEventsSub: 'Contact me to stay updated on upcoming sessions.',
            prenota: 'Book Now',
            durata: '1 hour'
        }
    };
    const t = i18n[lang] || i18n.it;

    // Helper: get localized field
    function lf(evento, field) {
        return (suffix && evento[field + suffix]) ? evento[field + suffix] : evento[field];
    }

    // ========================
    // 1. EVENTI DATA
    // ========================
    // Modifica qui sotto per aggiornare gli eventi!
    const eventi = [
        {
            titolo: "Rebalance in Spiaggia",
            titolo_es: "Rebalance en la Playa",
            titolo_en: "Rebalance on the Beach",

            data: "2026-03-05",
            ora: "09:45",
            durata: "1 ora",
            durata_es: "1 hora",
            durata_en: "1 hour",

            luogo: "Playa de Las Burras",
            luogo_es: "Playa de Las Burras",
            luogo_en: "Las Burras Beach",

            descrizione: "Sessione mattutina di movimento e respirazione sulla sabbia.",
            descrizione_es: "Sesión matutina de movimiento y respiración en la arena.",
            descrizione_en: "Morning session of movement and breathing on the sand.",

            link: "prenota.html?evento=Rebalance+in+Spiaggia"
        },
        {
            titolo: "Rebalance al Parco",
            titolo_es: "Rebalance en el Parque",
            titolo_en: "Rebalance in the Park",

            data: "2026-03-14",
            ora: "09:45",
            durata: "1 ora",
            durata_es: "1 hora",
            durata_en: "1 hour",

            luogo: "Parque Sur, San Bartolomé de Tirajana",
            luogo_es: "Parque Sur, San Bartolomé de Tirajana",
            luogo_en: "Parque Sur, San Bartolomé de Tirajana",

            descrizione: "Ritrova il tuo equilibrio immerso nel verde del parco.",
            descrizione_es: "Encuentra tu equilibrio rodeado del verde del parque.",
            descrizione_en: "Find your balance surrounded by the greenery of the park.",

            link: "prenota.html?evento=Rebalance+al+Parco"
        },
        {
            titolo: "Sunset Rebalance",
            titolo_es: "Rebalance al Atardecer",
            titolo_en: "Sunset Rebalance",

            data: "2026-03-22",
            ora: "17:15",
            durata: "1 ora",
            durata_es: "1 hora",
            durata_en: "1 hour",

            luogo: "Parque Sur, San Bartolomé de Tirajana",
            luogo_es: "Parque Sur, San Bartolomé de Tirajana",
            luogo_en: "Parque Sur, San Bartolomé de Tirajana",

            descrizione: "Sessione al tramonto: il modo perfetto per chiudere la settimana.",
            descrizione_es: "Sesión al atardecer: la manera perfecta de cerrar la semana.",
            descrizione_en: "Sunset session: the perfect way to close the week.",

            link: "prenota.html?evento=Sunset+Rebalance"
        }
    ];
    window.eventiList = eventi; // expose for the booking page

    // ========================
    // 2. RENDER EVENTI
    // ========================
    const eventiGrid = document.getElementById('eventiGrid');

    function renderEventi() {
        const now = new Date();

        // Sort by date
        const sorted = [...eventi].sort((a, b) => new Date(a.data) - new Date(b.data));

        // Filter future events
        const futureEventi = sorted.filter(e => new Date(e.data) >= new Date(now.toDateString()));

        if (futureEventi.length === 0) {
            eventiGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.7);">
                    <p style="font-size: 1.2rem; margin-bottom: 12px;">${t.noEvents}</p>
                    <p>${t.noEventsSub}</p>
                </div>
            `;
            return;
        }

        // Build prenota link
        const prenotaPath = 'prenota.html';

        eventiGrid.innerHTML = futureEventi.map((evento, index) => {
            const date = new Date(evento.data);
            const day = date.getDate();
            const month = t.mesi[date.getMonth()];
            const dayName = t.giorni[date.getDay()];
            const isNext = index === 0;
            const eventoLink = prenotaPath + '?evento=' + encodeURIComponent(lf(evento, 'titolo'));

            return `
                <div class="evento-card ${isNext ? 'next' : ''}">
                    ${isNext ? '<span class="evento-badge">' + t.badge + '</span>' : ''}
                    <div class="evento-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="evento-info">
                        <h3>${lf(evento, 'titolo')}</h3>
                        <p style="font-size:0.9rem; opacity:0.85; margin-bottom:8px;">${lf(evento, 'descrizione')}</p>
                        <div class="evento-meta">
                            <span>📍 ${lf(evento, 'luogo')}</span>
                            <span>🕐 ${evento.ora}</span>
                            <span>⏱️ ${lf(evento, 'durata')}</span>
                            <span>📆 ${dayName}</span>
                        </div>
                    </div>
                    <div class="evento-action">
                        <a href="${eventoLink}" class="btn btn--primary">${t.prenota}</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (eventiGrid) {
        renderEventi();
    }

    // ========================
    // 3. HAMBURGER MENU
    // ========================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        overlay.classList.toggle('active');
        body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ========================
    // 4. HEADER SCROLL EFFECT
    // ========================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ========================
    // 5. SCROLL REVEAL
    // ========================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================
    // 6. SMOOTH SCROLL
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========================
    // 7. ACTIVE NAV HIGHLIGHT
    // ========================
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => navObserver.observe(section));

    // ========================
    // 8. MOBILE DROPDOWN TOGGLE
    // ========================
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            // Only toggle on mobile screens
            if (window.innerWidth < 768) {
                if (e.target.classList.contains('nav-link')) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            }
        });
    });

    // ========================
    // 9. PROMOTION TABS & INSTAGRAM EMBED
    // ========================
    // ——— CONFIGURA QUI I POST INSTAGRAM ———
    // Cambia solo gli ID dei post (la parte dopo /p/ nell'URL di Instagram)
    const promoPosts = {
        tab1: {
            postId: 'DUVYcs0jIwu'
        },
        tab2: {
            postId: 'DSiYg6FgtlIQK2OMNwzPbwHr1K0XcDP6PabyV00'
        }
    };

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        const embedContainer1 = document.getElementById('insta-embed-1');
        const embedContainer2 = document.getElementById('insta-embed-2');

        // Inject iframes directly (works on file:// and https://)
        function createInstaIframe(postId) {
            return `<iframe src="https://www.instagram.com/p/${postId}/embed/" 
                        width="100%" height="550" frameborder="0" scrolling="no" 
                        allowtransparency="true" allow="encrypted-media"
                        style="border:none; overflow:hidden; border-radius:12px; background:#fff;">
                    </iframe>`;
        }

        if (embedContainer1) embedContainer1.innerHTML = createInstaIframe(promoPosts.tab1.postId);
        if (embedContainer2) embedContainer2.innerHTML = createInstaIframe(promoPosts.tab2.postId);

        // Tab switching logic
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

});
