import { AnimatedSprite, Point, SCALE_MODES, Spritesheet } from "pixi.js";
import { getScreenCenter } from "../utils/getScreenCenter.function";

export class Enemy {
    private _sprite!: Spritesheet;
	public position: Point;

    constructor() {
        this.loadSprite().then(() => {
			const anim = new AnimatedSprite(this._sprite.animations['walk_up']);
			anim.position = getScreenCenter();
			anim.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
			anim.scale.set(3);
			anim.animationSpeed = 0.16;
			anim.play();

			this.entitiesContainer.addChild(anim);

			// this.IOService.displacementVector$
			// 	.pipe(
			// 		distinctUntilChanged((prev, cur) => {
			// 			return JSON.stringify(prev) == JSON.stringify(cur);
			// 		}),
			// 	)
			// 	.subscribe((val) => {
			// 		const dirKey: keyof typeof Direction = (val.x + ',' + val.y) as any;

			// 		if ((dirKey as any) == '0,0') {
			// 			anim.currentFrame = 0;
			// 			anim.stop();
			// 		} else {
			// 			anim.textures = this._sprite.animations[Direction[dirKey]];
			// 			anim.play();
			// 		}
			// 	});
		});

    }


    private async loadSprite(): Promise<void> {
		this._sprite = await Assets.load('assets/img/hero/Character/character.json');
	}
}
