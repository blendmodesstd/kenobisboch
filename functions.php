<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	});

	add_filter('template_include', function( $template ) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		parent::__construct();
	}
	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
        $context['theme_options'] = get_fields('options');
        // $context['menu'] = new TimberMenu();
        // $context['nav'] = array();
        // $context['post_index'] = new TimberPost(get_option( 'page_for_posts' ));
        // foreach ($context['menu']->items as $nav_voice) $context['nav'][] = get_menu($nav_voice);
        //
        // var_dump(get_fields());die();
		return $context;
	}
}

new StarterSite();


function remove_customize() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('customize');
    $wp_admin_bar->remove_menu('comments');
    $wp_admin_bar->remove_menu('new-content');
    $wp_admin_bar->remove_menu('wp-logo');
    $wp_admin_bar->remove_menu('dashboard');
    $wp_admin_bar->remove_menu('themes');
    $wp_admin_bar->remove_menu('view-site');
}
add_action( 'wp_before_admin_bar_render', 'remove_customize' );


add_action('admin_menu', function () {
    $request = urlencode($_SERVER['REQUEST_URI']);
    remove_submenu_page('themes.php', 'customize.php?return='. $request);
    remove_submenu_page('themes.php', 'theme-editor.php');
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'tools.php' );
    remove_menu_page( 'edit.php' );
}, 999);

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page();
}

function custom_toolbars( $toolbars ) {
    $toolbars['Simple' ] = array();
    $toolbars['Simple' ][1] = array('bold', 'link');
    return $toolbars;
}

// Remove useless head things
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script' );
remove_action('admin_print_styles', 'print_emoji_styles' );
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('template_redirect', 'rest_output_link_header');
remove_action( 'wp_head', 'wp_resource_hints', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action('admin_menu', 'cptui_plugin_menu' );

add_filter('use_block_editor_for_post', '__return_false', 10);
add_filter('use_block_editor_for_post_type', '__return_false', 10);
add_filter('acf/fields/wysiwyg/toolbars' , 'custom_toolbars'  );

add_filter('acf/settings/show_admin', '__return_false');


function my_deregister_scripts() { wp_deregister_script( 'wp-embed' );}
add_action( 'wp_footer', 'my_deregister_scripts' );


add_filter( 'intermediate_image_sizes', '__return_empty_array' );


