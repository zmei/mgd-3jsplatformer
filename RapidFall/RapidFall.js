function RapidFall() {
	
	this.initializeScene = function () {

		// SCENE
		this.scene = new THREE.Scene();
		
		// CAMERA
		this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.1, 1000);
		this.camera.position.z = 5;
		
		// RENDERER
		if( Detector.webgl ){
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setClearColorHex( 0xBBBBBB, 1 );
		// uncomment if webgl is required
		//}else{
			// Detector.addGetWebGLMessage();
			// return true;
		}else{
			this.renderer = new THREE.CanvasRenderer();
		}
		this.renderer.setSize(400, 300);
		document.body.appendChild(this.renderer.domElement);
		
		// LIGHTING
		var pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = 0;
		pointLight.position.y = 50;
		pointLight.position.z = 130;
		this.scene.add(pointLight);
		
	},
		
	this.initializeEntities = function () {
		console.log('initializeEntities');
	},
	
	this.spawnPlatformTimer = 0;
		
};

// UPDATE FUNCTION
RapidFall.prototype.update = function(dt) {
	
	if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_LEFT)) {
		this.player.gfxObject.translateX(-0.01);
	}
	
	if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_RIGHT)) {
		this.player.gfxObject.translateX(0.01);
	}
	
}

RapidFall.prototype.mainloop = function (){

	var currentTime = new Date().getTime();
	var accumulator = 0;
	var self = this;
	
	(function mainloop(){
		newTime = new Date().getTime();
		accumulator = newTime - currentTime;
		currentTime = newTime;
		while (accumulator > RapidFall.Config.PHYSICS_FRAME_TIME) {
				self.update(RapidFall.Config.PHYSICS_FRAME_TIME);
				accumulator -= RapidFall.Config.PHYSICS_FRAME_TIME;
		}
		requestAnimationFrame(mainloop);
		self.renderer.render(self.scene, self.camera);
	})();

}