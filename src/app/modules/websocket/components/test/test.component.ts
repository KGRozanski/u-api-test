import { Component } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent {
    private socket: Socket<any, any> = io('http://localhost:3000', {
        transports: ['websocket'],
        auth: {
            token: 'test-auth-token',
        },
    });

    constructor() {
        this.socket.on('connect', () => {
            console.log('Connected');
        });
        // this.socket.emit('events', (response: any) => {
        //     console.log('event', response);
        // });
        
        this.socket.on('events', (e: any) => {
            console.log(e)
        })

        this.socket.emit('events', "sieman")
    }
}
