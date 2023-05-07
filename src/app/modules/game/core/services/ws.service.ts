import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { DataService } from './data.service';
import { IOService } from './io.service';
import { ServerToClientEvents, ClientToServerEvents, PublicState, PlayerState } from '@fadein/commons';
import { Store } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
@Injectable({ providedIn: 'root' })
export class WSService {
	private socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000', {
		transports: ['websocket'],
		auth: {
			token: 'test-auth-token', //currently not used; retrieved from cookie ;)
		},
	});

	constructor(
		private readonly logger: LogService,
		private readonly dataService: DataService,
		private IOService: IOService,
		private store: Store
	) {
		this.socket.on('connect', () => {
			this.logger.log('[WebSocket] Connected');
		});


		this.socket.on('chat', (msg: string) => {
			this.store.dispatch(GameActions.gameChatNewMsg({msg}));
		});

		this.socket.on('initState', (e: any) => {
			this.store.dispatch(GameActions.gameInit({data: e}));
		});

		this.socket.on('stateSnapshot', (e: PublicState) => {
			this.store.dispatch(GameActions.gameStateSnapshot({data: e}));
		});

		this.socket.on('playerJoined', (e: PlayerState) => {
			this.store.dispatch(GameActions.gamePlayerJoined({data: e}));
		})
	}

	public sendMsg(msg: string): void {
		this.socket.emit('chat', msg);
	}

	// type should be from library common with serv
	public emit(type: keyof ClientToServerEvents, msg: any): void {
		this.socket.emit(type, msg);
	}
}
