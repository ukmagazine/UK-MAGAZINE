<?php
/**
 * Plugin Name: UK Magazine Bridge
 * Description: Registers the UK Magazine post meta fields for Make.com and the static front end, and adds an editor meta box.
 * Version:     2.2.0
 *
 * Install as a must-use plugin:
 *   wp-content/mu-plugins/uk-magazine-bridge.php
 */

if (!defined('ABSPATH')) {
    exit;
}

/** Editorial treatments accepted by `uk_kind`. Must match ArticleKind in the site repo. */
function ukmag_bridge_kinds() {
    return ['report', 'analysis', 'opinion', 'video', 'breaking', 'interview'];
}

/**
 * Every meta key the static site reads.
 *
 * `group` only drives the layout of the editor box. `type` drives both the
 * input element and the sanitiser in save_post_post below.
 */
function ukmag_bridge_fields() {
    return [
        'uk_subtitle'     => ['label' => 'زیرعنوان', 'type' => 'text'],
        'uk_image_credit' => ['label' => 'اعتبار تصویر', 'type' => 'text'],
        'uk_kind'         => ['label' => 'نوع گزارش', 'type' => 'text'],
        'uk_image_url'    => ['label' => 'نشانی تصویر (Hotlink URL)', 'type' => 'url'],
        'uk_sponsored'    => ['label' => 'نوع محتوای تجاری', 'type' => 'text'],

        // ---- Interview desk (2.2.0) ------------------------------------ //
        // Read only when uk_kind = interview. Harmless on any other post.
        'uk_lang'             => ['label' => 'زبان متن مقاله (fa | en)', 'type' => 'text', 'group' => 'interview'],
        'uk_guest_name'       => ['label' => 'نام مهمان', 'type' => 'text', 'group' => 'interview'],
        'uk_guest_role'       => ['label' => 'سمت مهمان', 'type' => 'text', 'group' => 'interview'],
        'uk_company_name'     => ['label' => 'نام شرکت', 'type' => 'text', 'group' => 'interview'],
        'uk_company_url'      => ['label' => 'وب‌سایت شرکت', 'type' => 'url', 'group' => 'interview'],
        'uk_company_logo_url' => ['label' => 'نشانی لوگوی شرکت (Hotlink URL)', 'type' => 'url', 'group' => 'interview'],
        'uk_company_location' => ['label' => 'محل شرکت', 'type' => 'text', 'group' => 'interview'],
        'uk_guest_linkedin'   => ['label' => 'لینکدین مهمان', 'type' => 'url', 'group' => 'interview'],
        'uk_company_linkedin' => ['label' => 'لینکدین شرکت', 'type' => 'url', 'group' => 'interview'],
        'uk_editor_note'      => ['label' => 'یادداشت تحریریه (فارسی، ۳ تا ۴ جمله)', 'type' => 'textarea', 'group' => 'interview'],
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

/** Make the fields obvious in wp-admin; editors should not rely on the generic Custom Fields box. */
add_action('add_meta_boxes', function () {
    add_meta_box(
        'ukmagazine-fields',
        'UK Magazine Fields',
        function ($post) {
            wp_nonce_field('ukmagazine_fields_save', 'ukmagazine_fields_nonce');

            echo '<div style="display:grid;gap:14px">';

            $interview_heading_done = false;
            foreach (ukmag_bridge_fields() as $key => $config) {
                $group = isset($config['group']) ? $config['group'] : 'core';

                if ($group === 'interview' && !$interview_heading_done) {
                    echo '<hr style="margin:6px 0;border:0;border-top:1px solid #dcdcde">';
                    echo '<p style="margin:0;font-weight:600">فیلدهای مصاحبه</p>';
                    echo '<p style="margin:0;color:#646970">فقط وقتی خوانده می‌شوند که uk_kind = interview باشد. روی بقیهٔ مطالب بی‌اثرند.</p>';
                    $interview_heading_done = true;
                }

                $value = get_post_meta($post->ID, $key, true);

                if ($config['type'] === 'textarea') {
                    printf(
                        '<label for="%1$s"><strong>%2$s</strong><br><textarea id="%1$s" name="%1$s" rows="4" style="width:100%%;margin-top:5px">%3$s</textarea></label>',
                        esc_attr($key),
                        esc_html($config['label']),
                        esc_textarea($value)
                    );
                    continue;
                }

                printf(
                    '<label for="%1$s"><strong>%2$s</strong><br><input id="%1$s" name="%1$s" type="%3$s" value="%4$s" style="width:100%%;margin-top:5px" autocomplete="off"></label>',
                    esc_attr($key),
                    esc_html($config['label']),
                    esc_attr($config['type']),
                    esc_attr($value)
                );
            }

            printf(
                '<p style="margin:0;color:#646970">uk_kind: %s</p>',
                esc_html(implode(' | ', ukmag_bridge_kinds()))
            );
            echo '<p style="margin:0;color:#646970">uk_sponsored: paid | advertorial | supported | (خالی)</p>';
            echo '<p style="margin:0;color:#646970">uk_lang: fa | en | (خالی — فارسی در نظر گرفته می‌شود)</p>';
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
        if ($config['type'] === 'url') {
            $value = esc_url_raw($raw, ['http', 'https']);
        } elseif ($config['type'] === 'textarea') {
            $value = sanitize_textarea_field($raw);
        } elseif ($key === 'uk_kind') {
            // 🔴 A kind missing from this list is rewritten to 'report' and the
            // editor is given no warning. Adding a treatment to the site repo
            // without adding it here is the project's classic silent failure.
            $candidate = sanitize_key($raw);
            $value = in_array($candidate, ukmag_bridge_kinds(), true)
                ? $candidate
                : 'report';
        } elseif ($key === 'uk_lang') {
            // Anything else means "not stated", which the site reads as Persian.
            $candidate = sanitize_key($raw);
            $value = in_array($candidate, ['fa', 'en'], true) ? $candidate : '';
        } elseif ($key === 'uk_sponsored') {
            // Anything unrecognised becomes empty, i.e. ordinary editorial.
            // Never guess a commercial label onto a post that did not ask for
            // one: a wrongly applied «تبلیغ» is as damaging as a missing one.
            $candidate = sanitize_key($raw);
            $value = in_array($candidate, ['paid', 'advertorial', 'supported'], true)
                ? $candidate
                : '';
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
