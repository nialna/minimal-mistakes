var SelectLvl = {
	"title": "Level select"
	,"x":890
	,"y":40
	,"lineOffset": 83
	,"maxScroll":500
	,"nameFont": FONTS.bigFont
	,"buttons": {}
	
	,init: function()
	{
		this.buttons = {};
		var j = 0;
		for (var i in PART_DATABASE)
		{
			var p = PART_DATABASE[i];
			var line = j;
			this.buttons[i] = new Button(i, this.x, line * this.lineOffset + this.y, "square", "image", "difficulty" + p.difficulty, 1);
			this.buttons[i].id = i;
			this.buttons[i].onMDown = function(coords)
			{
				currentLvl = this.id;
				Partition.init(this.id);
				Game.init();
				CONTEXT = Game;
			}
			this.buttons[i].scroll = true;
			j++;
		}
		this.maxScroll = j * this.lineOffset / 2;
		this.accel = 0;
		this.speed = 0;
		var btn = new Button("back", 50, canvasHeight - 90, "square", "image", "back", 1);
		btn.onMDown = function(coords)
		{
			CONTEXT = Menu;
		}
		
		this.buttons.back = btn;
	}
	
	,animate : function(delta)
	{

		/*if (this.accel < 0){
			this.accel += 1;
			if (this.accel >= 0)
				this.accel = 0;
		}else if (this.accel > 0){
			this.accel -= 1;
			if (this.accel <= 0)
				this.accel = 0;
		}


		if (this.speed < 0){
			this.speed += 1;
			if (this.speed >= 0)
				this.speed = 0;
		}else if (this.speed > 0){
			this.speed -= 1;
			if (this.speed <= 0)
				this.speed = 0;
		}
		this.speed += this.accel;*/
/*

if (this.y + this.speed > -this.maxScroll && this.y + this.speed < this.maxScroll)
		{
			/*this.y += scrolling;
			
			for (b in this.buttons)
			{
				if (!this.buttons[b].scroll) { continue; }
				this.buttons[b].y += scrolling;
			}
		
			this.y += this.speed;
			
			for (b in this.buttons)
			{
				if (!this.buttons[b].scroll) { continue; }
				this.buttons[b].y += this.speed;
			}	
		}else{
			this.speed = 0;
			this.accel = 0;
		}	*/
	}

	,render : function(delta, ctx)
	{
		ctx.fillStyle = "white";
		ctx.drawImage(imageManager.getImage("background"), 0, 0);
		ctx.fillStyle = "black";
		ctx.font = FONTS.titleFont;
		/*var w = imageManager.getImageSize("selectLvl").x;
		ctx.drawImage(imageManager.getImage("selectLvl"), canvasWidth / 2 - w / 2 - 350, 100);*/

		for (var i in this.buttons)
		{
			var p = this.buttons[i];
			
			p.render(ctx);
			if (!PART_DATABASE[i]){ continue; }
			var dd = PART_DATABASE[i];
			ctx.drawImage(imageManager.getImage(dd.image), p.x+20, p.y+20);
			
			ctx.font = this.nameFont;
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.fillText(dd.title, p.x+p.size.x/2, p.y+p.size.y/2);
		}
	}
	
	,logic : function(delta, ctx)
	{
	}
	
	,scroll: function(coords)
	{
		var scrolling = fixed_mouse_y - coords.y;
		fixed_mouse_y = coords.y;
		
		if (this.y + scrolling > -this.maxScroll && this.y + scrolling < this.maxScroll)
		{
			this.y += scrolling;
			
			for (b in this.buttons)
			{
				if (!this.buttons[b].scroll) { continue; }
				this.buttons[b].y += scrolling;
			}
		}
	}
}