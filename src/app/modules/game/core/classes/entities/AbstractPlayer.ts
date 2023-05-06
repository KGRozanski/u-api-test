import { AnimatedSprite, Point, SCALE_MODES, Spritesheet } from "pixi.js";
import { getScreenCenter } from "../../utils/getScreenCenter.function";

export abstract class PlayerAbstract {
	public abstract position: Point;
	public sprite: Spritesheet;
	public playerAnimation: AnimatedSprite;


    constructor(sprite: Spritesheet) {
			this.sprite = sprite;
			this.playerAnimation = new AnimatedSprite(sprite.animations['walk_up']);
			this.playerAnimation.position = getScreenCenter();
			this.playerAnimation.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
			this.playerAnimation.scale.set(3);
			this.playerAnimation.animationSpeed = 0.16;
			this.playerAnimation.play();
    }
}
