RapidFall.GameObjects.Platform = function(x, y, z) {
	
	this.gfxObject = new THREE.Mesh(RapidFall.GameObjects.Platform.geometry, RapidFall.GameObjects.Platform.materials[parseInt(Math.floor(Math.random()*3))]);
	
	RapidFall.scene.add(this.gfxObject);
	
	var nextX = THREE.Math.clamp(
		(Math.random() - 0.5) * RapidFall.Config.PLATFORM_X_VARIANCE,
		-RapidFall.Config.FIELD_HALF_WIDTH,
		RapidFall.Config.FIELD_HALF_WIDTH
	);
	
	if (RapidFall.GameState.gameOver == true) {
		nextX = 0;
	}
	
	this.gfxObject.position.x = (x ? x : nextX);
	this.gfxObject.position.y = (y ? y : -RapidFall.Config.FIELD_HALF_HEIGHT);
	this.gfxObject.position.z = (z ? z : 0);
	
}

RapidFall.GameObjects.Platform.geometry = new THREE.CubeGeometry(
	RapidFall.Config.PLATFORM_HALF_WIDTH * 2,
	RapidFall.Config.PLATFORM_HALF_HEIGHT * 2,
	RapidFall.Config.PLATFORM_HALF_DEPTH
);

RapidFall.GameObjects.Platform.materials = [
	new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture( 'resources/stone_0.jpg' )}),
	new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture( 'resources/stone_1.jpg' )}),
	new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture( 'resources/stone_2.jpg' )}),
];