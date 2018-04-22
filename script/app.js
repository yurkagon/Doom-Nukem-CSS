$(document).ready(() =>{
	const player = new Player();

	// level is a child of camera and it is a parent for all 3d objects.
	// If player moves, we will change the position of "level" (and all child 3d objects)
	const level = $('.level');

	mainThemeMusic.play();

	
	//game loop
	function Update() {
		if (toForward) player.moveForward();
		if (toBack) player.moveBack();
		if (toLeft)	player.moveLeft();
		if (toRight) 	player.moveRight();
		if (rotLeft) player.rotate(+ROTATION_SPEED);
		if (rotRight) player.rotate(-ROTATION_SPEED);
		if (toForward || toBack || toLeft || toRight) player.stepsEffect();

		updateFrame();
	}
	setInterval(Update, 10);

	//mouse look
	var _mouseX = 0, _mouseY = 0; //previous mouse position
	$(document).bind('mousemove', function(e) {
		mouseX = event.pageX;
		mouseY = event.pageY;
		
		if (mouseX > _mouseX) player.rotate(-MOUSE_SENSITIVITY*ROTATION_SPEED);
		else if (mouseX < _mouseX) player.rotate(MOUSE_SENSITIVITY*ROTATION_SPEED);
			
		updateFrame(); 
		_mouseX = mouseX;
		_mouseY = mouseY;
	});

	function updateFrame(){
		const { rotation, position, origin } = player;
		const rotate3d = `rotateY(${rotation.y}deg)`;
		const translate3d = `translate3d(${position.x + origin.x}px, ${position.y}px, ${position.z + origin.z}px)`;

		level.css('transform',rotate3d + translate3d);

		//updateSkybox
	  player.camera.css('background-position', -15*player.rotation.y +"px -5px");
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
});

