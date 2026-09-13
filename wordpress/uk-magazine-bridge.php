<?php
/**
 * Plugin Name: UK Magazine Bridge
 * Description: Registers the UK Magazine post meta fields for Make.com and the static front end, and adds an editor meta box.
 * Version:     2.3.0
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

        // ---- Pins (2.3.0) ---------------------------------------------- //
        // Set by a human in wp-admin only. Make.com never sends these keys.
        'uk_pin' => [
            'label'   => 'سنجاق در بالای صفحه',
            'type'    => 'select',
            'group'   => 'pin',
            'options' => [
                ''         => '(بدون سنجاق)',
                'category' => 'category — بالای صفحهٔ دسته',
                'home'     => 'home — بالای صفحهٔ اصلی',
                'both'     => 'both — هر دو',
            ],
        ],
        'uk_pin_rank' => [
            'label'   => 'اولویت سنجاق',
            'type'    => 'select',
            'group'   => 'pin',
            'options' => [
                ''  => '(خالی — پایین‌ترین اولویت)',
                '1' => '1',
                '2' => '2',
                '3' => '3',
            ],
        ],
        'uk_pin_until' => ['label' => 'پایان سنجاق (به وقت لندن)', 'type' => 'date', 'group' => 'pin'],
    ];
}

/**
 * Accepted values for the three pin keys; anything else is stored empty.
 *
 * Never guess a pin onto a post that did not ask for one. And never keep a
 * mistyped date: an emptied field is visible to the editor in the meta box,
 * which a silently kept bad date would not be.
 *
 * Registered as the `sanitize_callback` of all three keys, so it also covers a
 * write that arrives over REST and never touches the form.
 */
function ukmag_bridge_sanitize_pin($value, $meta_key) {
    $value = is_string($value) ? trim($value) : '';

    if ($meta_key === 'uk_pin') {
        $value = strtolower($value);
        return in_array($value, ['category', 'home', 'both'], true) ? $value : '';
    }

    if ($meta_key === 'uk_pin_rank') {
        return in_array($value, ['1', '2', '3'], true) ? $value : '';
    }

    if ($meta_key === 'uk_pin_until') {
        if (preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $value, $m) &&
            checkdate((int) $m[2], (int) $m[3], (int) $m[1])) {
            return $value;
        }
        return '';
    }

    return '';
}

/**
 * These keys are the API contract with Make.com. `show_in_rest` is essential:
 * without it WordPress may accept the post while silently discarding meta from
 * the REST payload seen by the static sync job.
 */
add_action('init', function () {
    foreach (ukmag_bridge_fields() as $key => $config) {
        $args = [
            'type'          => 'string',
            'description'   => $config['label'],
            'single'        => true,
            'default'       => '',
            'show_in_rest'  => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ];

        if (isset($config['group']) && $config['group'] === 'pin') {
            $args['sanitize_callback'] = 'ukmag_bridge_sanitize_pin';
        }

        register_post_meta('post', $key, $args);
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

            // One heading per group, printed where the group starts, with the
            // accepted values underneath so the editor reads them first.
            $groups = [
                'interview' => [
                    'title' => 'فیلدهای مصاحبه',
                    'notes' => ['فقط وقتی خوانده می‌شوند که uk_kind = interview باشد. روی بقیهٔ مطالب بی‌اثرند.'],
                ],
                'pin' => [
                    'title' => 'سنجاق',
                    'notes' => [
                        'uk_pin: category | home | both | (خالی — بدون سنجاق)',
                        'uk_pin_rank: 1 | 2 | 3 | (خالی — پایین‌ترین اولویت)',
                        'uk_pin_until: YYYY-MM-DD | (خالی — بدون انقضا). تاریخ نامعتبر خالی ذخیره می‌شود.',
                        'در هر صفحه حداکثر ۲ مقاله سنجاق می‌شود؛ بقیه در جای عادی خود می‌مانند.',
                        'سنجاق در بیلد بعدی سایت اعمال می‌شود: حداکثر یک ساعت، یا فوراً با Run workflow.',
                    ],
                ],
            ];
            $current_group = 'core';

            foreach (ukmag_bridge_fields() as $key => $config) {
                $group = isset($config['group']) ? $config['group'] : 'core';

                if ($group !== $current_group && isset($groups[$group])) {
                    echo '<hr style="margin:6px 0;border:0;border-top:1px solid #dcdcde">';
                    printf('<p style="margin:0;font-weight:600">%s</p>', esc_html($groups[$group]['title']));
                    foreach ($groups[$group]['notes'] as $note) {
                        printf('<p style="margin:0;color:#646970">%s</p>', esc_html($note));
                    }
                }
                $current_group = $group;

                $value = get_post_meta($post->ID, $key, true);

                if ($config['type'] === 'select') {
                    printf(
                        '<label for="%1$s"><strong>%2$s</strong><br><select id="%1$s" name="%1$s" style="width:100%%;margin-top:5px">',
                        esc_attr($key),
                        esc_html($config['label'])
                    );
                    foreach ($config['options'] as $option => $text) {
                        printf(
                            '<option value="%1$s"%2$s>%3$s</option>',
                            esc_attr($option),
                            selected((string) $value, (string) $option, false),
                            esc_html($text)
                        );
                    }
                    echo '</select></label>';
                    continue;
                }

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
        if (isset($config['group']) && $config['group'] === 'pin') {
            // The same function WordPress runs as the registered
            // sanitize_callback; called here as well so this key's rule is
            // visible where every other key's rule is.
            $value = ukmag_bridge_sanitize_pin($raw, $key);
        } elseif ($config['type'] === 'url') {
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
