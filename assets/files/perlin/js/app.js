requirejs.config ({
	baseUrl: 'js',
	paths : {
		'dat.gui' : '../libs/dat.gui',
		'jquery' : '../libs/jquery',
		'domReady' : '../libs/domReady',
		'noise' : '../libs/noise'
	},
	shim : {
		'jquery' : {
			'exports' : '$'
		},
		'noise' : {
			'exports' : 'noise'
		},
		'dat.gui' : {
			'exports' : 'dat'
		}
	}
});

requirejs(['main'], function (main) {

});