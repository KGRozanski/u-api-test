import { Assets, Point, Spritesheet } from 'pixi.js';
import { PlayerAbstract } from './AbstractPlayer';
import { IOService } from '../../services/io.service';
import { BehaviorSubject, distinctUntilChanged, takeUntil, throttleTime } from 'rxjs';
import { Direction } from '../../enums/directions.enum';
import { WSService } from '../../services/ws.service';
import { PlayerState, SharedConstants } from '@fadein/commons';

export class Player extends PlayerAbstract {
	public override playerData: PlayerState;
	public position: Point;
	public override displacementVector$: BehaviorSubject<Point>;

	constructor(playerData: PlayerState, private IOService: IOService, private WS: WSService) {
		super(Assets.get('hero'));
		this.playerData = playerData;
		this.position = new Point(playerData.position.x, playerData.position.y);
		
		this.displacementVector$ = this.IOService.displacementVector$;
		this.animateFacing();

        this.IOService.displacementVector$.subscribe((position: Point) => {
			this.position = this.position.add(position);
        });

        this.IOService.displacementVector$
			.pipe(
				takeUntil(this.destroy$),
				throttleTime(SharedConstants.UPDATE_INTERVAL))
			.subscribe(() => {
				if (this.position) {
					this.WS.emit('playerVelocity', this.position);
				}
			});
	}

	public override moveEnemy(position: Point): void {
		throw new Error('Method not implemented.');
	}
}
