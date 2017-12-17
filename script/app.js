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
	    	rotation.y += 1.5;

	    	var angle = ((rotation.y%360)/360)*(2*Math.PI);
	    	var x = Math.sin(angle) * fov ;
    		var z = fov - Math.cos(angle) * fov ;
    		

			position.x = Math.sin(angle) * fov ;
    		position.z = fov - Math.cos(angle) * fov;
    		//position.x -= position.x - x ;
    		//position.z -= position.z - z ;

    		Update();
	    }
	    if (rotRight){
	    	rotation.y -= 1.5;

	    	var angle = ((rotation.y%360)/360)*(2*Math.PI);
    		position.x = Math.sin(angle) * fov ;
    		position.z = fov - Math.cos(angle) * fov;
    		
    		Update();
	    }

	    

	     
},10);
function Update(){
	    	rotate3d = 'rotateY('+ (-rotation.y)+'deg)';
	    	translate3d = 'translate3d('+position.x+'px,'+position.y+'px,'+position.z+'px)';
	    	level.css('transform',translate3d + ' ' + rotate3d);

	    	console.log(translate3d + 'fsd' + rotate3d)
}

setInterval(()=>{
	if(toForward || toBack || toLeft || toRight){
		$('.testWeapon').animate({
			right: '150px',
		bottom: '-80px'
		},500).animate({
			right: '200px',
			bottom: 0
		},500);
	} else{
		$('.testWeapon').clearQueue();
	}
	
},10);


	//mouse look
	var _mouseX = 0, _mouseY = 0;
	$(document).bind('mousemove', function(e) {
	    
	    mouseX = event.pageX;
	    mouseY = event.pageY;
	    
	    if (mouseX > _mouseX){
	    	rotation.y -= 3

	    	var angle = ((rotation.y%360)/360)*(2*Math.PI);
	    	position.x = Math.sin(angle) * 700 ;
	    	position.z = 700 - Math.cos(angle) * 700 ;

	    	Update();

	    } 
	     if (mouseX < _mouseX){
	    	rotation.y += 3

	    	var angle = ((rotation.y%360)/360)*(2*Math.PI);
	    	position.x = Math.sin(angle) * 700 ;
	    	position.z = 700 - Math.cos(angle) * 700 ;

	    	Update();
	    }
	       
	    
	   
	            
	    _mouseX = mouseX;
	    _mouseY = mouseY;
	    
	   // rotation = 'rotateX('+rx+'deg) rotateY('+ry+'deg)';
	});

});

