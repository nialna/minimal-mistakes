var Menu = {

	animate : function(delta){

	}

	, render : function(delta, ctx){

		ctx.font = "50px calibri";
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(imageManager.getImage("background2"), 0, 0);
		ctx.fillStyle = "black";

		for (var i in this.buttons){
			var p = this.buttons[i];
			p.render(ctx);
		}
	}

	, logic : function(delta){


	}
};