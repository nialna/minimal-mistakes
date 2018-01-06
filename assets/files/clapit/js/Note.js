function Note(id, type, speed, oneTimeSize, x, y, offsetX, isJumping)
{
	this.type	= type;
	this.id		= id;
	
	this.x	= x;
	this.y	= y;
	this.offsetX = offsetX;
	this.speed = oneTimeSize / speed;
	
	this.isJumping = isJumping;
	this.goTop = true;
	this.scale = 1;
	
	if (this.isJumping)
	{
		this.scale = 0.5;
	}
	
	if (NOTE_DATAS[type])
	{
		this.w = NOTE_DATAS[type].w;
		this.h = NOTE_DATAS[type].h;
	}
	else
	{
		this.w = NOTE_WIDTH;
		this.h = NOTE_HEIGHT;
	}
	
	this.offsetImageW = ((NOTE_WIDTH - this.w)/2) >> 0;
	this.offsetImageH = ((NOTE_HEIGHT - this.h)/2) >> 0;
	
	this.update = function (delta)
	{
		if (this.isJumping)
		{
			if (this.goTop && this.y < 50)
			{
				this.goTop = false;
			}
			else if (!this.goTop && this.y > 90)
			{
				this.goTop = true;
			}
			if (this.goTop)
			{
				this.y-= (Math.random()*10)+5 >>0;
			}
			else
			{
				this.y+= (Math.random()*10)+5 >>0;
			}
			this.x+=13;
		}
		else
		{
			this.x -= this.speed*delta;
			this.x = this.x >> 0;
			if (this.x <= -NOTE_WIDTH)
			{
				Partition.deleteNote(this.id, true);
			}
			if (this.x < NOTE_WIDTH && this.x > -10)
			{
				Partition.setActualNote(this.id);
			}
		}
	}
	
	this.draw = function (ctx)
	{
		if (this.type == 1)
		{
			ctx.drawImage(imageManager.getImage("note1"), this.x+this.offsetX+this.offsetImageW,this.y+this.offsetImageH, this.w*this.scale, this.h*this.scale);
		}
		else if (this.type == 2)
		{
			ctx.drawImage(imageManager.getImage("note2"), this.x+this.offsetX+this.offsetImageW,this.y+this.offsetImageH, this.w*this.scale, this.h*this.scale);
		}
	}
}