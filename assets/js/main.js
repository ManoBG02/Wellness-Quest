
(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function () { return $(this) } : function (intensity) {

		var $window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i = 0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function () {

			var $t = $(this),
				on, off;

			on = function () {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function () {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function () {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function () {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});


	// Clear transitioning state on unload/hide.
	$window.on('unload pagehide', function () {
		window.setTimeout(function () {
			$('.is-transitioning').removeClass('is-transitioning');
		}, 250);
	});


	// Fix: Enable IE-only tweaks.
	if (browser.name == 'ie' || browser.name == 'edge')
		$body.addClass('is-ie');

	// Scrolly.
	$('.scrolly').scrolly({
		offset: function () {
			return $header.height() - 2;
		}
	});

	// Tiles.
	var $tiles = $('.tiles > article');

	$tiles.each(function () {

		var $this = $(this),
			$image = $this.find('.image'), $img = $image.find('img'),
			$link = $this.find('.link'),
			x;

		// Image.

		// Set image.
		$this.css('background-image', 'url(' + $img.attr('src') + ')');

		// Set position.
		if (x = $img.data('position'))
			$image.css('background-position', x);

		// Hide original.
		$image.hide();

		// Link.
		if ($link.length > 0) {

			$x = $link.clone()
				.text('')
				.addClass('primary')
				.appendTo($this);

			$link = $link.add($x);

			$link.on('click', function (event) {

				var href = $link.attr('href');

				// Prevent default.
				event.stopPropagation();
				event.preventDefault();

				// Target blank?
				if ($link.attr('target') == '_blank') {

					// Open in new tab.
					window.open(href);

				}

				// Otherwise ...
				else {

					// Start transitioning.
					$this.addClass('is-transitioning');
					$wrapper.addClass('is-transitioning');

					// Redirect.
					window.setTimeout(function () {
						location.href = href;
					}, 500);

				}

			});

		}

	});

	// Header.
	if ($banner.length > 0
		&& $header.hasClass('alt')) {

		$window.on('resize', function () {
			$window.trigger('scroll');
		});

		$window.on('load', function () {

			$banner.scrollex({
				bottom: $header.height() + 10,
				terminate: function () { $header.removeClass('alt'); },
				enter: function () { $header.addClass('alt'); },
				leave: function () { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

			window.setTimeout(function () {
				$window.triggerHandler('scroll');
			}, 100);

		});

	}

	// Banner.
	$banner.each(function () {

		var $this = $(this),
			$image = $this.find('.image'), $img = $image.find('img');

		// Parallax.
		$this._parallax(0.275);

		// Image.
		if ($image.length > 0) {

			// Set image.
			$this.css('background-image', 'url(' + $img.attr('src') + ')');

			// Hide original.
			$image.hide();

		}

	});

	// Menu.
	var $menu = $('#menu'),
		$menuInner;

	$menu.wrapInner('<div class="inner"></div>');
	$menuInner = $menu.children('.inner');
	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menuInner
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			window.setTimeout(function () {
				window.location.href = href;
			}, 250);

		});

	$menu
		.appendTo($body)
		.on('click', function (event) {

			event.stopPropagation();
			event.preventDefault();

			$body.removeClass('is-menu-visible');

		})
		.append('<a class="close" href="#menu">Close</a>');

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('click', function (event) {

			// Hide.
			$menu._hide();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

	$(document).ready(function () {
		initializeQuiz();
	});

	function initializeQuiz() {
		const quizData = [
			{
				question: "Which nutrient is most effective at raising vitamin D levels?",
				a: "Vitamin A",
				b: "Vitamin B12",
				c: "Vitamin D",
				d: "Vitamin C",
				correct: "c",
			},
			{
				question: "What percentage of the human body is water?",
				a: "60%",
				b: "72%",
				c: "65%",
				d: "55%",
				correct: "a",
			},
			{
				question: "How many hours of sleep are recommended for most adults?",
				a: "6-7 hours",
				b: "7-9 hours",
				c: "5-6 hours",
				d: "9-10 hours",
				correct: "b",
			},
			{
				question: "Which activity is best known for reducing stress?",
				a: "Running",
				b: "Swimming",
				c: "Yoga",
				d: "Cycling",
				correct: "c",
			},
			{
				question: "What is the main benefit of eating omega-3 fatty acids?",
				a: "Improves vision",
				b: "Strengthens bones",
				c: "Supports heart health",
				d: "Enhances hair growth",
				correct: "c",
			},
			{
				question: "Which vitamin is crucial for the absorption of calcium?",
				a: "Vitamin K",
				b: "Vitamin E",
				c: "Vitamin D",
				d: "Vitamin B12",
				correct: "c",
			},
			{
				question: "What does BMI stand for?",
				a: "Body Mass Index",
				b: "Basic Metabolic Indicator",
				c: "Body Metabolism Increase",
				d: "Basic Movement Interval",
				correct: "a",
			},
			{
				question: "Which food is known for its high content of Vitamin C?",
				a: "Banana",
				b: "Carrot",
				c: "Beef",
				d: "Orange",
				correct: "d",
			},
			{
				question: "What is the recommended daily intake of fiber for adults?",
				a: "10-15 grams",
				b: "25-30 grams",
				c: "5-10 grams",
				d: "15-20 grams",
				correct: "b",
			},
			{
				question: "Which mental practice can reduce anxiety and improve concentration?",
				a: "Jogging",
				b: "Meditation",
				c: "Reading",
				d: "Weightlifting",
				correct: "b",
			}
		];

		let currentQuestionIndex = 0;
		let score = 0;
		const quizContainer = $('#quiz');
		const questionElement = $('#question');
		const answers = $('.answer');
		const submitButton = $('#submit');
		const scoreboard = $('#scoreboard');
		const scoreText = $('#score');

		function loadQuestion() {
			answers.each(function () { this.checked = false; });
			let currentQuestion = quizData[currentQuestionIndex];
			questionElement.text(currentQuestion.question);
			$('#a_text').text(currentQuestion.a);
			$('#b_text').text(currentQuestion.b);
			$('#c_text').text(currentQuestion.c);
			$('#d_text').text(currentQuestion.d);
		}

		function getSelected() {
			let selectedAnswer = undefined;
			answers.each(function () {
				if (this.checked) selectedAnswer = this.id;
			});
			return selectedAnswer;
		}

		submitButton.click(function () {
			let answer = getSelected();
			if (answer) {
				if (answer === quizData[currentQuestionIndex].correct) {
					score++;
				}
				if (currentQuestionIndex < quizData.length - 1) {
					currentQuestionIndex++;
					loadQuestion();
				} else {
					quizContainer.hide();
					scoreboard.show();
					scoreText.text(`You scored ${score} out of ${quizData.length} (${(score / quizData.length * 100).toFixed(2)}%)`);
				}
			}
		});

		loadQuestion();
	}

})(jQuery);



