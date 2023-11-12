import { Inject, Injectable } from "@angular/core";
import { PIXI_APPLICATION } from "../tokens/application.di-token";
import { Application, Assets, Container, DisplayObject, Point } from "pixi.js";
import { Player } from "../classes/entities/Player";
import { IOService } from "./io.service";
import { WSService } from "./ws.service";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import * as GameActions from '../actions/game.actions';
import { PlayerState, PositionMeta, PublicState } from "@fadein/commons";
import { PlayerAbstract } from "../classes/entities/AbstractPlayer";
import * as GameSelectors from '../selectors/game.selectors';
import { Subject, filter, map, mergeMap } from "rxjs";
import { Enemy } from "../classes/entities/Enemy";
import { MapService } from "./map.service";
import { ACCOUNT_ACTIONS } from "src/app/core/actions/account.actions";
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
		this.Application.stage.addChild(this.playerContainer as DisplayObject);
        this.mapService.container.addChild(this.entitiesContainer as DisplayObject);


        this.actions$.pipe(
            ofType(GameActions.gameInit)
        ).subscribe(({data}) => {
            this.player = new Player(data.playerData, this.IOService, this.WSService);
            this.playerContainer.addChild(this.player.playerAnimation as DisplayObject);
            this.addEntities(data.entities);
        });

        this.actions$.pipe(
            ofType(GameActions.gameStateSnapshot)
        ).subscribe(({data}) => {
            if (this.entities.length) {
                this.entities.forEach((entity) => {
                    const ENTITY_SNAP = data.positions.find((el: PositionMeta) => el.SID === entity.playerData.socket.id);
                    if (ENTITY_SNAP) {
                        entity.moveEnemy(new Point(
                            ENTITY_SNAP?.position.x,
                            ENTITY_SNAP?.position.y
                        ));
                    }
                });
            }
        });

        this.actions$.pipe(
            ofType(GameActions.gamePlayerJoined),
            mergeMap(({data}) => {
                return this.store.select(GameSelectors.selectPlayerData).pipe(
                    map((playerData) => ({playerData, data})),
                    filter(val => {
                        return val.data.id !== val.playerData?.id && val.playerData?.id !== undefined;
                    })
                )
            })
        ).subscribe(({data}) => {
            this.addEntities([data]);
        });

        this.actions$.pipe(
            ofType(GameActions.gamePlayerLoggedOut)
        ).subscribe(({data}) => {
            const ENTITY = this.entities.find((entity) => entity.playerData.id == data.id);

            if (ENTITY) {
                this.entities.splice(this.entities.indexOf(ENTITY), 1);
                this.entitiesContainer.removeChild(ENTITY.playerAnimation as DisplayObject);
            }
        });

        this.actions$.pipe(
            ofType(ACCOUNT_ACTIONS.logout)
        ).subscribe(() => {
            this.reset();
        });
    }


    /**
     * Instantiates entity classes
     * @param entities 
     */
    public addEntities(entities: PlayerState[]): void {
        entities.forEach((entity) => {
            const ENTITY = new Enemy(entity);
            this.entities.push(ENTITY);
            this.entitiesContainer.addChild(ENTITY.playerAnimation as DisplayObject);
        })
    }

    public reset(): void {
        this.player.destroy$.next('');
        this.player.destroy$.complete();
        this.entitiesContainer.removeChildren();
        this.playerContainer.removeChild(this.player.playerAnimation as DisplayObject);
        this.entities = [];
        this.player = null as any;
    }

}
