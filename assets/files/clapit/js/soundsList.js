var soundManager = new NLSounds();
soundManager.channels = 7;
var soundsList = [

	["note1", "note_1"]
	, ["noteFail", "note_fail"]
	, ["note2", "note_2"]
	, ["music01", "music01"]
	, ["music02", "music02"]
	, ["music03", "music03"]
	, ["music04", "music04"]
	, ["music05", "music05"]
	, ["music06", "music06"]
];

soundManager.pushSounds(soundsList, "sound");