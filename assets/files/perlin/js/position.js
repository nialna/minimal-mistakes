define (['jquery', 'Parameters'], function ($, params) {

	var Position = function () {
		this.x = 0;
		this.y = 0;
		this.update = function () {
			if (left) this.x -= params.moveSpeed;
			if (right) this.x += params.moveSpeed;
			if (up) this.y -= params.moveSpeed;
			if (down) this.y += params.moveSpeed;
		};
	};

	var up = 0,
			left = 0,
			right = 0,
			down = 0;

	$(window).on('keydown', function () {
		switch (event.keyCode) {
			case 37 :
				left = 1;
				break;
			case 38:
				up = 1;
				break;
			case 39:
				right = 1;
				break;
			case 40:
				down = 1;
				break;
		}
	});
	$(window).on('keyup', function () {
		switch (event.keyCode) {
			case 37 :
				left = 0;
				break;
			case 38:
				up = 0;
				break;
			case 39:
				right = 0;
				break;
			case 40:
				down = 0;
				break;
		}
	});

	return new Position();
});