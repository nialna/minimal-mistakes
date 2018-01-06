var Game = {

	buttons : {}

	, init : function(){

		ScoreManager.init();
		var leftButton = new Button(1, 50, canvasHeight - 200, "circle", "image", "leftButton");
		var rightButton = new Button(2, canvasWidth - 220, canvasHeight - 200, "circle", "image", "rightButton");
		leftButton.onMDown = function(coords){
			Partition.playerTick(Date.now(), this.id);
			this.animState = 1;	
		}
		rightButton.onMDown = function(coords){
			Partition.playerTick(Date.now(), this.id);
			this.animState = 1;	
		}
		leftButton.onMUp = function(coords){
			this.animState = 0;	
		}
		rightButton.onMUp = function(coords){
			this.animState = 0;	
		}
		this.buttons.leftButton = leftButton;
		this.buttons.rightButton = rightButton;

		var btn = new Button("back", canvasWidth/2-100, canvasHeight - 100, "square", "image", "back", 1);
		btn.onMDown = function(coords)
		{
			CONTEXT = Menu;
			if (Game.music != undefined){
				soundManager.pause(Game.music);
			}
		}
		
		this.buttons.back = btn;
		
		/*btn = new Button("replay", 30, 30, "square", "image", "replay", 1);
		btn.onMDown = function(coords)
		{
			Partition.init(currentLvl);
			CONTEXT = Game;
			soundManager.pause(this.music);
			soundManager.play(this.music);
		}*/

		this.buttons.repla = btn;	
		this.musicTimer = Date.now();

		if (PART_DATABASE[currentLvl].music != undefined){
			this.music = PART_DATABASE[currentLvl].music;
		}
		if (PART_DATABASE[currentLvl].musicStartIn != undefined){
			this.musicLaunched = false;

		}else{
			this.musicLaunched = true;
			if (PART_DATABASE[currentLvl].music != undefined){
				soundManager.play(PART_DATABASE[currentLvl].music);
			}
		}		
		ScoreManager.init();

	}

	, animate : function(delta)
	{
	}

	, render : function(delta, ctx)
	{
		ctx.fillStyle = "#57466c";
		ctx.lineWidth = 2;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.srokeStyle = "black";
		ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.drawImage(imageManager.getImage("bas_cassette"), (canvasWidth - 750)/2, canvasHeight - 164);
		Metronome.render(delta);
		
		Partition.draw(ctx);
		for (var i in this.buttons)
		{
			var p = this.buttons[i];
			p.render(ctx);
		}
		
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(LeftGear.x, LeftGear.y+LeftGear.radius+(LeftGear.bobine/2-LeftGear.bobine/4));
		ctx.lineTo(RightGear.x, RightGear.y+RightGear.radius+(RightGear.bobine/2-RightGear.bobine/4));
		ctx.closePath();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(LeftGear.x, LeftGear.y-(LeftGear.radius+(LeftGear.bobine/2-LeftGear.bobine/4)));
		ctx.lineTo(RightGear.x, RightGear.y-(RightGear.radius+(RightGear.bobine/2-RightGear.bobine/4)));
		ctx.closePath();
		ctx.stroke();
		
		RightGear.draw(ctx);
		LeftGear.draw(ctx);
		
		ctx.drawImage(imageManager.getImage("cadre_middle"), (canvasWidth - 1134)/2, 50);
		
		RightJauge.draw(ctx);
		LeftJauge.draw(ctx);
		
		Partition.drawUp(ctx);
		FeedbacksManager.draw(ctx);
		ScoreManager.draw(ctx);

		for (var i in this.buttons){

			var p = this.buttons[i];

			p.render(ctx);
		}
		
		Focus.draw(ctx);
	}

	, logic : function(delta)
	{
		Metronome.update(delta);
		Partition.update(delta);
		FeedbacksManager.update(delta);
		Focus.update(delta);
		
		RightJauge.checkPower(ScoreManager.score);
		LeftJauge.checkPower(ScoreManager.score);
		
		if (!this.musicLaunched && Date.now() - this.musicTimer >= PART_DATABASE[currentLvl].musicStartIn){
			this.musicLaunched = true;
			if (PART_DATABASE[currentLvl].music != undefined){
				soundManager.play(PART_DATABASE[currentLvl].music);
			}
		}
	}
};