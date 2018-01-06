var Metronome = {
	"active"		: false
	, "lastChange"	: 0
	, "duration"	: 1000
	, "safeTime"	: 200
	, "position1"	: 0
	, "position2"	: 2
	, "sens"		: 0
	, "currentTime" : 0
	, "x" : canvasWidth / 2 - 200
	, "y" : 100
	, "width" : 400
	, "height" : 150
	, "cases" : 5
	, "caseX" : 10
	, "caseY" : 10
	, "caseOffset" : 10
	, "caseWidth" : 50
	, "caseHeight" : 50
	, "barPos1" : canvasWidth / 2 - 200
	, "barPos2" : canvasWidth / 2 - 200 + this.caseWidth * 2 + this.caseOffset * 2
	
	, update : function(delta)
	{
	/*	if (!PART_DATABASE[Partition.music][Partition.patternNumber]){ return;}
		this.duration = PART_DATABASE[Partition.music][Partition.patternNumber].metronomeSpeed;
		this.currentTime += delta;
		this.ratio = (this.duration) / (this.caseWidth + this.caseOffset);

		this.barPos1 += (delta / this.ratio) ;
		this.barPos2 += (delta / this.ratio) ;
	
		if (this.currentTime >= this.duration)
		{
			this.currentTime = 0;
		}
		if (this.currentTime <= this.safeTime && !this.active)
		{
			this.active = true;
			this.position1++;
			this.position2++;
			if (this.position1 > this.cases)
			{
				this.position1 = 1;
				this.barPos1 = this.x;
			}else if (this.position2 > this.cases){

				this.position2 = 1;
				this.barPos2 = this.x;
			}
			//this.lastChange = currentTime;
		}
		else if (this.currentTime > this.safeTime)
		{
			this.active = false;
			
		}
		*/
		this.active = true;
		this.position1 = 1;
		this.position2 = 2;

	}
	
	, render : function()
	{
	/*	CTX.strokeStyle = "black";
		CTX.strokeRect(this.x, this.y, this.width, this.height);
		for (var i = 0; i < this.cases; i++){
			var x = this.x + this.caseX + this.caseWidth * i + this.caseOffset * i;
			var y = this.y + this.caseY;
			var w = this.caseWidth;
			var h = this.caseHeight;
			CTX.strokeRect(x, y, w, h);
			if (this.active && (this.position1 == i + 1 || this.position2 == i + 1))
			{
				CTX.fillStyle = "#345F32";
			}
			else
			{
				CTX.fillStyle = "#E324F5";
			}
			CTX.fillRect(x, y, w, h);
			CTX.strokeRect(this.barPos1, this.y, 4, this.height);
			CTX.strokeRect(this.barPos2, this.y, 4, this.height);
			CTX.font = "26px calibri";
			CTX.fillStyle = "black";
			CTX.fillText(i + 1, x + 20, y + 20);
		}
	*/
	}
};