define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = Math.abs (noise.simplex3(
			x / (params.size * 24),
			y / (params.size * 24),
			delta
			));
		var n256 = n * 256;
		var color = [
			Math.min (64, n256 * 2),
			32 + n256,
			64 + n256,
			128 + n256
		];
		return color;
	}

	return getValue;
});