$(document).ready(function () {

    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) $('#backToTop').addClass('topshow');
        else $('#backToTop').removeClass('topshow');
    });
    $('#backToTop').click(function (e) { e.preventDefault(); $('html, body').animate({ scrollTop: 0 }, 400); });
    var isDragging = false;
    $(document).on('sortstart', function () {
        isDragging = true;
        $('.ui-sortable-helper').css('transition', 'none');
    });
    $(document).on('sortstop', function () { isDragging = false; });
    document.querySelectorAll('header h1 .title').forEach(function (el) { el.setAttribute('data-text', el.textContent.trim()); });

    // ══════════════════════════════════════════
    //  GSAP ANIMATIONS
    // ══════════════════════════════════════════
    if (typeof gsap === 'undefined') return;
    gsap.defaults({ ease: 'power2.out', duration: 0.5 });

    function anim(sel, props) { var e = document.querySelectorAll(sel); if (e.length) gsap.from(e, props); }

    gsap.from('header', { y: -20, opacity: 0, duration: 0.4 });
    anim('header h1', { x: -15, opacity: 0, duration: 0.5, delay: 0.15 });
    anim('header .menus-container > *', { scale: 0.8, opacity: 0, duration: 0.3, stagger: 0.06, delay: 0.25 });
    anim('.page-header li, .buttons-header li', { y: -8, opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.2 });
    anim('#board th.board-column-header', { y: -10, opacity: 0, duration: 0.35, stagger: 0.08, delay: 0.15 });
    anim('.task-board', { scale: 0.95, opacity: 0, duration: 0.35, stagger: 0.06, delay: 0.25 });

    document.querySelectorAll('.project-overview-column strong').forEach(function (el) {
        var t = parseInt(el.textContent, 10); if (isNaN(t)) return;
        var o = { v: 0 };
        gsap.to(o, { v: t, duration: 1.2, delay: 0.3, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
    });
    // .project-overview-column skipped: CSS transition conflicts with GSAP from()
    anim('.accordion-title', { x: -10, opacity: 0, duration: 0.3, stagger: 0.06, delay: 0.2 });
    anim('.activity-event', { y: 10, opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.2 });
    anim('.task-summary-container', { y: 10, opacity: 0, duration: 0.4, delay: 0.2 });

    new MutationObserver(function (muts) {
        muts.forEach(function (m) { m.addedNodes.forEach(function (n) {
            if (n.nodeType !== 1) return;
            if (n.id === 'modal-overlay' || (n.querySelector && n.querySelector('#modal-overlay'))) {
                var b = document.getElementById('modal-box');
                if (b) gsap.from(b, { scale: 0.92, opacity: 0, duration: 0.25, ease: 'power3.out' });
            }
        }); });
    }).observe(document.body, { childList: true, subtree: true });

    $(document).on('click', '.dropdown-menu', function () {
        var self = this;
        setTimeout(function () {
            var m = $(self).siblings('ul.dropdown-submenu-open');
            if (m.length) {
                gsap.from(m[0], { y: -6, opacity: 0, duration: 0.2, ease: 'power2.out' });
                gsap.from(m.find('li').toArray(), { x: -6, opacity: 0, duration: 0.15, stagger: 0.03, ease: 'power2.out' });
            }
        }, 10);
    });

    // ══════════════════════════════════════════
    //  GLITCH SYSTEM (gated by --glitch-enabled)
    // ══════════════════════════════════════════
    var glitchEnabled = getComputedStyle(document.documentElement).getPropertyValue('--glitch-enabled').trim() !== '0';

    if (glitchEnabled) {
    // Header title glitch
    var titleEl = document.querySelector('header h1 .title');
    var titleHovered = false;
    var titleGlitchTimer = null;

    if (titleEl) {
        titleEl.parentElement.addEventListener('mouseenter', function () { titleHovered = true; });
        titleEl.parentElement.addEventListener('mouseleave', function () { titleHovered = false; });

        function titleGlitch() {
            if (titleEl) cyberGlitch(titleEl);
            var delay = titleHovered
                ? 300 + Math.random() * 800
                : 5000 + Math.random() * 12000;
            titleGlitchTimer = setTimeout(titleGlitch, delay);
        }
        setTimeout(titleGlitch, 2000);
    }

    // ══════════════════════════════════════════
    //  HOVER GLITCH — ZERO MOVEMENT, PURE VISUAL
    // ══════════════════════════════════════════
    var glitchTargets = [
        '.task-board', '.table-list-row', '.btn', '.project-overview-column',
        '.dropdown-submenu-open li:not(.no-hover)', '.sidebar > ul li',
        '.accordion-title', '.views li', '.panel', '.dashboard-table-link',
        '.activity-event', '.comment', '.file-thumbnail',
        '#board th.board-column-header', '.task-summary-container',
    ];

    function r(a, b) { return a + Math.random() * (b - a); }

    function cyberGlitch(el) {
        if (el._g || isDragging) return;
        if (el.classList.contains('ui-sortable-helper')) return;
        if (el.closest && el.closest('.ui-sortable-helper')) return;
        el._g = true;

        var tl = gsap.timeline({ onComplete: function () {
            el._g = false;
        }});

        var ca = r(2, 5);
        var sliceTop = r(10, 80);
        var sliceH = r(5, 20);
        var sliceClip = 'inset(' + sliceTop + '% 0 ' + (100 - sliceTop - sliceH) + '% 0)';

        // Frame 1: RGB split shadow appears instantly
        tl.set(el, {
            boxShadow: (-ca) + 'px 0 0 rgba(0,240,255,0.25), '
                      + ca + 'px 0 0 rgba(255,30,111,0.25), '
                      + '0 2px 8px rgba(0,0,0,0.3)',
        });

        // Frame 2: hold split + maybe clip-tear a slice
        tl.to(el, { duration: r(0.04, 0.08) });

        if (Math.random() > 0.3) {
            // Frame 3: horizontal slice vanishes briefly
            tl.set(el, { clipPath: sliceClip });
            tl.to(el, { duration: r(0.02, 0.04) });
            tl.set(el, { clipPath: 'none' });
        }

        // Frame 4: opacity flash
        if (Math.random() > 0.4) {
            tl.set(el, { opacity: r(0.3, 0.6) });
            tl.to(el, { duration: 0.03 });
            tl.set(el, { opacity: 1 });
        }

        // Frame 5: second CA pulse, different offset
        if (Math.random() > 0.3) {
            var ca2 = r(1, 3);
            tl.set(el, {
                boxShadow: ca2 + 'px 0 0 rgba(0,240,255,0.2), '
                          + (-ca2) + 'px 0 0 rgba(255,30,111,0.2), '
                          + '0 2px 8px rgba(0,0,0,0.3)',
            });
            tl.to(el, { duration: r(0.02, 0.05) });
        }

        // Frame 6: brief hue corruption
        if (Math.random() > 0.5) {
            var hue = Math.floor(r(60, 300));
            tl.set(el, { filter: 'hue-rotate(' + hue + 'deg) brightness(1.3)' });
            tl.to(el, { duration: 0.03 });
            tl.set(el, { filter: 'none' });
        }

        // Second clip tear
        if (Math.random() > 0.5) {
            var s2Top = r(5, 70);
            var s2H = r(3, 15);
            tl.set(el, { clipPath: 'inset(' + s2Top + '% 0 ' + (100 - s2Top - s2H) + '% 0)' });
            tl.to(el, { duration: r(0.02, 0.04) });
            tl.set(el, { clipPath: 'none' });
        }

        // Clean
        tl.set(el, {
            boxShadow: '',
            opacity: 1,
            clipPath: 'none',
            filter: 'none',
            clearProps: 'boxShadow,opacity,clipPath,filter',
        });

        // Text RGB split
        var texts = el.querySelectorAll('a, strong, .task-board-title, h3');
        if (!texts.length && el.textContent.trim()) texts = [el];
        var cx = r(2, 5);
        texts.forEach(function (te) {
            gsap.timeline()
                .set(te, { textShadow: (-cx) + 'px 0 rgba(0,240,255,0.6), ' + cx + 'px 0 rgba(255,30,111,0.6)' })
                .to(te, { duration: r(0.06, 0.12) })
                .set(te, { textShadow: 'none', clearProps: 'textShadow' });
        });
    }

    glitchTargets.forEach(function (sel) {
        $(document).on('mouseenter', sel, function () { cyberGlitch(this); });
    });

    // Links: just text CA, no movement
    $(document).on('mouseenter', '.page a, header a', function () {
        if (this._g || isDragging) return;
        var el = this;
        el._g = true;
        var cx = r(1.5, 3.5);
        gsap.timeline({ onComplete: function () { el._g = false; } })
            .set(el, { textShadow: (-cx) + 'px 0 rgba(0,240,255,0.5), ' + cx + 'px 0 rgba(255,30,111,0.5)' })
            .to(el, { duration: r(0.06, 0.1) })
            .set(el, { textShadow: 'none', clearProps: 'textShadow' });
    });
    } // end glitch-enabled
});
