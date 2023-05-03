import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class WSService {
    private socket: Socket<any, any> = io('http://localhost:3000', {
        transports: ['websocket'],
        auth: {
            token: 'test-auth-token', //currently not used; retrieved from cookie ;)
        },
    });

    constructor(private readonly logger: LogService, private readonly dataService: DataService) {
        this.socket.on('connect', () => {
            this.logger.log("[WebSocket] Connected");
        });
        // this.socket.emit('events', (response: any) => {
        //     console.log('event', response);
        // });

        this.socket.on('events', (e: any) => {
            console.log(e);
        });


        this.socket.on('players-list', (e: any) => {
            console.log(e)
        })

        this.socket.on('chat', (msg: string) => {
            this.dataService.pushMsg(msg);
        })

        this.socket.emit('events', 'sieman');
    }

    public sendMsg(msg: string): void {
        this.socket.emit('chat', msg);
    }
}
