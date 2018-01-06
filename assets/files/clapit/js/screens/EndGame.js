var EndGame = {

	buttons : {}

	, init : function(){

		soundManager.pause(Game.music);
		ScoreManager.updatePlayer();
		var btn = new Button("back", canvasWidth - 300, canvasHeight - 150, "square", "image", "back", 1);
		btn.onMDown = function(coords)
		{
			CONTEXT = Menu;
		}
		
		this.buttons.back = btn;

		btn = new Button("replay", canvasWidth  / 2 - imageManager.getImageSize("replay").x / 2, canvasHeight - 150, "square", "image", "replay", 1);
		btn.onMDown = function(coords)
		{
			Game.init();
			Partition.init(currentLvl);
			soundManager.play(Game.music);
			CONTEXT = Game;
		}
		
		this.buttons.replay = btn;

		btn = new Button("nSong", 100, canvasHeight - 150, "square", "image", "nSong", 1);
		btn.onMDown = function(coords)
		{
			SelectLvl.init();
			CONTEXT = SelectLvl;
		}
		
		this.buttons.nSong = btn;

	}

	, animate : function(delta){


	}

	, render : function(delta, ctx){

		ctx.fillStyle = "white";
		ctx.drawImage(imageManager.getImage("background2"), 0, 0);

		for (var i in this.buttons){

			var p = this.buttons[i];
			p.render(ctx);
		}

		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = FONTS.bigFont;
		ctx.fillText("Level finished : ", canvasWidth / 2 + 250, 100);
		ctx.fillText(PART_DATABASE[currentLvl].title, canvasWidth / 2 + 250, 135);
		ctx.fillText("By " + PART_DATABASE[currentLvl].artist, canvasWidth / 2 + 250, 175);

		ctx.font = FONTS.megaFont;

		ctx.fillText("Score : " + Game.score, canvasWidth / 2 + 250, 230);
	}

	, logic : function(delta){


	}
}