$(document).ready(() =>{

	var position = {x: 0,y: 0,z: 0}; //position coords of "level"
	var rotation = {x : 0,y: 0,z: 0};//rotation coords of "level"
	var origin = {x: 0,y: 0,z: 0};
	var playerMoveSpeed = 10;

	//camera is a static DIV. All 3d operations are inside
	var camera = $('#camera');
	/*
	level is a child of camera and it is a parent for all 3d objects.
	If player moves, we will change the position of "level" (and all child 3d objects)
	*/
	var level = $('.level');

	var rotationSpeed = 1.5;
	var mouseSensitivity = 2;
	var FOV = 800;

	//control
	var toForward, toBack, toLeft, toRight;
	toUp=toDown=toLeft=toRight = false;
	var rotLeft = false, rotRight = false;
	$('body').keydown(function (e) {
		if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = true;
		if (e.keyCode == 39 || e.keyCode == 68 ) toRight = true;
		if (e.keyCode == 38 || e.keyCode == 87 ) toForward = true;
		if (e.keyCode == 40 || e.keyCode == 83 ) toBack = true; 

		if (e.keyCode == 81) rotLeft = true;
		if (e.keyCode == 69) rotRight = true;
	});
	$('body').keyup(function (e) {
		if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = false;
		if (e.keyCode == 39 || e.keyCode == 68 ) toRight = false;
		if (e.keyCode == 38 || e.keyCode == 87 ) toForward = false;
		if (e.keyCode == 40 || e.keyCode == 83 ) toBack = false; 

		if (e.keyCode == 81) rotLeft = false;
		if (e.keyCode == 69) rotRight = false;
	});


	//game loop
	//movement
	setInterval(function () {
	    if (toForward) {
			position.x -= Math.sin(rotation.y * Math.PI / 180) * playerMoveSpeed;
			position.z += Math.cos(rotation.y * Math.PI / 180) * playerMoveSpeed;
			Update();
		}
		if (toBack) {
			position.x += Math.sin(rotation.y * Math.PI / 180) * playerMoveSpeed;
			position.z -= Math.cos(rotation.y * Math.PI / 180) * playerMoveSpeed;
			Update();
		}
		 if (toLeft) {
	    	position.x -= Math.sin((rotation.y-90) * Math.PI / 180) * playerMoveSpeed;
			position.z += Math.cos((rotation.y-90) * Math.PI / 180) * playerMoveSpeed;
	    	
	    	Update();
	    }
	    if (toRight) {
	    	position.x -= Math.sin((rotation.y+90) * Math.PI / 180) * playerMoveSpeed;
			position.z += Math.cos((rotation.y+90) * Math.PI / 180) * playerMoveSpeed;
	    	Update();
	    }
		if (rotLeft) {
			rotate(+rotationSpeed);
			Update();
		}
		if (rotRight){
			rotate(-rotationSpeed);
			Update();
		}
	     
	},10);

	//mouse look
	var _mouseX = 0, _mouseY = 0; //previous mouse position
	$(document).bind('mousemove', function(e) {
	    
	    mouseX = event.pageX;
	    mouseY = event.pageY;
	    
	    if (mouseX > _mouseX){
	    	rotate(-mouseSensitivity*rotationSpeed);
	    	Update();
	    } 
	     if (mouseX < _mouseX){
	    	rotate(mouseSensitivity*rotationSpeed);
	    	Update();
	    }     
	    _mouseX = mouseX;
	    _mouseY = mouseY;
	});

	
	function rotate(degree){
		rotation.y -= degree;
		if (rotation.y < 0) rotation.y += 358;
		if (rotation.y > 360) rotation.y -= 358;

		var angle = ((rotation.y%360)/360)*(2*Math.PI);
	    
 		origin.x = -Math.sin(angle) * FOV;
 		origin.z = -(FOV - Math.cos(angle) * FOV);
	}
	
	//update frame
	function Update(){
	    var rotate3d = "rotateY(" + rotation.y + "deg)";
	    var translate3d = "translate3d(" + (position.x+origin.x) + "px,0," + (position.z+origin.z) + "px)";

	    level.css('transform',rotate3d + translate3d);

		//updateSkybox
	    camera.css('background-position', -15*rotation.y +"px -15px");
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


	//location

	level.append(plane);
});

