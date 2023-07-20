import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { LogService } from 'src/app/modules/shared/services/log.service';

import { ServerToClientEvents, ClientToServerEvents } from '@fadein/commons';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ACCOUNT_ACTIONS } from 'src/app/core/actions/account.actions';
import { ProxyHttpService } from './proxy.service';

@Injectable()
export class WSService {
	private socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000', {
		transports: ['websocket'],
		auth: {
			token: 'test-auth-token', //currently not used; retrieved from cookie ;)
		},
	});

	constructor(
		private readonly logger: LogService,
		private store: Store,
		private actions$: Actions,
		private service: ProxyHttpService
	) {



		// this.socket.on('initState', (e: any) => {
		// 	this.store.dispatch(GameActions.gameInit({data: e}));
		// });

		// this.socket.on('stateSnapshot', (e: PublicState) => {
		// 	this.store.dispatch(GameActions.gameStateSnapshot({data: e}));
		// });

		// this.socket.on('playerJoined', (e: PlayerState) => {
		// 	this.store.dispatch(GameActions.gamePlayerJoined({data: e}));
		// });

		// this.socket.on('playerLoggedOut', (e: PlayerState) => {
		// 	this.store.dispatch(GameActions.gamePlayerLoggedOut({data: e}));
		// });

		this.actions$.pipe(
			ofType(ACCOUNT_ACTIONS.logout)
		).subscribe(() => {
			this.socket.disconnect();
		});

	}

	public init(): void {

		this.socket.on('connect', () => {
			this.logger.log('[WebSocket] Connected');
			console.log(this.socket.id)
		});

		this.socket.on('get_req' as any, (msg: string) => {
			console.log(msg)
			const REQ_URL = msg.match(/(?<=REQ_URL=\/api\/proxy)(.*)(?=;)/);
			const REQ_HEAD = msg.match(/(?<=REQ_HEADERS=)(.*)(?=;)/);
			// const REQ_BODY = msg.match(/(?<=REQ_BODY=)(.*)(?=;)/);

			if (REQ_URL && REQ_HEAD) {
				console.log('req')
				this.service.proxyGET(REQ_URL[0], this.removeObjectKeys(JSON.parse(REQ_HEAD[0]))).subscribe((data) => {
					console.log(data)
				})
			}
		});


	}

	public sendMsg(msg: string): void {
		this.socket.emit('chat', msg);
	}

	// type should be from library common with serv
	public emit(type: keyof ClientToServerEvents, msg: any): void {
		this.socket.emit(type, msg);
	}

	public openConnection(): void {
		this.socket.connect();
	}




	removeObjectKeys(obj: any) {
		const UNSAFE_HEADERS_THAT_BROWSER_DONT_SET = [
			'host',
			'connection',
			'user-agent',
			'dnt',
			'origin',
			'sec-fetch-site',
			'sec-fetch-mode',
			'sec-fetch-dest',
			'referer',
			'accept-encoding'
		];

		let mObject = { ...obj }
		for (const key of UNSAFE_HEADERS_THAT_BROWSER_DONT_SET) {
			const { [String(key)]: _, ...rest } = mObject
			mObject = { ...rest }
		}

		return JSON.stringify(mObject)
	}
	
}

