$(document).ready(function () {

    // ── BACK TO TOP ──
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) $('#backToTop').addClass('topshow');
        else $('#backToTop').removeClass('topshow');
    });
    $('#backToTop').click(function (e) { e.preventDefault(); $('html, body').animate({ scrollTop: 0 }, 400); });

    // ── FIX DRAG LAG ──
    var isDragging = false;
    $(document).on('sortstart', function () { isDragging = true; $('.ui-sortable-helper').css('transition', 'none'); });
    $(document).on('sortstop', function () { isDragging = false; });

    // ══════════════════════════════════════════
    //  COOKIE-BASED DARK/LIGHT THEME TOGGLE
    // ══════════════════════════════════════════
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + days * 86400000);
        document.cookie = name + '=' + value + ';path=/;expires=' + d.toUTCString() + ';SameSite=Lax';
    }

    var savedTheme = getCookie('neu_theme');
    if (savedTheme === 'light') document.body.classList.add('light-mode');

    var toggleBtn = document.createElement('button');
    toggleBtn.id = 'neu-theme-toggle';
    toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '<i class="fa fa-moon-o"></i>' : '<i class="fa fa-sun-o"></i>';
    toggleBtn.title = 'Toggle light/dark mode';
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
        var isLight = document.body.classList.contains('light-mode');
        setCookie('neu_theme', isLight ? 'light' : 'dark', 365);
        toggleBtn.innerHTML = isLight ? '<i class="fa fa-moon-o"></i>' : '<i class="fa fa-sun-o"></i>';
        // Theme colors update handled by CSS variables
    });

    // ══════════════════════════════════════════
    //  GSAP ANIMATIONS
    // ══════════════════════════════════════════
    if (typeof gsap === 'undefined') return;
    gsap.defaults({ ease: 'power2.out', duration: 0.5 });

    function anim(sel, props) { var e = document.querySelectorAll(sel); if (e.length) gsap.from(e, props); }

    gsap.from('header', { y: -15, opacity: 0, duration: 0.4 });
    anim('header h1', { x: -10, opacity: 0, duration: 0.4, delay: 0.1 });
    anim('header .menus-container > *', { scale: 0.9, opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.2 });
    anim('.page-header li, .buttons-header li', { y: -6, opacity: 0, duration: 0.3, stagger: 0.04, delay: 0.15 });
    anim('#board th.board-column-header', { y: -8, opacity: 0, duration: 0.3, stagger: 0.06, delay: 0.1 });
    anim('.task-board', { scale: 0.96, opacity: 0, duration: 0.3, stagger: 0.04, delay: 0.2 });

    document.querySelectorAll('.project-overview-column strong').forEach(function (el) {
        var t = parseInt(el.textContent, 10); if (isNaN(t)) return;
        var o = { v: 0 };
        gsap.to(o, { v: t, duration: 1, delay: 0.3, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
    });

    anim('.accordion-title', { x: -8, opacity: 0, duration: 0.25, stagger: 0.04, delay: 0.15 });
    anim('.activity-event', { y: 8, opacity: 0, duration: 0.25, stagger: 0.04, delay: 0.15 });
    anim('.task-summary-container', { y: 8, opacity: 0, duration: 0.3, delay: 0.15 });

    // Modal pop-in
    new MutationObserver(function (muts) {
        muts.forEach(function (m) { m.addedNodes.forEach(function (n) {
            if (n.nodeType !== 1) return;
            if (n.id === 'modal-overlay' || (n.querySelector && n.querySelector('#modal-overlay'))) {
                var b = document.getElementById('modal-box');
                if (b) gsap.from(b, { scale: 0.94, opacity: 0, duration: 0.25, ease: 'power3.out' });
            }
        }); });
    }).observe(document.body, { childList: true, subtree: true });

    // Dropdown stagger
    $(document).on('click', '.dropdown-menu', function () {
        var self = this;
        setTimeout(function () {
            var m = $(self).siblings('ul.dropdown-submenu-open');
            if (m.length) {
                gsap.from(m[0], { y: -4, opacity: 0, duration: 0.2, ease: 'power2.out' });
                gsap.from(m.find('li').toArray(), { y: -4, opacity: 0, duration: 0.12, stagger: 0.02, ease: 'power2.out' });
            }
        }, 10);
    });

    // Hover effects handled purely in CSS (GSAP can't resolve CSS vars in inline box-shadow)
});
