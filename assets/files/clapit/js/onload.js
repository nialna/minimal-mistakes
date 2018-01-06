window.onload = function()
{
	CANVAS.width = canvasWidth;
	CANVAS.height = canvasHeight;
	
	window.onkeydown = function(e)
	{
		EventManager.keyDown(e);
	}
	
	window.onkeyup = function(e)
	{
		EventManager.keyUp(e);
	}
	window.onmousedown = function(e){

		EventManager.mouseDown(e);
	}
	window.onmouseup = function(e){
		EventManager.mouseUp(e);
	}
	window.onmousemove = function(e){
		EventManager.mouseMove(e);
	}
	
	//Partition.init("music01");
	
	waitLoad();
	//gameLoop();
}

function initialize()
{
	FEEDBACKS_DATAS.SYSTEM.txtsImg = imageManager.getImage("feedbacks_txts");
	FEEDBACKS_DATAS.SYSTEM.logosImg = imageManager.getImage("feedbacks_logos");
	
	LeftGear.init();
	RightGear.init();
	
	Menu.buttons = {
		"playButton" : new Button("play", canvasWidth / 2 - 100, canvasHeight / 2 - 100, "square", "image", "playButton", 1)
	};
	Menu.buttons.playButton.onMDown = function(coords){
		SelectLvl.init();
		CONTEXT = SelectLvl;
	}	
	Menu.buttons.playButton.onMUp = function(coords){
		console.log("test");
	}
	CONTEXT = Menu;
	gameLoop();
}
function waitLoad()
{
	CTX.font = "36px calibri";
	CTX.fillStyle = "black";
	CTX.fillRect(0, 0, canvasWidth, canvasHeight);
	CTX.fillStyle = "white";
	CTX.fillText("loading", canvasWidth / 2, canvasHeight / 2);
	
	if (imageManager.isLoaded())
	{
		initialize();
	}
	else
	{
		requestAnimFrame(waitLoad);	
	}
}
