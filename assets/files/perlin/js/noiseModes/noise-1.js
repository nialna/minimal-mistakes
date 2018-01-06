define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = Math.abs(
			noise.simplex3(
				x / (params.size * 10),
				y / (params.size / 10),
				delta * 10));
		var n256 = n * 128;
		var color = [
			n256,
			Math.max (0, (10 - n256) * 8),
			n256 * 2,
			Math.max(0, (10 - n256) * 16)
		];
		return color;
	}

	return getValue;
});