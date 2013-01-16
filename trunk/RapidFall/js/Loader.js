RapidFall.Loader = {};

RapidFall.Loader.loaded = {};

RapidFall.Loader.resources = [{
	url : 'resources/Wolf/Wolf.json',
	callback : function ( geometry ) {
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		RapidFall.Loader.loaded['resources/Wolf/Wolf.json'] = geometry;
	}
}];

RapidFall.Loader.load = function(allDoneCallback) {
	var loader = new THREE.JSONLoader();
	var toLoad = RapidFall.Loader.resources.length;
	for( i in RapidFall.Loader.resources) {
		loader.load(RapidFall.Loader.resources[i].url, function(geometry){ RapidFall.Loader.resources[i].callback(geometry); toLoad-- });
	}
	var refreshIntervalId = setInterval(function(){
		if (toLoad == 0) {
			clearInterval(refreshIntervalId);
			allDoneCallback();
		}
	}, 200);
}