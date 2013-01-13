
RapidFall.Config = {

	HIGHSCORE_DOM_ELEMENT : (function() {return $('#highScoreText')})(),
	SCORE_DOM_ELEMENT : (function() {return $('#scoreText')})(),
	MESSAGE_DOM_ELEMENT : (function() {return $('#message')})(),
	HUD_DOM_ELEMENTS_SELECTORS : '#score, #stats',
	
	MOVE_LEFT : RapidFall.Constants.KeyCodes.LEFT_ARROW,
	MOVE_RIGHT : RapidFall.Constants.KeyCodes.RIGHT_ARROW,
	START_GAME : RapidFall.Constants.KeyCodes.ENTER,
	START_KEYS : [RapidFall.Constants.KeyCodes.LEFT_ARROW, RapidFall.Constants.KeyCodes.RIGHT_ARROW],
	PHYSICS_FRAME_TIME : 5,
	GRAVITY : -0.0001,
	
	FIELD_HALF_WIDTH : 45,
	FIELD_HALF_HEIGHT : 35,
	
	PLAYER_RUNNING_SPEED : 0.2,
	
	PLATFORM_SPEED : 0.10,
	PLATFORM_SPAWN_INTERVAL : 500,
	PLATFORM_HALF_WIDTH : 10,
	PLATFORM_HALF_HEIGHT : 1,
	PLATFORM_HALF_DEPTH : 2.5,
	PLATFORM_X_VARIANCE : 50,
	PLATFORM_SPEED_INCREMENT : 0.02
	
};