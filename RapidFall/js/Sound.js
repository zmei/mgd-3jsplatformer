soundManager.setup({
	// where to find flash audio SWFs, as needed
	url: 'swf',
	onready: function() {
		soundManager.createSound({
			id: 'wolf_howl',
			url: 'resources/wolf_howl.mp3'
		});
	}
});