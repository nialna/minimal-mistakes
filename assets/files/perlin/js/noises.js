define ([], function () {
	var noiseModes = {
		'2D World': 6,
		'Thingy' : 1,
		'Github demo' : 0,
		'Raindrop' : 2,
		'Slowy' : 3,
		'Stuff' : 4,
		'MovingLight' : 5
	};

	var files = [];
	for (var i in noiseModes) {
		files[noiseModes[i]] = 'noiseModes/noise-' + noiseModes[i];
	}

	return {
		list : noiseModes,
		files : files
	};
});