var ScoreManager = {

	"score" : 0
	, "scoreX": 1000, "scoreY": 140
	, "totalNotes" : 0
	, "gameTime" : 0
	, "combo"  : 0
	, "comboX": 640, "comboY": 485
	, "bestCombo" : 0
	, "bads" : 0
	, "ok" : 0
	, "good" : 0
	, "perfect" : 0
	, "left" : 0
	, "right" : 0
	, "mul" : 1
	, "comboBarX" : 100, "comboBarY" : 300

	, init : function()
	{
		this.score = 0;
		this.totalNotes = 0;
		this.gameTime = 0;
		this.combo = 0;
		this.bestCombo = 0;
		this.bads = 0;
		this.ok = 0;
		this.good = 0;
		this.perfect = 0;
		this.mul = 1;	
	}

	, updatePlayer : function(){
		Player.update({
			score : this.score
			, tapped : this.totalNotes
			, note1 : this.left
			, note2 : this.right
			, perfects : this.perfect
			, greats : this.good
			, goods : this.ok
			, bads : this.bads
			, bestCombo : this.bestCombo
		});
	}

	, validNote : function(tapnum, rank)
	{
		this.combo++;
		if (this.combo > this.bestCombo)
		{
			this.bestCombo++;
		}

		if (this.combo >= 100)
		{
			this.mul = 5;
		}
		else if (this.combo >= 50)
		{
			this.mul = 4;
		}
		else if (this.combo >= 25)
		{
			this.mul = 3;
		}
		else if (this.combo >= 10)
		{
			this.mul = 2;
		}
		
		if (rank == NOTES_RANK.OK){
				this.score += (5 * this.mul);
			}
		if (rank == NOTES_RANK.NOTBAD){
				this.score += (10 * this.mul);
			}
		if (rank == NOTES_RANK.GREAT){
				this.score += (20 * this.mul);
			}
		if (rank == NOTES_RANK.PERFECT){
				this.score += (50 * this.mul);
			}
		
		if (tapnum == 1)
		{
			this.left++;
		}
		else
		{
			this.right++;
		}
		
		this.totalNotes++;
	}
	
	, failNote : function()
	{
		this.combo = 0;
		this.mul = 1;
	}
	
	, draw: function(ctx)
	{
		ctx.fillStyle = "white";
		ctx.font = FONTS.megaFont;
		ctx.fillText(this.score, this.scoreX, this.scoreY);
		ctx.fillText(this.combo, this.comboX, this.comboY);
		this.state = 0;

			if (this.combo >= 10 && this.combo < 25){
				this.state = 2;
				this.rCombo = this.combo - 10;
				this.ratio = 5 /15;

			}else if (this.combo >= 25 && this.combo < 50){

				this.state = 3;
				this.rCombo = this.combo - 25;
				this.ratio = 5 / 25;
			}else if (this.combo >= 50 && this.combo < 100){
				this.state = 4;
				this.rCombo = this.combo - 50;
				this.ratio = 5 / 50;
			}else if (this.combo >= 100){
				this.state = 5;
			}else{
				this.state = 1;
				this.ratio = 5 / 10;
				this.rCombo = this.combo;
			}

	for (var i = 0; i < 4; i++){
		var image = imageManager.getImage("bigComboOff");
		if (this.state > (i+1)){
			image = imageManager.getImage("bigComboOn")
		}
		ctx.drawImage(image, this.comboBarX, this.comboBarY - i * 40);
	}
	for (var i = 0; i < 5; i++){
		var image = "lightComboOff";
		if (this.rCombo * this.ratio >= i + 1){
			image = "lightComboOn";

		}
		ctx.drawImage(imageManager.getImage(image), this.comboBarX + 50, this.comboBarY - i * 30);

	}

	}
};