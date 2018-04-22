var [toForward, toBack, toLeft, toRight] = [false, false, false, false];
var [rotLeft, rotRight] = [false, false];

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