<?php

namespace Kanboard\Plugin\Cyberpunk;

use Kanboard\Core\Plugin\Base;

class Plugin extends Base
{

    public function initialize()
    {
        global $themeCyberpunkConfig;

        if (file_exists(DATA_DIR . '/files/Cyberpunk/config.php'))
        {
            require_once(DATA_DIR . '/files/Cyberpunk/config.php');
        } else {
            mkdir(DATA_DIR . '/files/Cyberpunk/Assets/images', 0755, true);
            copy('plugins/Cyberpunk/config.php', DATA_DIR . '/files/Cyberpunk/config.php');
            copy('plugins/Cyberpunk/Assets/images/brand-logo.png', DATA_DIR . '/files/Cyberpunk/Assets/images/brand-logo.png');
        }

        if (isset($themeCyberpunkConfig['logo']) && strpos($themeCyberpunkConfig['logo'], 'data/files/') === 0) {
            $themeCyberpunkConfig['logo'] = 'plugins/Cyberpunk/Assets/images/brand-logo.png';
        }

        if (file_exists('plugins/Customizer'))
		{
            $this->template->setTemplateOverride('header/title', 'Cyberpunk:layout/header/customizerTitle');
            $this->template->setTemplateOverride('layout', 'Cyberpunk:layout');
            $this->template->setTemplateOverride('header/creation_dropdown', 'Cyberpunk:layout/header/creation_dropdown');
		}
			elseif (isset($themeCyberpunkConfig['logo']))
        {
            $this->template->setTemplateOverride('header/title', 'Cyberpunk:layout/header/title');
            $this->template->setTemplateOverride('layout', 'Cyberpunk:layout');
            $this->template->setTemplateOverride('header/creation_dropdown', 'Cyberpunk:layout/header/creation_dropdown');
        }

        $this->hook->on("template:layout:css", array("template" => "plugins/Cyberpunk/Assets/css/cyberpunk.css"));

        $this->hook->on("template:layout:css", array("template" => "plugins/Cyberpunk/Assets/css/prism.css"));

        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/clipboard.min.js'));

        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/prism.js'));

        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/three.min.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/CopyShader.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/LuminosityHighPassShader.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/EffectComposer.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/RenderPass.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/ShaderPass.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/UnrealBloomPass.js'));

        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/gsap.min.js'));

        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/cyberpunk.js'));
    }

    public function getPluginName()
    {
        return 'Cyberpunk';
    }

    public function getPluginDescription()
    {
        return t('Cyberpunk theme for Kanboard with syntax highlighting for Markdown code.');
    }

    public function getPluginAuthor()
    {
        return 'Valentino Pesce';
    }

    public function getPluginVersion()
    {
        return '1.3.6';
    }

    public function getCompatibleVersion()
    {
        return '>=1.0.48';
    }

    public function getPluginHomepage()
    {
        return 'https://github.com/RAOEUS/cyberpunk-kanboard';
    }

}
