
RapidFall.GameObjects.Platform = function(x, y, z) {
	
	var platformMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF});
	var platformGeometry = new THREE.CubeGeometry(RapidFall.Config.PLATFORM_HALF_WIDTH*2,RapidFall.Config.PLATFORM_HALF_HEIGHT*2,5);

	this.gfxObject = new THREE.Mesh(platformGeometry, platformMaterial);
	
	RapidFall.scene.add(this.gfxObject);
	
	var nextX = THREE.Math.clamp(
		RapidFall.lastPlatformSpawnPosition + (Math.random() - 0.5) * RapidFall.Config.PLATFORM_X_VARIANCE,
		-RapidFall.Config.FIELD_HALF_WIDTH,
		RapidFall.Config.FIELD_HALF_WIDTH
	);
	
	RapidFall.lastPlatformSpawnPosition = nextX;
	if (!RapidFall.firstPlatform) {
		RapidFall.firstPlatform = 1;
		this.gfxObject.translateX(x ? x : 0);
	} else {
		this.gfxObject.translateX(x ? x : nextX);
	}
	this.gfxObject.translateY(y ? y : -RapidFall.Config.FIELD_HALF_HEIGHT);
	this.gfxObject.translateZ(z ? z : 0);


	
}