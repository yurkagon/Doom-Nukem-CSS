import $ from 'jquery';
import Player from './classes/Player/Player';
import { MOUSE_SENSITIVITY, ROTATION_SPEED } from './variables/constants';

export let [toForward, toBack, toLeft, toRight] = [false, false, false, false];
export let [rotLeft, rotRight] = [false, false];
export let [_mouseX, _mouseY] = [0, 0]; // previous mouse position

const player = Player.getInstance();

$('body').ready(function() {

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
	// mouse look
  $(document).bind('mousemove', function(event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    if (mouseX > _mouseX) player.rotate(-MOUSE_SENSITIVITY*ROTATION_SPEED);
    else if (mouseX < _mouseX) player.rotate(MOUSE_SENSITIVITY*ROTATION_SPEED);

    _mouseX = mouseX;
    _mouseY = mouseY;
  });
});
