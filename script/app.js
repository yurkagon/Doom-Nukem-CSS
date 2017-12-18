$(document).ready(() =>{

	var position = {x: 0,y: 0,z: 0};
	var rotation = {x : 0,y: 0,z: 0};

	var camera = $('#camera');
	var level = $('.level');

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

	//movement
	var translate3d = '';
	var rotate3d = '';
	setInterval(function () {
		 //forward
	    if (toForward) {
	    	position.z+=10;
	    	Update();
	    }
	    //back
	    if (toBack) {
	    	position.z-=10;
			Update();
	    }
	    if (toLeft) {
	    	position.x+=10;
	    	Update();
	    }
	    if (toRight) {
	    	position.x-=10;
	    	Update();
	    }

	    var fov = 700;
	    if (rotLeft){
	    	rotate(1.5);

    		Update();
	    }
	    if (rotRight){
	    	rotate(-1.5);
    		
    		Update();
	    }

	    

	     
},10);
function Update(){
	    	rotate3d = 'rotateY('+ (-rotation.y)+'deg)';
	    	translate3d = 'translate3d('+position.x+'px,'+position.y+'px,'+position.z+'px)';
	    	level.css('transform',translate3d + ' ' + rotate3d);

	    	//console.log(translate3d + 'fsd' + rotate3d)
	    	updateBackground();
}
function updateBackground(){
	camera.css('background-position', 12*rotation.y +"px 0");
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


	//mouse look
	var _mouseX = 0, _mouseY = 0;
	$(document).bind('mousemove', function(e) {
	    
	    mouseX = event.pageX;
	    mouseY = event.pageY;
	    
	    if (mouseX > _mouseX){
	    	rotate(-3);

	    	Update();

	    } 
	     if (mouseX < _mouseX){
	    	rotate(3);

	    	Update();
	    }
	       
	    
	   
	            
	    _mouseX = mouseX;
	    _mouseY = mouseY;
	    
	   
	});

	function rotate(degree){
		rotation.y += degree;

	    var angle = ((rotation.y%360)/360)*(2*Math.PI);

	    //level.css('transform-origin', position.x + "px " + -position.y + "px "+ position.z + "px");
	    position.x = Math.sin(angle) * 700 ;
	    position.z = 700 - Math.cos(angle) * 700 ;
	}

});

