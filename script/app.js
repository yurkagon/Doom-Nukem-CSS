$(document).ready(() =>{

	var position = {x: 0,y: 0,z: 0}; //position coords of "level"
	//var origin = {x: 0,y: 0,z: 0};
	var rotation = {x : 0,y: 0,z: 0};//rotation coords of "level"

	//camera is a static DIV. All 3d operations are inside
	var camera = $('#camera');
	/*
	level is a child of camera and it is a parent for all 3d objects.
	If player moves, we will change the position of "level" (and all child 3d objects)
	*/
	var level = $('.level');


	var mouseSensitivity = 3;

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
		 //forward
	    if (toForward) {
	    	position.z+=10;
	    	//origin.z += 10;
	    	Update();
	    }
	    //back
	    if (toBack) {
	    	position.z-=10;
	    	//origin.z -= 10;
			Update();
	    }
	    //go left
	    if (toLeft) {
	    	position.x+=10;
	    	//origin.x += 10;
	    	Update();
	    }
	     //go right
	    if (toRight) {
	    	position.x-=10;
	    	//origin.x -= 10;
	    	Update();
	    }

	    //rotate left by keys
	    if (rotLeft){
	    	rotate(1.5);
    		Update();
	    }
	    //rotate right by keys
	    if (rotRight){
	    	rotate(-1.5);
    		Update();
	    }
	     
	},10);

	//mouse look
	var _mouseX = 0, _mouseY = 0; //previous mouse position
	$(document).bind('mousemove', function(e) {
	    
	    mouseX = event.pageX;
	    mouseY = event.pageY;
	    
	    if (mouseX > _mouseX){
	    	rotate(-mouseSensitivity);
	    	Update();
	    } 
	     if (mouseX < _mouseX){
	    	rotate(mouseSensitivity);
	    	Update();
	    }     
	    _mouseX = mouseX;
	    _mouseY = mouseY;
	});

	//rotation  ---> (HEERE I NEED FIXES AND IVE GOT TO MAKE IT MOVES AND ROTATES CORRECT) <----
	function rotate(degree){
		rotation.y += degree;
		//level.css('transform-origin', origin.x + 'px 0 '+ origin.z + "px");
	    var angle = ((rotation.y%360)/360)*(2*Math.PI);
	    
	    
	    //position.x = Math.sin(angle) * 700 ;
	   

	    //fov = Math.sqrt(Math.pow(position.x,2)+Math.pow(position.z,2));
	    fov = 700;

	    
 		position.x = Math.sin(angle) * fov;
 		position.z = (fov - Math.cos(angle) * fov);
	    //position.z = Math.cos(rotation.y * 0.0174532925);
	    
	}
	//update frame
	function Update(){
	    var rotate3d = 'rotateY('+ (-rotation.y)+'deg)';
	    var translate3d = 'translate3d('+position.x+'px,'+position.y+'px,'+position.z+'px)';

	    level.css('transform',translate3d + ' ' + rotate3d);

		//updateBackground
	    camera.css('background-position', 15*rotation.y +"px -15px");
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

