function gameLoop()
{
	requestAnimationFrame(gameLoop);
	
	var currentTime = Date.now();
	var delta = currentTime - lastFrame;
	for (var i = 0; i < ((delta / FPS) | 0); i++)
	{
		CONTEXT.animate(delta);
		CONTEXT.logic(delta);
	}
	if (delta >= FPS)
	{
		lastFrame = currentTime;
	}
	CONTEXT.render(delta, CTX);
}