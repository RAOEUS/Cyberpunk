(function() {
    var m = document.cookie.match(/(?:^| )neu_theme=([^;]+)/);
    var mode = m ? m[1] : 'system';
    if (mode !== 'system' && mode !== 'light' && mode !== 'dark') mode = 'system';
    var wantLight = mode === 'light' || (mode === 'system' && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
    if (wantLight) document.documentElement.classList.add('light-mode');
})();
