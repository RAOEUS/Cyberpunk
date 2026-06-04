# Neumorphism

A clean, modern neumorphic theme for [Kanboard](https://kanboard.org/) with dark and light modes, smooth animations, and 3D background effects.

> **Branch note:** This is the `neumorphism` branch. For the cyberpunk theme, switch to `master`.

## Features

- **Neumorphic design** - Soft raised/inset shadows on every surface, giving a tactile 3D feel
- **Dark & light modes** - Cookie-based toggle (bottom-right button), persists across sessions
- **Three.js background** - Floating 3D geometric shapes (spheres, cubes, tori, octahedra) that respond to mouse movement, with theme-aware colors
- **GSAP animations** - Smooth entrance animations, neumorphic press/release hover effects on cards and buttons, staggered dropdowns and modals
- **Inter font** - Clean variable-weight sans-serif for the UI, Iosevka monospace for code
- **Syntax highlighting** - 151+ languages via Prism.js with soft, readable colors
- **Customizer plugin support** - Compatible with the [Customizer](https://github.com/creecros/Customizer) plugin
- **WCAG AA contrast** - Readable text in both dark and light modes

## Requirements

- Kanboard >= v1.0.48

## Installation

1. Install from the Kanboard plugin manager, **or**
2. Download the zip and extract to `plugins/Cyberpunk`, **or**
3. Clone the neumorphism branch into your Kanboard plugins directory:
   ```
   cd /path/to/kanboard/plugins
   git clone -b neumorphism https://github.com/RAOEUS/cyberpunk-kanboard.git Cyberpunk
   ```

> The folder **must** be named `Cyberpunk` (case-sensitive) — Kanboard loads plugins by folder name.

## Configuration

On first run, the plugin copies a config file to `data/files/Cyberpunk/config.php`. Edit that file to customize settings.

### Custom Logo

```php
$themeCyberpunkConfig['logo'] = 'plugins/Cyberpunk/Assets/images/your-logo.svg';
```

### Theme Mode

Click the sun/moon toggle button in the bottom-right corner to switch between dark and light modes. Your preference is saved in a cookie and persists across sessions.

## Syntax Highlighting

Use fenced code blocks with a language identifier:

~~~
```php
class BaseClass {
    function __construct() {
        print "In BaseClass constructor\n";
    }
}
```
~~~

151 languages supported via Prism.js.

## License

MIT
