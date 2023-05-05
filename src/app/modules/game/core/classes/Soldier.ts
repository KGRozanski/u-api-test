import { Assets, Container, Point, Spritesheet } from 'pixi.js';
import { MapService } from '../services/map.service';
import { AnimatedSprite, SCALE_MODES } from 'pixi.js';
import { IOService } from '../services/io.service';
import { distinctUntilChanged, throttleTime } from 'rxjs';
import { getScreenCenter } from '../utils/getScreenCenter.function';
import { WSService } from '../services/ws.service';
import { Direction } from '../enums/directions.enum';

export class Soldier {
	private _sprite!: Spritesheet;
	public position: Point;

	constructor(
		private map: MapService,
		private IOService: IOService,
		public entitiesContainer: Container,
		public WS: WSService,
		position: Point,
	) {
		this.loadSprite().then(() => {
			const anim = new AnimatedSprite(this._sprite.animations['walk_up']);
			anim.position = getScreenCenter();
			anim.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
			anim.scale.set(3);
			anim.animationSpeed = 0.16;
			anim.play();

			this.entitiesContainer.addChild(anim);

			this.IOService.displacementVector$
				.pipe(
					distinctUntilChanged((prev, cur) => {
						return JSON.stringify(prev) == JSON.stringify(cur);
					}),
				)
				.subscribe((val: Point) => {
					this.position = this.position.add(position);
					const dirKey: keyof typeof Direction = (val.x + ',' + val.y) as any;

					if ((dirKey as any) == '0,0') {
						anim.currentFrame = 0;
						anim.stop();
					} else {
						anim.textures = this._sprite.animations[Direction[dirKey]];
						anim.play();
					}
				});
		});

		this.IOService.displacementVector$.pipe(throttleTime(100)).subscribe(() => {
			if (this.position) {
				this.WS.emit('playerVelocity', this.position);
			}
		});

		this.position = position;
		this.map.updateMapPosition(position);
	}

	private async loadSprite(): Promise<void> {
		this._sprite = await Assets.load('assets/img/hero/Character/character.json');
	}
}
