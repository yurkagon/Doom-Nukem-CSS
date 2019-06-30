import $ from "jquery";

import GameObject from '../GameObject/index';
import Player from '../Player/Player';

import { generetaTranslate3d } from '../../helpers';

class Sprite extends GameObject {
  isRemoved = false;

  protected readonly selfContainer: JQuery = $('<div/>').addClass('sprite-cont');
  protected readonly self: JQuery = $('<div/>');
  translate3d
  rotate3d
  _type

	constructor(type, x, y, z, classType = '') {
    super({x, y, z});

		this.self.addClass(`sprite ${classType} ${type}`);

		this.translate3d = generetaTranslate3d({ x, y, z });
		this.rotate3d = '';
		this.self.css('transform', this.translate3d);

		$('.sprites').append(this.selfContainer);
		this.selfContainer.append(this.self);


    this._type = type;
  }

  start() {

  }

	update() {
    const player = Player.getInstance();

		this.translate3d = generetaTranslate3d(this.getPosition());
		this.rotate3d = `rotate3d(0, 1, 0, ${-player.rotation.y}deg)`;

		this.selfContainer.css('transform', this.translate3d)
		this.self.css('transform',this.rotate3d);
	}
}

export default Sprite;
