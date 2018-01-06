define (['viewport', 'ctx', 'getNoise'], function (viewport, ctx, getNoise) {

	var img = ctx.createImageData(viewport.width, viewport.height);
	var imgData = img.data;

	function setPixels (delta, params) {
		var wRes = viewport.width / params.scale;
		var hRes = viewport.height / params.scale;
		for (var i = 0; i < wRes ; i ++) {
			for (var j = 0; j < hRes ; j++) {
				setNoise(delta, i, j, params)
			}
		}
		ctx.fillRect(0, 0, 100, 100);
		ctx.putImageData(img, 0, 0);
	}

	function setNoise (delta, i, j, params) {
		var color = getNoise.get (i, j, delta, params);
		if (color != undefined) {
			for (var x = 0; x < params.scale; x++) {
				for (var y = 0; y < params.scale; y++) {
					setPixel (i * params.scale + x, j * params.scale + y, color, params);
				}
			}
		}
	}

	function setPixel (x, y, color, params) {
		var cell = (x + y * viewport.width) * 4;
		imgData[cell] = color[0];
		imgData[cell + 1] = color[1];
		imgData[cell + 2] = color[2];
		imgData[cell + 3] = color[3];
	}

		return setPixels;
})