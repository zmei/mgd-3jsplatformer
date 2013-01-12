function RapidFall() {

	var spawnPlatformTimer = 0;
	
	this.update = function(dt) {

		for(i in this.platforms) {
			this.platforms[i].gfxObject.translateY(0.01);
			if (this.platforms[i].gfxObject.position.y > 1) {
				RapidFall.scene.remove(this.platforms[i].gfxObject);
				this.platforms.splice(i,1);
			}
		}
		
		if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_LEFT)) {
			this.player.gfxObject.translateX(-0.01);
		}
		
		if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_RIGHT)) {
			this.player.gfxObject.translateX(0.01);
		}
		
		spawnPlatformTimer += dt;
		
		if (spawnPlatformTimer > RapidFall.Config.PLATFORM_SPAWN_INTERVAL) {
			spawnPlatformTimer = 0;
			var platform = new RapidFall.GameObjects.Platform();
			RapidFall.scene.add(platform.gfxObject);
			this.platforms.push(platform);
		}
		
	}
	
}
	
RapidFall.prototype.initializeScene = function () {

	// SCENE
	RapidFall.scene = new THREE.Scene();
	
	// CAMERA
	this.camera = new THREE.PerspectiveCamera(30, 4/3, 0.1, 1000);
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
	RapidFall.scene.add(pointLight);
	
}
		
RapidFall.prototype.initializeEntities = function () {

	this.player = new RapidFall.GameObjects.Player();
	this.platforms = [];
	var platform = new RapidFall.GameObjects.Platform();
	this.platforms.push(platform);
	
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
		self.renderer.render(RapidFall.scene, self.camera);
	})();

}