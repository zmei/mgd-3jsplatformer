
RapidFall.Sound = {
	play : function(resource) {
		var audio = document.createElement('audio');
		audio.setAttribute('src',resource);
		audio.play();
	}
}