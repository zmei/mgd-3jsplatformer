function RapidFall(parameters) {

	var self = this;

	if (parameters) {
		if(parameters.showFPS) {
			(function () {
				self.stats = new Stats();
				self.stats.domElement.style.position = 'absolute';
				self.stats.domElement.style.top = '0px';
				self.stats.domElement.style.left = '0px';
				self.stats.domElement.style.zIndex = 100;
				$('body').append( self.stats.domElement );
			})();
		}
	}
	
	this.update = function(dt) {
	
		var GS = RapidFall.GameState;
	
		if (!GS.loading && !GS.gameOver) {
		
			GS.score += dt;
		
			GS.increaseSpeedTimer += dt;
			if (GS.increaseSpeedTimer > RapidFall.Config.PLATFORM_SPEED_INCREMENT_TIMER) {
				GS.increaseSpeedTimer = 0;
				GS.platformSpeedIncrement += RapidFall.Config.PLATFORM_SPEED_INCREMENT;
			}
		
			for(i in GS.platforms) {
				GS.platforms[i].gfxObject.translateY(RapidFall.Config.PLATFORM_SPEED + GS.platformSpeedIncrement);
				if (GS.platforms[i].gfxObject.position.y > RapidFall.Config.FIELD_HALF_HEIGHT) {
					RapidFall.scene.remove(GS.platforms[i].gfxObject);
					GS.platforms.splice(i,1);
				}
				if (
					GS.player.gfxObject.position.x > GS.platforms[i].gfxObject.position.x - RapidFall.Config.PLATFORM_HALF_WIDTH * 1.1 &&
					GS.player.gfxObject.position.x < GS.platforms[i].gfxObject.position.x + RapidFall.Config.PLATFORM_HALF_WIDTH * 1.1 &&
					GS.player.gfxObject.position.y < GS.platforms[i].gfxObject.position.y + RapidFall.Config.PLATFORM_HALF_HEIGHT &&
					GS.player.gfxObject.position.y > GS.platforms[i].gfxObject.position.y
				) {
					GS.player.speed.y = 0;
					GS.player.gfxObject.position.y = GS.platforms[i].gfxObject.position.y + RapidFall.Config.PLATFORM_HALF_HEIGHT * 0.75;
				}
			}

			GS.spawnPlatformTimer += dt;
			if (GS.spawnPlatformTimer > (RapidFall.Config.PLATFORM_SPAWN_INTERVAL - GS.platformSpeedIncrement)) {
				GS.spawnPlatformTimer = 0;
				var platform = new RapidFall.GameObjects.Platform();
				RapidFall.scene.add(platform.gfxObject);
				GS.platforms.push(platform);
			}
			
			GS.player.gfxObject.position.y += GS.player.speed.y * dt + 1/2 * RapidFall.Config.GRAVITY * dt * dt;
			GS.player.speed.y = GS.player.speed.y + RapidFall.Config.GRAVITY * dt;
			
			if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_LEFT)) {
				GS.player.gfxObject.lookAt(new THREE.Vector3(RapidFall.Constants.INFINITY,0,0));
				GS.player.gfxObject.translateZ(-RapidFall.Config.PLAYER_RUNNING_SPEED);
			} else if (RapidFall.Input.isPressed(RapidFall.Config.MOVE_RIGHT)) {
				GS.player.gfxObject.lookAt(new THREE.Vector3(-RapidFall.Constants.INFINITY,0,0));
				GS.player.gfxObject.translateZ(-RapidFall.Config.PLAYER_RUNNING_SPEED);
			} else {
				GS.player.gfxObject.lookAt(new THREE.Vector3(0,0,-RapidFall.Constants.INFINITY));
			}
			
			GS.player.gfxObject.updateAnimation(dt);
			
			if (GS.player.gfxObject.position.y < -RapidFall.Config.FIELD_HALF_HEIGHT || GS.player.gfxObject.position.y > RapidFall.Config.FIELD_HALF_HEIGHT) {
				if ( GS.highscore < GS.score ) {
					localStorage.setItem("RapidFallHighScore", GS.score);
				}
				RapidFall.GameState.reset();
				//RapidFall.hideHUD();
				RapidFall.showMessage();
			}
			
		}
		
	}
	
}

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
		this.renderer = new THREE.WebGLRenderer({antialias:true});
	// uncomment if webgl is required
	}else{
		// Detector.addGetWebGLMessage();
		return true;
	//}else{
	//	this.renderer = new THREE.CanvasRenderer();
	}
	this.renderer.setClearColorHex( 0x000000, 0 );
	this.renderer.setSize(width, height);
	document.body.appendChild(this.renderer.domElement);
	
	// LIGHTING
	var light = new THREE.AmbientLight( 0xFFFFFF );
	RapidFall.scene.add( light );
	
	var pointLight = new THREE.PointLight( 0xFFFFFF );
	pointLight.position.x = 0;
	pointLight.position.y = 50;
	pointLight.position.z = 25;
	RapidFall.scene.add(pointLight);
	
}

RapidFall.prototype.initializeGameState = function () {	
	RapidFall.GameState.reset();
}

RapidFall.prototype.updateHUD = function() {
	if (typeof this.stats == 'object') {
		this.stats.update();
	}
	$(RapidFall.Config.SCORE_DOM_ELEMENT).html('SCORE ' + RapidFall.GameState.score);
	$(RapidFall.Config.HIGHSCORE_DOM_ELEMENT).html('HIGH  ' + Math.max(RapidFall.GameState.score, RapidFall.GameState.highscore));
}
var offset = 0;
RapidFall.prototype.drawScene = function() {
	offset -= 0.1;
	$('canvas').css('background-position', '0% ' + offset + '%')
	this.renderer.render(RapidFall.scene, this.camera);
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
		self.updateHUD();
		self.drawScene();
	})();
	
}

RapidFall.showMessage = function() {
	$(RapidFall.Config.MESSAGE_DOM_ELEMENT).fadeIn();
}

RapidFall.hideMessage = function() {
	$(RapidFall.Config.MESSAGE_DOM_ELEMENT).fadeOut();
}

RapidFall.showHUD = function() {
	$(RapidFall.Config.HUD_DOM_ELEMENTS_SELECTORS).fadeIn();
}

RapidFall.hideHUD = function() {
	$(RapidFall.Config.HUD_DOM_ELEMENTS_SELECTORS).fadeOut();
}
