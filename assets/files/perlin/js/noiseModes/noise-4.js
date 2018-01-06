define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = Math.abs (noise.simplex3(
			x / (params.size / 2),
			y / (params.size / 2),
			delta * 2
			));
		var n256 = n * 128;
		var color = [
			Math.min (64, n256 * 2),
			32,
			64 + n256,
			128 + n256
		]
		return color;
	}

	return getValue;
});