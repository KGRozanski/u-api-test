import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { DataService } from './data.service';
import { throttleTime } from 'rxjs';
import { IOService } from './io.service';

@Injectable({ providedIn: 'root' })
export class WSService {
    private socket: Socket<any, any> = io('http://localhost:3000', {
        transports: ['websocket'],
        auth: {
            token: 'test-auth-token', //currently not used; retrieved from cookie ;)
        }
    });

    constructor(private readonly logger: LogService, private readonly dataService: DataService, private IOService: IOService) {
        this.socket.on('connect', () => {
            this.logger.log("[WebSocket] Connected");
        });
        // this.socket.emit('events', (response: any) => {
        //     console.log('event', response);
        // });

        this.socket.on('events', (e: any) => {
            console.log(e);
        });


        this.socket.on('playersList', (e: any) => {
            console.log(e)
        })

        this.socket.on('chat', (msg: string) => {
            this.dataService.pushMsg(msg);
        })

        this.IOService.displacementVector$.pipe(throttleTime(100)).subscribe((displacement: any) => {
            // console.log(displacement)
        })

        this.socket.on('initState', (e: any) => {
            this.dataService.initPlayerState$.next(e);
        });
    }

    public sendMsg(msg: string): void {
        this.socket.emit('chat', msg);
    }

    // type should be from library common with serv
    public emit(type: any, msg: any): void {
        this.socket.emit(type, msg);
    }
}
