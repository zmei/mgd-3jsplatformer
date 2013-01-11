
RapidFall.GameObjects.Player = function(x, y, z) {

	var playerMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000});
	var playerGeometry = new THREE.SphereGeometry(0.2);

	this.gfxObject = new THREE.Mesh(playerGeometry, playerMaterial);
	
	this.gfxObject.translateX(x ? x : 0);
	this.gfxObject.translateY(y ? y : 0);
	this.gfxObject.translateZ(z ? z : 0);
}