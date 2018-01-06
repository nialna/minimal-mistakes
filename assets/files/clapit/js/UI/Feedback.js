function Feedback(id, name, prefix)
{
	this.id		= id;
	this.name	= name;
	this.type	= FEEDBACKS_DATAS["list"][name]["type"];
	this.prefix	= prefix;
	this.yO		= FEEDBACKS_DATAS["list"][name]["line"] * FEEDBACKS_DATAS.SYSTEM[this.prefix + "LineHeight"];
	
	this.currentFrame = 0;
	this.totalFrame	= FEEDBACKS_DATAS["list"][name]["nTotalFrame"];
	this.eachFrame	= FEEDBACKS_DATAS["list"][name]["eachFrame"];
	this.currentTime= 0;
	
	this.wFrame = FEEDBACKS_DATAS.SYSTEM[this.prefix + "FrameWidth"];
	this.hFrame = FEEDBACKS_DATAS.SYSTEM[this.prefix + "LineHeight"];
	
	this.x = FEEDBACKS_DATAS["TYPE"][this.type].x;
	this.y = FEEDBACKS_DATAS["TYPE"][this.type].y + (FEEDBACKS_DATAS["list"][this.name]["offsetY"] | 0);
	
	this.destX = this.x + (FEEDBACKS_DATAS["list"][name]["destX"] | 0);
	this.destY = this.y + (FEEDBACKS_DATAS["list"][name]["destY"] | 0);
	this.moveSpeed = FEEDBACKS_DATAS["list"][name]["moveSpeed"] | 0;
	
	if (FEEDBACKS_DATAS["list"][name]["scale"])
	{
		this.scale = FEEDBACKS_DATAS["list"][name]["scale"];
	}
	else
	{
		this.scale = 1;
	}
	
	if (FEEDBACKS_DATAS["list"][name]["destScale"])
	{
		this.destScale = FEEDBACKS_DATAS["list"][name]["destScale"];
	}
	else
	{
		this.destScale = 1;
	}
	
	if (FEEDBACKS_DATAS["list"][name]["scaleSpeed"])
	{
		this.scaleSpeed	= FEEDBACKS_DATAS["list"][name]["scaleSpeed"]/10;
	}
	else
	{
		this.scaleSpeed = 0;
	}
	
	this.timeToStay	= FEEDBACKS_DATAS["list"][name]["timeToStay"] | 0;
	this.timeLife	= 0;
	
	this.soundName = FEEDBACKS_DATAS["list"][name]["soundName"] | false;
	
	this.draw = function(ctx)
	{
		ctx.drawImage(FEEDBACKS_DATAS["SYSTEM"][this.prefix + "Img"], this.currentFrame*this.wFrame, this.yO, this.wFrame, this.hFrame
						, this.x - (this.wFrame/2*(this.scale-1)), this.y - (this.hFrame/2*(this.scale-1))
						, this.wFrame*this.scale, this.hFrame*this.scale);
	}
	
	this.update = function(delta)
	{
		this.currentTime += delta;
		this.timeMove += delta;
		this.timeLife += delta;
		
		if (this.currentTime >= this.eachFrame && this.currentFrame < this.totalFrame)
		{
			this.currentTime = this.currentTime - this.eachFrame;
			this.currentFrame++;
		}
		
		if (this.x < this.destX)
		{
			this.x += this.moveSpeed;
		}
		else if (this.x > this.destX)
		{
			this.x -= this.moveSpeed;
		}
		
		if (this.y < this.destY)
		{
			this.y += this.moveSpeed;
		}
		else if (this.y > this.destY)
		{
			this.y -= this.moveSpeed;
		}
		
		if (this.scale <= this.destScale)
		{
			this.scale += this.scaleSpeed;
		}
		else if (this.scale >= this.destScale)
		{
			this.scale -= this.scaleSpeed;
		}
		
		if (this.timeLife >= this.timeToStay)
		{
			FeedbacksManager.deleteFeed(this.id);
		}
	}
	
	// SoundManager.play(this.soundName);
}