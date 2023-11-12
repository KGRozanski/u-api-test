import { AnimatedSprite, Point, SCALE_MODES, Spritesheet } from "pixi.js";
import { getScreenCenter } from "../../utils/getScreenCenter.function";
import { PlayerState } from "@fadein/commons";
import { BehaviorSubject, Subject, distinctUntilChanged, takeUntil } from "rxjs";
import { Direction } from "../../enums/directions.enum";

export abstract class PlayerAbstract {
	public playerData: PlayerState;
	public sprite: Spritesheet;
	public playerAnimation: AnimatedSprite;
	public displacementVector$: BehaviorSubject<Point>;
	public destroy$ = new Subject();

    constructor(sprite: Spritesheet) {
			this.sprite = sprite;
			this.playerAnimation = new AnimatedSprite(sprite.animations['walk_up' as keyof typeof sprite.animations]);
			this.playerAnimation.position = getScreenCenter();
			this.playerAnimation.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
			this.playerAnimation.scale.set(3);
			this.playerAnimation.animationSpeed = 0.16;
			this.playerAnimation.play();
    }

	public abstract moveEnemy(position: Point): void

	public animateFacing(): void {
		this.displacementVector$
		.pipe(
			takeUntil(this.destroy$),
			distinctUntilChanged((prev, cur) => {
				return JSON.stringify(prev) == JSON.stringify(cur);
			}),
		)
		.subscribe((val) => {
			const dirKey: keyof typeof Direction = (val.x + ',' + val.y) as any;

			if ((dirKey as any) == '0,0') {
				this.playerAnimation.currentFrame = 0;
				this.playerAnimation.stop();
			} else {
				this.playerAnimation.textures = this.sprite.animations[Direction[dirKey] as keyof typeof this.sprite.animations];
				this.playerAnimation.play();
			}
		});
	}

}
