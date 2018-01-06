define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = Math.abs (noise.simplex3(
			x / (params.size / 10),
			y / (params.size * 1),
			delta * 10));
		var n256 = n * 256;
		var color = [
			0,
			200,
			Math.max(200, (25 - n256) * 12),
			256
		];
		return color;
	}

	return getValue;
});