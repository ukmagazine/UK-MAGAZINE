<?php
/**
 * Plugin Name: UK Magazine Bridge
 * Description: Registers the four UK Magazine post meta fields for Make.com and the static front end, and adds an editor meta box.
 * Version:     2.0.0
 *
 * Install as a must-use plugin:
 *   wp-content/mu-plugins/uk-magazine-bridge.php
 */

if (!defined('ABSPATH')) {
    exit;
}

function ukmag_bridge_fields() {
    return [
        'uk_subtitle'     => ['label' => 'زیرعنوان', 'type' => 'text'],
        'uk_image_credit' => ['label' => 'اعتبار تصویر', 'type' => 'text'],
        'uk_kind'         => ['label' => 'نوع گزارش', 'type' => 'text'],
        'uk_image_url'    => ['label' => 'نشانی تصویر (Hotlink URL)', 'type' => 'url'],
    ];
}

/**
 * These keys are the API contract with Make.com. `show_in_rest` is essential:
 * without it WordPress may accept the post while silently discarding meta from
 * the REST payload seen by the static sync job.
 */
add_action('init', function () {
    foreach (ukmag_bridge_fields() as $key => $config) {
        register_post_meta('post', $key, [
            'type'          => 'string',
            'description'   => $config['label'],
            'single'        => true,
            'default'       => '',
            'show_in_rest'  => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});

/** Make the four fields obvious in wp-admin; editors should not rely on the generic Custom Fields box. */
add_action('add_meta_boxes', function () {
    add_meta_box(
        'ukmagazine-fields',
        'UK Magazine Fields',
        function ($post) {
            wp_nonce_field('ukmagazine_fields_save', 'ukmagazine_fields_nonce');

            echo '<div style="display:grid;gap:14px">';
            foreach (ukmag_bridge_fields() as $key => $config) {
                $value = get_post_meta($post->ID, $key, true);
                printf(
                    '<label for="%1$s"><strong>%2$s</strong><br><input id="%1$s" name="%1$s" type="%3$s" value="%4$s" style="width:100%%;margin-top:5px" autocomplete="off"></label>',
                    esc_attr($key),
                    esc_html($config['label']),
                    esc_attr($config['type']),
                    esc_attr($value)
                );
            }
            echo '<p style="margin:0;color:#646970">uk_kind: report | analysis | opinion | video | breaking</p>';
            echo '</div>';
        },
        'post',
        'normal',
        'high'
    );
});

add_action('save_post_post', function ($post_id) {
    if (!isset($_POST['ukmagazine_fields_nonce']) ||
        !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['ukmagazine_fields_nonce'])), 'ukmagazine_fields_save')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    foreach (ukmag_bridge_fields() as $key => $config) {
        if (!array_key_exists($key, $_POST)) {
            continue;
        }

        $raw = wp_unslash($_POST[$key]);
        if ($key === 'uk_image_url') {
            $value = esc_url_raw($raw, ['http', 'https']);
        } elseif ($key === 'uk_kind') {
            $candidate = sanitize_key($raw);
            $value = in_array($candidate, ['report', 'analysis', 'opinion', 'video', 'breaking'], true)
                ? $candidate
                : 'report';
        } else {
            $value = sanitize_text_field($raw);
        }

        update_post_meta($post_id, $key, $value);
    }
});

/** The CMS is a headless content store; the public WordPress theme must not compete with the static site in search. */
add_filter('wp_robots', function ($robots) {
    $robots['noindex'] = true;
    $robots['nofollow'] = true;
    return $robots;
});
