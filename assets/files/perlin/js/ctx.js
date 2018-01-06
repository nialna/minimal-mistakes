define (['jquery', 'viewport'], function ($, viewport) {

	var canvas = $('#noise');
	$('#noise').attr({
		width : viewport.width,
		height : viewport.height
	});
	var ctx = $('#noise')[0].getContext('2d');
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;

	ctx.fillStyle = "black";
	return ctx;
})