RapidFall.GameObjects.Platform = function(x, y, z) {
	
	this.gfxObject = new THREE.Mesh(RapidFall.GameObjects.Platform.geometry, RapidFall.GameObjects.Platform.materials[parseInt(Math.floor(Math.random()*3))]);
	
	RapidFall.scene.add(this.gfxObject);
	
	var nextX = THREE.Math.clamp(
		(Math.random() - 0.5) * RapidFall.Config.PLATFORM_X_VARIANCE,
		-RapidFall.Config.FIELD_HALF_WIDTH,
		RapidFall.Config.FIELD_HALF_WIDTH
	);
	
	if (!RapidFall.firstPlatform) {
		RapidFall.firstPlatform = 1;
		this.gfxObject.translateX(x ? x : 0);
	} else {
		this.gfxObject.translateX(x ? x : nextX);
	}
	this.gfxObject.translateY(y ? y : -RapidFall.Config.FIELD_HALF_HEIGHT);
	this.gfxObject.translateZ(z ? z : 0);
	
}

RapidFall.GameObjects.Platform.geometry = new THREE.CubeGeometry(RapidFall.Config.PLATFORM_HALF_WIDTH*2,RapidFall.Config.PLATFORM_HALF_HEIGHT*2,5);
RapidFall.GameObjects.Platform.materials = [
	new THREE.MeshPhongMaterial({color: 0xFF0000}),
	new THREE.MeshPhongMaterial({color: 0x00FF00}),
	new THREE.MeshPhongMaterial({color: 0x0000FF}),
];