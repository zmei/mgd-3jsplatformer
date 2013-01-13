
RapidFall.GameObjects.Player = function() {

	this.speed = {x: 0, y: 0};

	var texture = THREE.ImageUtils.loadTexture( 'resources/Wolf/Wolf_Diffuse_256x256.jpg' );
	texture.flipY = false;
	var material = new THREE.MeshBasicMaterial( { map: texture, morphTargets: true } );
	var loader = new THREE.JSONLoader();
	var self = this;
	RapidFall.GameState.loading++;
	loader.load(
		'resources/Wolf/Wolf.js',
		function ( geometry ) {		
			self.gfxObject = new THREE.MorphAnimMesh( geometry, material );
			
			self.gfxObject.matrixAutoUpdate = true;
			self.gfxObject.position.x = self.gfxObject.position.y = self.gfxObject.position.z = 0;
			self.gfxObject.scale.x = self.gfxObject.scale.y = self.gfxObject.scale.z = 0.15;
			
			self.gfxObject.lookAt(new THREE.Vector3(0,0,-1));
			
			self.gfxObject.parseAnimations();
			self.gfxObject.playAnimation('wolfrun', 20);
			
			RapidFall.scene.add(self.gfxObject);
			RapidFall.GameState.loading--;
		}
	);
}