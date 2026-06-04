<?php global $themeCyberpunkConfig; ?>
    <span class="logo">
        <?php if (!isset($themeCyberpunkConfig['logo'])) : ?>
            <?= $this->url->link('K<span>B</span>', 'DashboardController', 'show', array(), false, '', t('Dashboard')) ?>
        <?php else: ?>
            <?= $this->url->link('<img src="plugins/Cyberpunk/Assets/images/brand-logo.svg" style="display: inline-block; height: 28px; vertical-align: middle; margin-right: 12px;" />', 'DashboardController', 'show', array(), false, '', t('Dashboard')) ?>
        <?php endif ?>
    </span>
<h1>
    <span class="title">
        <?php if (! empty($project) && ! empty($task)): ?>
            <?= $this->url->link($this->text->e($project['name']), 'BoardViewController', 'show', array('project_id' => $project['id'])) ?>
        <?php else: ?>
            <?= $this->text->e($title) ?>
        <?php endif ?>
    </span>
    <?php if (! empty($description)): ?>
        <?= $this->app->tooltipHTML($description) ?>
    <?php endif ?>
</h1>
