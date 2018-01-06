define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = Math.abs(
			noise.simplex3(x / params.size, y/ params.size, delta));
		var n256 = n * 256;
		var color = [
			Math.max(0, (25 - n256) * 8),
			n256,
			n256,
			256
		];
		return color;
	}

	return getValue;
});