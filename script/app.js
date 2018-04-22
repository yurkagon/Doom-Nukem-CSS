$(document).ready(() =>{
	const player = new Player();

	// level is a child of camera and it is a parent for all 3d objects.
	// If player moves, we will change the position of "level" (and all child 3d objects)
	const level = $('.level');

	mainThemeMusic.play();

	
	//game loop
	function Update() {
		if (toForward) {
			player.moveForward();
			updateFrame();
		}
		if (toBack) {
			player.moveBack();
			updateFrame();
		}
		if (toLeft) {
			player.moveLeft();
			updateFrame();
		}
		if (toRight) {
			player.moveRight();
			updateFrame();
		}
		if (rotLeft) {
			rotate(+ROTATION_SPEED);
			updateFrame();
		}
		if (rotRight) {
			rotate(-ROTATION_SPEED);
			updateFrame();
		}
	}
	setInterval(Update, 10);

	//mouse look
	var _mouseX = 0, _mouseY = 0; //previous mouse position
	$(document).bind('mousemove', function(e) {
	    
		mouseX = event.pageX;
		mouseY = event.pageY;
		
		if (mouseX > _mouseX){
			rotate(-MOUSE_SENSITIVITY*ROTATION_SPEED);
			updateFrame();
		} 
			if (mouseX < _mouseX){
			rotate(MOUSE_SENSITIVITY*ROTATION_SPEED);
			updateFrame();
		}     
		_mouseX = mouseX;
		_mouseY = mouseY;
	});
	function rotate(degree){
		player.rotation.y -= degree;
		if (player.rotation.y < 0) player.rotation.y += 358;
		if (player.rotation.y > 360) player.rotation.y -= 358;

		const angle = ((player.rotation.y%360)/360)*(2*Math.PI);
	    
		player.origin.x = -Math.sin(angle) * FOV;
		player.origin.z = -(FOV - Math.cos(angle) * FOV);
	}
	function updateFrame(){
		const rotate3d = "rotateY(" + player.rotation.y + "deg)";
		const translate3d = "translate3d(" + (player.position.x+player.origin.x) + "px,0," + (player.position.z+player.origin.z) + "px)";

		level.css('transform',rotate3d + translate3d);

		//updateSkybox
	  player.camera.css('background-position', -15*player.rotation.y +"px -5px");

	  //fps counter
		const thisFrameTime = (thisLoop=new Date) - lastLoop;
		frameTime+= (thisFrameTime - frameTime) / filterStrength;
		lastLoop = thisLoop;
	}


	//weapon animation while moving
	setInterval(()=>{
		if(toForward || toBack || toLeft || toRight){
			$('.testWeapon').animate({
				right: '150px',
				bottom: '-80px'
			},500).animate({
				right: '200px',
				bottom: 0
			},200);
		} else{
			$('.testWeapon').stop();
		}	
	},10);





	//fps counter
	var filterStrength = 20;
	var frameTime = 0, lastLoop = new Date(), thisLoop;
	var fpsOut = $('#fpsOut');
	setInterval(function(){
	  fpsOut.html((1000/frameTime).toFixed(1) + " fps");
	},1000);
});

