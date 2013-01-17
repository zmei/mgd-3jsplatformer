
RapidFall.Input = (function() {
	
	var keysToMonitor = [
		RapidFall.Constants.KeyCodes.LEFT_ARROW,
		RapidFall.Constants.KeyCodes.RIGHT_ARROW
	];
	
	var pressedKeysRegistry = [];

	return {
		isPressed : function(inputCode) {
			return pressedKeysRegistry[inputCode];
		},
		
		makeBindings : function () {
			$(document).keydown(function(e){
				switch($.inArray(e.keyCode, keysToMonitor) != -1) {
					case true:
						pressedKeysRegistry[e.keyCode] = true;
				}
				if(e.keyCode == RapidFall.Constants.KeyCodes.ENTER && RapidFall.GameState.gameOver) {
					RapidFall.GameState.gameOver = false;
					RapidFall.hideMessage();
					RapidFall.showHUD();
				}
			}).keyup(function(e){
				switch($.inArray(e.keyCode, keysToMonitor) != -1) {
					case true:
						pressedKeysRegistry[e.keyCode] = false;
				}
			});
		}
	}
	
})();