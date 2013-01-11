
RapidFall.Input = (function() {
	
	var keysToMonitor = [
		RapidFall.Constants.KeyCodes.LEFT_ARROW,
		RapidFall.Constants.KeyCodes.RIGHT_ARROW
	];
	
	var pressedKeysRegistry = [];

	$(document).keydown(function(e){
		switch($.inArray(e.keyCode, keysToMonitor) != -1) {
			case true:
				pressedKeysRegistry[e.keyCode] = true;
		}
	}).keyup(function(e){
		switch($.inArray(e.keyCode, keysToMonitor) != -1) {
			case true:
				pressedKeysRegistry[e.keyCode] = false;
		}
	});

	return {
		isPressed : function(inputCode) {
			return pressedKeysRegistry[inputCode];
		}
	}
	
})();