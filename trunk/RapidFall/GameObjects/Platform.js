
RapidFall.GameObjects.Platform = function(x, y, z) {

	var platformMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF});
	var platformGeometry = new THREE.CubeGeometry(1,0.1,1);

	this.gfxObject = new THREE.Mesh(platformGeometry, platformMaterial);
	
	RapidFall.scene.add(this.gfxObject);
	
	this.gfxObject.translateX(x ? x : Math.random());
	this.gfxObject.translateY(y ? y : 0);
	this.gfxObject.translateZ(z ? z : 0);
}