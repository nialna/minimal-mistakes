var Partition = {
	"music":0
	,"oneTimeSize":200
	,"timeNotePop":0
	,"nextNotePop":1
	,"partitionImage":new Image()
	,"scrollSize":790
	
	,"decalX":0
	,"x": 250
	,"y": 230
	,"speed":1000
	,"ended":false
	,"ratio":0
	
	,"noteNum":0
	,"totalNotes":0
	,"minNoteNum":0
	,"actualNote":0
	,"notes":{}
	
	,"jumpingNotes":{}
	,"totalJumpingNotes":0
	
	, init: function(music)
	{
		this.music = music;
		
		this.noteNum = 0;
		this.totalNotes = PART_DATABASE[music].notes.length;
		this.minNoteNum = 0;
		this.actualNote = 0;
		this.notes = {};
		
		this.jumpingNotes = {};
		this.totalJumpingNotes = 0;
		
		this.nextNotePop = PART_DATABASE[music].times[0];
		this.timeNotePop = 0;
		
		this.ended = false;
		
		if (this.totalNotes != PART_DATABASE[music].times.length)
		{
			alert("Erreur dans la partition, il y a plus de notes que de temps");
			this.totalNotes = PART_DATABASE[music].times.length;
		}
		
		RightJauge.init(PART_DATABASE[music].maxScore);
		LeftJauge.init(PART_DATABASE[music].maxScore);
		RightGear.init();
		LeftGear.init();
	}
	
	/* end partition */
	, end: function()
	{
		this.ended = true;
		console.log("ended");
		endedTimer = Date.now();
	}
	
	/* is Good Position ? */
	, isGoodNote: function(num)
	{
		if (!this.notes[this.actualNote] || !this.notes[this.actualNote].type){ return false;}
		if (this.notes[this.actualNote].type == num)
		{
			if (this.notes[this.actualNote].x > -10 && this.notes[this.actualNote].x <= 50)
			{
				return true;
			}
			return false;
		}
		return false;
	}
	
	/* valid note */
	, validNote: function(tapNum, rank)
	{
		// console.log("valid note");
		this.deleteNote(this.actualNote);
		LeftGear.rotateOneTime();
		ScoreManager.validNote(tapNum, rank);
		soundManager.play("note" + tapNum);
	}
	
	/* fail Note */
	, failNote: function()
	{
		ScoreManager.failNote();
		soundManager.play("noteFail");
		// console.log("fail note");
	}
	
	/* draw */
	, draw: function(ctx)
	{
		if (!this.ended)
		{
			var i = this.totalNotes;
			while (i > this.minNoteNum-2)
			{
				i--;
				if (!this.notes[i]){continue;}
				this.notes[i].draw(ctx);
			}
		}
		
		ctx.fillStyle = "#57466c";
		ctx.fillRect(this.x-NOTE_WIDTH, this.y, NOTE_WIDTH, NOTE_HEIGHT);
		ctx.fillRect(this.scrollSize+this.x, this.y, NOTE_WIDTH, NOTE_HEIGHT);
		ctx.fillStyle = "black";
	}
	
	/* draw up */
	, drawUp: function(ctx)
	{
		for (var n in this.jumpingNotes)
		{
			if (!this.jumpingNotes[n]){continue;}
			this.jumpingNotes[n].draw(ctx);
		}
	}
	
	/* update */
	, update: function(delta)
	{
		this.timeNotePop += delta;
		
		if (this.minNoteNum >= this.totalNotes && !this.ended)
		{
			this.end();
		}
		else if (this.nextNotePop && this.timeNotePop >= this.nextNotePop)
		{
			this.timeNotePop = this.timeNotePop - this.nextNotePop;
			
			// create a note here
			this.notes[this.noteNum] = new Note(this.noteNum, PART_DATABASE[this.music].notes[this.noteNum], this.speed, this.oneTimeSize, this.scrollSize, this.y, this.x, false);
			this.nextNotePop = PART_DATABASE[this.music].times[this.noteNum];
			RightGear.rotateOneTime();
			this.noteNum++;
		}
		
		for (var n in this.jumpingNotes)
		{
			this.jumpingNotes[n].update(delta);
		}
		
		for (var n in this.notes)
		{
			this.notes[n].update(delta);
		}
		if (this.ended && Date.now() - endedTimer > 2000){
			
			EndGame.init();
			CONTEXT = EndGame;
		}
	}
	
	/*  */
	, deleteNote: function(id, failed)
	{
		if (!failed)
		{
			this.jumpingNotes[this.totalJumpingNotes] = new Note(this.totalJumpingNotes, this.notes[id].type, 1, 1, this.notes[id].x+this.notes[id].offsetX, this.notes[id].y, 0, true);
			this.totalJumpingNotes++;
		}
		
		delete this.notes[id];
		
		this.minNoteNum++;
	}
	
	/* set Actual Note */
	, setActualNote: function(id)
	{
		if (!this.notes[this.actualNote] || (id != this.actualNote && this.notes[this.actualNote].x < -10))
		{
			this.actualNote = id;
		}
	}
	
	/*  */
	, playerTick:function(timeNow, tapNum)
	{
		Focus.activeFlash();
		if (this.ended){ return; }
		/* good note ? */
		if (this.isGoodNote(tapNum))
		{
			/* play the good feedback */
			if (this.notes[this.actualNote].x > -5 && this.notes[this.actualNote].x < 5)
			{
				// it's a perfect
				FeedbacksManager.play("PerfectNote");
				this.validNote(tapNum, NOTES_RANK.PERFECT);
			}
			else if (this.notes[this.actualNote].x > 5 && this.notes[this.actualNote].x < 20)
			{
				// great
				FeedbacksManager.play("GreatNote");
				this.validNote(tapNum, NOTES_RANK.GREAT);
			}
			else if (this.notes[this.actualNote].x > 20 && this.notes[this.actualNote].x < 35)
			{
				// not bad
				FeedbacksManager.play("NotBadNote");
				this.validNote(tapNum, NOTES_RANK.NOTBAD);
			}
			else
			{
				// ok
				FeedbacksManager.play("OkNote");
				this.validNote(tapNum, NOTES_RANK.OK);
			}
		}
		else
		{
			FeedbacksManager.play("FailNote");
			this.failNote();
		}
	}
}