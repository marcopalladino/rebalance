/* ===========================
   Rebalance Experience
   JavaScript — Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // 1. EVENTI DATA
    // ========================
    // Modifica qui sotto per aggiornare gli eventi!
    const eventi = [
        {
            titolo: "Rebalance in Spiaggia",
            data: "2026-03-08",
            ora: "09:00",
            durata: "1 ora",
            luogo: "Playa de Maspalomas",
            descrizione: "Sessione mattutina di movimento e respirazione sulla sabbia.",
            link: "prenota.html?evento=Rebalance+in+Spiaggia"
        },
        {
            titolo: "Rebalance al Parco",
            data: "2026-03-15",
            ora: "10:00",
            durata: "1 ora",
            luogo: "Parque Sur, San Bartolomé de Tirajana",
            descrizione: "Ritrova il tuo equilibrio immerso nel verde del parco.",
            link: "prenota.html?evento=Rebalance+al+Parco"
        },
        {
            titolo: "Sunset Rebalance",
            data: "2026-03-22",
            ora: "17:30",
            durata: "1 ora",
            luogo: "Playa del Inglés",
            descrizione: "Sessione al tramonto: il modo perfetto per chiudere la settimana.",
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
        const mesi = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
        const giorniSettimana = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

        // Sort by date
        const sorted = [...eventi].sort((a, b) => new Date(a.data) - new Date(b.data));

        // Filter future events
        const futureEventi = sorted.filter(e => new Date(e.data) >= new Date(now.toDateString()));

        if (futureEventi.length === 0) {
            eventiGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.7);">
                    <p style="font-size: 1.2rem; margin-bottom: 12px;">📅 Nuovi eventi in arrivo!</p>
                    <p>Contattami per essere aggiornato sui prossimi appuntamenti.</p>
                </div>
            `;
            return;
        }

        eventiGrid.innerHTML = futureEventi.map((evento, index) => {
            const date = new Date(evento.data);
            const day = date.getDate();
            const month = mesi[date.getMonth()];
            const dayName = giorniSettimana[date.getDay()];
            const isNext = index === 0;

            return `
                <div class="evento-card ${isNext ? 'next' : ''}">
                    ${isNext ? '<span class="evento-badge">Prossimo</span>' : ''}
                    <div class="evento-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="evento-info">
                        <h3>${evento.titolo}</h3>
                        <p style="font-size:0.9rem; opacity:0.85; margin-bottom:8px;">${evento.descrizione}</p>
                        <div class="evento-meta">
                            <span>📍 ${evento.luogo}</span>
                            <span>🕐 ${evento.ora}</span>
                            <span>⏱️ ${evento.durata}</span>
                            <span>📆 ${dayName}</span>
                        </div>
                    </div>
                    <div class="evento-action">
                        <a href="${evento.link}" class="btn btn--primary">Prenota</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderEventi();

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

});
