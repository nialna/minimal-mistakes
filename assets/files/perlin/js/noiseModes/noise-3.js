define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = Math.abs (noise.simplex3(
			x / (params.size  / 5),
			y / (params.size  / 5),
			delta / 2
			));
		var n256 = n * 128;
		var color = [
			128 + n256,
			128  + n256,
			128 + n256,
			128 + n256
		]
		return color;
	}

	return getValue;
});