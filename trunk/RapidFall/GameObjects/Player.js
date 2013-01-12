
RapidFall.GameObjects.Player = function(x, y, z) {

	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	//var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'resources/Wolf/Wolf_Diffuse_256x256.jpg' ) } );
	var loader = new THREE.JSONLoader();
	var self = this;
	loader.load(
		'resources/Wolf/Wolf.js',
		function ( geometry ) {
			geometry.computeTangents();
			self.gfxObject = new THREE.Mesh( geometry, material );
			self.gfxObject.position.x = self.gfxObject.position.y = self.gfxObject.position.z = 0;
			self.gfxObject.rotation.x = self.gfxObject.rotation.y = self.gfxObject.rotation.z = 0;
			self.gfxObject.scale.x = self.gfxObject.scale.y = self.gfxObject.scale.z = 700;
			self.gfxObject.matrixAutoUpdate = false;
			self.gfxObject.updateMatrix();
			RapidFall.scene.add(self.gfxObject);
			self.gfxObject.translateX(x ? x : 0);
			self.gfxObject.translateY(y ? y : 0);
			self.gfxObject.translateZ(z ? z : 0);
		}
	);
}