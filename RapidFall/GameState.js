
RapidFall.GameState = {
	highscore : null,
	gameOver : true,
	score : 0,
	spawnPlatformTimer : 0,
	increaseSpeedTimer : 0,
	platformSpeedIncrement : 0,
	loading : 0,
	player : null,
	platforms : null
}

RapidFall.GameState.reset = function () {
	RapidFall.GameState.highscore = (function() {
		var hs = parseInt(localStorage.getItem("RapidFallHighScore"));
		return isNaN(hs) ? 0 : hs;
	})();
	RapidFall.GameState.gameOver = true;
	RapidFall.GameState.score = 0;
	RapidFall.GameState.spawnPlatformTimer = 0;
	RapidFall.GameState.increaseSpeedTimer = 0;
	RapidFall.GameState.platformSpeedIncrement = 0;
	RapidFall.GameState.loading = 0;
	RapidFall.GameState.player = new RapidFall.GameObjects.Player();
	for(i in RapidFall.GameState.platforms) {
		RapidFall.scene.remove(RapidFall.GameState.platforms[i].gfxObject);
	}
	RapidFall.GameState.platforms = [];
	RapidFall.GameState.platforms.push(new RapidFall.GameObjects.Platform())
}