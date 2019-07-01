import $ from "jquery";

import GameObject from '../GameObject/index';
import Player from '../Player/Player';

import { generetaTranslate3d } from '../../helpers';
import { iPosition, iSpriteConfig } from "../../types";

class Sprite extends GameObject {
  isRemoved = false;

  protected readonly spritesElement: JQuery = $('.sprites');
  protected readonly selfContainer: JQuery = $('<div/>').addClass('sprite-cont');
  protected readonly self: JQuery = $('<div/>');

  translate3d
  rotate3d
  _type

	constructor(config: iSpriteConfig) {
    super(config.position);
    const { type, position, classType = '' } = config;

		this.self.addClass(`sprite ${classType} ${type}`);

		this.translate3d = generetaTranslate3d(position);
		this.rotate3d = '';
		this.self.css('transform', this.translate3d);

		this.spritesElement.append(this.selfContainer);
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
