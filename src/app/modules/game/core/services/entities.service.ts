import { Inject, Injectable } from "@angular/core";
import { PIXI_APPLICATION } from "../tokens/application.di-token";
import { Application, Assets, Container, Point } from "pixi.js";
import { Player } from "../classes/entities/Player";
import { IOService } from "./io.service";
import { WSService } from "./ws.service";

@Injectable({providedIn: 'root'})
export class EntitiesService {
    private Application: Application;
	public entitiesContainer: Container = new Container();

    constructor(
        @Inject(PIXI_APPLICATION) application: Application[],
        private IOService: IOService,
        private WSService: WSService
    ) {
        this.Application = application[0];
		this.Application.stage.addChild(this.entitiesContainer);

        const player = new Player(new Point(0,0), this.IOService, this.WSService);

        this.entitiesContainer.addChild(player.playerAnimation);
    }


}
