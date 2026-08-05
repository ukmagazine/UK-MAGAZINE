<?php
/**
 * Plugin Name: UK Magazine bridge
 * Description: Exposes the three extra fields the static front end reads over the REST API.
 * Version:     1.0.0
 *
 * ── نصب ─────────────────────────────────────────────────────────────
 * این فایل را در وردپرس اینجا بگذارید:
 *
 *     wp-content/mu-plugins/uk-magazine-bridge.php
 *
 * پوشهٔ mu-plugins اگر نبود بسازید. افزونه‌های این پوشه همیشه فعال‌اند و
 * نیازی به فعال‌سازی دستی ندارند.
 * ────────────────────────────────────────────────────────────────────
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the meta keys the front end maps onto `subtitle`, `imageCredit`
 * and `kind`. `show_in_rest` is what makes them visible to the sync script —
 * without it they exist in the database but never reach the API.
 */
add_action('init', function () {
    $fields = [
        // Deck / standfirst under the headline.
        'uk_subtitle'     => 'زیرعنوان',
        // Photo credit shown under the lead image.
        'uk_image_credit' => 'اعتبار تصویر',
        // Editorial treatment: report | analysis | opinion | video | breaking
        'uk_kind'         => 'نوع گزارش',
        // Absolute URL of the lead image, hotlinked from its origin CDN.
        'uk_image_url'    => 'نشانی تصویر شاخص',
    ];

    foreach ($fields as $key => $label) {
        register_post_meta('post', $key, [
            'type'         => 'string',
            'description'  => $label,
            'single'       => true,
            'default'      => '',
            'show_in_rest' => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});

/**
 * Generate a variant close to the site's 1440px canvas.
 *
 * WordPress ships thumbnail/medium/medium_large/large (max 1024). The lead
 * image on a desktop hero is wider than that, and without this the browser
 * falls back to the full-size original for it.
 */
add_action('after_setup_theme', function () {
    add_image_size('uk-wide', 1440, 0, false);
});

/**
 * Allow the static front end to read the API from its build machine.
 *
 * Reading published posts is public in WordPress by default, so this is only
 * needed if a security plugin has locked the REST API down. Narrow the origin
 * before using it in production.
 */
add_filter('rest_pre_serve_request', function ($served) {
    // header('Access-Control-Allow-Origin: https://your-site.example');
    return $served;
});
