import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { LogService } from 'src/app/modules/shared/services/log.service';

@Injectable({ providedIn: 'root' })
export class WSService {
    private socket: Socket<any, any> = io('http://localhost:3000', {
        transports: ['websocket'],
        auth: {
            token: 'test-auth-token', //currently not used; retrieved from cookie ;)
        },
    });

    constructor(private readonly logger: LogService) {
        this.socket.on('connect', () => {
            this.logger.log("[WebSocket] Connected");
        });
        // this.socket.emit('events', (response: any) => {
        //     console.log('event', response);
        // });

        this.socket.on('events', (e: any) => {
            console.log(e);
        });

        this.socket.emit('events', 'sieman');
    }
}
