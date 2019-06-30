import $ from "jquery";
import '../style/index.scss';
import Player from './classes/Player/Player';
import Item from './classes/Sprite/Item';
import Enemy from './classes/Sprite/Enemy';

import { mainThemeMusic, startPhrase } from './variables/sounds';

const player = Player.getInstance();
let gameObjects = [];
let level;

function Start() {
  gameObjects = [
    ...spriteSpawner(),
    ...enemySpawner(),
    // ...enemySpawner(),
    // ...enemySpawner(),
    // ...enemySpawner(),
    // ...enemySpawner(),
    // ...enemySpawner(),
  ]
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
  player.update();
  gameObjects.forEach(el => {
    el.update();
  });
  gameObjects = gameObjects.filter(({ isRemoved }) => !isRemoved);

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
  const weapon = $('.testWeapon');
	setInterval(()=>{
		if(player.isMoving()){
			weapon.animate({
				right: '150px',
				bottom: '-80px'
			},500).animate({
				right: '200px',
				bottom: 0
			},200);
		} else{
			weapon.stop();
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

const enemySpawner = () => [
  new Enemy('guard', 250, 600),
  new Enemy('guard', 1000, 1000),
  new Enemy('guard', -1000, -1000),
  new Enemy('guard', -1250, -10100),
  new Enemy('guard', 500, -1000)
];
