import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LogService {

    private cssForModeLog = [
        'background: #222; color: orange;  font-size: 20px;',
        'background: #222; color: red;  font-size: 20px; font-weight: 900;',
        'background: #222; color: green;  font-size: 20px; font-weight: 900;',
    ];

    private queue: any = [];
    private ECHO_TOKEN = {};
    private RESET_INPUT = "%c ";
    private RESET_CSS = "";

    constructor() {}

    public log(...data: any[]): any {
        this.using(data, console.log);
    }

    public warn(...data: any[]): any {
        this.using(data, console.warn);
    }

    public error(...data: any[]): any {
        this.using(data, console.error);
    }
    public trace(...data: any[]): any {
        this.using(data, console.trace);
    }

    public group(...data: any[]): any {
        this.using(data, console.group);
    }
    
    public groupEnd(...data: any[]): any {
        this.using(data, console.groupEnd);
    }

    // Proxy to the given Console Function. This uses an
    // internal queue to aggregate values before calling the given Console
    // Function with the desired formatting.
    private using( args: any, consoleFunction: any ) {
        //////////////////////////////
        // log on every request
        this.queue.unshift(
            {
                value: `${new Date().toLocaleString()}`,
                css: "display: inline-block ; background-color: #2B52C2 ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
            }
        );
        args.unshift(this.ECHO_TOKEN);
        //////////////////////////////

        (() => {
            let inputs: any = [];
            let modifiers: any = [];



            for ( var i = 0 ; i < args.length ; i++ ) {

                // When the formatting utility methods are called, they return
                // a special token. This indicates that we should pull the
                // corresponding value out of the QUEUE instead of trying to
                // output the given argument directly.
                if ( args[ i ] === this.ECHO_TOKEN ) {

                    var item = this.queue.shift();

                    inputs.push( ( "%c" + item.value ), this.RESET_INPUT );
                    modifiers.push( item.css, this.RESET_CSS );


                } else {

                    var arg = args[ i ];

                    if (
                        ( typeof( arg ) === "object" ) ||
                        ( typeof( arg ) === "function" )
                        ) {

                        inputs.push( "%o", this.RESET_INPUT );
                        modifiers.push( arg, this.RESET_CSS );

                    } else {

                        inputs.push( ( "%c" + arg ), this.RESET_INPUT );
                        modifiers.push( this.RESET_CSS, this.RESET_CSS );

                    }

                }

            }

            consoleFunction( inputs.join( "" ), ...modifiers );

            this.queue = [];

        })();

    }

    public asAlert( value: string ) {

        this.queue.push({
            value: value,
            css: "display: inline-block ; background-color: #2B52C2 ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
        });

        return( this.ECHO_TOKEN );

    }

    public asWarn( value: string ) {

        this.queue.push({
            value: value,
            css: "display: inline-block ; background-color: #C2AE2B ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
        });

        return( this.ECHO_TOKEN );

    }


}
