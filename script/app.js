var player;
var items;
var level;

function Start() {
  player = new Player();
  items = spriteSpawner();
  level = $('.level');

  StartMusic();
}
function StartMusic() {
	setTimeout(() => {
    mainThemeMusic.play();
    startPhrase.play();
  }, 1000);
}

// game loop
function Update() {
  if (toForward) player.moveForward();
  if (toBack) player.moveBack();
  if (toLeft)	player.moveLeft();
  if (toRight) 	player.moveRight();
  if (rotLeft) player.rotate(+ROTATION_SPEED);
  if (rotRight) player.rotate(-ROTATION_SPEED);
  if (toForward || toBack || toLeft || toRight) player.stepsEffect();
  items.forEach(item => {
    item.Update(player.rotation.y, player.getPosition());
  });
  items = items.filter(item => !item.picked);

  updateFrame();
}
function updateFrame() {
  const { rotation, position, origin } = player;
  const rotate3d = `rotateY(${rotation.y}deg)`;
  const translate3d = `translate3d(${position.x + origin.x}px, ${position.y}px, ${position.z + origin.z}px)`;

  level.css('transform',rotate3d + translate3d);

  // updateSkybox
  player.camera.css('background-position', -15*player.rotation.y +"px -5px");
}

$(document).ready(() => {
  Start();
	setInterval(Update, 10); // 100 frames per second

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

function spriteSpawner() {
	const items = [];
	items.push(new Item('medkit', 1000, 1000));
	items.push(new Item('shotgun', 250, 600));
	items.push(new Item('shotgun', 250, 900));
	items.push(new Item('shotgun', 250, 1200));

	return items;
}
