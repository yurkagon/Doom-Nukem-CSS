var [toForward, toBack, toLeft, toRight] = [false, false, false, false];
var [rotLeft, rotRight] = [false, false];
var _mouseX = 0, _mouseY = 0; // previous mouse position

//3d models
var modelsVisible = true;

$('body').ready(function() {
  toggleModels();

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

		if (e.keyCode == 13) toggleModels();
  });
	// mouse look
  $(document).bind('mousemove', function(e) {
    mouseX = event.pageX;
    mouseY = event.pageY;

    if (mouseX > _mouseX) player.rotate(-MOUSE_SENSITIVITY*ROTATION_SPEED);
    else if (mouseX < _mouseX) player.rotate(MOUSE_SENSITIVITY*ROTATION_SPEED);

    _mouseX = mouseX;
    _mouseY = mouseY;
  });



	function toggleModels(){
		if(!modelsVisible){
			//plane
			$('.level').append($('<div/>').addClass("model").html(plane));
		}
		else if(modelsVisible){
			$(".model").remove();
		}
		modelsVisible = !modelsVisible;
	}
});
