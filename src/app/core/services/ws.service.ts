import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { LogService } from 'src/app/modules/shared/services/log.service';

import { ServerToClientEvents, ClientToServerEvents } from '@fadein/commons';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ACCOUNT_ACTIONS } from 'src/app/core/actions/account.actions';
import { ProxyHttpService } from './proxy.service';
import { catchError } from 'rxjs';
import { ApiLinksService } from 'src/app/modules/user/services/api-links.service';

@Injectable()
export class WSService {
	private socket: Socket<ServerToClientEvents, ClientToServerEvents>;

	constructor(
		private readonly logger: LogService,
		private store: Store,
		private actions$: Actions,
		private service: ProxyHttpService,
		private apiLinks: ApiLinksService
	) {}

	public init(): void {
		this.socket = io(this.apiLinks.wsLink, {
			transports: ['websocket'],
			auth: {
				token: 'test-auth-token', //currently not used; retrieved from cookie ;)
			},
		});


		this.socket.on('connect', () => {
			this.logger.log('[WebSocket] Connected');
			console.log('[WebSocket] Connected');
			console.log('[WebSocket] Socket ID: ' + this.socket.id);
		});

		this.socket.on('req' as any, (msg: string) => {
			console.log(msg)
			const REQ_METHOD: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = msg.match(/(?<=REQ_METHOD=)(.*)(?=;)/)![0] as any;
			const REQ_UNIQ = msg.match(/(?<=REQ_UNIQ=)(.*)(?=;)/);
			const REQ_URL = msg.match(/(?<=REQ_URL=\/api\/proxy)(.*)(?=;)/);
			const REQ_HEAD = msg.match(/(?<=REQ_HEADERS=)(.*)(?=;)/);
			const REQ_BODY = msg.match(/(?<=REQ_BODY=)(.*)(?=;)/);

			if (!REQ_URL || !REQ_HEAD) { console.error('No request url or headers present!'); return; }

			switch (REQ_METHOD) {
				case 'GET':
					console.log('[GET] ' + REQ_URL);
					this.service.proxyGET(REQ_URL[0], this.removeObjectKeys(JSON.parse(REQ_HEAD[0])))
					.pipe(catchError((err) => {
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data: err});
						return err;
					}))
					.subscribe((data) => {
						console.log(data)
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data});
					});
					break;
				case 'POST':
					console.log('[POST] ' + REQ_URL);
					this.service.proxyPOST(REQ_URL[0], this.removeObjectKeys(JSON.parse(REQ_HEAD[0])), REQ_BODY![0] ?? null)
					.pipe(catchError((err) => {
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data: err});
						return err;
					}))
					.subscribe((data) => {
						console.log(data)
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data});
					});
					break;
				case 'PUT':
					console.log('[PUT] ' + REQ_URL);
					this.service.proxyPUT(REQ_URL[0], this.removeObjectKeys(JSON.parse(REQ_HEAD[0])), REQ_BODY![0] ?? null)
					.pipe(catchError((err) => {
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data: err});
						return err;
					}))
					.subscribe((data) => {
						console.log(data)
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data});
					});
					break;
				case 'PATCH':
					console.log('[PATCH] ' + REQ_URL);
					this.service.proxyPATCH(REQ_URL[0], this.removeObjectKeys(JSON.parse(REQ_HEAD[0])), REQ_BODY![0] ?? null)
					.pipe(catchError((err) => {
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data: err});
						return err;
					}))
					.subscribe((data) => {
						console.log(data)
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data});
					});
					break;
				case 'DELETE':
					console.log('[DELETE] ' + REQ_URL);
					this.service.proxyDELETE(REQ_URL[0], this.removeObjectKeys(JSON.parse(REQ_HEAD[0])))
					.pipe(catchError((err) => {
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data: err});
						return err;
					}))
					.subscribe((data) => {
						console.log(data)
						this.socket.emit("response" as any, {uniq: REQ_UNIQ![0], data});
					});
					break;
			
				default:
					break;
			}
			
		});

		this.actions$.pipe(
			ofType(ACCOUNT_ACTIONS.logout)
		).subscribe(() => {
			this.socket.disconnect();
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

