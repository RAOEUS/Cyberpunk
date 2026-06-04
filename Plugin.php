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
            copy('plugins/Cyberpunk/Assets/images/brand-logo.svg', DATA_DIR . '/files/Cyberpunk/Assets/images/brand-logo.svg');
        }

        if (isset($themeCyberpunkConfig['logo']) && strpos($themeCyberpunkConfig['logo'], 'data/files/') === 0) {
            $themeCyberpunkConfig['logo'] = 'plugins/Cyberpunk/Assets/images/brand-logo.svg';
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

        $this->hook->on("template:layout:css", array("template" => "plugins/Cyberpunk/Assets/css/neumorphism.css"));
        $this->hook->on("template:layout:css", array("template" => "plugins/Cyberpunk/Assets/css/prism.css"));

        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/clipboard.min.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/prism.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/gsap.min.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/Cyberpunk/Assets/js/neumorphism.js'));
    }

    public function getPluginName()
    {
        return 'Neumorphism';
    }

    public function getPluginDescription()
    {
        return t('A clean, modern neumorphic theme for Kanboard with dark and light modes.');
    }

    public function getPluginAuthor()
    {
        return 'RAOEUS';
    }

    public function getPluginVersion()
    {
        return '2.0.0';
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
