
RapidFall.GameState = {
	highscore : null,
	gameOver : true,
	score : 0,
	spawnPlatformTimer : 0,
	increaseSpeedTimer : 0,
	platformSpeedIncrement : 0,
	backgroundOffset: 0,
	player : null,
	platforms : null
}

RapidFall.GameState.reset = function () {
	$('audio[src="resources/wolf.mp3"]').get(0).play();
	RapidFall.GameState.highscore = (function() {
		var hs = parseInt(localStorage.getItem("RapidFallHighScore"));
		return isNaN(hs) ? 0 : hs;
	})();
	RapidFall.GameState.gameOver = true;
	RapidFall.GameState.score = 0;
	RapidFall.GameState.spawnPlatformTimer = 0;
	RapidFall.GameState.increaseSpeedTimer = 0;
	RapidFall.GameState.platformSpeedIncrement = 0;
	if (RapidFall.GameState.player == null) {
		RapidFall.GameState.player = new RapidFall.GameObjects.Player();
	} else {
		RapidFall.GameState.player.gfxObject.position.x = RapidFall.GameState.player.gfxObject.position.y = RapidFall.GameState.player.gfxObject.position.z = 0;
		RapidFall.GameState.player.speed = {x: 0, y: 0};
	}
	for(i in RapidFall.GameState.platforms) {
		RapidFall.scene.remove(RapidFall.GameState.platforms[i].gfxObject);
	}
	RapidFall.GameState.platforms = [];
	RapidFall.GameState.platforms.push(new RapidFall.GameObjects.Platform())
}