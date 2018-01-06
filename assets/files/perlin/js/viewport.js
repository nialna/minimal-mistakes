define (['jquery'], function ($) {
	var viewport = {
		width: $(window).width(),
		height: $(window).height(),
	};

	$(window).on('resize', function () {
		viewport.width = $(window).width();
		viewport.height = $(window).height();
	});

	return viewport;
});