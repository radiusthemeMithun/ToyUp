/**
 * Frontend JS
 */

'use strict';

(function ($) {
	var rtFrontend = rtFrontend || {};

	/**
	 * Predefined variables.
	 */
	var $window = $(window),
		$document = $(document),
		$body = $('body'),
		$preLoader = $('.rt-pageloader'),
		$toTop = $('.rt-scroll-to-top'),
		$intelHeader = $('.intelligent-header'),
		$headerSpace = $('.fixed-header-space');

	/**
	 * Check if element exists.
	 */
	$.fn.elExists = function () {
		return this.length > 0;
	};

	/**
	 * Helpers.
	 */
	rtFrontend.helpers = {
		sampleHelper: function () {
			console.log('I am a helper');
		}
	};

	/**
	 * Functions.
	 */
	rtFrontend.functions = {
		preLoaderInit: function () {
			if (!$preLoader.elExists()) {
				return false;
			}

			$preLoader.delay(300).fadeOut('fast');
		},

		scrollToTop: function () {
			$toTop.hide();

			$window.on('scroll', function () {
				if ($window.scrollTop() > 200) {
					$toTop.fadeIn();
				} else {
					$toTop.fadeOut();
				}
			});

			$toTop.on('click', function () {
				$('html, body').animate(
					{
						scrollTop: 0
					},
					{
						duration: 500,
						easing: 'swing'
					}
				);
			});
		},

		bodyClass: function () {
			$body.addClass('document-loaded');
		},

		headerActions: function () {
			if (!$intelHeader.elExists()) {
				return false;
			}

			var intHeight = $intelHeader[0].getBoundingClientRect().height;
			$headerSpace.height(intHeight);
		}
	};

	/**
	 * Scripts to run on document ready event.
	 */
	$document.ready(function () {
		rtFrontend.functions.preLoaderInit();
	});

	/**
	 * Scripts to run on window load event.
	 */
	$window.on('load', function() {
		rtFrontend.functions.bodyClass();
		rtFrontend.functions.headerActions();
	});

	/**
	 * Scripts to run on window resize event.
	 */
	$window.on('resize', function() {
		rtFrontend.functions.headerActions();
	});
})(jQuery);
