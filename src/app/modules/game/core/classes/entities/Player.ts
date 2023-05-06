import { Assets, Point, Spritesheet } from 'pixi.js';
import { PlayerAbstract } from './AbstractPlayer';
import { IOService } from '../../services/io.service';
import { distinctUntilChanged, throttleTime } from 'rxjs';
import { Direction } from '../../enums/directions.enum';
import { WSService } from '../../services/ws.service';

export class Player extends PlayerAbstract {
	public override position: Point;

	constructor(position: Point, private IOService: IOService, private WS: WSService) {
		super(Assets.get('hero'));
        this.position = position;

		this.IOService.displacementVector$
			.pipe(
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
					this.playerAnimation.textures = this.sprite.animations[Direction[dirKey]];
					this.playerAnimation.play();
				}
			});


        this.IOService.displacementVector$.subscribe((position: Point) => {
            if (this.position) {
                this.position = this.position.add(position);
            }
        });

        this.IOService.displacementVector$.pipe(throttleTime(100)).subscribe(() => {
			if (this.position) {
				this.WS.emit('playerVelocity', this.position);
			}
		});
	}
}
