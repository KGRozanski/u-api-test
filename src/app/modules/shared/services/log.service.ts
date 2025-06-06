import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

interface PrfixLog {
	value: string;
	css: string;
}
@Injectable({
	providedIn: 'root',
})
export class LogService {
	private queue: any = [];
	private TOKEN = {};
	private RESET_INPUT = '%c ';
	private RESET_CSS = '';

	public log: (...args: string[]) => void = this.using(console.log);
	public warn: (...args: string[]) => void = this.using(console.warn);
	public error: (...args: string[]) => void = this.using(console.error);
	public trace: (...args: string[]) => void = this.using(console.trace);
	public group: (...args: string[]) => void = this.using(console.groupCollapsed);
	public groupEnd: (...args: string[]) => void = this.using(console.groupEnd);

	// Proxy to the given Console Function. This uses an
	// internal queue to aggregate values before calling the given console
	// function with the desired formatting.
	private using(consoleFunction: (...args: string[]) => void): () => void {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const that = this;

		function consoleProxyFn() {
			const msgs: string[] = [];
			const modifiers: Array<string> = [];

			// eslint-disable-next-line prefer-rest-params
			for (const argument of arguments) {
				// When the formatting utility methods are called, they return
				// a special token. This indicates that we should pull the
				// corresponding value out of the QUEUE instead of trying to
				// output the given argument directly.
				if (argument === that.TOKEN) {
					const item = that.queue.shift();

					msgs.push('%c' + item.value, that.RESET_INPUT);
					modifiers.push(item.css, that.RESET_CSS);
				} else {
					if (argument instanceof Object || argument instanceof Function) {
						msgs.push('%o', that.RESET_INPUT);
						modifiers.push(argument, that.RESET_CSS);
					} else {
						msgs.push('%c' + argument, that.RESET_INPUT);
						modifiers.push(that.RESET_CSS, that.RESET_CSS);
					}
				}
			}

			if (!environment.production) {
				msgs.unshift('%c' + that.prefix.value, that.RESET_INPUT);
				modifiers.unshift(that.prefix.css, that.RESET_CSS);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				consoleFunction(msgs.join(''), ...modifiers);
			}

			that.queue = [];
		}

		return consoleProxyFn;
	}

	public asAlert(value: string) {
		this.queue.push({
			value: value,
			css: 'display: inline-block ; background-color: #2B52C2 ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;',
		});

		return this.TOKEN;
	}

	public asWarn(value: string) {
		this.queue.push({
			value: value,
			css: 'display: inline-block ; background-color: #C2AE2B ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;',
		});

		return this.TOKEN;
	}

	public get prefix(): PrfixLog {
		return {
			value: `${new Date().toLocaleString()}`,
			css: 'display: inline-block ; background-color: #2B52C2 ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;',
		};
	}
}
