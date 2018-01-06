var Player = {

	scores : {

	}

	, tapped : 0

	, note1 : 0

	, note2 : 0

	, perfects : 0

	, greats : 0

	, goods : 0

	, bads : 0

	, fails : 0

	, bestCombo : 0

	, update : function(list){
		if (list.score != undefined){
			if (Player.scores[currentLvl] == undefined || list.score > Player.scores[currentLvl]){
				Player.scores[currentLvl] = list.score;
			}
		}
		if (list.tapped != undefined){

			Player.tapped += list.tapped;
		}
		if (list.note1 != undefined){

			Player.note1 += list.note1;
		}
		if (list.note2 != undefined){

			Player.note2 += list.note2;
		}
		if (list.perfects != undefined){

			Player.perfects += list.perfects;
		}
		if (list.greats != undefined){

			Player.greats += list.greats;
		}
		if (list.goods != undefined){

			Player.goods += list.goods;
		}
		if (list.bads != undefined){

			Player.bads += list.bads;
		}
		if (list.fails != undefined){

			Player.fails += list.fails;
		}
		if (list.bestCombo != undefined){
			if (list.bestCombo > Player.bestCombo){
				Player.bestCombo = list.bestCombo;
			}
		}
	}

};