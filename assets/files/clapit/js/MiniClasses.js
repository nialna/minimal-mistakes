var RightGear = {
		"x":0
		,"y":0
		,"angle":0
		,"angleChange":-10
		,"bobine":100
		,"midW":0
		,"midH":0
		,"radius":90
		
		,init:function()
		{
			this.x = Partition.x + Partition.scrollSize - 170;
			this.y = 167;
			this.midW = imageManager.getImage("roue_droite").width/2;
			this.midH = imageManager.getImage("roue_droite").height/2;
			this.x += this.midW;
			this.y += this.midH;
			this.bobine = 100;
		}
		
		,rotateOneTime:function()
		{
			this.angle += this.angleChange;
			this.bobine -= 100/Partition.totalNotes;
		}
		
		, draw: function(ctx)
		{
			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.lineWidth = this.bobine/2;
			ctx.strokeStyle = "black";
			ctx.stroke();
			
			ctx.translate(this.x, this.y);
			ctx.rotate(Math.PI*this.angle/180);
			ctx.drawImage(imageManager.getImage("roue_droite"), -this.midW, -this.midH);
			ctx.rotate(-(Math.PI*this.angle/180));
			ctx.translate(-this.x, -this.y);
			
			ctx.globalAlpha = 1;
		}
	};
var LeftGear = {
		"x":0
		,"y":0
		,"angle":0
		,"angleChange":-10
		,"bobine":1
		,"midW":0
		,"midH":0
		,"radius":90
		
		,init:function()
		{
			this.x = Partition.x - 60;
			this.y = 167;
			this.midW = imageManager.getImage("roue_gauche").width/2;
			this.midH = imageManager.getImage("roue_gauche").height/2;
			this.x += this.midW;
			this.y += this.midH;
			this.bobine = 1;
		}
		
		,rotateOneTime:function()
		{
			this.angle += this.angleChange;
			this.bobine+= 100/Partition.totalNotes;
		}
		
		, draw: function(ctx)
		{
			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.lineWidth = this.bobine/2;
			ctx.strokeStyle = "black";
			ctx.stroke();
			
			ctx.translate(this.x, this.y);
			ctx.rotate(Math.PI*this.angle/180);
			ctx.drawImage(imageManager.getImage("roue_gauche"), -this.midW, -this.midH);
			ctx.rotate(-(Math.PI*this.angle/180));
			ctx.translate(-this.x, -this.y);
		}
	};

var Focus = {
	"x":228
	,"y":55
	,"flashIsOn":false
	,"flashTimer":0
	,"flashDuration":200
	,"opacityDis":0.25
	,"opacityEna":1
	,"currentOpacity":0.25
	
	, draw: function(ctx)
	{
		ctx.globalAlpha = this.currentOpacity;
		ctx.drawImage(imageManager.getImage("focus"), this.x, this.y);
		ctx.globalAlpha = 1;
	}
	
	, update: function(delta)
	{
		if (this.flashIsOn)
		{
			this.flashTimer += delta;
			if (this.flashTimer >= this.flashDuration)
			{
				this.flashIsOn = false;
				this.currentOpacity = this.opacityDis;
			}
		}
	}
	
	, activeFlash: function()
	{
		this.currentOpacity = this.opacityEna;
		this.flashIsOn = true;
		this.flashTimer = 0;
	}
}

var LeftJauge = {
	"x":1220
	,"y":0
	,"totalLights":14
	,"nLightsActive":0
	,"lights":{}
	
	,init: function(maxScore)
	{
		this.eachUp = maxScore / this.totalLights;
		this.lastUp = 0;
		this.nLightsActive = 0;
		
		for (var i = 0; i < this.totalLights; i++)
		{
			var y = 0;
			for (var n = this.totalLights-1-i; n > 0; n--)
			{
				y += imageManager.getImageSize("lLight"+n).y;
			}
			if (i == 0)
			{
				this.lights[i] = {"x":this.x,"y":this.y+y-10};
			}
			else
			{
				this.lights[i] = {"x":this.x,"y":this.y+y+10};
			}
		}
	}
	
	, draw: function(ctx)
	{
		ctx.drawImage(imageManager.getImage("leftLights"), this.x, this.y);
		for (var i = 0; i < this.nLightsActive; i++)
		{
			ctx.drawImage(imageManager.getImage("lLight"+i), this.lights[i].x, this.lights[i].y);
		}
	}
	
	, checkPower: function(score)
	{
		if (Math.floor(score / this.eachUp) * this.eachUp > this.lastUp)
		{
			this.lastUp = Math.floor(score / this.eachUp) * this.eachUp;
			this.nLightsActive++;
		}
	}
};

var RightJauge = {
	"x":0
	,"y":0
	,"totalLights":14
	,"nLightsActive":0
	,"lights":{}
	
	,init: function(maxScore)
	{
		this.eachUp = maxScore / this.totalLights;
		this.lastUp = 0;
		this.nLightsActive = 0;
		
		for (var i = 0; i < this.totalLights; i++)
		{
			var y = 0;
			for (var n = this.totalLights-1-i; n > 0; n--)
			{
				y += imageManager.getImageSize("rLight"+n).y;
			}
			if (i == 0)
			{
				this.lights[i] = {"x":this.x,"y":this.y+y-10};
			}
			else
			{
				this.lights[i] = {"x":this.x,"y":this.y+y+10};
			}
		}
	}
	
	, draw: function(ctx)
	{
		ctx.drawImage(imageManager.getImage("rightLights"), this.x, this.y);
		for (var i = 0; i < this.nLightsActive; i++)
		{
			ctx.drawImage(imageManager.getImage("rLight"+i), this.lights[i].x, this.lights[i].y);
		}
	}
	
	, checkPower: function(score)
	{
		if (Math.floor(score / this.eachUp) * this.eachUp > this.lastUp)
		{
			this.lastUp = Math.floor(score / this.eachUp) * this.eachUp;
			this.nLightsActive++;
		}
	}
};