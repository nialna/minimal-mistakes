/*
	Class: NLSounds

	The class that contains all the sounds + their load functions and stuff
*/
function NLSounds(soundsPath){
	
	/*
		variable: soundList

		An array containing the sounds :
		[
			["soundName", "soundPath"],
			["soundName", "soundPath"],
			["soundName", "soundPath"]
		]
	*/
	if (Audio != undefined){
		this.audioWorks = true;
	}else{
		this.audioWorks = false;
	}
	this.soundList = [];

	this.channels = 3;
	/*
		variable: soundsPath

		A string containing the base path for sounds
	*/
	this.soundsPath = soundsPath;

	/*
		variable: numbersounds

		An int containing the total number of sounds
	*/
	this.numberSounds = 0;

	this.volume = 0.2;

	this.volumeDiff = 0.1;

	this.enabled = true;

	/*
		variable: soundsLoaded

		An int containing the number of sounds loaded
	*/
	this.soundLoaded = 0;

	if (soundsPath === undefined)
	{
		this.soundsPath = "snds/";
	}

	/*
		Function: log(str)

		Logs to the chrome console

			Parameters:

				str - The string to log
	*/
	this.log = function(str){
			console.log("[NLSounds] " + str);
	}
	/*
		Function: getsound(soundName)

		Returns the sound object of the desired name

			Parameters: 

				soundName - Str containing the sound reference

			Returns:

				value - The sound
	*/

	this.getsound = function(soundName)
	{
		if (this.audioWorks){
		return this.soundList[soundName][1];
		}
	}

	/*
		Function: getsoundSize(soundName)

		Returns the size of the sound in an array [0] = width, [1] = height

			Parameters:
				
				soundName - Str containing the sound reference
			
			Returns:

				value -  the size of the sound in an array [0] = width, [1] = height
	*/
	this.getSoundSize = function(soundName)
	{
		if (this.audioWorks){
			return [this.soundList[soundName][1].width, this.soundList[soundName][1].height];
		}
	}

	/*
		Function: pushsound(mysoundMatrix)

		Push an sound to the list

			Parameters:
				mysoundMatrix - The sound matrix in the form : [
				["soundName", "soundPath"],
				["soundName", "soundPath"],
				["soundName", "soundPath"]
				] (The default soundPath is from the img folder)
	
	*/
	this.pushSounds = function(mySoundMatrix, type){
		if (this.audioWorks){
			this.log("Pushing sounds");
			for (var i = 0; i < mySoundMatrix.length; i++)
			{

					
				var p = mySoundMatrix[i];
				this.soundList[p[0]] = {

					name 	:  	p[0],
					type 	: 	type,
					chann 	: 	0,
					active 	: 	true,
					channels : [],
					times : [],
					path : p[1],
					paused : false
				}
				this.soundList[p[0]].channels[0] = document.createElement('audio');
				var x = this.soundList[p[0]].channels[0];
				x.preload = "auto";
				var currentLoader = this;
				if (x.load)
					x.load();

				var name = p[0];
				x.addEventListener('canplaythrough', soundLoad(currentLoader, name), false);

				if (x.canPlayType){
					if (x.canPlayType('audio/mpeg;')) {
					    x.src= this.soundsPath + p[1] + ".mp3";
					} else {
					    x.src= this.soundsPath + p[1] + ".ogg";
					}
				}else{
					x.src= this.soundsPath + p[1] + ".mp3";
				}
				
				this.numberSounds++;
				if (type == "music"){

					//x.loop = "loop";	
				}
			}
			this.log("sounds pushed");
			this.percentCoeff = 100 / this.numberSounds;
		}
	}


	this.refreshSounds = function(){
		if (this.audioWorks){
			for (var i in this.soundList){
				var p = this.soundList[i];
				if (p.type == "music" && !p.paused){

					for (var j = 0; j < p.channels.length; j++){
						var q = p.channels[j];
						//console.log(p.times[j])
						if (p.times[j] != undefined && p.times[j] != 0){
							if (new Date().getTime() / 1000 - p.times[j] > q.duration){
								this.pause(p.name);
								q.currentTime = 0;
								p.times[j] = new Date().getTime();

								this.play(p.name)
							}
						}
					}
				}
			}
		}
	}

	this.desactivate = function(soundName){
		if (this.audioWorks){
			this.soundList[soundName].active = false;
			this.refreshVolume();
		}
	}
	this.activate = function(soundName){
		if (this.audioWorks){

			this.soundList[soundName].active = true;
			this.refreshVolume();
		}
	}

	/*
		Function: getLoadPercentage()

		Returns the current load percents

			Returns:

				int - The current load percentage
	*/

	this.play = function(soundName){
		if (this.audioWorks){
	
			var p = this.soundList[soundName];
			p.paused = false;
			p.channels[p.chann].play();
			p.times[p.chann]= new Date().getTime() / 1000;
			p.chann++;
			if (p.chann == this.channels)
				p.chann = 0;
		}
	}


	this.setVolume = function(volume){
		if (this.audioWorks){
			if (volume === undefined){
				volume = 0.3;
			}
			if (volume < 0)
				volume = 0;

			if (volume > 1)
				volume = 1;

			this.volume = volume;
			this.refreshVolume();
		}
	}


	this.refreshVolume = function(){

		if (this.audioWorks){

			for (var i in this.soundList){
				var p = this.soundList[i];
				var volumeToPut = this.volume;
				if (p.type == "sound")
					volumeToPut += this.volumeDiff;

				for (var j = 0; j < this.channels; j++){
					var q = p.channels[j]
					q.volume = volumeToPut;

					if (!p.active){
						q.volume = 0;	
					}
					if (q.volume < 0)
						q.volume = 0;
					else if (q.volume > 1)
						q.volume = 1;
				}
			}
		}
	}

	this.pause = function(soundName){

		if (this.audioWorks){

			var p = this.soundList[soundName];
			p.paused = true;
			for (var i = 0; i < this.channels; i++){
				p.channels[i].pause();
			}
		}
	}
	this.getLoadPercentage = function(){
		if (this.audioWorks){

			return this.soundLoaded * this.percentCoeff;
		}else{
			return 100;
		}
	}
	this.lowVolume = function(){
		if (this.audioWorks){
			if (this.volume <= 0){
				return true;
			}
			else
				this.volume -= 0.1;
			this.refreshVolume();
		}
	}
	this.upVolume = function(){
		if (this.audioWorks){
			if (this.volume >= 1){
				return true;
			}
			else
				this.volume += 0.1;
			this.refreshVolume();
		}
	}

	this.shutDown = function(){
		if (this.audioWorks){
			this.enabled = !this.enabled;
			console.log(this.enabled);
			if (!this.enabled){
				this.lastVolume = this.volume;
				this.volume = 0;
			}else{
				this.volume = this.lastVolume;
			}
			this.refreshVolume();
		}
	}
	/*
		Function: soundLoad(currentsound)

		Triggered when an sound is loaded and increments the soundLoaded counter

		Parameters:
			
			currentsound - The sound that has been loaded
	*/
	soundLoad = function(currentLoader, name){
		// Sets the sound to loaded state;
		var p = currentLoader.soundList[name];
		var sound = p.channels[0]
		for (var i = 1; i < currentLoader.channels; i++){
			p.channels[i] = document.createElement('audio');
			var q = p.channels[i];
			//q = document.createElement('audio');
			//q.src = sound.src;
			if (q.load)
				q.load();
			//q.src = currentLoader.soundsPath + p.path;

			if (q.canPlayType){
				if (q.canPlayType('audio/mpeg;')) {
				    q.src= currentLoader.soundsPath + p.path + ".mp3";
				} else {
				    q.src= currentLoader.soundsPath + p.path + ".ogg";
				}
			}else{
				q.src= currentLoader.soundsPath + p.path + ".mp3";
			}			
			p.times[i] = 0;
		}
		//currentLoader.pause(name);
		currentLoader.soundLoaded++;

	}

	/*
		Function: isLoaded()

		Returns true if all the sounds are loaded

		Returns:
			loaded - Boolean to know if imgs are loaded
	*/
	this.isLoaded = function(){
		if (this.audioWorks){
			if (this.soundLoaded >= this.numberSounds){
				for (var i = 0; i < this.soundList.length; i++)
				{
					/*if (this.soundList[i][1].width == 0)
						return false;*/
				}
				return true;
			}
			else{
				return false;
			}

		}else{
			return true;
		}
	}

}