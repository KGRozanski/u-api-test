import { Assets, Point } from "pixi.js";
import { PlayerAbstract } from "./AbstractPlayer";
import { PlayerState } from "@fadein/commons";
import { limitNumberWithinRange } from "../../functions/limitNumberWithinRange.function";
import { BehaviorSubject } from "rxjs";

export class Enemy extends PlayerAbstract {
    public override playerData: PlayerState;
    private _lastPosition: Point;
    public override displacementVector$ = new BehaviorSubject<Point>(new Point(0,0));
    
    constructor(playerData: PlayerState) {
        super(Assets.get('hero'));
        this.playerData = playerData;
        this.playerAnimation.position = new Point(playerData.position.x, playerData.position.y).multiplyScalar(-1);
        this.animateFacing();
    }

    moveEnemy(position: Point): void {
        const newPosition = position.multiplyScalar(-1);
    
        if (this._lastPosition) {
            const diffPosition = this._lastPosition.subtract(newPosition);
            this.displacementVector$.next(
                new Point(
                    limitNumberWithinRange(diffPosition.x),
                    limitNumberWithinRange(diffPosition.y)
                )
            )
        }

        this._lastPosition = newPosition;
        this.playerAnimation.position = newPosition;
    }
}