var EventManager = {
	// réception d'un keyDown
	keyDown : function(event)
	{
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
			// INPUT jump
		if (key == INPUTS.tap1)
		{
			Partition.playerTick(Date.now(), 1);
			Game.buttons.leftButton.animState = 1;
		}
		else if (key == INPUTS.tap2)
		{
			Partition.playerTick(Date.now(), 2);
			Game.buttons.rightButton.animState = 1;
		}
		// alert(key);
		event.preventDefault();
	}
	
	// réception d'un keyUp
	, keyUp : function(event)
	{
		var e = event || window.event;
		var key = e.which || e.keyCode;
		if (key == INPUTS.tap1)
		{
			Game.buttons.leftButton.animState = 0;
		}
		else if (key == INPUTS.tap2)
		{
			Game.buttons.rightButton.animState = 0;
		}		
			// INPUT jump
		// if(inArray(key, INPUTS.jump))
		// {
			// KEYS.jump = false;
		// }
		event.preventDefault();
	}
	
	// réception d'un click
	, mouseClick : function(e)
	{
		// réupère les positions dans le CANVAS
		// var coords = getCoords(e, CANVAS);
		e.preventDefault();
	}
	
	// réception d'un mouseDown
	, mouseDown : function(e)
	{
		// réupère les positions dans le CANVAS
		var coords = getCoords(e, CANVAS);
		console.log(coords);
		for (var i in CONTEXT.buttons)
		{
			var p = CONTEXT.buttons[i];
			if (p.mDown(coords))
			{
				return true;
			}
		}
		
		mouse_is_down = true;
		fixed_mouse_x = coords.x;
		fixed_mouse_y = coords.y;

		e.preventDefault();
	}
	
	// réception d'un mouseUp
	, mouseUp : function(e)
	{
		mouse_is_down = false;
		// réupère les positions dans le CANVAS
		var coords = getCoords(e, CANVAS);
		for (var i in CONTEXT.buttons){

			var p = CONTEXT.buttons[i];
			p.mUp(coords);
		}
		e.preventDefault();
	}
	
	// réception d'un mouseMove
	, mouseMove : function(e)
	{
		if (mouse_is_down && CONTEXT == SelectLvl)
		{
			var coords = getCoords(e, CANVAS);
			SelectLvl.scroll(coords);
		}
		// réupère les positions dans le CANVAS
		// var coords = getCoords(e, CANVAS);
		e.preventDefault();
	}
	
	, resizer : function(e)
	{
		SCREEN_WIDTH	= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
		SCREEN_HEIGHT	= (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 5;
		
		CANVAS.style.marginLeft	= "0px";
		CANVAS.style.marginTop	= "0px";
		
		// calcul les dimension a appliquer au CANVAS
		if (RESIZE_MODE == RESIZES.FULL)
		{
			CANVAS_WIDTH = SCREEN_WIDTH;
			CANVAS_HEIGHT= SCREEN_HEIGHT;
			CANVAS.width = CANVAS_WIDTH;
			CANVAS.height= CANVAS_HEIGHT;
		}
		else if (RESIZE_MODE == RESIZES.RATIO)
		{
			var calcW = SCREEN_WIDTH / CANVAS_WIDTH;
			
			if (calcW * CANVAS_HEIGHT <= SCREEN_HEIGHT)
			{
				CANVAS_WIDTH  = Math.floor(CANVAS_WIDTH * calcW);
				CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT * calcW);
			}
			else
			{
				var calcH = SCREEN_HEIGHT / CANVAS_HEIGHT;
				CANVAS_WIDTH  = Math.floor(CANVAS_WIDTH * calcH);
				CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT * calcH);
			}
			
			CANVAS.width = CANVAS_WIDTH;
			CANVAS.height= CANVAS_HEIGHT;
		}
		// sinon c'est un étirement, il va falloir calculer le ratio après
		else
		{
			if (RESIZE_MODE == RESIZES.FULLSTRETCH)
			{
				CANVAS.style.width = SCREEN_WIDTH + "px";
				CANVAS.style.height= SCREEN_HEIGHT + "px";
			}
			else if (RESIZE_MODE == RESIZES.STRETCH_RATIO)
			{
				RATIOW = SCREEN_WIDTH / CANVAS_WIDTH;
				
				// si l'écran n'est pas trop large
				if (CANVAS_HEIGHT * RATIOW <= SCREEN_HEIGHT)
				{
					CANVAS.style.width = SCREEN_WIDTH + "px";
					CANVAS.style.height= (CANVAS_HEIGHT * RATIOW) + "px";
				}
				// sinon on s'aligne sur le ratio hauteur
				else
				{
					RATIOH = SCREEN_HEIGHT / CANVAS_HEIGHT;
					
					CANVAS.style.width = (CANVAS_WIDTH * RATIOH) + "px";
					CANVAS.style.height= SCREEN_HEIGHT + "px";
				}
			}
			RATIO_WIDTH	= CANVAS.offsetWidth / CANVAS_WIDTH;
			RATIO_HEIGHT= CANVAS.offsetHeight / CANVAS_HEIGHT;
		}
		
		// replace le CANVAS si besoin
		if (ALIGN_MODE != ALIGNMENTS.NONE)
		{
			// doit t'on le center horizontalement
			if ((ALIGN_MODE == ALIGNMENTS.CENTERH || ALIGN_MODE == ALIGNMENTS.CENTERHV) && CANVAS.offsetWidth < SCREEN_WIDTH)
			{
				CANVAS.style.marginLeft = ((SCREEN_WIDTH - CANVAS.offsetWidth) / 2) + "px";
			}
			
			// doit t'on le centrer verticalement
			if ((ALIGN_MODE == ALIGNMENTS.CENTERV || ALIGN_MODE == ALIGNMENTS.CENTERHV) && CANVAS.offsetHeight < SCREEN_HEIGHT)
			{
				CANVAS.style.marginTop = ((SCREEN_HEIGHT - CANVAS.offsetHeight) / 2) + "px";
			}
		}
		
		//////////
		//	REPLACEMENT DES ELEMENTS DE JEU
		if (MENU_IS_CENTER)
		{
			for (b in MAIN_MENU)
			{
				MAIN_MENU[b].x = CANVAS_WIDTH / 2 - MAIN_MENU[b].w / 2;
			}
			
			for (b in MENU_LOAD)
			{
				MENU_LOAD[b].x = CANVAS_WIDTH / 2 - MENU_LOAD[b].w / 2;
			}
			
			for (b in MENU_SCORES)
			{
				MENU_SCORES[b].x = CANVAS_WIDTH / 2 - MENU_SCORES[b].w / 2;
			}
			
			for (b in MENU_OPTIONS)
			{
				MENU_OPTIONS[b].x = CANVAS_WIDTH / 2 - MENU_OPTIONS[b].w / 2;
			}
			
			GAME_TITLE.x = CANVAS_WIDTH / 2;
		}
		
		////	REPLACEMENT DU MENU DES ACHIEVEMENTS	////
		if (MENU_ACHIEVEMENTS.DISPLAY.HCenter)
		{
			// si on désire un placement automatisé
			if (MENU_ACHIEVEMENTS.DISPLAY.autoPlace)
			{
				MENU_ACHIEVEMENTS.DISPLAY.xS = CANVAS_WIDTH / 2 - MENU_ACHIEVEMENTS.DISPLAY.w / 2;
			}
			// si on désire un placement manuel, précis
			else
			{
				for (b in MENU_ACHIEVEMENTS)
				{
					if (b == "DISPLAY") { continue; }
					if (!MENU_ACHIEVEMENTS[b].pos.x || !MENU_ACHIEVEMENTS[b].pos.y
						|| !MENU_ACHIEVEMENTS[b].pos.w || !MENU_ACHIEVEMENTS[b].pos.h)
					{
						throw new Error("Il manque des parametres dans le MENU_ACHIEVEMENTS : " + b);
						return;
					}
					
					MENU_ACHIEVEMENTS[b].pos.x = CANVAS_WIDTH / 2 - MENU_ACHIEVEMENTS[b].pos.w / 2;
				}
			}
		}
		
		waitOfResize = false;
		
		// others personnal functions call
		GameMenu.init();
	}
	 
	, checkCursorState : function()
	{
		if (KEYS.menu)
		{
			document.body.style.cursor = ICO;
		}
		else
		{
			document.body.style.cursor = ICOGHOST;
		}
	}
};