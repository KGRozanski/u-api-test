import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	OnDestroy,
	QueryList,
	ViewChild,
	ViewChildren,
	ViewEncapsulation,
} from '@angular/core';
import { IOService } from '../../services/io.service';
import { WSService } from '../../services/ws.service';
import { DataService } from '../../services/data.service';
import { BehaviorSubject, Subject, Subscription, concatMap, of, switchMap, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as GameActions from '../../actions/game.actions';
import { Store } from '@ngrx/store';
import * as GameSelectors from '../../selectors/game.selectors';
@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewInit, OnDestroy {
	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		if (event.key === 't' || event.key === '/') {
			this.isHidden = false;
			this.io.detach();
			setTimeout(() => {
				this.fixScroll();
				this.userInput.nativeElement.focus();
			}, 0);
		}
	}
	@HostListener('document:keydown.escape', ['$event']) onEscape(event: KeyboardEvent) {
		this.isHidden = true;
		this.io.registerKeyMap();
	}
	@HostListener('document:keydown.enter', ['$event']) onSend(event: KeyboardEvent & { target: HTMLInputElement }) {
		if (!event.target.value) return;
		this.WS.sendMsg(event.target.value);
		this.userInput.nativeElement.value = '';
		this.isHidden = true;
		this.io.registerKeyMap();
	}
	@ViewChild('userInput')
	public userInput: ElementRef;
	@ViewChild('permanent')
	public permanentList: ElementRef;
	@ViewChildren('msgs')
	public msgsContainer: QueryList<any>;
	public isHidden = true;
	public receivedToRender: Array<string> = [];
	public allMessages$ = this.store.select(GameSelectors.selectChatMessages);
	private readonly destroy$ = new Subject();

	constructor(
		private io: IOService,
		private readonly WS: WSService,
		private actions$: Actions,
		private store: Store,
	) {
		this.actions$
		.pipe(
			ofType(GameActions.gameChatNewMsg),
			takeUntil(this.destroy$)
		)
		.subscribe((data) => {
			this.receivedToRender.push(data.msg);
		});
	}

	ngAfterViewInit(): void {
		this.msgsContainer.changes
			.pipe(takeUntil(this.destroy$))
			.subscribe((e) => {
				const CURRENT_EL = e.last.nativeElement;
				setTimeout(() => {
					CURRENT_EL.remove();
				}, 10000);
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next('');
		this.destroy$.complete();
	}

	// Scroll all messages to the top to see last received ones
	public fixScroll(): void {
		this.permanentList.nativeElement.scrollTop = this.permanentList.nativeElement.scrollHeight;
	}
}
