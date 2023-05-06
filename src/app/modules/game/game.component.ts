import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { MapService } from './core/services/map.service';

import '@pixi/math-extras';
import '@pixi/events';
import { Application } from 'pixi.js';
import { DataService } from './core/services/data.service';
import { IOService } from './core/services/io.service';
import { WSService } from './core/services/ws.service';
import { PIXI_APPLICATION } from './core/tokens/application.di-token';
import { EntitiesService } from './core/services/entities.service';

declare let globalThis: any;

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GameComponent implements OnDestroy {
	private Application: Application;
	private _debugMode = false;
	public ticker;

	@HostListener('document:keydown', ['$event'])
	onDebugToggle(event: KeyboardEvent) {
		if (event.code == 'F2') {
			this._debugMode = !this._debugMode;
			this.dataService.toggleDebugInfo$.next(this._debugMode);
		}
	}

	constructor(
		@Inject(DOCUMENT) private document: Document,
		@Inject(PIXI_APPLICATION) application: Application[],
		private dataService: DataService,
		private map: MapService,
		private IOService: IOService,
		private readonly viewRef: ViewContainerRef,
		private readonly WS: WSService,
		private readonly entitiesService: EntitiesService
	) {
		this.Application = application[0];
		this.viewRef.element.nativeElement.appendChild(this.Application.view as any);

		// assign info to global context vars for pixi chrome devtool extention
		globalThis.__PIXI_STAGE__ = this.Application.stage;
		globalThis.__PIXI_RENDERER__ = this.Application.renderer;

		this.ticker = (delta: number) => {
			this.dataService.fpsCount$.next(Number(this.Application.ticker.FPS.toFixed(2)));
			this.IOService.listen();
		};

		this.Application.ticker.add(this.ticker);

	}

	ngOnDestroy(): void {
		this.Application.ticker.remove(this.ticker);
	}
}
