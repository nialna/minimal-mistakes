var CANVAS = document.getElementById('CANVAS')
	, CTX = CANVAS.getContext('2d');

var canvasWidth = 1280
	, canvasHeight = 720
	, lastFrame = Date.now()
	, NOTE_WIDTH	= 95
	, NOTE_HEIGHT	= 95
	, mouse_is_down = false
	, fixed_mouse_x = 0
	, fixed_mouse_y = 0
	;

var FONTS = {
	"megaFont" : "70px calibri"
	,"titleFont" : "40px calibri"
	, "bigFont" : "26px calibri"
	, "mediumFont" : "18px calibri"
	, "littleFont" : "12px calibri"
};


var NOTES_RANK = {
		OK:1
		,NOTBAD:2
		,GREAT:3
		,PERFECT:4
	};
var NOTES = {
		"DO":1
		,"RE":2
		,"MI":3
		,"FA":4
	};

var music1 = {
		"1":{
			"time":1000
		}
		, "2":{
			"time":2000
		}
	};

var RATIO_WIDTH = 1
	,RATIO_HEIGHT = 1;
	
var FPS = 30;

var INPUTS = {
	"tap1": 32
	,"tap2": 40
	};

var NOTE_DATAS = {
		"1":{
			"w":80,"h":80
		}
		, "2":{
			"w":80,"h":80
		}
	};

var FEEDBACKS_DATAS = {
		"SYSTEM":{
			"txtsLineHeight":230, "txtsFrameWidth":230
			, "logosLineHeight":100, "logosFrameWidth":100
			, "txtsImg":new Image(), "logosImg":new Image()
		}
		, "TYPE":{
			"resultNote":{
				"x": 150, "y": 200
			}
			, "frapResultNote":{
				"x": 250, "y": 225
			}
		}
		, "list":{
			/* feedback sur le côté */
			"PerfectNote":{
				"soundName":"perfect", "moveSpeed":6
				, "nTotalFrame":0, "eachFrame":40, "line":0, "destY":-60, "destX":-60, "offsetY":-60
				, "type":"resultNote", "timeToStay":500, "scale":0.1, "destScale":1, "scaleSpeed":1
			}
			,"GreatNote":{
				"soundName":"perfect", "moveSpeed":6
				, "nTotalFrame":0, "eachFrame":40, "line":1, "destY":-60, "destX":-60, "offsetY":-60
				, "type":"resultNote", "timeToStay":500, "scale":0.1, "destScale":1, "scaleSpeed":1
			}
			,"NotBadNote":{
				"soundName":"perfect", "moveSpeed":6
				, "nTotalFrame":0, "eachFrame":40, "line":2, "destY":-60, "destX":-60, "offsetY":-60
				, "type":"resultNote", "timeToStay":500, "scale":0.1, "destScale":1, "scaleSpeed":1
			}
			,"OkNote":{
				"soundName":"perfect", "moveSpeed":6
				, "nTotalFrame":0, "eachFrame":40, "line":3, "destY":-60, "destX":-60, "offsetY":-60
				, "type":"resultNote", "timeToStay":500, "scale":0.1, "destScale":1, "scaleSpeed":1
			}
			,"FailNote":{
				"soundName":"perfect", "moveSpeed":6
				, "nTotalFrame":0, "eachFrame":40, "line":4, "destY":60, "destX":-60, "offsetY":0
				, "type":"resultNote", "timeToStay":500, "scale":0.1, "destScale":1, "scaleSpeed":1
			}
			
			/* feedback sur la frappe de note */
			, "FrapPerfectNote":{
				"nTotalFrame":0, "eachFrame":40, "line":0, "timeToStay":100, "scaleSpeed":4
				, "type":"frapResultNote", "destScale":2
			}
			,"FrapGreatNote":{
				"nTotalFrame":0, "eachFrame":40, "line":1, "timeToStay":100, "scaleSpeed":4
				, "type":"frapResultNote", "destScale": 2
			}
			,"FrapNotBadNote":{
				"nTotalFrame":0, "eachFrame":40, "line":2, "timeToStay":100, "scaleSpeed":4
				, "type":"frapResultNote", "destScale": 2
			}
			,"FrapOkNote":{
				"nTotalFrame":0, "eachFrame":40, "line":3, "timeToStay":100, "scaleSpeed":4
				, "type":"frapResultNote", "destScale": 2
			}
			,"FrapFailNote":{
				"nTotalFrame":0, "eachFrame":40, "line":4, "timeToStay":300, "scaleSpeed":4
				, "type":"frapResultNote"
			} 
			
			/* patterns feedbacks */
			,"PatternSuccess":{
				"soundName":"patternSuccess"
				, "nTotalFrame":4, "eachFrame":40, "line":5
				, "type":"resultPattern"
			}
		}
	};