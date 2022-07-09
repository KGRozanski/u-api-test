import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    private queue: any = [];
    private TOKEN = {};
    private RESET_INPUT = "%c ";
    private RESET_CSS = "";

    constructor() {}

    public log(...data: any[]): void {
        this.using(data, console.log);
    }

    public warn(...data: any[]): void {
        this.using(data, console.warn);
    }

    public error(...data: any[]): void {
        this.using(data, console.error);
    }

    public trace(...data: any[]): void {
        this.using(data, console.trace);
    }

    public group(...data: any[]): void {
        this.using(data, console.group);
    }
    
    public groupEnd(...data: any[]): void {
        this.using(data, console.groupEnd);
    }

    // Proxy to the given Console Function. This uses an
    // internal queue to aggregate values before calling the given console
    // function with the desired formatting.
    private using( args: any[], consoleFunction: Function ) {
        //////////////////////////////
        // Insert time before every log msg
        //
        this.queue.unshift(
            {
                value: `${new Date().toLocaleString()}`,
                css: "display: inline-block ; background-color: #2B52C2 ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
            }
        );
        args.unshift(this.TOKEN);
        //////////////////////////////


        let msgs: any = [];
        let modifiers: Array<string> = [];



        for ( let i = 0 ; i < args.length ; i++ ) {

            // When the formatting utility methods are called, they return
            // a special token. This indicates that we should pull the
            // corresponding value out of the QUEUE instead of trying to
            // output the given argument directly.
            if ( args[ i ] === this.TOKEN ) {

                let item = this.queue.shift();

                msgs.push( ( "%c" + item.value ), this.RESET_INPUT );
                modifiers.push( item.css, this.RESET_CSS );

            } else {
                let arg = args[ i ];

                if (
                    ( typeof( arg ) === "object" ) ||
                    ( typeof( arg ) === "function" )
                    ) {

                    msgs.push( "%o", this.RESET_INPUT );
                    modifiers.push( arg, this.RESET_CSS );

                } else {

                    msgs.push( ( "%c" + arg ), this.RESET_INPUT );
                    modifiers.push( this.RESET_CSS, this.RESET_CSS );

                }

            }

        }

        if (!environment.production) {
            consoleFunction( msgs.join( "" ), ...modifiers );
        }

        this.queue = [];

    }

    public asAlert( value: string ) {

        this.queue.push({
            value: value,
            css: "display: inline-block ; background-color: #2B52C2 ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
        });

        return( this.TOKEN );

    }

    public asWarn( value: string ) {

        this.queue.push({
            value: value,
            css: "display: inline-block ; background-color: #C2AE2B ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
        });

        return( this.TOKEN );

    }


}
