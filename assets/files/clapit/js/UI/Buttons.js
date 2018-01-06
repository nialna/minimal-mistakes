function Button(id, x, y, type, size, image, nbAnims)
{
	this.x = x;
	this.y = y;
	this.id = id;
	this.nbAnims = 2;
	if (nbAnims !== undefined)
	{
		this.nbAnims = nbAnims;	
	}
	if (x == undefined)
	{
		this.x = 0;
	}
	if (y == undefined)
	{
		this.y = 0;
	}
	this.type = type;
	if (this.type == undefined)
	{

		this.type = "circle";
	}
	this.size = size;
	if (this.size == undefined)
	{

		this.size = 25;
	}
	if (this.size = "image")
	{
		this.useImage = true;
		this.image = imageManager.getImage(image);
		this.imageSize = imageManager.getImageSize(image);
		if (this.type == "circle")
		{
			this.size = this.imageSize.y / 2;
		}
		else
		{
			this.size = {
				x : this.imageSize.x / this.nbAnims,
				y : this.imageSize.y
			}
		}
	}
	this.animState = 0;
	
	this.center = {
		x : this.x + (this.imageSize.x / this.nbAnims) / 2
		, y : this.y + (this.imageSize.y / 2)
	};

	this.render = function(ctx)
	{
		if (this.useImage)
		{
			ctx.drawImage(this.image, 0 + (this.animState * this.imageSize.x / 2), 0, this.imageSize.x / this.nbAnims, this.imageSize.y, this.x, this.y, this.imageSize.x / this.nbAnims, this.imageSize.y);
		}
		else if (this.type == "circle")
		{
			ctx.fillStyle = "blue";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();
		}
	}

	this.mDown = function(coords)
	{
		if (this.type == "circle")
		{
			if (Math.pow((coords.x - this.center.x), 2) + Math.pow((coords.y - this.center.y), 2) <= Math.pow(this.size, 2))
			{
				this.onMDown(coords);
				return true;
			}
		}
		else if (this.type == "square")
		{

			var pos = {
				x : coords.x - this.x
				, y : coords.y - this.y
			};
			console.log(pos);			
			if (pos.x < this.size.x / this.nbAnims && pos.x > 0 && pos.y > 0 && pos.y < this.size.y)
			{
				this.onMDown(coords);
				return true;
			}
		}
		return false;
	}

	this.onMDown = function(coords){
	}

	this.onMUp = function(coords){
	}
	this.mUp = function(coords){
		this.onMUp(coords);
	}
}

