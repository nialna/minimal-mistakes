var FeedbacksManager = {
	"Feedbacks":{}
	, "totalFeed":0
	
	, init: function()
	{
	}
	
	/* play */
	, play: function(name)
	{
		this.Feedbacks[this.totalFeed] = new Feedback(this.totalFeed, name, "txts");
		this.totalFeed++;
		
		if (this.Feedbacks[this.totalFeed-1].type == "resultNote" && this.Feedbacks[this.totalFeed-1].name != "FailNote")
		{
			this.Feedbacks[this.totalFeed] = new Feedback(this.totalFeed, "Frap"+name, "logos");
			this.totalFeed++;
		}
	}
	
	/* draw */
	, draw: function (ctx)
	{
		for (var fee in this.Feedbacks)
		{
			this.Feedbacks[fee].draw(ctx);
		}
	}
	
	/* update */
	, update: function(delta)
	{
		for (var fee in this.Feedbacks)
		{
			this.Feedbacks[fee].update(delta);
		}
	}
	
	/* deleteFeed */
	, deleteFeed: function(id)
	{
		delete this.Feedbacks[id];
	}
};