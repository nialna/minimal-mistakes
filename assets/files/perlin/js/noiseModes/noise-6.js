define ([], function () {
	function getValue (noise, params, delta, x, y) {
		var n = noise.simplex3(
			x / (params.size),
			y / (params.size),
			delta / 5
			);
		var n2 = noise.simplex3 (
			x / (params.size / 50),
			y / (params.size / 50),
			1 );
		var nWater = noise.simplex3 (
			x / (params.size / 10),
			y / (params.size / 10),
			delta /2);
		var n256 = n * 512;
		var color;
		if (n256 <= 0) { // Water
			if (nWater < 0.25) {
				color = [
					36,
					102,
					202,
					256
				];
			} else {
				color = [
					3,
					52,
					124,
					256
				];
			}
		} else if (n256 < 16) { // Sand
			if (n2 < 0.25) {
				color = [
					202,
					200,
					36,
					256
				];
			} else {
				color = [
					174,
					160,
					4,
					256
				];
			}
		} else if (n256 < 48) { // Dirt
			color = [
				119,
				91,
				24,
				256
			];
		}
		else if (n256 < 160) { // Grass
			if (n2 < 0.25) {
				color = [
					26,
					119,
					24,
					256
				];
			} else {
				color = [
					33,
					97,
					10,
					256
				]
			}
		} else if (n256 < 210) { // Mountains
			color = [
				105,
				84,
				62,
				256
			];
		} else if (n256 < 248) { // Snow
			color = [
				197,
				197,
				197,
				256
			];
		} else { // Snow top
			color = [
				256,
				256,
				256,
				256
			];
		}
		return color;
	}

	return getValue;
});