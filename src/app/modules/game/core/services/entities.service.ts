import { Inject, Injectable } from "@angular/core";
import { PIXI_APPLICATION } from "../tokens/application.di-token";
import { Application, Assets, Container, Point } from "pixi.js";
import { Player } from "../classes/entities/Player";
import { IOService } from "./io.service";
import { WSService } from "./ws.service";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import * as GameActions from '../actions/game.actions';
import { PlayerState, PositionMeta, PublicState } from "@fadein/commons";
import { PlayerAbstract } from "../classes/entities/AbstractPlayer";
import * as GameSelectors from '../selectors/game.selectors';
import { filter, map, mergeMap } from "rxjs";
import { Enemy } from "../classes/entities/Enemy";
import { MapService } from "./map.service";
@Injectable({providedIn: 'root'})
export class EntitiesService {
    private Application: Application;
    public playerContainer: Container = new Container();
	public entitiesContainer: Container = new Container();
    public entities: Array<PlayerAbstract> = [];
    public player: Player;

    constructor(
        @Inject(PIXI_APPLICATION) application: Application[],
        private IOService: IOService,
        private WSService: WSService,
        private actions$: Actions,
        private store: Store,
        private mapService: MapService
    ) {
        this.Application = application[0];
		this.Application.stage.addChild(this.playerContainer);
        this.mapService.container.addChild(this.entitiesContainer);


        this.actions$.pipe(
            ofType(GameActions.gameInit)
        ).subscribe(({data}) => {
            this.player = new Player(data, this.IOService, this.WSService);
            this.playerContainer.addChild(this.player.playerAnimation);
        });

        this.actions$.pipe(
            ofType(GameActions.gamePlayerJoined),
            mergeMap(({data}) => {
                return this.store.select(GameSelectors.selectPlayerData).pipe(
                    map((playerData) => ({playerData, data})),
                    filter(val => val.data.id !== val.playerData?.id)
                )
            })
        ).subscribe(({data}) => {
            this.addEntity(new Enemy(data));
        });

        this.actions$.pipe(
            ofType(GameActions.gameStateSnapshot)
        ).subscribe(({data}) => {
            if (this.entities.length) {
                this.entities.forEach((entity) => {
                    const ENTITY_SNAP = data.positions.find((el: PositionMeta) => el.SID === entity.playerData.socket.id);
                    entity.moveEnemy(new Point(
                        ENTITY_SNAP?.position.x,
                        ENTITY_SNAP?.position.y
                    ));
                });
            }
        });

    }


    public addEntity(entity: PlayerAbstract): void {
        this.entities.push(entity);
        this.entitiesContainer.addChild(entity.playerAnimation);
    }


}
