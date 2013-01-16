
RapidFall.GameObjects.Player = function() {

	this.speed = {x: 0, y: 0};

	var texture = THREE.ImageUtils.loadTexture( 'resources/Wolf/Wolf_Diffuse_256x256.jpg' );
	texture.flipY = false;
	var material = new THREE.MeshPhongMaterial( { map: texture, morphTargets: true } );
	var geometry = Object.create(RapidFall.Loader.loaded['resources/Wolf/Wolf.json']);
	
	this.gfxObject = new THREE.MorphAnimMesh( geometry, material );
	this.gfxObject.matrixAutoUpdate = true;
	this.gfxObject.position.x = this.gfxObject.position.y = this.gfxObject.position.z = 0;
	this.gfxObject.scale.x = this.gfxObject.scale.y = this.gfxObject.scale.z = 0.15;
	
	this.gfxObject.lookAt(new THREE.Vector3(0,0,-1));
	
	this.gfxObject.parseAnimations();
	this.gfxObject.playAnimation('wolfrun', 20);
	
	RapidFall.scene.add(this.gfxObject);

}