import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntityClassName } from '../types/Entity.type';

@Injectable({ providedIn: 'root' })
export class DataService {
	public fpsCount$: Subject<number> = new Subject<number>();
	public buildEntity$ = new Subject<EntityClassName>();
	public toggleDebugInfo$ = new BehaviorSubject<boolean>(true);
	public chat$ = new BehaviorSubject<Array<string>>([]);
	public initPlayerState$ = new Subject();

	constructor() {}

	public pushMsg(msg: string) {
		this.chat$.value.push(msg);
		this.chat$.next(this.chat$.value);
	}
}
