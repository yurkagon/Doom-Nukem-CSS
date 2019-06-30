import $ from "jquery";
import '../style/index.scss';

import Scene from './classes/Scene/Scene';
import Player from './classes/Player/Player';

import Item from './classes/Sprite/Item/index';
import Enemy from './classes/Sprite/Enemy/index';

import { mainThemeMusic, startPhrase } from './variables/sounds';

const player = Player.getInstance();
const scene = Scene.getInstance();

const weapon = $('.testWeapon');

scene.init({
  player,
  start() {
    new Enemy('guard', 250, 600),
    new Enemy('guard', 1000, 1000),
    new Enemy('guard', -1000, -1000),
    new Enemy('guard', -1250, -10100),
    new Enemy('guard', 500, -1000)

    new Item('medkit', 1000, 1000)
    new Item('shotgun', 250, 600)
    new Item('shotgun', 250, 900)
    new Item('shotgun', 250, 1200)

    StartMusic();
  },
  update() {
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
  }
});

function StartMusic() {
	setTimeout(() => {
    mainThemeMusic.play();
    startPhrase.play();
  }, 1000);
}
