define (['jquery', 'domReady', 'dat.gui', 'Parameters', 'position', 'ctx', 'viewport', 'setPixels', 'noises', 'getNoise'],
function ($, domReady, dat, params, position, ctx, viewport, setPixels, noises, getNoise) {

	var time = 0;
	var lastTime = Date.now();
	var gui = new dat.GUI();
	gui.add(params, 'scale', 1, 10).step(1);
	gui.add(params, 'size', 1, 1000);
	gui.add(params, 'speed', 0, 10);
	gui.add(params, 'mode',  noises.list)
	gui.add(params, 'paused');
	gui.add(params, 'moveSpeed', 1, 10);

	require(noises.files, function () {
		getNoise.init(arguments);
		run();
	})


		function run () {
			position.update();
			if (!params.paused) {
				var now = Date.now();
				var delta = now - lastTime;
				lastTime = now;
				time += delta;
				setPixels(time / ((10.01 - params.speed) * 1000), params);
			}
			window.requestAnimationFrame(run);
		}

});