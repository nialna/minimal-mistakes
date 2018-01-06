/*
	Class: NLImages

	The class that contains all the images + their load functions and stuff
*/
function NLImages(imagesPath){
	
	/*
		variable: imageList

		An array containing the images :
		[
			["imageName", "imagePath"],
			["imageName", "imagePath"],
			["imageName", "imagePath"]
		]
	*/

	this.imageList = [];
	/*
		variable: imagesPath

		A string containing the base path for images
	*/
	this.imagesPath = imagesPath;

	/*
		variable: numberImages

		An int containing the total number of images
	*/
	this.numberImages = 0;

	/*
		variable: imagesLoaded

		An int containing the number of images loaded
	*/
	this.imageLoaded = 0;

	if (imagesPath === undefined)
	{
		this.imagesPath = "img/";
	}

	/*
		Function: log(str)

		Logs to the chrome console

			Parameters:

				str - The string to log
	*/
	this.log = function(str){
			console.log("[NLImages] " + str);
	}
	/*
		Function: getImage(imageName)

		Returns the image object of the desired name

			Parameters: 

				imageName - Str containing the image reference

			Returns:

				value - The image
	*/

	this.getImage = function(imageName)
	{
		// console.log(imageName);
		if (this.imageList[imageName] !== undefined){
			return this.imageList[imageName][1];
		}else{
			return false;
		}
	}

	/*
		Function: getImageSize(imageName)

		Returns the size of the image in an array [0] = width, [1] = height

			Parameters:
				
				imageName - Str containing the image reference
			
			Returns:

				value -  the size of the image in an array [0] = width, [1] = height
	*/
	this.getImageSize = function(imageName)
	{	
		return {
			x : this.imageList[imageName][1].width
			, y : this.imageList[imageName][1].height
		};
	}

	/*
		Function: pushImage(myImageMatrix)

		Push an image to the list

			Parameters:
				myImageMatrix - The image matrix in the form : [
				["imageName", "imagePath"],
				["imageName", "imagePath"],
				["imageName", "imagePath"]
				] (The default imagePath is from the img folder)
	
	*/
	this.pushImages = function(myImageMatrix){
		this.log("Pushing images");
		for (var i = 0; i < myImageMatrix.length; i++)
		{
			var p = myImageMatrix[i];
			if (!this.getImage(p[0])){
			this.imageList[p[0]] = [p[0], new Image()]; // Pushes the image to the list					
			this.imageList[p[0]][1].src = this.imagesPath + p[1];
			var currentLoader = this;
			this.imageList[p[0]][1].onload = function(){imageLoad(currentLoader)};// Gives a reference to the image when the function onload will be called
			this.numberImages++;
			}
		}
		this.log("Images pushed");
		this.percentCoeff = 100 / this.numberImages;
	}

	/*
		Function: getLoadPercentage()

		Returns the current load percents

			Returns:

				int - The current load percentage
	*/
	this.getLoadPercentage = function(){
		return this.imageLoaded * this.percentCoeff;
	}
	/*
		Function: imageLoad(currentImage)

		Triggered when an image is loaded and increments the imageLoaded counter

		Parameters:
			
			currentImage - The image that has been loaded
	*/
	imageLoad = function(currentLoader){

		// Sets the image to loaded state;
		currentLoader.imageLoaded++;
	}

	/*
		Function: isLoaded()

		Returns true if all the images are loaded

		Returns:
			loaded - Boolean to know if imgs are loaded
	*/
	this.isLoaded = function(){
		if (this.imageLoaded >= this.numberImages){
			for (var i = 0; i < this.imageList.length; i++)
			{
				/*if (this.imageList[i][1].width == 0)
					return false;*/
			}
			return true;
		}
		else{
			return false;
		}
	}

}