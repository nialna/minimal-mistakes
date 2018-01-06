define (['position', 'noise'],
	function (position, noise) {
	noise.seed (Math.random() );
	var noises = [];
	function init (noiseFunctions) {
		noises = noiseFunctions
	}
	function getNoise (i, j, delta, params) {
		var color;
		var x = position.x + i;
		var y = position.y + j;
		color = noises[parseInt(params.mode, 10)](noise, params, delta, x, y);
		return color;
	}

	return {
		init : init,
		get : getNoise
	};
});