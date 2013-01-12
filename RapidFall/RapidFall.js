function RapidFall() {

	var spawnPlatformTimer = 0;
	var backgroundOffset = 0;
	var firstPlatform = 0;
	
	this.update = function(dt) {
	
		if (RapidFall.loading == 0) {
	
			this.player.gfxObject.position.y += this.player.speed * dt;
			this.player.speed += RapidFall.Config.GRAVITY;
	
			for(i in this.platforms) {
				this.platforms[i].gfxObject.translateY(RapidFall.Config.PLATFORM_SPEED );
				if (this.platforms[i].gfxObject.position.y > RapidFall.Config.FIELD_HALF_HEIGHT) {
					RapidFall.scene.remove(this.platforms[i].gfxObject);
					this.platforms.splice(i,1);
				}
				if (
					this.player.gfxObject.position.x > this.platforms[i].gfxObject.position.x - RapidFall.Config.PLATFORM_HALF_WIDTH * 1.1 &&
					this.player.gfxObject.position.x < this.platforms[i].gfxObject.position.x + RapidFall.Config.PLATFORM_HALF_WIDTH * 1.1 &&
					this.player.gfxObject.position.y < this.platforms[i].gfxObject.position.y + RapidFall.Config.PLATFORM_HALF_HEIGHT &&
					this.player.gfxObject.position.y > this.platforms[i].gfxObject.position.y
				) {
					this.player.speed = RapidFall.Config.PLAYER_FALLING_SPEED;
					this.player.gfxObject.position.y = this.platforms[i].gfxObject.position.y + RapidFall.Config.PLATFORM_HALF_HEIGHT * 0.75;
				}
			}
			
			this.player.gfxObject.updateAnimation(dt);
			
			if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_LEFT)) {
				this.player.gfxObject.lookAt(new THREE.Vector3(1000,0,0));
				this.player.gfxObject.translateZ(-RapidFall.Config.PLAYER_RUNNING_SPEED);
			} else if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_RIGHT)) {
				this.player.gfxObject.lookAt(new THREE.Vector3(-1000,0,0));
				this.player.gfxObject.translateZ(-RapidFall.Config.PLAYER_RUNNING_SPEED);
			} else {
				this.player.gfxObject.lookAt(new THREE.Vector3(0,0,-1000));
			}
			
			spawnPlatformTimer += dt;
			
			if (spawnPlatformTimer > RapidFall.Config.PLATFORM_SPAWN_INTERVAL) {
				spawnPlatformTimer = 0;
				var platform = new RapidFall.GameObjects.Platform();
				RapidFall.scene.add(platform.gfxObject);
				this.platforms.push(platform);
			}
			
			// background
			backgroundOffset-=0.2;
			$('#background').css('background-position', '0% ' + backgroundOffset + '%' );
			
		}
		
	}
	
}

RapidFall.lastPlatformSpawnPosition = 0;
RapidFall.loading = 0;

RapidFall.prototype.initializeScene = function () {

	// SCENE
	RapidFall.scene = new THREE.Scene();
	
	var width = $('body').width();
	var height = $('body').height();
	
	// CAMERA
	this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
	this.camera.position.y = 0;
	this.camera.position.z = 100;
	
	// RENDERER
	if( Detector.webgl ){
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColorHex( 0x000000, 0 );
	// uncomment if webgl is required
	//}else{
		// Detector.addGetWebGLMessage();
		// return true;
	}else{
		this.renderer = new THREE.CanvasRenderer();
	}
	this.renderer.setSize(width, height);
	document.body.appendChild(this.renderer.domElement);
	
	// LIGHTING
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 0;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	RapidFall.scene.add(pointLight);
	
}

RapidFall.prototype.displayFPS = function () {	
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';
	this.stats.domElement.style.left = '0px';
	this.stats.domElement.style.zIndex = 100;
	$('body').append( this.stats.domElement );
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
		if (typeof self.stats == 'object') {
			self.stats.update();
		}
		self.renderer.render(RapidFall.scene, self.camera);
	})();

}